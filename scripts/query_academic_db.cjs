const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const outPath = path.join(__dirname, '../src/data/academic_metadata.json');

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
          resolve(null);
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

// Extract potential MTF (lp/cm) values from abstracts using regex
function extractMtfVal(text) {
  if (!text) return null;
  // Match patterns like: "15 lp/cm", "24.5 lp/cm", "14lp/cm"
  const mtfRegex = /(\d+(?:\.\d+)?)\s*lp\/cm/i;
  const match = text.match(mtfRegex);
  return match ? parseFloat(match[1]) : null;
}

async function start() {
  const academicMetadata = {};

  if (fs.existsSync(outPath)) {
    try {
      Object.assign(academicMetadata, JSON.parse(fs.readFileSync(outPath, 'utf8')));
    } catch (e) {
      console.log('No existing academic metadata found, starting fresh.');
    }
  }

  console.log(`Starting Europe PMC queries for ${products.length} models...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];

    if (academicMetadata[p.id]) {
      console.log(`[${i+1}/${products.length}] ${p.model_name} already has academic metadata in cache. Skipping.`);
      continue;
    }

    const cleanModel = p.model_name.replace(/SOMATOM/gi, '').trim();
    // Build query for Europe PMC
    const query = `"${cleanModel}" AND ("ACR 464" OR "spatial resolution" OR "MTF" OR "low contrast")`;
    const searchUrl = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=lite&limit=5`;

    console.log(`[${i+1}/${products.length}] Querying Europe PMC for: ${p.model_name}...`);

    try {
      const result = await fetchJSON(searchUrl);
      if (result && result.resultList && result.resultList.result && result.resultList.result.length > 0) {
        const papers = result.resultList.result.map(paper => ({
          title: paper.title,
          abstract: paper.abstractText || '',
          doi: paper.doi || null,
          pmcid: paper.pmcid || null,
          author: paper.authorString || '',
          journal: paper.journalTitle || '',
          year: paper.pubYear || null
        }));

        // Try to extract an MTF value from abstracts or titles
        let mtfVal = null;
        for (const paper of papers) {
          mtfVal = extractMtfVal(paper.title) || extractMtfVal(paper.abstract);
          if (mtfVal) break;
        }

        academicMetadata[p.id] = {
          has_papers: true,
          papers: papers,
          extracted_mtf10: mtfVal
        };
        console.log(`  Found ${papers.length} publications. Extracted MTF: ${mtfVal ? mtfVal + ' lp/cm' : 'None'}`);
      } else {
        console.log(`  No publications found.`);
        academicMetadata[p.id] = {
          has_papers: false,
          papers: [],
          extracted_mtf10: null
        };
      }
    } catch (e) {
      console.error(`  Error querying Europe PMC: ${e.message}`);
    }

    // Delay 1 second to respect rate limits
    await delay(1000);
  }

  fs.writeFileSync(outPath, JSON.stringify(academicMetadata, null, 2));
  console.log(`Academic literature search finished. Saved data to ${outPath}`);
}

start();
