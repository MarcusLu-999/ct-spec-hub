const fs = require('fs');
const pdf = require('pdf-parse');

async function extractTextFromPDF(pdfPath) {
    let dataBuffer = fs.readFileSync(pdfPath);

    try {
        const data = await pdf(dataBuffer);
        // data.text contains the extracted text
        console.log(`Extracted ${data.numpages} pages from ${pdfPath}`);
        
        // Output text to stdout
        console.log("---- EXTRACTED TEXT START ----");
        console.log(data.text);
        console.log("---- EXTRACTED TEXT END ----");
        
    } catch (error) {
        console.error("Error parsing PDF:", error);
    }
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: node extract_pdf_specs.js <path_to_pdf>");
    process.exit(1);
}

extractTextFromPDF(args[0]);
