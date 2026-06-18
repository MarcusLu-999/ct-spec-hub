# CT Specification Hub Database Changelog

This file documents all verified parameters, corrections, and enrichments applied to the database, ensuring clear traceability to official brochures, FDA 510(k) clearances, and registration data.

## Version 1.5.0-data-enrichment (2026-06-19 00:51:13)
**Summary**: Systematic enrichment of imaging chain and gantry specifications for Philips, Canon, United Imaging, and Neusoft CT models, and backfilled missing equivalent anode heat capacity and spectral path parameters for GE/Siemens.

### Detailed Changes

| Product Model | Parameter | Old Value | New Value | Source URL / Document |
| :--- | :--- | :--- | :--- | :--- |
| **Spectral CT 7500** | x_ray_tube_model (x_ray_tube_model) | `None` | `iMRC` | [Philips_Spectral_CT_7500_Brochure.pdf](https://www.philips.com) |
| **Spectral CT 7500** | detector_material (detector_material) | `None` | `Yttrium-based Garnet Scintillator (NanoPanel Prism)` | [Philips_Spectral_CT_7500_Brochure.pdf](https://www.philips.com) |
| **Spectral CT 7500** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `Precise Image` | [Philips_Spectral_CT_7500_Brochure.pdf](https://www.philips.com) |
| **Incisive CT** | x_ray_tube_model (x_ray_tube_model) | `None` | `vMRC` | [Philips_Incisive_CT_Brochure.pdf](https://www.philips.com) |
| **Incisive CT** | detector_material (detector_material) | `None` | `GOS (NanoPanel Elite)` | [Philips_Incisive_CT_Brochure.pdf](https://www.philips.com) |
| **Incisive CT** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `7.2` | [Philips_Incisive_CT_Brochure.pdf](https://www.philips.com) |
| **Incisive CT** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `Precise Image` | [Philips_Incisive_CT_Brochure.pdf](https://www.philips.com) |
| **Incisive CT** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [Philips_Incisive_CT_Brochure.pdf](https://www.philips.com) |
| **IQon Spectral CT** | x_ray_tube_model (x_ray_tube_model) | `None` | `iMRC` | [Philips_IQon_Spectral_CT_Brochure.pdf](https://www.philips.com) |
| **IQon Spectral CT** | detector_material (detector_material) | `None` | `Yttrium-based Garnet Scintillator (NanoPanel Prism)` | [Philips_IQon_Spectral_CT_Brochure.pdf](https://www.philips.com) |
| **IQon Spectral CT** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [Philips_IQon_Spectral_CT_Brochure.pdf](https://www.philips.com) |
| **IQon Spectral CT** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `None` | [Philips_IQon_Spectral_CT_Brochure.pdf](https://www.philips.com) |
| **Access CT** | x_ray_tube_model (x_ray_tube_model) | `None` | `CTR2150` | [Philips_Access_CT_Brochure.pdf](https://www.philips.com) |
| **Access CT** | detector_material (detector_material) | `None` | `GOS (NanoPanel)` | [Philips_Access_CT_Brochure.pdf](https://www.philips.com) |
| **Access CT** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `3.5` | [Philips_Access_CT_Brochure.pdf](https://www.philips.com) |
| **Access CT** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `不支持` | [Philips_Access_CT_Brochure.pdf](https://www.philips.com) |
| **Access CT** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [Philips_Access_CT_Brochure.pdf](https://www.philips.com) |
| **Aquilion ONE PRISM** | x_ray_tube_model (x_ray_tube_model) | `None` | `MCS-7078` | [Canon_Aquilion_ONE_PRISM_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE PRISM** | detector_material (detector_material) | `None` | `PUREViSION (GOS)` | [Canon_Aquilion_ONE_PRISM_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE PRISM** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `7.5` | [Canon_Aquilion_ONE_PRISM_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE GENESIS** | x_ray_tube_model (x_ray_tube_model) | `None` | `MCS-7078` | [Canon_Aquilion_ONE_GENESIS_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE GENESIS** | detector_material (detector_material) | `None` | `PUREViSION (GOS)` | [Canon_Aquilion_ONE_GENESIS_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE GENESIS** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `7.5` | [Canon_Aquilion_ONE_GENESIS_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE GENESIS** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `AiCE (基于人工智能的像素降噪与分辨率恢复)` | [Canon_Aquilion_ONE_GENESIS_Brochure.pdf](https://medical.canon) |
| **Aquilion ONE GENESIS** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换与基物质解析)` | [Canon_Aquilion_ONE_GENESIS_Brochure.pdf](https://medical.canon) |
| **Aquilion Prime SP** | x_ray_tube_model (x_ray_tube_model) | `None` | `MCS-7078` | [Canon_Aquilion_Prime_SP_Brochure.pdf](https://medical.canon) |
| **Aquilion Prime SP** | detector_material (detector_material) | `None` | `PUREViSION (GOS)` | [Canon_Aquilion_Prime_SP_Brochure.pdf](https://medical.canon) |
| **Aquilion Prime SP** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `7.5` | [Canon_Aquilion_Prime_SP_Brochure.pdf](https://medical.canon) |
| **Aquilion Prime SP** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `AiCE (基于人工智能的像素降噪与分辨率恢复)` | [Canon_Aquilion_Prime_SP_Brochure.pdf](https://medical.canon) |
| **Aquilion Prime SP** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换与基物质解析)` | [Canon_Aquilion_Prime_SP_Brochure.pdf](https://medical.canon) |
| **Aquilion Lightning** | x_ray_tube_model (x_ray_tube_model) | `None` | `MCS-6074` | [Canon_Aquilion_Lightning_Brochure.pdf](https://medical.canon) |
| **Aquilion Lightning** | detector_material (detector_material) | `None` | `PUREViSION (GOS)` | [Canon_Aquilion_Lightning_Brochure.pdf](https://medical.canon) |
| **Aquilion Lightning** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `5.0` | [Canon_Aquilion_Lightning_Brochure.pdf](https://medical.canon) |
| **Aquilion Lightning** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `AIDR 3D (自适应三维迭代降噪)` | [Canon_Aquilion_Lightning_Brochure.pdf](https://medical.canon) |
| **Aquilion Lightning** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [Canon_Aquilion_Lightning_Brochure.pdf](https://medical.canon) |
| **uCT 960+** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 80` | [United_Imaging_uCT_960_ATLAS_Brochure.pdf](https://www.united-imaging.com) |
| **uCT 960+** | detector_material (detector_material) | `None` | `Z-Detector (GOS)` | [United_Imaging_uCT_960_ATLAS_Brochure.pdf](https://www.united-imaging.com) |
| **uCT 960+** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_960_ATLAS_Brochure.pdf](https://www.united-imaging.com) |
| **uCT 960+** | 深度学习重建算法 (deep_learning_reconstruction) | `uAI Vision / uAI Cardio Capture AI纠偏与定位` | `uLearn ClearInfinity (人工智能神经网络降噪)` | [United_Imaging_uCT_960_ATLAS_Brochure.pdf](https://www.united-imaging.com) |
| **uCT 960+** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换)` | [United_Imaging_uCT_960_ATLAS_Brochure.pdf](https://www.united-imaging.com) |
| **uCT 860** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 80` | [United_Imaging_uCT_860_Specs.pdf](https://www.united-imaging.com) |
| **uCT 860** | detector_material (detector_material) | `None` | `Z-Detector (GOS)` | [United_Imaging_uCT_860_Specs.pdf](https://www.united-imaging.com) |
| **uCT 860** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [United_Imaging_uCT_860_Specs.pdf](https://www.united-imaging.com) |
| **uCT 860** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_860_Specs.pdf](https://www.united-imaging.com) |
| **uCT 860** | 深度学习重建算法 (deep_learning_reconstruction) | `uAI Vision / uAI Cardio Capture AI纠偏与定位` | `uLearn ClearInfinity (人工智能神经网络降噪)` | [United_Imaging_uCT_860_Specs.pdf](https://www.united-imaging.com) |
| **uCT 860** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换)` | [United_Imaging_uCT_860_Specs.pdf](https://www.united-imaging.com) |
| **uCT 780** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 80` | [United_Imaging_uCT_780_Specs.pdf](https://www.united-imaging.com) |
| **uCT 780** | detector_material (detector_material) | `None` | `Z-Detector (GOS)` | [United_Imaging_uCT_780_Specs.pdf](https://www.united-imaging.com) |
| **uCT 780** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [United_Imaging_uCT_780_Specs.pdf](https://www.united-imaging.com) |
| **uCT 780** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_780_Specs.pdf](https://www.united-imaging.com) |
| **uCT 780** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `uLearn ClearInfinity (人工智能神经网络降噪)` | [United_Imaging_uCT_780_Specs.pdf](https://www.united-imaging.com) |
| **uCT 780** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换)` | [United_Imaging_uCT_780_Specs.pdf](https://www.united-imaging.com) |
| **uCT 760** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 80` | [United_Imaging_uCT_760_Specs.pdf](https://www.united-imaging.com) |
| **uCT 760** | detector_material (detector_material) | `None` | `Z-Detector (GOS)` | [United_Imaging_uCT_760_Specs.pdf](https://www.united-imaging.com) |
| **uCT 760** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [United_Imaging_uCT_760_Specs.pdf](https://www.united-imaging.com) |
| **uCT 760** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_760_Specs.pdf](https://www.united-imaging.com) |
| **uCT 760** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `uLearn ClearInfinity (人工智能神经网络降噪)` | [United_Imaging_uCT_760_Specs.pdf](https://www.united-imaging.com) |
| **uCT 760** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换)` | [United_Imaging_uCT_760_Specs.pdf](https://www.united-imaging.com) |
| **uCT 528** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 50` | [United_Imaging_uCT_528_Specs.pdf](https://www.united-imaging.com) |
| **uCT 528** | detector_material (detector_material) | `None` | `Z-Detector (GOS)` | [United_Imaging_uCT_528_Specs.pdf](https://www.united-imaging.com) |
| **uCT 528** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `5.3` | [United_Imaging_uCT_528_Specs.pdf](https://www.united-imaging.com) |
| **uCT 528** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_528_Specs.pdf](https://www.united-imaging.com) |
| **uCT 528** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `不支持` | [United_Imaging_uCT_528_Specs.pdf](https://www.united-imaging.com) |
| **uCT 528** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [United_Imaging_uCT_528_Specs.pdf](https://www.united-imaging.com) |
| **uCT 520** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 50` | [United_Imaging_uCT_520_Specs.pdf](https://www.united-imaging.com) |
| **uCT 520** | detector_material (detector_material) | `None` | `Z-Detector (GOS)` | [United_Imaging_uCT_520_Specs.pdf](https://www.united-imaging.com) |
| **uCT 520** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `5.3` | [United_Imaging_uCT_520_Specs.pdf](https://www.united-imaging.com) |
| **uCT 520** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_520_Specs.pdf](https://www.united-imaging.com) |
| **uCT 520** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `不支持` | [United_Imaging_uCT_520_Specs.pdf](https://www.united-imaging.com) |
| **uCT 520** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [United_Imaging_uCT_520_Specs.pdf](https://www.united-imaging.com) |
| **uCT 550** | x_ray_tube_model (x_ray_tube_model) | `None` | `uTube 50` | [United_Imaging_uCT_550_Specs.pdf](https://www.united-imaging.com) |
| **uCT 550** | detector_material (detector_material) | `Z-Detector (完全集成集成电路设计)` | `Z-Detector (GOS)` | [United_Imaging_uCT_550_Specs.pdf](https://www.united-imaging.com) |
| **uCT 550** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `5.3` | [United_Imaging_uCT_550_Specs.pdf](https://www.united-imaging.com) |
| **uCT 550** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [United_Imaging_uCT_550_Specs.pdf](https://www.united-imaging.com) |
| **uCT 550** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [United_Imaging_uCT_550_Specs.pdf](https://www.united-imaging.com) |
| **NeuViz Epoch** | x_ray_tube_model (x_ray_tube_model) | `None` | `Neusoft Pano-spherical Tube (CoolGlide)` | [Neusoft_NeuViz_Epoch_Brochure.pdf](https://www.neusoftmedical.com) |
| **NeuViz Epoch** | detector_material (detector_material) | `None` | `GOS (Pano-spherical)` | [Neusoft_NeuViz_Epoch_Brochure.pdf](https://www.neusoftmedical.com) |
| **NeuViz Epoch** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [Neusoft_NeuViz_Epoch_Brochure.pdf](https://www.neusoftmedical.com) |
| **NeuViz Epoch** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换)` | [Neusoft_NeuViz_Epoch_Brochure.pdf](https://www.neusoftmedical.com) |
| **NeuViz Glory** | x_ray_tube_model (x_ray_tube_model) | `None` | `Neusoft Pano-spherical Tube (CoolGlide)` | [Neusoft_NeuViz_Glory_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz Glory** | detector_material (detector_material) | `None` | `GOS (Pano-spherical)` | [Neusoft_NeuViz_Glory_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz Glory** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [Neusoft_NeuViz_Glory_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz Glory** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `ClearInfinity AI (人工智能神经网络降噪)` | [Neusoft_NeuViz_Glory_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz Glory** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Dual Energy (双能高低电压切换)` | [Neusoft_NeuViz_Glory_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz 128** | x_ray_tube_model (x_ray_tube_model) | `None` | `Dunlee CTR22` | [Neusoft_NeuViz_128_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz 128** | detector_material (detector_material) | `None` | `GOS` | [Neusoft_NeuViz_128_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz 128** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `5.3` | [Neusoft_NeuViz_128_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz 128** | 球管冷却工程机制 (cooling_system_type) | `None` | `Water-cooled` | [Neusoft_NeuViz_128_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz 128** | 深度学习重建算法 (deep_learning_reconstruction) | `None` | `不支持` | [Neusoft_NeuViz_128_Specs.pdf](https://www.neusoftmedical.com) |
| **NeuViz 128** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [Neusoft_NeuViz_128_Specs.pdf](https://www.neusoftmedical.com) |
| **Revolution Ascend** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Revolution_Ascend_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Ascend** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Revolution_Ascend_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Maxima** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Revolution_Maxima_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Maxima** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Revolution_Maxima_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Aspire Plus** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Revolution_Aspire_Plus_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Aspire Plus** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Revolution_Aspire_Plus_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT660** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Optima_CT660_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT660** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Optima_CT660_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT520** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Optima_CT520_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT520** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Optima_CT520_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT620** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Optima_CT620_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT620** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Optima_CT620_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT670** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Optima_CT670_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT670** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Optima_CT670_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT680 Expert** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Optima_CT680_Brochure.pdf](https://www.gehealthcare.com) |
| **Optima CT680 Expert** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Optima_CT680_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Eagle** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30.0` | [GE_Revolution_Eagle_Brochure.pdf](https://www.gehealthcare.com) |
| **Revolution Eagle** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `不支持` | [GE_Revolution_Eagle_Brochure.pdf](https://www.gehealthcare.com) |
| **SOMATOM Pro.Pulse** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `13.5` | [Siemens_SOMATOM_ProPulse_Brochure.pdf](https://www.siemens-healthineers.com) |

---

## Version 1.4.0-spec-verification (2026-06-12 07:58:55)
**Summary**: Clean spec verification update: corrected 53 mismatches and backfilled 137 missing fields.

### Detailed Changes

| Product Model | Parameter | Old Value | New Value | Source URL / Document |
| :--- | :--- | :--- | :--- | :--- |
| **SOMATOM Force** | 机架倾角 (gantry_tilt) | `30` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-force) |
| **SOMATOM Force** | 探测器Z轴覆盖 (detector_z_coverage) | `58` | `57.6` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-force) |
| **SOMATOM X.cite** | 检查床最大承重 (table_load_capacity) | `None` | `307` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `120` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 发生器最大功率 (max_generator_power) | `100` | `105` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 最大管电流 (tube_current_max) | `1300` | `1200` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **SOMATOM X.cite** | 探测器Z轴覆盖 (detector_z_coverage) | `38` | `38.4` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xcite) |
| **NAEOTOM Alpha** | 探测器Z轴覆盖 (detector_z_coverage) | `60` | `57.6` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/photon-counting-ct/naeotom-alpha) |
| **NAEOTOM Alpha** | 物理探测器排数 (physical_detector_rows) | `576` | `288` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/photon-counting-ct/naeotom-alpha) |
| **NAEOTOM Alpha** | ACR 464 实测 MTF 10% 分辨率 (spatial_resolution_acr_mtf10) | `14` | `40` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/photon-counting-ct/naeotom-alpha) |
| **SOMATOM Pro.Pulse** | 检查床最大承重 (table_load_capacity) | `None` | `307` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Pro.Pulse** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Pro.Pulse** | 最长扫描范围 (scan_range) | `None` | `2080` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Pro.Pulse** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `7` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Pro.Pulse** | 发生器最大功率 (max_generator_power) | `160` | `150` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Pro.Pulse** | 探测器Z轴覆盖 (detector_z_coverage) | `38` | `38.4` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Pro.Pulse** | 单圈最大重建层数 (max_reconstructed_slices) | `128` | `256` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/dual-source-ct/somatom-pro-pulse) |
| **SOMATOM Drive** | 检查床最大承重 (table_load_capacity) | `None` | `307` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM Drive** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM Drive** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM Drive** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM Drive** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `50` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM Drive** | 发生器最大功率 (max_generator_power) | `160` | `200` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM Drive** | 探测器Z轴覆盖 (detector_z_coverage) | `38` | `38.4` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/dual-source-ct/somatom-drive) |
| **SOMATOM X.ceed** | 检查床最大承重 (table_load_capacity) | `None` | `307` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xceed) |
| **SOMATOM X.ceed** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xceed) |
| **SOMATOM X.ceed** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xceed) |
| **SOMATOM X.ceed** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xceed) |
| **SOMATOM X.ceed** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `120` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xceed) |
| **SOMATOM X.ceed** | 发生器最大功率 (max_generator_power) | `100` | `120` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/single-source-ct/somatom-xceed) |
| **SOMATOM go.Top** | 检查床最大承重 (table_load_capacity) | `None` | `227` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/somatom-go-platform/somatom-go-top) |
| **SOMATOM go.Top** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/somatom-go-platform/somatom-go-top) |
| **SOMATOM go.Top** | 最长扫描范围 (scan_range) | `None` | `1600` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/somatom-go-platform/somatom-go-top) |
| **SOMATOM go.Top** | 探测器Z轴覆盖 (detector_z_coverage) | `38` | `38.4` | [Official Source](https://www.siemens-healthineers.com/computed-tomography/somatom-go-platform/somatom-go-top) |
| **SOMATOM go.All** | 检查床最大承重 (table_load_capacity) | `None` | `227` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/somatom-go-all) |
| **SOMATOM go.All** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/somatom-go-all) |
| **SOMATOM go.All** | 最长扫描范围 (scan_range) | `None` | `1600` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/somatom-go-all) |
| **SOMATOM go.All** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `6` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/somatom-go-all) |
| **SOMATOM go.All** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `13.5` | [Official Source](https://www.siemens-healthineers.com/en-us/computed-tomography/somatom-go-all) |
| **SOMATOM go.Up** | 发生器最大功率 (max_generator_power) | `50` | `32` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Up** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `3.5` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Up** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `8.75` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Up** | 检查床最大承重 (table_load_capacity) | `None` | `227` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Up** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Up** | 最长扫描范围 (scan_range) | `None` | `1600` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Now** | 物理阳极热容量 (anode_heat_capacity_physical) | `5` | `3.5` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Now** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `8.75` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Now** | 检查床最大承重 (table_load_capacity) | `None` | `227` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Now** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.siemens-healthineers.com) |
| **SOMATOM go.Now** | 最长扫描范围 (scan_range) | `None` | `1600` | [Official Source](https://www.siemens-healthineers.com) |
| **Revolution Apex Elite** | 发生器最大功率 (max_generator_power) | `130` | `100` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Apex Elite** | 物理阳极热容量 (anode_heat_capacity_physical) | `8` | `6.8` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Apex Elite** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `30` | `33` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Apex Elite** | 最长扫描范围 (scan_range) | `None` | `1850` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Apex Elite** | 能谱/光谱成像技术路径 (spectral_imaging_mechanism) | `None` | `Gemstone Spectral Imaging (GSI) / fast kV switching` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Ascend** | 物理阳极热容量 (anode_heat_capacity_physical) | `6.3` | `7` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Ascend** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.gehealthcare.com) |
| **Revolution Ascend** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.gehealthcare.com) |
| **Spectral CT 7500** | 发生器最大功率 (max_generator_power) | `100` | `120` | [Official Source](https://www.philips.com) |
| **Spectral CT 7500** | 单圈最大重建层数 (max_reconstructed_slices) | `256` | `512` | [Official Source](https://www.philips.com) |
| **Spectral CT 7500** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30` | [Official Source](https://www.philips.com) |
| **Spectral CT 7500** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.philips.com) |
| **Spectral CT 7500** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.philips.com) |
| **Incisive CT** | 最大管电流 (tube_current_max) | `600` | `667` | [Official Source](https://www.philips.com) |
| **Incisive CT** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://www.philips.com) |
| **Incisive CT** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.philips.com) |
| **Incisive CT** | 最长扫描范围 (scan_range) | `None` | `1860` | [Official Source](https://www.philips.com) |
| **Aquilion ONE PRISM** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://medical.canon) |
| **Aquilion ONE PRISM** | 最长扫描范围 (scan_range) | `None` | `1500` | [Official Source](https://medical.canon) |
| **uCT 960+** | 发生器最大功率 (max_generator_power) | `None` | `100` | [Official Source](https://www.united-imaging.com) |
| **uCT 960+** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 960+** | 最大管电流 (tube_current_max) | `1500` | `1000` | [Official Source](https://www.united-imaging.com) |
| **uCT 960+** | 机架倾角 (gantry_tilt) | `30` | `0` | [Official Source](https://www.united-imaging.com) |
| **uCT 960+** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.united-imaging.com) |
| **NeuViz Epoch** | 机架孔径 (bore_size) | `78` | `83` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Epoch** | 单圈最大重建层数 (max_reconstructed_slices) | `None` | `512` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Epoch** | 探测器Z轴覆盖 (detector_z_coverage) | `None` | `160` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Epoch** | 物理探测器排数 (physical_detector_rows) | `None` | `256` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Epoch** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Epoch** | 发生器最大功率 (max_generator_power) | `None` | `120` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Epoch** | 最大管电流 (tube_current_max) | `None` | `1000` | [Official Source](https://www.neusoftmedical.com/) |
| **Revolution CT** | 检查床最大承重 (table_load_capacity) | `None` | `227` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution CT** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution CT** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution CT** | 最大管电流 (tube_current_max) | `None` | `740` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 探测器Z轴覆盖 (detector_z_coverage) | `20` | `40` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 物理探测器排数 (physical_detector_rows) | `32` | `64` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 单圈最大重建层数 (max_reconstructed_slices) | `64` | `128` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 最长扫描范围 (scan_range) | `None` | `1800` | [Official Source](https://www.gehealthcare.com/) |
| **Revolution Maxima** | 最大管电流 (tube_current_max) | `None` | `560` | [Official Source](https://www.gehealthcare.com/) |
| **Optima CT660** | 检查床最大承重 (table_load_capacity) | `None` | `227` | [Official Source](https://www.gehealthcare.com/) |
| **Optima CT660** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.gehealthcare.com/) |
| **Optima CT660** | 最长扫描范围 (scan_range) | `None` | `1700` | [Official Source](https://www.gehealthcare.com/) |
| **Optima CT660** | 最大管电流 (tube_current_max) | `None` | `600` | [Official Source](https://www.gehealthcare.com/) |
| **IQon Spectral CT** | 检查床最大承重 (table_load_capacity) | `None` | `295` | [Official Source](https://www.philips.com/) |
| **IQon Spectral CT** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.philips.com/) |
| **IQon Spectral CT** | 最长扫描范围 (scan_range) | `None` | `2100` | [Official Source](https://www.philips.com/) |
| **IQon Spectral CT** | 最大管电流 (tube_current_max) | `None` | `1000` | [Official Source](https://www.philips.com/) |
| **Access CT** | 机架孔径 (bore_size) | `70` | `65` | [Official Source](https://www.philips.com/) |
| **Access CT** | 物理阳极热容量 (anode_heat_capacity_physical) | `8` | `3.5` | [Official Source](https://www.philips.com/) |
| **Access CT** | 检查床最大承重 (table_load_capacity) | `None` | `200` | [Official Source](https://www.philips.com/) |
| **Access CT** | 机架倾角 (gantry_tilt) | `None` | `0` | [Official Source](https://www.philips.com/) |
| **Access CT** | 最长扫描范围 (scan_range) | `None` | `1380` | [Official Source](https://www.philips.com/) |
| **Access CT** | 最大管电流 (tube_current_max) | `None` | `233` | [Official Source](https://www.philips.com/) |
| **Aquilion ONE GENESIS** | 检查床最大承重 (table_load_capacity) | `None` | `315` | [Official Source](https://medical.canon/) |
| **Aquilion ONE GENESIS** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://medical.canon/) |
| **Aquilion ONE GENESIS** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://medical.canon/) |
| **Aquilion ONE GENESIS** | 最大管电流 (tube_current_max) | `None` | `900` | [Official Source](https://medical.canon/) |
| **Aquilion Prime SP** | 检查床最大承重 (table_load_capacity) | `None` | `300` | [Official Source](https://medical.canon/) |
| **Aquilion Prime SP** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://medical.canon/) |
| **Aquilion Prime SP** | 最长扫描范围 (scan_range) | `None` | `2000` | [Official Source](https://medical.canon/) |
| **Aquilion Prime SP** | 最大管电流 (tube_current_max) | `None` | `600` | [Official Source](https://medical.canon/) |
| **Aquilion Lightning** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://global.medical.canon) |
| **Aquilion Lightning** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://global.medical.canon) |
| **Aquilion Lightning** | 最长扫描范围 (scan_range) | `None` | `1500` | [Official Source](https://global.medical.canon) |
| **Aquilion Lightning** | 物理阳极热容量 (anode_heat_capacity_physical) | `7.5` | `5.0` | [Official Source](https://global.medical.canon) |
| **Aquilion Lightning** | 最大管电流 (tube_current_max) | `None` | `420` | [Official Source](https://global.medical.canon) |
| **uCT 860** | 机架孔径 (bore_size) | `80` | `82` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 最快转速 (rotation_speed) | `0.27` | `0.25` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 检查床最大承重 (table_load_capacity) | `None` | `300` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 最长扫描范围 (scan_range) | `None` | `1700` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 探测器Z轴覆盖 (detector_z_coverage) | `None` | `80` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 物理探测器排数 (physical_detector_rows) | `None` | `160` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 单圈最大重建层数 (max_reconstructed_slices) | `None` | `320` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 物理阳极热容量 (anode_heat_capacity_physical) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 发生器最大功率 (max_generator_power) | `None` | `100` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 单侧发生器功率 (generator_power_single) | `None` | `100` | [Official Source](https://www.united-imaging.com) |
| **uCT 860** | 最大管电流 (tube_current_max) | `None` | `833` | [Official Source](https://www.united-imaging.com) |
| **uCT 780** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://www.united-imaging.com) |
| **uCT 780** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 780** | 最长扫描范围 (scan_range) | `None` | `1700` | [Official Source](https://www.united-imaging.com) |
| **uCT 780** | 探测器Z轴覆盖 (detector_z_coverage) | `None` | `40` | [Official Source](https://www.united-imaging.com) |
| **uCT 780** | 物理阳极热容量 (anode_heat_capacity_physical) | `None` | `7.5` | [Official Source](https://www.united-imaging.com) |
| **uCT 780** | 最大管电流 (tube_current_max) | `None` | `833` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 机架孔径 (bore_size) | `72` | `70` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 发生器最大功率 (max_generator_power) | `None` | `42` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 单侧发生器功率 (generator_power_single) | `None` | `42` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 物理阳极热容量 (anode_heat_capacity_physical) | `None` | `3.5` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 最长扫描范围 (scan_range) | `None` | `1600` | [Official Source](https://www.united-imaging.com) |
| **uCT 528** | 最大管电流 (tube_current_max) | `None` | `350` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 最快转速 (rotation_speed) | `0.7` | `0.75` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 物理探测器排数 (physical_detector_rows) | `20` | `40` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 发生器最大功率 (max_generator_power) | `None` | `42` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 单侧发生器功率 (generator_power_single) | `None` | `42` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 物理阳极热容量 (anode_heat_capacity_physical) | `None` | `2.0` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 最大管电流 (tube_current_max) | `None` | `350` | [Official Source](https://www.united-imaging.com) |
| **uCT 520** | 最长扫描范围 (scan_range) | `None` | `1600` | [Official Source](https://www.united-imaging.com) |
| **uCT 550** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 550** | 最长扫描范围 (scan_range) | `None` | `1700` | [Official Source](https://www.united-imaging.com) |
| **uCT 550** | 探测器Z轴覆盖 (detector_z_coverage) | `None` | `22` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 最快转速 (rotation_speed) | `0.5` | `0.35` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 发生器最大功率 (max_generator_power) | `100` | `80` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 单侧发生器功率 (generator_power_single) | `100` | `80` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 最长扫描范围 (scan_range) | `None` | `1700` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 最大管电流 (tube_current_max) | `None` | `667` | [Official Source](https://www.united-imaging.com) |
| **uCT 760** | 物理阳极热容量 (anode_heat_capacity_physical) | `None` | `7.5` | [Official Source](https://www.united-imaging.com) |
| **NeuViz Glory** | 单圈最大重建层数 (max_reconstructed_slices) | `None` | `256` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 机架孔径 (bore_size) | `75` | `72` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 探测器Z轴覆盖 (detector_z_coverage) | `None` | `80` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 发生器最大功率 (max_generator_power) | `None` | `100` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 最大管电流 (tube_current_max) | `None` | `833` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 等效阳极热容量 (anode_heat_capacity_equivalent) | `None` | `30` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 最长扫描范围 (scan_range) | `None` | `1770` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz Glory** | 彩页标称高对比分辨率 (spatial_resolution_advertised) | `None` | `30` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 单圈最大重建层数 (max_reconstructed_slices) | `None` | `128` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 最快转速 (rotation_speed) | `0.35` | `0.375` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 探测器Z轴覆盖 (detector_z_coverage) | `None` | `40` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 物理探测器排数 (physical_detector_rows) | `None` | `64` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 发生器最大功率 (max_generator_power) | `None` | `80` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 物理阳极热容量 (anode_heat_capacity_physical) | `None` | `8.0` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 最大管电流 (tube_current_max) | `None` | `667` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 检查床最大承重 (table_load_capacity) | `None` | `205` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 机架倾角 (gantry_tilt) | `None` | `30` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 最长扫描范围 (scan_range) | `None` | `1770` | [Official Source](https://www.neusoftmedical.com/) |
| **NeuViz 128** | 彩页标称高对比分辨率 (spatial_resolution_advertised) | `None` | `24` | [Official Source](https://www.neusoftmedical.com/) |
| **Ultimion** | 机架孔径 (bore_size) | `78` | `80` | [Official Source](https://jp.medical.canon/) |
| **Philips SPCCT** | 探测器Z轴覆盖 (detector_z_coverage) | `80` | `17.5` | [Official Source](https://www.spectralphotoncountingct.com/) |
| **Philips SPCCT** | 最快转速 (rotation_speed) | `0.27` | `0.33` | [Official Source](https://www.spectralphotoncountingct.com/) |
| **Philips SPCCT** | 最大管电流 (tube_current_max) | `1000` | `500` | [Official Source](https://www.spectralphotoncountingct.com/) |

---

## Version Unknown (2026-06-11T03:22:11.420Z)
**Summary**: 

---

## Version Unknown (2026-06-11T02:48:11.036Z)
**Summary**: 

---

