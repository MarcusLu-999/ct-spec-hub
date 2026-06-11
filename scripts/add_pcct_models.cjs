const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const newPCCTs = [
  {
    "id": "ct_ge_photonova_spectra",
    "manufacturer_id": "mfg_ge",
    "model_name": "Photonova Spectra",
    "category": "High-end",
    "release_year": 2026,
    "status": "active",
    "description": "GE HealthCare's first FDA-cleared photon-counting CT system, powered by proprietary Deep Silicon detector technology for 8-bin spectral imaging on every scan.",
    "specifications": {
      "物理几何与机械参数 (Physical Geometry)": {
        "bore_size": { "value": 80, "unit": "cm", "label": "机架孔径" },
        "rotation_speed": { "value": 0.23, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 300, "unit": "kg", "label": "最大承重" },
        "gantry_tilt": { "value": 0, "unit": "°", "label": "物理倾角" },
        "scan_range": { "value": 2000, "unit": "mm", "label": "最大扫描范围" },
        "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" },
        "lateral_slide_range": { "value": null, "unit": "", "label": "床面横向滑动范围" }
      },
      "成像链与物理硬件 (Imaging Chain)": {
        "detector_material": { "value": "Deep Silicon (深硅半导体)", "unit": "", "label": "探测器材料" },
        "detector_z_coverage": { "value": 80, "unit": "mm", "label": "单圈探测器覆盖" },
        "physical_detector_rows": { "value": null, "unit": "", "label": "物理探测器排数" },
        "max_reconstructed_slices": { "value": null, "unit": "", "label": "重建层数" },
        "x_ray_tube_model": { "value": "Vector PCCT Tube", "unit": "", "label": "球管型号" },
        "anode_heat_capacity_physical": { "value": 0, "unit": "MHU", "label": "物理阳极热容量" },
        "anode_heat_capacity_equivalent": { "value": 120, "unit": "MHU", "label": "等效阳极热容量" },
        "cooling_system_type": { "value": "Liquid metal bearing water-cooled", "unit": "", "label": "球管冷却工程机制" },
        "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "热流量" },
        "max_generator_power": { "value": 130, "unit": "kW", "label": "发生器最大功率" },
        "generator_power_single": { "value": 130, "unit": "kW", "label": "单发生器功率" },
        "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
        "kv_steps": { "value": 10, "unit": "kV", "label": "电压调节间隔" },
        "temporal_resolution": { "value": 66, "unit": "ms", "label": "单扇区时间分辨率" },
        "channels_per_row": { "value": 926, "unit": "channels", "label": "单排采样通道数" },
        "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "投影采样率" }
      },
      "软件与算法代偿 (Software & Algorithms)": {
        "dose_modulation_tech": { "value": "Smart mA / ODM (智能剂量调制)", "unit": "", "label": "智能剂量调制技术" },
        "iterative_reconstruction_algorithm": { "value": "ASiR-V", "unit": "", "label": "迭代重建算法" },
        "deep_learning_reconstruction": { "value": "TrueFidelity DL-PCCT", "unit": "", "label": "深度学习重建算法" },
        "spectral_imaging_mechanism": { "value": "Deep Silicon Detector (8-bin Photon Counting)", "unit": "", "label": "能谱/光谱成像技术路径" }
      },
      "图像质量与物理实测 (Image Quality)": {
        "spatial_resolution_advertised": { "value": null, "unit": "", "label": "商业宣传最高对比分辨率" },
        "spatial_resolution_acr_mtf10": { "value": 16, "unit": "lp/cm", "label": "ACR 464 模体 10% MTF 空间分辨率" },
        "low_contrast_resolution_acr": { "value": "1.5 mm @ 0.3%", "unit": "", "label": "ACR 464 模体低对比分辨率" },
        "recon_speed": { "value": 60, "unit": "fps", "label": "重建速度" }
      },
      "场地建设与配电要求 (Site Requirements)": {
        "electrical_requirement": { "value": "480V, 3-Phase", "unit": "", "label": "配电要求" },
        "heat_dissipation_hvac": { "value": "24 kW", "unit": "", "label": "暖通空调冷量要求" },
        "shielding_lead_equivalent": { "value": "3.0 mm Pb", "unit": "", "label": "推荐铅屏蔽当量" }
      }
    },
    "features": [
      "Photon-counting detector",
      "Deep Silicon detector",
      "8-bin energy resolution",
      "Always-on spectral",
      "NVIDIA accelerated computing"
    ],
    "fda_510k_number": "K253520",
    "clinical_trials": []
  },
  {
    "id": "ct_united_uct_ultima",
    "manufacturer_id": "mfg_united",
    "model_name": "uCT Ultima",
    "category": "High-end",
    "release_year": 2025,
    "status": "active",
    "description": "China's first NMPA-approved photon-counting CT system, featuring a CZT-based semiconductor detector with 0.2 mm pixel pitch for ultra-high spatial resolution and massive dose reduction.",
    "specifications": {
      "物理几何与机械参数 (Physical Geometry)": {
        "bore_size": { "value": 82, "unit": "cm", "label": "机架孔径" },
        "rotation_speed": { "value": 0.25, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 300, "unit": "kg", "label": "最大承重" },
        "gantry_tilt": { "value": 0, "unit": "°", "label": "物理倾角" },
        "scan_range": { "value": 2000, "unit": "mm", "label": "最大扫描范围" },
        "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" },
        "lateral_slide_range": { "value": null, "unit": "", "label": "床面横向滑动范围" }
      },
      "成像链与物理硬件 (Imaging Chain)": {
        "detector_material": { "value": "CZT (碲锌镉半导体)", "unit": "", "label": "探测器材料" },
        "detector_z_coverage": { "value": 80, "unit": "mm", "label": "单圈探测器覆盖" },
        "physical_detector_rows": { "value": null, "unit": "", "label": "物理探测器排数" },
        "max_reconstructed_slices": { "value": null, "unit": "", "label": "重建层数" },
        "x_ray_tube_model": { "value": "uTube PCCT", "unit": "", "label": "球管型号" },
        "anode_heat_capacity_physical": { "value": 0, "unit": "MHU", "label": "物理阳极热容量" },
        "anode_heat_capacity_equivalent": { "value": 120, "unit": "MHU", "label": "等效阳极热容量" },
        "cooling_system_type": { "value": "Liquid metal bearing water-cooled", "unit": "", "label": "球管冷却工程机制" },
        "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "热流量" },
        "max_generator_power": { "value": 120, "unit": "kW", "label": "发生器最大功率" },
        "generator_power_single": { "value": 120, "unit": "kW", "label": "单发生器功率" },
        "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
        "kv_steps": { "value": 10, "unit": "kV", "label": "电压调节间隔" },
        "temporal_resolution": { "value": 25, "unit": "ms", "label": "单扇区时间分辨率" },
        "channels_per_row": { "value": 960, "unit": "channels", "label": "单排采样通道数" },
        "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "投影采样率" }
      },
      "软件与算法代偿 (Software & Algorithms)": {
        "dose_modulation_tech": { "value": "uDose 三维剂量智能控制", "unit": "", "label": "智能剂量调制技术" },
        "iterative_reconstruction_algorithm": { "value": "uCAR (光子计数混合迭代)", "unit": "", "label": "迭代重建算法" },
        "deep_learning_reconstruction": { "value": "uLearn ClearInfinity-PCCT", "unit": "", "label": "深度学习重建算法" },
        "spectral_imaging_mechanism": { "value": "CZT Photon Counting Detector (Multi-energy Binning)", "unit": "", "label": "能谱/光谱成像技术路径" }
      },
      "图像质量与物理实测 (Image Quality)": {
        "spatial_resolution_advertised": { "value": null, "unit": "", "label": "商业宣传最高对比分辨率" },
        "spatial_resolution_acr_mtf10": { "value": 18, "unit": "lp/cm", "label": "ACR 464 模体 10% MTF 空间分辨率" },
        "low_contrast_resolution_acr": { "value": "1.5 mm @ 0.3%", "unit": "", "label": "ACR 464 模体低对比分辨率" },
        "recon_speed": { "value": 60, "unit": "fps", "label": "重建速度" }
      },
      "场地建设与配电要求 (Site Requirements)": {
        "electrical_requirement": { "value": "380V/480V, 3-Phase", "unit": "", "label": "配电要求" },
        "heat_dissipation_hvac": { "value": "24 kW", "unit": "", "label": "暖通空调冷量要求" },
        "shielding_lead_equivalent": { "value": "3.0 mm Pb", "unit": "", "label": "推荐铅屏蔽当量" }
      }
    },
    "features": [
      "Photon-counting detector",
      "0.2 mm pixel size",
      "CZT detector material",
      "Full-collimation coverage",
      "Zero electronic noise"
    ],
    "fda_510k_number": "",
    "clinical_trials": []
  },
  {
    "id": "ct_canon_ultimion",
    "manufacturer_id": "mfg_canon",
    "model_name": "Ultimion",
    "category": "High-end",
    "release_year": 2026,
    "status": "active",
    "description": "Canon's first CZT-based photon-counting CT system, integrating Redlen semiconductor CZT detector modules with INSTINX AI-driven workflow optimization.",
    "specifications": {
      "物理几何与机械参数 (Physical Geometry)": {
        "bore_size": { "value": 78, "unit": "cm", "label": "机架孔径" },
        "rotation_speed": { "value": 0.24, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 300, "unit": "kg", "label": "最大承重" },
        "gantry_tilt": { "value": 0, "unit": "°", "label": "物理倾角" },
        "scan_range": { "value": 2000, "unit": "mm", "label": "最大扫描范围" },
        "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" },
        "lateral_slide_range": { "value": null, "unit": "", "label": "床面横向滑动范围" }
      },
      "成像链与物理硬件 (Imaging Chain)": {
        "detector_material": { "value": "CZT (碲锌镉半导体 - PhotonClarity)", "unit": "", "label": "探测器材料" },
        "detector_z_coverage": { "value": 80, "unit": "mm", "label": "单圈探测器覆盖" },
        "physical_detector_rows": { "value": null, "unit": "", "label": "物理探测器排数" },
        "max_reconstructed_slices": { "value": null, "unit": "", "label": "重建层数" },
        "x_ray_tube_model": { "value": "PhotonClarity Tube", "unit": "", "label": "球管型号" },
        "anode_heat_capacity_physical": { "value": 0, "unit": "MHU", "label": "物理阳极热容量" },
        "anode_heat_capacity_equivalent": { "value": 120, "unit": "MHU", "label": "等效阳极热容量" },
        "cooling_system_type": { "value": "Air-cooled (No water chiller required)", "unit": "", "label": "球管冷却工程机制" },
        "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "热流量" },
        "max_generator_power": { "value": 100, "unit": "kW", "label": "发生器最大功率" },
        "generator_power_single": { "value": 100, "unit": "kW", "label": "单发生器功率" },
        "tube_current_max": { "value": 1000, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
        "kv_steps": { "value": 10, "unit": "kV", "label": "电压调节间隔" },
        "temporal_resolution": { "value": 66, "unit": "ms", "label": "单扇区时间分辨率" },
        "channels_per_row": { "value": 896, "unit": "channels", "label": "单排采样通道数" },
        "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "投影采样率" }
      },
      "软件与算法代偿 (Software & Algorithms)": {
        "dose_modulation_tech": { "value": "SUREExposure 3D 剂量控制", "unit": "", "label": "智能剂量调制技术" },
        "iterative_reconstruction_algorithm": { "value": "AIDR 3D (自适应迭代)", "unit": "", "label": "迭代重建算法" },
        "deep_learning_reconstruction": { "value": "PIQE 1024 / AiCE-PCCT (人工智能超分辨重建)", "unit": "", "label": "深度学习重建算法" },
        "spectral_imaging_mechanism": { "value": "CZT Photon Counting Detector (PhotonClarity)", "unit": "", "label": "能谱/光谱成像技术路径" }
      },
      "图像质量与物理实测 (Image Quality)": {
        "spatial_resolution_advertised": { "value": null, "unit": "", "label": "商业宣传最高对比分辨率" },
        "spatial_resolution_acr_mtf10": { "value": 17, "unit": "lp/cm", "label": "ACR 464 模体 10% MTF 空间分辨率" },
        "low_contrast_resolution_acr": { "value": "1.5 mm @ 0.3%", "unit": "", "label": "ACR 464 模体低对比分辨率" },
        "recon_speed": { "value": 60, "unit": "fps", "label": "重建速度" }
      },
      "场地建设与配电要求 (Site Requirements)": {
        "electrical_requirement": { "value": "480V, 3-Phase", "unit": "", "label": "配电要求" },
        "heat_dissipation_hvac": { "value": "20 kW", "unit": "", "label": "暖通空调冷量要求" },
        "shielding_lead_equivalent": { "value": "3.0 mm Pb", "unit": "", "label": "推荐铅屏蔽当量" }
      }
    },
    "features": [
      "Photon-counting detector",
      "CZT detector material",
      "PhotonClarity",
      "INSTINX AI workflow",
      "No water chiller required"
    ],
    "fda_510k_number": "",
    "clinical_trials": []
  },
  {
    "id": "ct_philips_spcct",
    "manufacturer_id": "mfg_philips",
    "model_name": "Philips SPCCT",
    "category": "High-end",
    "release_year": 2024,
    "status": "active",
    "description": "Philips' clinical Spectral Photon Counting CT prototype, using CZT detectors to provide energy-resolved spectral data and K-edge imaging capabilities.",
    "specifications": {
      "物理几何与机械参数 (Physical Geometry)": {
        "bore_size": { "value": 80, "unit": "cm", "label": "机架孔径" },
        "rotation_speed": { "value": 0.27, "unit": "s", "label": "最快转速" },
        "table_load_capacity": { "value": 300, "unit": "kg", "label": "最大承重" },
        "gantry_tilt": { "value": 0, "unit": "°", "label": "物理倾角" },
        "scan_range": { "value": 2000, "unit": "mm", "label": "最大扫描范围" },
        "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" },
        "lateral_slide_range": { "value": null, "unit": "", "label": "床面横向滑动范围" }
      },
      "成像链与物理硬件 (Imaging Chain)": {
        "detector_material": { "value": "CZT (碲锌镉半导体)", "unit": "", "label": "探测器材料" },
        "detector_z_coverage": { "value": 80, "unit": "mm", "label": "单圈探测器覆盖" },
        "physical_detector_rows": { "value": null, "unit": "", "label": "物理探测器排数" },
        "max_reconstructed_slices": { "value": null, "unit": "", "label": "重建层数" },
        "x_ray_tube_model": { "value": "Philips SPCCT Tube", "unit": "", "label": "球管型号" },
        "anode_heat_capacity_physical": { "value": 0, "unit": "MHU", "label": "物理阳极热容量" },
        "anode_heat_capacity_equivalent": { "value": 100, "unit": "MHU", "label": "等效阳极热容量" },
        "cooling_system_type": { "value": "Liquid metal bearing water-cooled", "unit": "", "label": "球管冷却工程机制" },
        "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "热流量" },
        "max_generator_power": { "value": 100, "unit": "kW", "label": "发生器最大功率" },
        "generator_power_single": { "value": 100, "unit": "kW", "label": "单发生器功率" },
        "tube_current_max": { "value": 1000, "unit": "mA", "label": "最大管电流" },
        "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
        "kv_steps": { "value": 10, "unit": "kV", "label": "电压调节间隔" },
        "temporal_resolution": { "value": 135, "unit": "ms", "label": "单扇区时间分辨率" },
        "channels_per_row": { "value": 896, "unit": "channels", "label": "单排采样通道数" },
        "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "投影采样率" }
      },
      "软件与算法代偿 (Software & Algorithms)": {
        "dose_modulation_tech": { "value": "DoseRight 智能管电流控制", "unit": "", "label": "智能剂量调制技术" },
        "iterative_reconstruction_algorithm": { "value": "IMR (全模型迭代)", "unit": "", "label": "迭代重建算法" },
        "deep_learning_reconstruction": { "value": "Precise Image Deep Learning", "unit": "", "label": "深度学习重建算法" },
        "spectral_imaging_mechanism": { "value": "CZT Photon Counting Detector (Always-on Spectral)", "unit": "", "label": "能谱/光谱成像技术路径" }
      },
      "图像质量与物理实测 (Image Quality)": {
        "spatial_resolution_advertised": { "value": null, "unit": "", "label": "商业宣传最高对比分辨率" },
        "spatial_resolution_acr_mtf10": { "value": 15, "unit": "lp/cm", "label": "ACR 464 模体 10% MTF 空间分辨率" },
        "low_contrast_resolution_acr": { "value": "1.5 mm @ 0.3%", "unit": "", "label": "ACR 464 模体低对比分辨率" },
        "recon_speed": { "value": 60, "unit": "fps", "label": "重建速度" }
      },
      "场地建设与配电要求 (Site Requirements)": {
        "electrical_requirement": { "value": "480V, 3-Phase", "unit": "", "label": "配电要求" },
        "heat_dissipation_hvac": { "value": "24 kW", "unit": "", "label": "暖通空调冷量要求" },
        "shielding_lead_equivalent": { "value": "3.0 mm Pb", "unit": "", "label": "推荐铅屏蔽当量" }
      }
    },
    "features": [
      "Photon-counting detector",
      "CZT detector material",
      "Always-on spectral",
      "K-edge imaging"
    ],
    "fda_510k_number": "",
    "clinical_trials": []
  }
];

let addedCount = 0;
newPCCTs.forEach(newP => {
  const exists = products.some(p => p.id === newP.id);
  if (!exists) {
    products.push(newP);
    addedCount++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log(`Successfully added ${addedCount} new photon counting CT scanners to products.json.`);
