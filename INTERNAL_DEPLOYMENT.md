# 🏥 CT 参数对比系统内网部署与数据库维护指南 (Internal Deployment & Maintenance Guide)

本指南旨在指导技术人员如何在**局域网（内网）环境**中部署本系统，以及如何对底层的 CT 设备数据库进行日常维护、参数更新与新增型号录入。

---

## 🚀 一、 本地与内网部署方法

由于本系统为纯静态的 Web 应用程序（基于 React 19 + Vite 8），所有的业务逻辑和数据对比均在客户端浏览器中完成。因此，在内网部署非常简单，有两种主要方式：

### 方式 A：轻量级预览部署（最快，适合临时/测试）
该方式直接利用 Vite 的预览服务器将项目发布到局域网中：
1. **安装 Node.js 环境**：
   确保内网服务器上已安装 Node.js（推荐使用 LTS 版本，如 v18, v20 或 v22）。
2. **下载并进入项目根目录**：
   将代码库拷贝到内网服务器，在终端中进入项目目录。
3. **安装依赖**：
   ```bash
   npm install
   ```
4. **编译构建**：
   ```bash
   npm run build
   ```
5. **在局域网内运行预览服务**：
   使用以下命令启动服务，其中 `--host` 允许外部通过 IP 访问，`--port` 指定内网服务端口（例如 `80`）：
   ```bash
   npm run preview -- --host 0.0.0.0 --port 80
   ```
6. **访问系统**：
   内网用户只需在浏览器输入内网服务器的 IP 地址即可直接访问（如：`http://192.168.1.100`）。

### 方式 B：企业级 Nginx 部署（推荐，稳定性与性能最佳）
在生产/正式内网环境，建议使用高性能 Web 服务器（如 Nginx）托管编译后的静态文件：
1. **本地编译静态文件**：
   ```bash
   npm run build
   ```
   该命令会在项目根目录下生成 `dist/` 文件夹，内含优化后的 HTML, CSS 和 JS 文件。
2. **配置 Nginx**：
   将 `dist/` 文件夹拷贝到 Nginx 服务器的托管目录（如 `/usr/share/nginx/html/ct-spec-hub`），并修改 Nginx 配置文件 `nginx.conf`：
   ```nginx
   server {
       listen       80;
       server_name  192.168.1.100; # 替换为内网服务器的IP或域名

       location / {
           root   /usr/share/nginx/html/ct-spec-hub;
           index  index.html index.htm;
           try_files $uri $uri/ /index.html;
       }
   }
   ```
3. **重启 Nginx 服务**：
   ```bash
   nginx -s reload
   ```

---

## 💾 二、 数据库结构与更新维护

系统的所有数据均存储在静态 JSON 文件中，无需运行复杂的 MySQL 或 PostgreSQL。这使得数据更新只需直接修改 JSON 文件。

### 1. 核心数据文件位置
*   **产品数据库**：`src/data/products.json` （存储 37 款设备的所有物理、机械、成像链、算法、实测指标与场地安装参数）
*   **厂商信息表**：`src/data/manufacturers.json` （存储各大厂商的中英文对照、简介及 Logo 的本地引用路径）
*   **数据更新日志**：`src/data/data_updates_log.json` （存储历次系统数据修改的比对日志，会在前端“数据来源”页面的变更历史中渲染）

---

### 2. 产品参数配置规则 (`products.json`)
每一个 CT 型号在 `products.json` 中占有一个对象，其基础骨架如下：
```json
{
  "id": "ct_siemens_somatom_force",       // 唯一ID，英文小写，以下划线连接
  "manufacturer_id": "siemens",           // 厂商ID，必须与 manufacturers.json 里的 id 对应
  "model_name": "SOMATOM Force",          // 设备商业名称
  "category": "High-end",                 // 设备梯度分类 (Photon Counting CT / High-end / Mid-range / Entry-level)
  "release_year": 2014,                   // 发布年份 (用于梯度内第二排序)
  "status": "in_sale",                    // 在售状态 (in_sale / discontinued)
  "description": "Siemens 旗舰双源 CT...", // 简短中文描述
  "specifications": {                     // 参数规格 (严格包含以下 5 大维度)
    "物理几何与机械参数 (Physical Geometry)": {
      "bore_size": { "value": 78, "unit": "cm", "label": "机架孔径" },
      "gantry_tilt": { "value": 0, "unit": "°", "label": "机架倾角" },
      "table_load_capacity": { "value": 307, "unit": "kg", "label": "最大工作台载重" },
      "scan_range": { "value": 2000, "unit": "mm", "label": "最大扫描范围" }
      // ... 更多参数
    },
    "成像链与物理硬件 (Imaging Chain)": {
      "detector_z_coverage": { "value": 57.6, "unit": "mm", "label": "探测器Z轴覆盖" },
      "max_generator_power": { "value": 240, "unit": "kW", "label": "发生器最大功率" }
      // ... 更多参数
    },
    "软件与算法代偿 (Software & Algorithms)": {
      "dose_modulation_tech": { "value": "CARE Dose4D", "unit": "", "label": "剂量调制技术" }
      // ... 更多参数
    },
    "图像质量与物理实测 (Image Quality)": {
      "spatial_resolution_acr_mtf10": { "value": 15, "unit": "lp/cm", "label": "ACR 10% MTF 空间分辨率" }
      // ... 更多参数
    },
    "场地建设与配电要求 (Site Requirements)": {
      "electrical_requirement": { "value": "380V/480V", "unit": "", "label": "用电要求" }
      // ... 更多参数
    }
  },
  "features": [                            // 核心亮点技术，用于卡片列表平铺展示
    "Vectron X-ray tube",
    "Dual Source imaging"
  ],
  "fda_510k_number": "K133305",           // FDA 510(k) 注册号，没有则不写
  "clinical_trials": [                     // 关联的临床试验号，没有则不写
    "NCT02345678"
  ]
}
```

