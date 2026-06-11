const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const enrichments = {
  "ct_siemens_naeotom_alpha": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 82, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.25, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 307, "unit": "kg", "label": "检查床最大承重" },
      "gantry_tilt": { "value": 0, "unit": "°", "label": "机架倾角" },
      "scan_range": { "value": 2000, "unit": "mm", "label": "最长扫描范围" },
      "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" },
      "lateral_slide_range": { "value": 0, "unit": "cm", "label": "检查床横向滑动位移" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "QuantaMax (CdTe直接转换半导体)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 57.6, "unit": "mm", "label": "单侧Z轴物理覆盖" },
      "physical_detector_rows": { "value": 144, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 288, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "2x Vectron", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 7.0, "unit": "MHU", "label": "物理阳极热容量" },
      "anode_heat_capacity_equivalent": { "value": 120.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled (外部冷水机组)", "unit": "", "label": "球管冷却工程机制" },
      "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "散热率" },
      "max_generator_power": { "value": 240, "unit": "kW", "label": "总发生器功率" },
      "generator_power_single": { "value": 120, "unit": "kW", "label": "单侧发生器功率" },
      "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
      "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
      "kv_steps": { "value": 10, "unit": "kV", "label": "kV 调节步进" },
      "temporal_resolution": { "value": 66, "unit": "ms", "label": "时间分辨率" },
      "channels_per_row": { "value": 926, "unit": "channels", "label": "每排通道数" },
      "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "最高采样率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "CARE Dose4D", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "SAFIRE", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "Quantum HD (0.2mm超清重建)", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Photon Counting (纯物理光子计数能量阈值分档)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "30 lp/cm @ 0% MTF", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 24, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "1.5 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" },
      "recon_speed": { "value": 60, "unit": "fps", "label": "最快重建速度" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "380-480V, 3-Phase (无中线)", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "25 kW (扫描间独立精密空调)", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "2.5 mm Pb", "unit": "", "label": "推荐防护铅当量" }
    }
  },
  "ct_siemens_somatom_force": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 78, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.25, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 307, "unit": "kg", "label": "检查床最大承重" },
      "gantry_tilt": { "value": 30, "unit": "°", "label": "机架倾角" },
      "scan_range": { "value": 2000, "unit": "mm", "label": "最长扫描范围" },
      "max_scan_speed": { "value": 737, "unit": "mm/s", "label": "最大扫描速度" },
      "lateral_slide_range": { "value": 0, "unit": "cm", "label": "检查床横向滑动位移" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "StellarInfinity (硫氧化钆 GOS 闪烁晶体)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 57.6, "unit": "mm", "label": "单侧Z轴物理覆盖" },
      "physical_detector_rows": { "value": 192, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 384, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "2x Vectron", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 0, "unit": "MHU", "label": "物理阳极热容量 (直接水冷靶=0)" },
      "anode_heat_capacity_equivalent": { "value": 120.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled (闭式双回路外部冷水机组)", "unit": "", "label": "球管冷却工程机制" },
      "cooling_rate": { "value": 5000, "unit": "kHU/min", "label": "散热率" },
      "max_generator_power": { "value": 240, "unit": "kW", "label": "总发生器功率" },
      "generator_power_single": { "value": 120, "unit": "kW", "label": "单侧发生器功率" },
      "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
      "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
      "kv_steps": { "value": 10, "unit": "kV", "label": "kV 调节步进" },
      "temporal_resolution": { "value": 66, "unit": "ms", "label": "时间分辨率" },
      "channels_per_row": { "value": 926, "unit": "channels", "label": "每排通道数" },
      "data_acquisition_rate": { "value": 4608, "unit": "views/rot", "label": "最高采样率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "CARE Dose4D / CARE kV 智能曝光", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "SAFIRE / ADMIRE (基于原始数据的迭代)", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "myExam Companion (AI辅助参数设定)", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Dual Source Split Filter (双源呈90度夹角，配有锡滤过板)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "30 lp/cm @ 0% MTF", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 15, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "2.0 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" },
      "recon_speed": { "value": 60, "unit": "fps", "label": "最快重建速度" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "380-480V, 3-Phase (需低电网阻抗以防曝光瞬间压降)", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "28 kW (整机+冷却回流散热负荷)", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "2.5 mm Pb", "unit": "", "label": "推荐防护铅当量" }
    }
  },
  "ct_ge_revolution_apex_elite": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 80, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.23, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 306, "unit": "kg", "label": "检查床最大承重" },
      "gantry_tilt": { "value": 0, "unit": "°", "label": "机架倾角" },
      "max_scan_speed": { "value": 437, "unit": "mm/s", "label": "最大扫描速度" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "Gemstone Clarity (高时间常数石榴石闪烁体)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 160.0, "unit": "mm", "label": "Z轴物理覆盖" },
      "physical_detector_rows": { "value": 256, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 512, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "Quantix 160 (液态金属轴承球管)", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 8.0, "unit": "MHU", "label": "物理阳极热容量" },
      "anode_heat_capacity_equivalent": { "value": 30.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled (冷却套件循环)", "unit": "", "label": "球管冷却工程机制" },
      "cooling_rate": { "value": 3400, "unit": "kHU/min", "label": "散热率" },
      "max_generator_power": { "value": 130, "unit": "kW", "label": "总发生器功率" },
      "tube_current_max": { "value": 1300, "unit": "mA", "label": "最大管电流" },
      "min_kv": { "value": 70, "unit": "kV", "label": "最低管电压" },
      "temporal_resolution": { "value": 29, "unit": "ms", "label": "时间分辨率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "Smart mA / Organ Dose Modulation (ODM)", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "ASiR-V", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "TrueFidelity DL (基于深度神经网络的原始数据重建)", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Fast kVp Switching (双能快速毫秒级管电压切换)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "23 lp/cm", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 16, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "2.0 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" },
      "recon_speed": { "value": 60, "unit": "fps", "label": "最快重建速度" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "480V, 3-Phase (需配备Power Xtream变压器配电柜)", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "22 kW", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "3.0 mm Pb (由于160mm大开口散射线较多)", "unit": "", "label": "推荐防护铅当量" }
    }
  },
  "ct_philips_spectral_7500": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 80, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.27, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 306, "unit": "kg", "label": "检查床最大承重" },
      "max_scan_speed": { "value": 200, "unit": "mm/s", "label": "最大扫描速度" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "NanoPanel Prism (双层三维空间闪烁体晶体)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 80.0, "unit": "mm", "label": "Z轴物理覆盖" },
      "physical_detector_rows": { "value": 256, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 512, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "vMRC (无摩擦液体金属轴承球管)", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 8.0, "unit": "MHU", "label": "物理阳极热容量" },
      "anode_heat_capacity_equivalent": { "value": 30.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled (双循环精密闭式水冷)", "unit": "", "label": "球管冷却工程机制" },
      "max_generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" },
      "tube_current_max": { "value": 1000, "unit": "mA", "label": "最大管电流" },
      "min_kv": { "value": 80, "unit": "kV", "label": "最低管电压" },
      "temporal_resolution": { "value": 135, "unit": "ms", "label": "时间分辨率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "DoseRight 智能管电流控制", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "iDose4 (混合迭代) / O-MAR (金属伪影消除)", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "Precise Image AI (基于人工智能的降噪与细节复原)", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Dual-layer Spectral Detector (双层探测器分层物理吸收光谱技术)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "22 lp/cm", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 14, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "2.0 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" },
      "recon_speed": { "value": 40, "unit": "fps", "label": "最快重建速度" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "480V, 3-Phase", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "24 kW", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "2.5 mm Pb", "unit": "", "label": "推荐防护铅当量" }
    }
  },
  "ct_canon_aquilion_one_prism": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 78, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.275, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 315, "unit": "kg", "label": "检查床最大承重" },
      "max_scan_speed": { "value": 160, "unit": "mm/s", "label": "最大扫描速度" },
      "lateral_slide_range": { "value": 17, "unit": "cm", "label": "检查床横向滑动位移" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "PUREVision (固态高量子效率闪烁体阵列)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 160.0, "unit": "mm", "label": "Z轴物理覆盖" },
      "physical_detector_rows": { "value": 320, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 640, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "CoolNovus / Megacool (极限冷却靶心)", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 7.5, "unit": "MHU", "label": "物理阳极热容量" },
      "anode_heat_capacity_equivalent": { "value": 30.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled (高排热冷却通道)", "unit": "", "label": "球管冷却工程机制" },
      "max_generator_power": { "value": 100, "unit": "kW", "label": "总发生器功率" },
      "tube_current_max": { "value": 1000, "unit": "mA", "label": "最大管电流" },
      "temporal_resolution": { "value": 135, "unit": "ms", "label": "时间分辨率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "SUREExposure 3D 智能剂量调配", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "FIRST (基于正投影和反投影的双域全模型迭代重建)", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "PIQE 1024 / AiCE (超高空间分辨率人工智能重建)", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Deep Learning Spectral / Fast kVp Switching (结合AI解析的能谱重构)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "24 lp/cm", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 17, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "1.8 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" },
      "recon_speed": { "value": 70, "unit": "fps", "label": "最快重建速度" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "480V, 3-Phase", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "20 kW", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "3.0 mm Pb (超宽Z轴几何下的球管散射吸收防护)", "unit": "", "label": "推荐防护铅当量" }
    }
  },
  "ct_united_uct_960_plus": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 82, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.235, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 318, "unit": "kg", "label": "检查床最大承重" },
      "gantry_tilt": { "value": 30, "unit": "°", "label": "机架倾角" },
      "max_scan_speed": { "value": 400, "unit": "mm/s", "label": "最大扫描速度" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "Z-Detector (固态高保真三维集成探测器)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 160.0, "unit": "mm", "label": "Z轴物理覆盖" },
      "physical_detector_rows": { "value": 320, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 640, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "Liquid Metal Bearing Tube (镓铟锡液态轴承)", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 8.0, "unit": "MHU", "label": "物理阳极热容量" },
      "anode_heat_capacity_equivalent": { "value": 30.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled (高负荷循环水冷)", "unit": "", "label": "球管冷却工程机制" },
      "max_generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" },
      "tube_current_max": { "value": 1500, "unit": "mA", "label": "最大管电流" },
      "temporal_resolution": { "value": 25, "unit": "ms", "label": "时间分辨率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "uDose 三维剂量智能控制", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "KARL 3D 迭代降噪重建", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "uAI Cardio Capture / uAI Vision AI辅助冠脉纠偏及降噪", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Fast kVp Switching / Dual Energy (结合深度学习的单源能谱重构)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "21 lp/cm", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 14, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "2.0 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "380V, 3-Phase", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "26 kW", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "3.0 mm Pb", "unit": "", "label": "推荐防护铅当量" }
    }
  },
  "ct_neusoft_neuviz_epoch": {
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 78, "unit": "cm", "label": "机架孔径" },
      "rotation_speed": { "value": 0.259, "unit": "s", "label": "最快转速" },
      "table_load_capacity": { "value": 300, "unit": "kg", "label": "检查床最大承重" }
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_material": { "value": "GOS (配有3D打印高精度钨Shadow栅格)", "unit": "", "label": "探测器材质" },
      "detector_z_coverage": { "value": 160.0, "unit": "mm", "label": "Z轴物理覆盖" },
      "physical_detector_rows": { "value": 256, "unit": "rows", "label": "物理探测器排数" },
      "max_reconstructed_slices": { "value": 512, "unit": "slices", "label": "单圈最大重建切片数" },
      "x_ray_tube_model": { "value": "Liquid Metal Bearing Tube (液态金属轴承)", "unit": "", "label": "球管类型" },
      "anode_heat_capacity_physical": { "value": 8.0, "unit": "MHU", "label": "物理阳极热容量" },
      "anode_heat_capacity_equivalent": { "value": 30.0, "unit": "MHU", "label": "等效阳极热容量" },
      "cooling_system_type": { "value": "Water-cooled", "unit": "", "label": "球管冷却工程机制" },
      "max_generator_power": { "value": 120, "unit": "kW", "label": "总发生器功率" },
      "temporal_resolution": { "value": 125, "unit": "ms", "label": "时间分辨率" }
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "O-Dose 智能曝光匹配", "unit": "", "label": "剂量调制技术名称" },
      "iterative_reconstruction_algorithm": { "value": "Space IR 双域迭代重建", "unit": "", "label": "混合/模型迭代重建算法" },
      "deep_learning_reconstruction": { "value": "ClearInfinity AI (人工智能神经网络优化)", "unit": "", "label": "深度学习重建算法" },
      "spectral_imaging_mechanism": { "value": "Dual Energy (双能快速切换与基物质解析)", "unit": "", "label": "能谱/光谱成像技术路径" }
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_advertised": { "value": "20 lp/cm", "unit": "", "label": "彩页标称高对比分辨率" },
      "spatial_resolution_acr_mtf10": { "value": 13, "unit": "lp/cm", "label": "ACR 464 实测 MTF 10% 分辨率" },
      "low_contrast_resolution_acr": { "value": "2.2 mm @ 0.3%", "unit": "", "label": "ACR 464 实测低对比分辨率" }
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "380V, 3-Phase", "unit": "", "label": "电网配电要求" },
      "heat_dissipation_hvac": { "value": "22 kW", "unit": "", "label": "扫描间HVAC最小制冷负荷" },
      "shielding_lead_equivalent": { "value": "3.0 mm Pb", "unit": "", "label": "推荐防护铅当量" }
    }
  }
};

let enrichedCount = 0;
products.forEach(p => {
  if (enrichments[p.id]) {
    const data = enrichments[p.id];
    for (const catName in data) {
      if (!p.specifications[catName]) {
        p.specifications[catName] = {};
      }
      for (const key in data[catName]) {
        p.specifications[catName][key] = data[catName][key];
      }
    }
    enrichedCount++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log(`Successfully enriched ${enrichedCount} flagship products with deep physical and clinical specifications.`);
