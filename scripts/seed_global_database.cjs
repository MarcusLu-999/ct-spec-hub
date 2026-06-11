const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
let products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Remove old GE and UIH entries that lack deep specs to prevent duplicates
products = products.filter(p => !['mfg_ge', 'mfg_united', 'mfg_philips', 'mfg_canon', 'mfg_neusoft'].includes(p.manufacturer_id));

const globalProducts = [
  // ==================== GE HEALTHCARE ====================
  {
    "id": "ct_ge_revolution_apex_elite",
    "manufacturer_id": "mfg_ge",
    "model_name": "Revolution Apex Elite",
    "category": "High-end",
    "release_year": 2022,
    "status": "active",
    "description": "GE's flagship wide-coverage CT platform with Quantix 160 tube technology and Gemstone Clarity Detector.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 256, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 29, "unit": "ms", "label": "时间分辨率" },
        "max_scan_speed": { "value": 437, "unit": "mm/s", "label": "最大扫描速度" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 80, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.23, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 306, "unit": "kg", "label": "最大承重" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" },
        "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" }
      },
      "X射线球管 (X-ray Tube)": {
        "tube_type": { "value": 1, "unit": "x Quantix", "label": "球管类型" },
        "anode_heat_capacity": { "value": 30, "unit": "MHU", "label": "有效阳极热容量" },
        "cooling_rate": { "value": 3400, "unit": "kHU/min", "label": "散热率" }
      },
      "探测器系统 (Detector)": {
        "detector_type": { "value": 1, "unit": "x Gemstone Clarity", "label": "探测器材质" },
        "z_coverage": { "value": 160, "unit": "mm", "label": "Z轴覆盖" }
      },
      "图像质量与重建 (Image Quality)": {
        "spatial_resolution": { "value": 23, "unit": "lp/cm", "label": "高对比分辨率" },
        "recon_speed": { "value": 60, "unit": "fps", "label": "最快重建速度" }
      }
    },
    "features": ["TrueFidelity DLIR", "160mm Coverage", "Quantix Tube"]
  },
  {
    "id": "ct_ge_revolution_ascend",
    "manufacturer_id": "mfg_ge",
    "model_name": "Revolution Ascend",
    "category": "Mid-range",
    "release_year": 2021,
    "status": "active",
    "description": "Smart 128-slice CT scanner featuring a 75cm wide bore and AI-based Effortless Workflow.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 64, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 175, "unit": "ms", "label": "时间分辨率" },
        "max_scan_speed": { "value": 150, "unit": "mm/s", "label": "最大扫描速度" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 75, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.35, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 227, "unit": "kg", "label": "最大承重" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 72, "unit": "kW", "label": "总发生器功率" },
        "tube_current_max": { "value": 600, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" }
      },
      "X射线球管 (X-ray Tube)": {
        "tube_type": { "value": 1, "unit": "x Performix", "label": "球管类型" },
        "anode_heat_capacity": { "value": 6.3, "unit": "MHU", "label": "有效阳极热容量" }
      },
      "探测器系统 (Detector)": {
        "detector_type": { "value": 1, "unit": "x Clarity", "label": "探测器材质" },
        "z_coverage": { "value": 40, "unit": "mm", "label": "Z轴覆盖" }
      },
      "图像质量与重建 (Image Quality)": {
        "spatial_resolution": { "value": 18, "unit": "lp/cm", "label": "高对比分辨率" }
      }
    },
    "features": ["Effortless Workflow", "TrueFidelity DLIR", "75cm wide bore"]
  },

  // ==================== PHILIPS HEALTHCARE ====================
  {
    "id": "ct_philips_spectral_7500",
    "manufacturer_id": "mfg_philips",
    "model_name": "Spectral CT 7500",
    "category": "High-end",
    "release_year": 2021,
    "status": "active",
    "description": "Always-on spectral CT scanner providing 100% spectral data without compromise.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 128, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 135, "unit": "ms", "label": "时间分辨率" },
        "max_scan_speed": { "value": 200, "unit": "mm/s", "label": "最大扫描速度" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 80, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.27, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 306, "unit": "kg", "label": "最大承重" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" },
        "tube_current_max": { "value": 1000, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 80, "unit": "kV", "label": "最低管电压" }
      },
      "X射线球管 (X-ray Tube)": {
        "tube_type": { "value": 1, "unit": "x vMRC", "label": "球管类型" },
        "anode_heat_capacity": { "value": 30, "unit": "MHU", "label": "有效阳极热容量" }
      },
      "探测器系统 (Detector)": {
        "detector_type": { "value": 1, "unit": "x NanoPanel Prism", "label": "探测器材质" },
        "z_coverage": { "value": 80, "unit": "mm", "label": "Z轴覆盖" }
      },
      "图像质量与重建 (Image Quality)": {
        "spatial_resolution": { "value": 22, "unit": "lp/cm", "label": "高对比分辨率" },
        "recon_speed": { "value": 40, "unit": "fps", "label": "最快重建速度" }
      }
    },
    "features": ["Always-on Spectral", "NanoPanel Prism", "Precise Image AI"]
  },
  {
    "id": "ct_philips_incisive",
    "manufacturer_id": "mfg_philips",
    "model_name": "Incisive CT",
    "category": "Mid-range",
    "release_year": 2019,
    "status": "active",
    "description": "Versatile 128-slice CT with Tube for Life guarantee and precise AI capabilities.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 64, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 175, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 72, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.35, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 72, "unit": "kW", "label": "总发生器功率" },
        "tube_current_max": { "value": 600, "unit": "mA", "label": "最大管电流" }
      },
      "X射线球管 (X-ray Tube)": {
        "tube_type": { "value": 1, "unit": "x vMRC", "label": "球管类型" },
        "anode_heat_capacity": { "value": 8, "unit": "MHU", "label": "有效阳极热容量" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 40, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["Tube for Life", "Precise Image AI", "O-MAR"]
  },

  // ==================== CANON MEDICAL ====================
  {
    "id": "ct_canon_aquilion_one_prism",
    "manufacturer_id": "mfg_canon",
    "model_name": "Aquilion ONE PRISM",
    "category": "High-end",
    "release_year": 2020,
    "status": "active",
    "description": "Deep Learning Spectral CT with 16 cm wide area coverage in a single rotation.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 320, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 135, "unit": "ms", "label": "时间分辨率" },
        "max_scan_speed": { "value": 160, "unit": "mm/s", "label": "最大扫描速度" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.275, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 315, "unit": "kg", "label": "最大承重" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 100, "unit": "kW", "label": "总发生器功率" },
        "tube_current_max": { "value": 1000, "unit": "mA", "label": "最大管电流" }
      },
      "X射线球管 (X-ray Tube)": {
        "tube_type": { "value": 1, "unit": "x Megacool", "label": "球管类型" },
        "anode_heat_capacity": { "value": 7.5, "unit": "MHU", "label": "有效阳极热容量" }
      },
      "探测器系统 (Detector)": {
        "detector_type": { "value": 1, "unit": "x PUREVision", "label": "探测器材质" },
        "z_coverage": { "value": 160, "unit": "mm", "label": "Z轴覆盖" }
      },
      "图像质量与重建 (Image Quality)": {
        "spatial_resolution": { "value": 24, "unit": "lp/cm", "label": "高对比分辨率" },
        "recon_speed": { "value": 70, "unit": "fps", "label": "最快重建速度" }
      }
    },
    "features": ["AiCE Deep Learning Recon", "16cm Coverage", "Deep Learning Spectral"]
  },

  // ==================== UNITED IMAGING ====================
  {
    "id": "ct_united_uct_960_plus",
    "manufacturer_id": "mfg_united",
    "model_name": "uCT 960+",
    "category": "High-end",
    "release_year": 2023,
    "status": "active",
    "description": "Ultra-premium 320-row CT with a 82cm ultra-wide bore and 600 lb table capacity.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 320, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 25, "unit": "ms", "label": "时间分辨率" },
        "max_scan_speed": { "value": 400, "unit": "mm/s", "label": "最大扫描速度" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 82, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.235, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 318, "unit": "kg", "label": "最大承重" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" },
        "tube_current_max": { "value": 1500, "unit": "mA", "label": "最大管电流" }
      },
      "X射线球管 (X-ray Tube)": {
        "anode_heat_capacity": { "value": 30, "unit": "MHU", "label": "有效阳极热容量" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 160, "unit": "mm", "label": "Z轴覆盖" }
      },
      "图像质量与重建 (Image Quality)": {
        "spatial_resolution": { "value": 21, "unit": "lp/cm", "label": "高对比分辨率" }
      }
    },
    "features": ["82cm Wide Bore", "Z-Detector Technology", "uAI Vision"]
  },

  // ==================== NEUSOFT MEDICAL ====================
  {
    "id": "ct_neusoft_neuviz_epoch",
    "manufacturer_id": "mfg_neusoft",
    "model_name": "NeuViz Epoch",
    "category": "High-end",
    "release_year": 2021,
    "status": "active",
    "description": "Premium 512-slice CT scanner featuring advanced AI capabilities and fast rotation.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 256, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 125, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.259, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 160, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["ClearInfinity AI", "160mm coverage", "Liquid Metal Bearing Tube"]
  }
];

const merged = [...products, ...globalProducts];
fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2));
console.log(`Successfully injected ${globalProducts.length} global models. Total DB size: ${merged.length}`);
