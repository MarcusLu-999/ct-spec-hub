# CT-SpecHub (CT 规格参数中心)

CT-SpecHub 是一个针对全球主流计算机断层扫描（CT）系统（2016-2026）的参数比对与规范化检索分析平台。本项目将复杂的设备技术指标规范化拆解，提供高保真的工程参数与实测物理数据比对。

## 🌐 线上地址
- **正式发布地址**：[https://fearless-davinci.vercel.app](https://fearless-davinci.vercel.app)

---

## 🛠️ 技术架构与功能
- **前端框架**：React + Vite 静态单页应用（SPA）
- **数据结构**：数据采用 5 维度嵌套 Schema 设计，区分“物理几何”、“成像硬件”、“软件代偿”、“实测图像质量”与“场地要求”
- **数据源深度集成**：
  - openFDA K-number 官方准入比对
  - Europe PMC 学术文献物理实测参数验证
  - ClinicalTrials 临床试验匹配
  - Frank's Hospital Workshop 官方服务/维修手册关联

---

## 🚀 本地开发与部署

### 1. 运行本地开发环境
```bash
npm install
npm run dev
```

### 2. 运行数据集成校验流水线
若要执行多源数据拉取、消解并更新本地数据库，请运行：
```bash
node scripts/integrate_and_validate.cjs
```
更新日志会自动记录在 `src/data/data_updates_log.json` 中。

### 3. 一键部署到 Vercel
```bash
npx vercel --prod
```