> [!IMPORTANT]
> **更新与回填参数的核心要求**：
> 1. **空缺参数表示**：如果某个参数暂时无法获取官方权威数据，请将 `"value"` 设为 `null`（在 JSON 中直接写 `null`，不要写 `"null"` 或空字符串 `""`）。例如：`"value": null`。
> 2. **参数数据类型**：数值型参数的 `"value"` 必须是纯数字（整数或浮点数，不要带引号），字符型参数则必须是字符串。例如：
>    * 正确：`"value": 78`，`"value": 57.6`
>    * 错误：`"value": "78"`，`"value": "57.6 mm"`
> 3. **排序策略**：在同一厂商下，产品渲染顺序是：**光子计数 CT (Photon Counting CT)** 绝对最前，其次是分类维度从 `High-end` -> `Mid-range` -> `Entry-level`。在相同梯度下，按照 **`max_reconstructed_slices`（最大重建层数）** 降序排序，第三依据是 **`release_year`（发布年份）** 降序。如果您添加了新设备，请确保其 `category`、`max_reconstructed_slices` 和 `release_year` 录入正确，系统会自动按这一逻辑重新排列。

---

### 3. 如何运行 Schema 合规性校验
为了防止手动修改 `products.json` 时出现错别字、漏写大括号、拼错分类名等导致前端 React 渲染白屏，项目内置了全自动 Schema 校验脚本：
1. **执行校验**：
   在根目录下运行以下命令：
   ```bash
   node scripts/validate_db.cjs
   ```
2. **结果分析**：
   * 若输出：`Success: All 37 products successfully validated against the new schema.`，说明数据完全合规，可以放心打包上线。
   * 若有报错，控制台会输出具体的出错位置（如：`Error: Product ct_xxxx missing category "成像链与物理硬件 (Imaging Chain)".`），请对照报错信息修改 JSON 后重新校验。

---

### 4. 厂商 Logo 离线托管 (`manufacturers.json`)
为了防止内网环境无法连接外网导致各大厂商 Logo 挂掉，本系统采用**本地静态矢量图托管**：
*   所有厂商的 Logo 均在 `public/logos/` 文件夹下以 `.svg` 格式托管。
*   如需更换 Logo，只需将新的 SVG 文件放入 `public/logos/`，并在 `src/data/manufacturers.json` 中更新对应的 `logo_url` 相对路径。例如：
    ```json
    {
      "id": "siemens",
      "name_zh": "西门子医疗",
      "name_en": "Siemens Healthineers",
      "logo_url": "./logos/siemens.svg",
      "description": "光子计数CT与双源CT技术的全球领跑者..."
    }
    ```

---

## 🔄 三、 本地代码更新发布流程

当您在本地开发机上修改了数据或代码，并想更新到内网服务器时，请遵循以下标准流程：
1. **修改数据**：编辑 `src/data/products.json`。
2. **运行校验**：运行 `node scripts/validate_db.cjs` 确保无报错。
3. **追加更新日志**：在 `src/data/data_updates_log.json` 头部添加本次修改说明，示例如下：
   ```json
   {
     "timestamp": "2026-06-12T08:00:00+08:00",
     "version": "1.4.1",
     "summary": "手动修正了联影和西门子部分机型的物理排数，回填了最大管电流。",
     "changes": [
       {
         "product_id": "ct_siemens_somatom_force",
         "model_name": "SOMATOM Force",
         "category": "成像链与物理硬件 (Imaging Chain)",
         "parameter": "detector_z_coverage",
         "label": "探测器Z轴覆盖",
         "old_value": 58,
         "new_value": 57.6,
         "type": "mismatch",
         "description": "根据Siemens官网技术手册，将Z轴物理覆盖校正为57.6mm。",
         "source_url": "https://www.siemens-healthineers.com"
       }
     ]
   }
   ```
4. **编译测试**：运行 `npm run build` 确保无打包错误。
5. **部署至内网**：将新生成的 `dist/` 静态文件夹替换内网 Web 服务器中的旧版文件夹，或在内网运行 `git pull` 并执行构建。
