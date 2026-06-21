# Project Rules

## Updating Product Database (`src/data/products.json`)
When adding new CT products or updating the products database:
- **MUST include required fields:** Always ensure that new products have the `description`, `features` (an array), and `category` fields populated (even if empty like `""` or `[]`).
- **Reason:** The React frontend (e.g., `App.jsx`) relies on these fields for search filtering and rendering. Omitting them will result in a `TypeError` (e.g., `Cannot read properties of undefined (reading 'toLowerCase')`) and crash the UI, causing a white screen.
