const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const outPath = path.join(__dirname, '../src/data/clinicaltrials_metadata.json');

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

// Extract specific kVp/mA numbers if mentioned in descriptions
function extractProtocols(text) {
  if (!text) return null;
  // Match patterns like "120 kVp", "100 kV", "200 mA", "80-140 kVp"
  const kvRegex = /(\d+(?:-\d+)?\s*k[vV]p?)/i;
  const maRegex = /(\d+(?:-\d+)?\s*m[aA])/i;
  const kvMatch = text.match(kvRegex);
  const maMatch = text.match(maRegex);
  
  if (kvMatch || maMatch) {
    return {
      kvp: kvMatch ? kvMatch[1] : null,
      ma: maMatch ? maMatch[1] : null
    };
  }
  return null;
}

async function start() {
  const trialMetadata = {};

  if (fs.existsSync(outPath)) {
    try {
      Object.assign(trialMetadata, JSON.parse(fs.readFileSync(outPath, 'utf8')));
    } catch (e) {
      console.log('No existing ClinicalTrials metadata found, starting fresh.');
    }
  }

  console.log(`Starting ClinicalTrials.gov queries for ${products.length} models...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];

    if (trialMetadata[p.id]) {
      console.log(`[${i+1}/${products.length}] ${p.model_name} already in cache. Skipping.`);
      continue;
    }

    const cleanModel = p.model_name.replace(/SOMATOM/gi, '').trim();
    // ClinicalTrials.gov API v2 query URL
    const query = `"${cleanModel}"`;
    const searchUrl = `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(query)}&pageSize=3`;

    console.log(`[${i+1}/${products.length}] Querying ClinicalTrials.gov for: ${p.model_name}...`);

    try {
      const result = await fetchJSON(searchUrl);
      if (result && result.studies && result.studies.length > 0) {
        const trials = result.studies.map(study => {
          const proto = study.protocolSection || {};
          const ident = proto.identificationModule || {};
          const desc = proto.descriptionModule || {};
          const sponsor = proto.sponsorCollaboratorsModule || {};
          
          const summaryText = desc.briefSummary || desc.detailedDescription || '';
          const protocolDetails = extractProtocols(summaryText);

          return {
            nct_id: ident.nctId,
            title: ident.officialTitle || ident.briefTitle,
            sponsor: sponsor.leadSponsor ? sponsor.leadSponsor.name : '',
            summary: summaryText.substring(0, 500) + '...',
            inferred_protocol: protocolDetails
          };
        });

        trialMetadata[p.id] = {
          has_trials: true,
          trials: trials
        };
        console.log(`  Found ${trials.length} trials.`);
      } else {
        console.log(`  No clinical trials found.`);
        trialMetadata[p.id] = {
          has_trials: false,
          trials: []
        };
      }
    } catch (e) {
      console.error(`  Error querying ClinicalTrials.gov: ${e.message}`);
    }

    // Delay 1.5 seconds to respect rate limits
    await delay(1500);
  }

  fs.writeFileSync(outPath, JSON.stringify(trialMetadata, null, 2));
  console.log(`ClinicalTrials.gov search finished. Saved data to ${outPath}`);
}

start();
