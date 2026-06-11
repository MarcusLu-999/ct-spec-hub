const fs = require('fs');
const path = require('path');
const http = require('http');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const outPath = path.join(__dirname, '../src/data/manuals_metadata.json');

const targetUrl = 'http://www.frankshospitalworkshop.com/equipment/various_equipment_service_manuals.html';

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to load page: status ${res.statusCode}`));
        }
      });
    }).on('error', err => reject(err));
  });
}

// Extract links from HTML using simple regex
function parseLinks(html) {
  const links = [];
  const hrefRegex = /href="([^"]+\.pdf)"[^>]*>([^<]+)<\/a>/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push({
      url: match[1],
      title: match[2].trim()
    });
  }
  return links;
}

async function start() {
  console.log(`Fetching Frank's Hospital Workshop manuals index from: ${targetUrl}...`);
  
  try {
    const html = await fetchHTML(targetUrl);
    const links = parseLinks(html);
    console.log(`Found ${links.length} total PDF manual links on Frank's index.`);

    const manualsMap = {};

    products.forEach(p => {
      const cleanModel = p.model_name.toLowerCase()
        .replace(/somatom/gi, '')
        .replace(/aquilion/gi, '')
        .replace(/lightspeed/gi, '')
        .trim();
      
      const keywords = [p.model_name.toLowerCase(), cleanModel].filter(k => k.length > 2);
      
      // Look for matches in the links
      const matches = links.filter(link => {
        const titleLower = link.title.toLowerCase();
        const urlLower = link.url.toLowerCase();
        return keywords.some(k => titleLower.includes(k) || urlLower.includes(k));
      });

      if (matches.length > 0) {
        // Resolve absolute URL (Frank's manuals links are often relative)
        const absoluteMatches = matches.map(m => {
          let fullUrl = m.url;
          if (!fullUrl.startsWith('http')) {
            // Relative path like "documents/various/..."
            fullUrl = `http://www.frankshospitalworkshop.com/equipment/${m.url}`;
          }
          return {
            title: m.title,
            url: fullUrl
          };
        });

        manualsMap[p.id] = {
          has_manual: true,
          manuals: absoluteMatches
        };
        console.log(`  Matched ${p.model_name} with ${absoluteMatches.length} manual(s).`);
      } else {
        manualsMap[p.id] = {
          has_manual: false,
          manuals: []
        };
      }
    });

    fs.writeFileSync(outPath, JSON.stringify(manualsMap, null, 2));
    console.log(`Manuals metadata saved successfully to ${outPath}`);
  } catch (e) {
    console.error(`Error scraping Frank's Workshop: ${e.message}`);
    // Fallback: create empty/mock manuals metadata if server is down or blocked
    const fallback = {};
    products.forEach(p => {
      fallback[p.id] = { has_manual: false, manuals: [] };
    });
    fs.writeFileSync(outPath, JSON.stringify(fallback, null, 2));
  }
}

start();
