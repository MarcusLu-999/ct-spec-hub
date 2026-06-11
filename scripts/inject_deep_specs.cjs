const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find SOMATOM Force
const forceIndex = products.findIndex(p => p.id === 'ct_siemens_somatom_force');

if (forceIndex !== -1) {
    products[forceIndex].specifications = {
        "核心参数 (Core)": {
            "detector_rows": { "value": 384, "unit": "slices", "label": "重建层数" },
            "physical_rows": { "value": 192, "unit": "rows", "label": "物理探测器排数" },
            "temporal_resolution": { "value": 66, "unit": "ms", "label": "时间分辨率" },
            "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" }
        },
        "机架与扫描床 (Gantry & Table)": {
            "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
            "rotation_speed": { "value": 0.25, "unit": "s", "label": "最快转速" },
            "gantry_tilt": { "value": 30, "unit": "°", "label": "机架倾角 (±)" },
            "table_load_capacity": { "value": 307, "unit": "kg", "label": "最大承重 (选配)" },
            "scan_range": { "value": 2000, "unit": "mm", "label": "最长扫描范围" }
        },
        "高压发生器 (Generator)": {
            "generator_power": { "value": 240, "unit": "kW", "label": "总发生器功率" },
            "generator_power_single": { "value": 120, "unit": "kW", "label": "单侧发生器功率" },
            "kv_steps": { "value": 10, "unit": "kV", "label": "kV 调节步进" },
            "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" }
        },
        "X射线球管 (X-ray Tube)": {
            "tube_type": { "value": 2, "unit": "x Vectron", "label": "球管类型" },
            "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
            "anode_heat_capacity": { "value": 0, "unit": "MHU", "label": "阳极热容量 (直接水冷=0)" },
            "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "散热率" }
        },
        "探测器系统 (Detector)": {
            "detector_type": { "value": 2, "unit": "x StellarInfinity", "label": "探测器材质" },
            "z_coverage": { "value": 57.6, "unit": "mm", "label": "单侧Z轴覆盖" },
            "channels_per_row": { "value": 926, "unit": "channels", "label": "每排通道数" },
            "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "最高采样率" }
        },
        "图像质量与重建 (Image Quality)": {
            "spatial_resolution": { "value": 30, "unit": "lp/cm @ 0% MTF", "label": "高对比分辨率" },
            "low_contrast": { "value": 2, "unit": "mm @ 0.3%", "label": "低对比分辨率" },
            "recon_speed": { "value": 60, "unit": "fps", "label": "最快重建速度" }
        }
    };
    
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    console.log('Successfully injected deep specs for SOMATOM Force.');
} else {
    console.log('SOMATOM Force not found in database.');
}
