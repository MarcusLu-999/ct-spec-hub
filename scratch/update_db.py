import os
import json

db_path = r"src/data/products.json"
verification_dir = r"scratch/verification"
log_path = r"src/data/data_updates_log.json"

# 1. Load the database
with open(db_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

# 2. Build a mapping of parameter -> (category, label, unit) from the database
param_info = {}
for p in products:
    specs = p.get('specifications', {})
    for cat, details in specs.items():
        for param, spec_obj in details.items():
            if spec_obj is not None and isinstance(spec_obj, dict):
                label = spec_obj.get('label', '')
                unit = spec_obj.get('unit', '')
                if param not in param_info or (label and not param_info[param]['label']):
                    param_info[param] = {
                        'category': cat,
                        'label': label,
                        'unit': unit
                    }

# Helper to parse values to correct types
def parse_value(val_str):
    if val_str is None or val_str == 'null':
        return None
    # Try int
    try:
        if '.' not in val_str:
            return int(val_str)
    except ValueError:
        pass
    # Try float
    try:
        return float(val_str)
    except ValueError:
        pass
    # Keep as string
    return val_str

# 3. Load all verification reports
all_updates = []
for i in range(1, 6):
    file_path = os.path.join(verification_dir, f"batch_{i}.json")
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            all_updates.extend(json.load(f))

print(f"Loaded {len(all_updates)} update items from batch reports.")

# 4. Map products by ID for fast updates
products_by_id = {p['id']: p for p in products}

updated_count = 0
not_found_count = 0

# Track changes for the logging system
changes_log = []

for item in all_updates:
    p_id = item['product_id']
    param = item['parameter']
    new_val_str = item['official_value']
    new_val = parse_value(new_val_str)
    discrepancy_type = item['discrepancy_type']
    
    if p_id not in products_by_id:
        print(f"Warning: Product ID {p_id} not found in database.")
        not_found_count += 1
        continue
        
    p = products_by_id[p_id]
    
    # Find category
    if param in param_info:
        cat = param_info[param]['category']
        label = param_info[param]['label']
        unit = param_info[param]['unit']
    else:
        # Fallback if parameter is completely new (should not happen as we checked)
        print(f"Warning: Parameter {param} has no mapping info in DB!")
        continue
        
    # Ensure category exists in specifications
    if 'specifications' not in p:
        p['specifications'] = {}
    if cat not in p['specifications']:
        p['specifications'][cat] = {}
        
    # Get old value
    old_obj = p['specifications'][cat].get(param)
    old_val = old_obj.get('value') if old_obj else None
    
    # Update or insert
    if old_obj is None:
        p['specifications'][cat][param] = {
            'value': new_val,
            'label': label,
            'unit': unit
        }
    else:
        old_obj['value'] = new_val
        
    changes_log.append({
        "product_id": p_id,
        "model_name": p['model_name'],
        "category": cat,
        "parameter": param,
        "label": label,
        "old_value": old_val,
        "new_value": new_val,
        "type": discrepancy_type,
        "description": item['description'],
        "source_url": item['source_url']
    })
    
    updated_count += 1

print(f"Applied {updated_count} updates in memory.")

# 5. Save the updated database
with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)
print(f"Successfully saved updated database to: {db_path}")

# 6. Save update log if log file exists or needs to be updated
if os.path.exists(log_path):
    try:
        with open(log_path, 'r', encoding='utf-8') as f:
            current_log = json.load(f)
    except Exception:
        current_log = []
else:
    current_log = []

# Append new entries to log
import datetime
timestamp = datetime.datetime.now().isoformat()
log_entry = {
    "timestamp": timestamp,
    "version": "1.4.0-spec-verification",
    "summary": f"Clean spec verification update: corrected {len([c for c in changes_log if c['type'] == 'mismatch'])} mismatches and backfilled {len([c for c in changes_log if c['type'] == 'missing_in_db'])} missing fields.",
    "changes": changes_log
}
current_log.insert(0, log_entry)

with open(log_path, 'w', encoding='utf-8') as f:
    json.dump(current_log, f, indent=2, ensure_ascii=False)
print(f"Successfully saved change log to: {log_path}")
