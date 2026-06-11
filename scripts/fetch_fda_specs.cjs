const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const outPath = path.join(__dirname, '../src/data/fda_metadata.json');

// Manufacturer mapping to FDA sponsor name search terms
const mfgMap = {
  "mfg_siemens": "siemens",
  "mfg_ge": "ge+healthcare", // or general+electric
  "mfg_philips": "philips",
  "mfg_canon": "canon", // will also fallback to toshiba
  "mfg_united": "united+imaging",
  "mfg_neusoft": "neusoft"
};

// Helper function to make HTTPS request in Node
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Failed to parse JSON response"));
          }
        } else if (res.statusCode === 404) {
          resolve(null); // Not found is normal for some models
        } else {
          reject(new Error(`HTTP status code ${res.statusCode}`));
        }
      });
    }).on('error', err => reject(err));
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate the FDA PDF summary URL
function getFdaPdfUrl(kNumber) {
  if (!kNumber || !kNumber.startsWith('K')) return null;
  const digits = kNumber.substring(1, 3);
  return `https://www.accessdata.gov/cdrh_docs/pdf${digits}/${kNumber}.pdf`;
}

async function start() {
  const fdaMetadata = {};
  
  // Load existing fda_metadata.json if it exists to avoid re-fetching
  if (fs.existsSync(outPath)) {
    try {
      Object.assign(fdaMetadata, JSON.parse(fs.readFileSync(outPath, 'utf8')));
    } catch (e) {
      console.log('No existing FDA metadata found or file corrupt, starting fresh.');
    }
  }

  console.log(`Starting openFDA API queries for ${products.length} models...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    
    // Skip if already has K number or metadata
    if (fdaMetadata[p.id]) {
      console.log(`[${i+1}/${products.length}] ${p.model_name} already has FDA metadata in cache. Skipping.`);
      continue;
    }

    const mfgTerm = mfgMap[p.manufacturer_id] || '';
    const modelClean = p.model_name
      .replace(/SOMATOM/gi, '')
      .replace(/Aquilion/gi, '')
      .replace(/uCT/gi, '')
      .replace(/NeuViz/gi, '')
      .trim();

    // Build search query:
    // We search under product code "JAK" (Computed Tomography System) and check if model name is in device name or sponsor name
    const queryTerm = encodeURIComponent(modelClean);
    const searchUrl = `https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+(sponsor_name:${mfgTerm}+OR+applicant:${mfgTerm})+AND+(device_name:${queryTerm}+OR+applicant:${queryTerm})&limit=5`;

    console.log(`[${i+1}/${products.length}] Querying openFDA for: ${p.model_name} (Search term: ${modelClean})...`);

    try {
      let result = await fetchJSON(searchUrl);
      
      // Fallback for Canon to search Toshiba if no results
      if ((!result || !result.results || result.results.length === 0) && p.manufacturer_id === 'mfg_canon') {
        console.log(`  No results for Canon, trying fallback search under Toshiba...`);
        const fallbackUrl = `https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+(sponsor_name:toshiba+OR+applicant:toshiba)+AND+(device_name:${queryTerm})&limit=5`;
        result = await fetchJSON(fallbackUrl);
      }

      // Fallback for GE to search general+electric
      if ((!result || !result.results || result.results.length === 0) && p.manufacturer_id === 'mfg_ge') {
        console.log(`  No results for GE Healthcare, trying fallback search under General Electric...`);
        const fallbackUrl = `https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+(sponsor_name:general+electric+OR+applicant:general+electric)+AND+(device_name:${queryTerm})&limit=5`;
        result = await fetchJSON(fallbackUrl);
      }

      if (result && result.results && result.results.length > 0) {
        // Find the best match (closest match in name, or just the first result if only one)
        const match = result.results[0]; // Simple match selection for now
        fdaMetadata[p.id] = {
          k_number: match.k_number,
          device_name: match.device_name,
          sponsor_name: match.sponsor_name,
          decision_date: match.decision_date,
          pdf_url: getFdaPdfUrl(match.k_number),
          matched_via_api: true
        };
        console.log(`  Found match! FDA K-Number: ${match.k_number}, Registered Name: ${match.device_name}`);
      } else {
        console.log(`  No matching FDA 510(k) records found.`);
        fdaMetadata[p.id] = {
          k_number: null,
          device_name: null,
          pdf_url: null,
          matched_via_api: false
        };
      }
    } catch (e) {
      console.error(`  Error querying API for ${p.model_name}: ${e.message}`);
    }

    // Delay 1.5 seconds to respect rate limits (40 req/min)
    await delay(1500);
  }

  // Save results
  fs.writeFileSync(outPath, JSON.stringify(fdaMetadata, null, 2));
  console.log(`FDA metadata queries finished. Saved data to ${outPath}`);
}

start();
