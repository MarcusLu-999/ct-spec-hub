const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const requiredCategories = [
  "物理几何与机械参数 (Physical Geometry)",
  "成像链与物理硬件 (Imaging Chain)",
  "软件与算法代偿 (Software & Algorithms)",
  "图像质量与物理实测 (Image Quality)",
  "场地建设与配电要求 (Site Requirements)"
];

let errors = 0;

products.forEach(p => {
  if (!p.id) {
    console.error(`Error: Product missing id.`);
    errors++;
    return;
  }
  
  if (!p.specifications) {
    console.error(`Error: Product ${p.id} missing specifications.`);
    errors++;
    return;
  }

  requiredCategories.forEach(cat => {
    if (!p.specifications[cat]) {
      console.error(`Error: Product ${p.id} missing category "${cat}".`);
      errors++;
    } else {
      // Check that all specs under this category are valid objects
      for (const specKey in p.specifications[cat]) {
        const spec = p.specifications[cat][specKey];
        if (typeof spec !== 'object' || spec === null) {
          console.error(`Error: Product ${p.id} -> "${cat}" -> "${specKey}" is not a valid object.`);
          errors++;
        } else {
          if (spec.value === undefined) {
            console.error(`Error: Product ${p.id} -> "${cat}" -> "${specKey}" is missing "value" field.`);
            errors++;
          }
          if (spec.label === undefined) {
            console.error(`Error: Product ${p.id} -> "${cat}" -> "${specKey}" is missing "label" field.`);
            errors++;
          }
        }
      }
    }
  });
});

if (errors === 0) {
  console.log(`Success: All ${products.length} products successfully validated against the new schema.`);
  process.exit(0);
} else {
  console.error(`Failure: Found ${errors} validation errors in products.json.`);
  process.exit(1);
}
