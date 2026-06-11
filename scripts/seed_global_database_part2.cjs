const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
let products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const globalProducts2 = [
  // ==================== GE HEALTHCARE (Part 2) ====================
  {
    "id": "ct_ge_revolution_ct",
    "manufacturer_id": "mfg_ge",
    "model_name": "Revolution CT",
    "category": "High-end",
    "release_year": 2015,
    "status": "active",
    "description": "Premium 256-slice CT offering 160mm coverage and one-beat cardiac capability.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 256, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 29, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 80, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.28, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 100, "unit": "kW", "label": "总发生器功率" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 160, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["160mm Coverage", "One-beat Cardiac", "Gemstone Clarity"]
  },
  {
    "id": "ct_ge_revolution_maxima",
    "manufacturer_id": "mfg_ge",
    "model_name": "Revolution Maxima",
    "category": "Mid-range",
    "release_year": 2019,
    "status": "active",
    "description": "Versatile 64-slice CT with AI-based auto-positioning for optimized workflow.",
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
        "generator_power": { "value": 72, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["AI Auto Positioning", "ASiR-V", "Liquid Metal Bearing"]
  },
  {
    "id": "ct_ge_optima_660",
    "manufacturer_id": "mfg_ge",
    "model_name": "Optima CT660",
    "category": "Entry-level",
    "release_year": 2010,
    "status": "active",
    "description": "Proven, highly reliable 64-slice CT system for routine and advanced clinical needs.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 64, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 175, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 70, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.35, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 72, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["Compact Footprint", "ASiR", "Volara Digital DAS"]
  },

  // ==================== PHILIPS HEALTHCARE (Part 2) ====================
  {
    "id": "ct_philips_iqon",
    "manufacturer_id": "mfg_philips",
    "model_name": "IQon Spectral CT",
    "category": "High-end",
    "release_year": 2014,
    "status": "active",
    "description": "World's first spectral-detector CT delivering multiple layers of retrospective data.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 64, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 135, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 70, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.27, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 40, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["NanoPanel Prism", "Retrospective Spectral", "iDose4"]
  },
  {
    "id": "ct_philips_access",
    "manufacturer_id": "mfg_philips",
    "model_name": "Access CT",
    "category": "Entry-level",
    "release_year": 2017,
    "status": "active",
    "description": "Reliable 16/32-slice CT scanner designed to lower the cost of ownership.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 16, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 375, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 70, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.75, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 40, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["iFlow workflow", "iDose4", "Compact Footprint"]
  },

  // ==================== CANON MEDICAL (Part 2) ====================
  {
    "id": "ct_canon_genesis",
    "manufacturer_id": "mfg_canon",
    "model_name": "Aquilion ONE GENESIS",
    "category": "High-end",
    "release_year": 2016,
    "status": "active",
    "description": "Premium 320-row scanner with FIRST model-based iterative reconstruction.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 320, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 137, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.275, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 100, "unit": "kW", "label": "总发生器功率" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 160, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["FIRST MBIR", "16cm Coverage", "PUREVision Detector"]
  },
  {
    "id": "ct_canon_prime_sp",
    "manufacturer_id": "mfg_canon",
    "model_name": "Aquilion Prime SP",
    "category": "Mid-range",
    "release_year": 2017,
    "status": "active",
    "description": "Versatile 80/160-slice CT scanner capable of handling diverse patient types including bariatric.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 80, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 175, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.35, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 72, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["SEMAR metal artifact reduction", "78cm wide bore", "vHP3"]
  },
  {
    "id": "ct_canon_lightning",
    "manufacturer_id": "mfg_canon",
    "model_name": "Aquilion Lightning",
    "category": "Entry-level",
    "release_year": 2015,
    "status": "active",
    "description": "Entry-level 16-80 slice system focusing on low total cost of ownership and minimal footprint.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 16, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 250, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.5, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 50, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["78cm wide bore", "AIDR 3D Enhanced", "Compact design"]
  },

  // ==================== UNITED IMAGING (Part 2) ====================
  {
    "id": "ct_united_uct_860",
    "manufacturer_id": "mfg_united",
    "model_name": "uCT 860",
    "category": "High-end",
    "release_year": 2021,
    "status": "active",
    "description": "High-end 160-row (320-slice) CT designed for comprehensive cardiovascular and neurological imaging.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 160, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 135, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 80, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.27, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 100, "unit": "kW", "label": "总发生器功率" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 80, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["Z-Detector", "uAI Platform", "80mm Coverage"]
  },
  {
    "id": "ct_united_uct_780",
    "manufacturer_id": "mfg_united",
    "model_name": "uCT 780",
    "category": "Mid-range",
    "release_year": 2018,
    "status": "active",
    "description": "Mainstream 64-row (128-slice) CT optimized for high throughput and robust clinical performance.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 64, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 175, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.35, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 80, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["Z-Detector", "Liquid Metal Tube", "KARL 3D Iterative Recon"]
  },
  {
    "id": "ct_united_uct_528",
    "manufacturer_id": "mfg_united",
    "model_name": "uCT 528",
    "category": "Entry-level",
    "release_year": 2019,
    "status": "active",
    "description": "Accessible 32-slice CT scanner prioritizing economic value, stability, and intelligent workflows.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 32, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 350, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 72, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.7, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 50, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["Easy-logic intelligent workflow", "Compact footprint", "Z-Detector"]
  },

  // ==================== NEUSOFT MEDICAL (Part 2) ====================
  {
    "id": "ct_neusoft_neuviz_glory",
    "manufacturer_id": "mfg_neusoft",
    "model_name": "NeuViz Glory",
    "category": "High-end",
    "release_year": 2019,
    "status": "active",
    "description": "256-slice CT scanner focusing on fast rotation speeds and advanced cardiovascular imaging.",
    "specifications": {
      "核心参数 (Core)": {
        "detector_rows": { "value": 128, "unit": "rows", "label": "探测器排数" },
        "temporal_resolution": { "value": 125, "unit": "ms", "label": "时间分辨率" }
      },
      "机架与扫描床 (Gantry & Table)": {
        "bore_size": { "value": 75, "unit": "cm", "label": "孔径" },
        "rotation_speed": { "value": 0.259, "unit": "s", "label": "最快转速" }
      },
      "高压发生器 (Generator)": {
        "generator_power": { "value": 100, "unit": "kW", "label": "总发生器功率" }
      },
      "探测器系统 (Detector)": {
        "z_coverage": { "value": 80, "unit": "mm", "label": "Z轴覆盖" }
      }
    },
    "features": ["0.259s Rotation", "ClearView Iterative Recon", "AI positioning"]
  },
  {
    "id": "ct_neusoft_neuviz_128",
    "manufacturer_id": "mfg_neusoft",
    "model_name": "NeuViz 128",
    "category": "Mid-range",
    "release_year": 2015,
    "status": "active",
    "description": "China's first domestic 128-slice CT scanner, delivering robust performance and clinical versatility.",
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
        "generator_power": { "value": 72, "unit": "kW", "label": "总发生器功率" }
      }
    },
    "features": ["Quad-sampling technology", "ClearView", "O-Dose"]
  }
];

const merged = [...products, ...globalProducts2];
fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2));
console.log(`Successfully injected ${globalProducts2.length} global models. Total DB size: ${merged.length}`);
