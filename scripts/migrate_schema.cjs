const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Helper to safely extract deep fields from old categories
function findOldSpec(specs, key) {
    for (const catName in specs) {
        if (specs[catName] && specs[catName][key] !== undefined) {
            return specs[catName][key];
        }
    }
    return null;
}

const migratedProducts = products.map(p => {
    const specs = p.specifications || {};

    // 1. Resolve Rows vs Slices
    const oldDetectorRows = findOldSpec(specs, 'detector_rows');
    const oldPhysicalRows = findOldSpec(specs, 'physical_rows');

    let physicalRowsVal = null;
    let physicalRowsUnit = 'rows';
    let physicalRowsLabel = '物理探测器排数';

    let reconSlicesVal = null;
    let reconSlicesUnit = 'slices';
    let reconSlicesLabel = '最大重建层数';

    if (oldPhysicalRows) {
        physicalRowsVal = oldPhysicalRows.value;
        physicalRowsUnit = oldPhysicalRows.unit || 'rows';
        physicalRowsLabel = oldPhysicalRows.label || '物理探测器排数';
    }

    if (oldDetectorRows) {
        if (oldDetectorRows.label === '重建层数' || oldDetectorRows.unit === 'slices') {
            reconSlicesVal = oldDetectorRows.value;
            reconSlicesUnit = oldDetectorRows.unit || 'slices';
            reconSlicesLabel = oldDetectorRows.label || '最大重建层数';
        } else {
            // If it was labeled detector rows, treat it as physical rows if not set
            if (physicalRowsVal === null) {
                physicalRowsVal = oldDetectorRows.value;
                physicalRowsUnit = oldDetectorRows.unit || 'rows';
                physicalRowsLabel = oldDetectorRows.label || '物理探测器排数';
            } else {
                reconSlicesVal = oldDetectorRows.value;
            }
        }
    }

    // Default fallbacks for slices if only rows were specified
    if (reconSlicesVal === null && physicalRowsVal !== null) {
        // Many systems reconstruct the same number of slices as rows by default
        reconSlicesVal = physicalRowsVal;
    }

    // 2. Resolve Tube Anode Heat Capacity
    const oldAnode = findOldSpec(specs, 'anode_heat_capacity');
    let physicalAnodeVal = null;
    let equivalentAnodeVal = null;
    let coolingTypeVal = null;

    if (oldAnode) {
        const val = oldAnode.value;
        const label = oldAnode.label || '';
        if (val === 0 || label.includes('直接水冷') || label.includes('水冷')) {
            physicalAnodeVal = 0;
            coolingTypeVal = 'Water-cooled';
        } else if (val >= 20) {
            // Usually 20+ MHU is equivalent/advertised
            equivalentAnodeVal = val;
            // Let's see if we can guess the physical value
            if (p.model_name.includes('Force') || p.model_name.includes('Alpha')) {
                physicalAnodeVal = 0; // Directly water cooled Vectron
                coolingTypeVal = 'Water-cooled';
            } else if (p.model_name.includes('Apex') || p.id.includes('uct_960')) {
                equivalentAnodeVal = 30;
                physicalAnodeVal = null; // To be filled by enrichment
            }
        } else {
            physicalAnodeVal = val;
        }
    }

    // 3. Extract other specs
    const oldBore = findOldSpec(specs, 'bore_size');
    const oldRot = findOldSpec(specs, 'rotation_speed');
    const oldTableLoad = findOldSpec(specs, 'table_load_capacity');
    const oldGantryTilt = findOldSpec(specs, 'gantry_tilt');
    const oldScanRange = findOldSpec(specs, 'scan_range');
    const oldMaxScanSpeed = findOldSpec(specs, 'max_scan_speed');
    const oldTemporal = findOldSpec(specs, 'temporal_resolution');
    const oldPower = findOldSpec(specs, 'generator_power');
    const oldPowerSingle = findOldSpec(specs, 'generator_power_single');
    const oldTubeType = findOldSpec(specs, 'tube_type');
    const oldTubeCurrent = findOldSpec(specs, 'tube_current_max');
    const oldCoolingRate = findOldSpec(specs, 'cooling_rate');
    const oldDetectorType = findOldSpec(specs, 'detector_type');
    const oldZCoverage = findOldSpec(specs, 'z_coverage');
    const oldChannels = findOldSpec(specs, 'channels_per_row');
    const oldAcqRate = findOldSpec(specs, 'data_acquisition_rate');
    const oldSpatial = findOldSpec(specs, 'spatial_resolution');
    const oldLowContrast = findOldSpec(specs, 'low_contrast');
    const oldReconSpeed = findOldSpec(specs, 'recon_speed');
    const oldMinKv = findOldSpec(specs, 'min_kv');
    const oldKvSteps = findOldSpec(specs, 'kv_steps');

    // 4. Construct new standard specifications object
    const newSpecifications = {
        "物理几何与机械参数 (Physical Geometry)": {
            "bore_size": oldBore ? { value: oldBore.value, unit: oldBore.unit || 'cm', label: oldBore.label || '孔径' } : null,
            "rotation_speed": oldRot ? { value: oldRot.value, unit: oldRot.unit || 's', label: oldRot.label || '最快转速' } : null,
            "table_load_capacity": oldTableLoad ? { value: oldTableLoad.value, unit: oldTableLoad.unit || 'kg', label: oldTableLoad.label || '最大承重' } : null,
            "gantry_tilt": oldGantryTilt ? { value: oldGantryTilt.value, unit: oldGantryTilt.unit || '°', label: oldGantryTilt.label || '机架倾角' } : null,
            "scan_range": oldScanRange ? { value: oldScanRange.value, unit: oldScanRange.unit || 'mm', label: oldScanRange.label || '最长扫描范围' } : null,
            "max_scan_speed": oldMaxScanSpeed ? { value: oldMaxScanSpeed.value, unit: oldMaxScanSpeed.unit || 'mm/s', label: oldMaxScanSpeed.label || '最大扫描速度' } : null,
            "lateral_slide_range": null // New field
        },
        "成像链与物理硬件 (Imaging Chain)": {
            "detector_material": oldDetectorType ? { value: oldDetectorType.value, unit: oldDetectorType.unit || '', label: oldDetectorType.label || '探测器材质' } : null,
            "detector_z_coverage": oldZCoverage ? { value: oldZCoverage.value, unit: oldZCoverage.unit || 'mm', label: oldZCoverage.label || 'Z轴物理覆盖' } : null,
            "physical_detector_rows": physicalRowsVal !== null ? { value: physicalRowsVal, unit: physicalRowsUnit, label: physicalRowsLabel } : null,
            "max_reconstructed_slices": reconSlicesVal !== null ? { value: reconSlicesVal, unit: reconSlicesUnit, label: reconSlicesLabel } : null,
            "x_ray_tube_model": oldTubeType ? { value: oldTubeType.value, unit: oldTubeType.unit || '', label: oldTubeType.label || '球管类型' } : null,
            "anode_heat_capacity_physical": physicalAnodeVal !== null ? { value: physicalAnodeVal, unit: 'MHU', label: '物理阳极热容量' } : null,
            "anode_heat_capacity_equivalent": equivalentAnodeVal !== null ? { value: equivalentAnodeVal, unit: 'MHU', label: '等效阳极热容量' } : null,
            "cooling_system_type": coolingTypeVal ? { value: coolingTypeVal, unit: '', label: '冷却系统类型' } : null,
            "cooling_rate": oldCoolingRate ? { value: oldCoolingRate.value, unit: oldCoolingRate.unit || 'kHU/min', label: oldCoolingRate.label || '散热率' } : null,
            "max_generator_power": oldPower ? { value: oldPower.value, unit: oldPower.unit || 'kW', label: oldPower.label || '发生器功率' } : null,
            "generator_power_single": oldPowerSingle ? { value: oldPowerSingle.value, unit: oldPowerSingle.unit || 'kW', label: oldPowerSingle.label || '单侧发生器功率' } : null,
            "tube_current_max": oldTubeCurrent ? { value: oldTubeCurrent.value, unit: oldTubeCurrent.unit || 'mA', label: oldTubeCurrent.label || '最大管电流' } : null,
            "min_kv": oldMinKv ? { value: oldMinKv.value, unit: oldMinKv.unit || 'kV', label: oldMinKv.label || '最低管电压' } : null,
            "kv_steps": oldKvSteps ? { value: oldKvSteps.value, unit: oldKvSteps.unit || 'kV', label: oldKvSteps.label || 'kV 调节步进' } : null,
            "temporal_resolution": oldTemporal ? { value: oldTemporal.value, unit: oldTemporal.unit || 'ms', label: oldTemporal.label || '时间分辨率' } : null,
            "channels_per_row": oldChannels ? { value: oldChannels.value, unit: oldChannels.unit || 'channels', label: oldChannels.label || '每排通道数' } : null,
            "data_acquisition_rate": oldAcqRate ? { value: oldAcqRate.value, unit: oldAcqRate.unit || 'views/rot', label: oldAcqRate.label || '最高采样率' } : null
        },
        "软件与算法代偿 (Software & Algorithms)": {
            "dose_modulation_tech": null,
            "iterative_reconstruction_algorithm": null,
            "deep_learning_reconstruction": null,
            "spectral_imaging_mechanism": null
        },
        "图像质量与物理实测 (Image Quality)": {
            "spatial_resolution_advertised": oldSpatial ? { value: oldSpatial.value, unit: oldSpatial.unit || 'lp/cm', label: oldSpatial.label || '高对比分辨率' } : null,
            "spatial_resolution_acr_mtf10": null,
            "low_contrast_resolution_acr": oldLowContrast ? { value: oldLowContrast.value, unit: oldLowContrast.unit || 'mm @ 0.3%', label: oldLowContrast.label || '低对比分辨率' } : null,
            "recon_speed": oldReconSpeed ? { value: oldReconSpeed.value, unit: oldReconSpeed.unit || 'fps', label: oldReconSpeed.label || '最快重建速度' } : null
        },
        "场地建设与配电要求 (Site Requirements)": {
            "electrical_requirement": null,
            "heat_dissipation_hvac": null,
            "shielding_lead_equivalent": null
        }
    };

    // Clean null leaf specifications to save database space or keep them as null to show completeness
    // We choose to clean the entirely null values to keep it readable, but retain the key structure.
    for (const catName in newSpecifications) {
        for (const key in newSpecifications[catName]) {
            if (newSpecifications[catName][key] === null) {
                // Keep it, but we can set value to null/— for frontend display
                newSpecifications[catName][key] = { value: null, unit: '', label: key };
            }
        }
    }

    // Set custom labels for newly added/unknown keys to make them human-readable
    const labelOverrides = {
        "lateral_slide_range": "检查床横向滑动位移",
        "anode_heat_capacity_physical": "物理阳极热容量",
        "anode_heat_capacity_equivalent": "等效阳极热容量",
        "cooling_system_type": "球管冷却工程机制",
        "dose_modulation_tech": "剂量调制技术名称",
        "iterative_reconstruction_algorithm": "混合/模型迭代重建算法",
        "deep_learning_reconstruction": "深度学习重建算法",
        "spectral_imaging_mechanism": "能谱/光谱成像技术路径",
        "spatial_resolution_advertised": "彩页标称高对比分辨率",
        "spatial_resolution_acr_mtf10": "ACR 464 实测 MTF 10% 分辨率",
        "low_contrast_resolution_acr": "ACR 464 实测低对比分辨率",
        "electrical_requirement": "电网配电要求",
        "heat_dissipation_hvac": "扫描间HVAC最小制冷负荷",
        "shielding_lead_equivalent": "推荐防护铅当量"
    };

    for (const catName in newSpecifications) {
        for (const key in newSpecifications[catName]) {
            if (labelOverrides[key]) {
                newSpecifications[catName][key].label = labelOverrides[key];
            }
        }
    }

    return {
        ...p,
        specifications: newSpecifications
    };
});

fs.writeFileSync(dataPath, JSON.stringify(migratedProducts, null, 2));
console.log(`Successfully migrated ${migratedProducts.length} products to the new standardized schema.`);
