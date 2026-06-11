const https = require('https');

const searchUrl = `https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+applicant:siemens+AND+device_name:force&limit=1`;

https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    console.log("Response:", data);
  });
}).on('error', err => console.error(err));
