import React, { useState, useMemo, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import productsData from './data/products.json';
import manufacturersData from './data/manufacturers.json';
import './index.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Premium radar chart colors
const RADAR_COLORS = [
  { bg: 'rgba(56, 189, 248, 0.25)', border: '#38bdf8' },
  { bg: 'rgba(129, 140, 248, 0.25)', border: '#818cf8' },
  { bg: 'rgba(52, 211, 153, 0.25)', border: '#34d399' },
  { bg: 'rgba(251, 191, 36, 0.25)', border: '#fbbf24' },
];

// Fixed category mappings to match the new nested specifications schema
const RADAR_AXES = [
  { key: 'max_reconstructed_slices', category: '成像链与物理硬件 (Imaging Chain)', label: '重建层数', invert: false },
  { key: 'bore_size', category: '物理几何与机械参数 (Physical Geometry)', label: '机架孔径', invert: false },
  { key: 'rotation_speed', category: '物理几何与机械参数 (Physical Geometry)', label: '最快转速', invert: true },
  { key: 'temporal_resolution', category: '成像链与物理硬件 (Imaging Chain)', label: ['时间分辨率', '(快)'], invert: true },
  { key: 'max_generator_power', category: '成像链与物理硬件 (Imaging Chain)', label: '发生器功率', invert: false },
  { key: 'tube_current_max', category: '成像链与物理硬件 (Imaging Chain)', label: '最大管电流', invert: false },
  { key: 'max_scan_speed', category: '物理几何与机械参数 (Physical Geometry)', label: '扫描速度', invert: false },
];

function App() {
  const [searchText, setSearchText] = useState('');
  const [filterMfg, setFilterMfg] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRows, setFilterRows] = useState('all');
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto compact zoom logic on mobile when comparing multiple products
  useEffect(() => {
    if (isMobile) {
      if (compareList.length > 3) {
        setZoomLevel(0.65); // 4 products: 65% zoom on mobile
      } else if (compareList.length === 3) {
        setZoomLevel(0.75); // 3 products: 75% zoom on mobile
      } else {
        setZoomLevel(1.0);   // 2 products: 100%
      }
    } else {
      setZoomLevel(1.0);
    }
  }, [compareList.length, isMobile]);

  const getManufacturer = (id) => manufacturersData.find(m => m.id === id);

  const productCompletenessScores = useMemo(() => {
    const countNonNull = (p) => {
      let count = 0;
      if (!p.specifications) return 0;
      Object.values(p.specifications).forEach(category => {
        Object.values(category).forEach(spec => {
          if (spec && spec.value !== null && spec.value !== undefined && spec.value !== '') {
            count++;
          }
        });
      });
      return count;
    };

    const counts = productsData.map(p => ({ id: p.id, count: countNonNull(p) }));
    const maxCount = Math.max(...counts.map(c => c.count));
    
    const scores = {};
    counts.forEach(c => {
      scores[c.id] = maxCount > 0 ? Math.round((c.count / maxCount) * 100) : 0;
    });
    return scores;
  }, []);

  const filteredDrawerProducts = useMemo(() => {
    return productsData.filter(p => {
      const matchSearch = drawerSearch === '' ||
        p.model_name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(drawerSearch.toLowerCase()) ||
        (getManufacturer(p.manufacturer_id)?.name_cn || '').includes(drawerSearch) ||
        (getManufacturer(p.manufacturer_id)?.name_en || '').toLowerCase().includes(drawerSearch.toLowerCase()) ||
        p.features.some(f => f.toLowerCase().includes(drawerSearch.toLowerCase()));
      return matchSearch;
    });
  }, [drawerSearch]);

  const categories = useMemo(() => [...new Set(productsData.map(p => p.category))], []);
  const rowOptions = useMemo(() => {
    const rows = productsData.map(p => p.specifications['成像链与物理硬件 (Imaging Chain)']?.max_reconstructed_slices?.value).filter(v => v !== undefined && v !== null);
    return [...new Set(rows)].sort((a, b) => a - b);
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter(p => {
      const matchSearch = searchText === '' ||
        p.model_name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.description.toLowerCase().includes(searchText.toLowerCase()) ||
        (getManufacturer(p.manufacturer_id)?.name_cn || '').includes(searchText) ||
        (getManufacturer(p.manufacturer_id)?.name_en || '').toLowerCase().includes(searchText.toLowerCase());

      const matchMfg = filterMfg === 'all' || p.manufacturer_id === filterMfg;
      const matchCategory = filterCategory === 'all' || p.category === filterCategory;
      const rows = p.specifications['成像链与物理硬件 (Imaging Chain)']?.max_reconstructed_slices?.value || 0;
      const matchRows = filterRows === 'all' || rows >= Number(filterRows);

      return matchSearch && matchMfg && matchCategory && matchRows;
    });
  }, [searchText, filterMfg, filterCategory, filterRows]);

  const groupedProducts = useMemo(() => {
    const groups = {};
    
    const getSortWeight = (product) => {
      const isPhotonCounting = 
        product.description?.toLowerCase().includes('photon-counting') ||
        product.description?.toLowerCase().includes('photon counting') ||
        product.features?.some(f => f.toLowerCase().includes('photon-counting') || f.toLowerCase().includes('photon counting')) ||
        product.id?.includes('spcct') ||
        product.id?.includes('naeotom_alpha') ||
        product.id?.includes('photonova');
        
      if (isPhotonCounting) return 1;
      if (product.category === 'High-end') return 2;
      if (product.category === 'Mid-range') return 3;
      if (product.category === 'Entry-level') return 4;
      return 5;
    };
    
    const getSlices = (p) => p.specifications?.['成像链与物理硬件 (Imaging Chain)']?.max_reconstructed_slices?.value || 0;

    manufacturersData.forEach(mfg => {
      const mfgProducts = filteredProducts.filter(p => p.manufacturer_id === mfg.id);
      if (mfgProducts.length > 0) {
        mfgProducts.sort((a, b) => {
          const weightA = getSortWeight(a);
          const weightB = getSortWeight(b);
          if (weightA !== weightB) {
            return weightA - weightB;
          }
          const slicesA = getSlices(a);
          const slicesB = getSlices(b);
          if (slicesA !== slicesB) {
            return slicesB - slicesA;
          }
          return (b.release_year || 0) - (a.release_year || 0);
        });
        groups[mfg.id] = mfgProducts;
      }
    });
    
    return groups;
  }, [filteredProducts]);

  const toggleCompare = (productId) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) return prev;
      return [...prev, productId];
    });
  };

  const isInCompare = (productId) => compareList.includes(productId);

  const compareProducts = useMemo(() => {
    return compareList.map(id => productsData.find(p => p.id === id)).filter(Boolean);
  }, [compareList]);

  const allCategories = useMemo(() => {
    if (compareProducts.length === 0) return {};
    const cats = {};
    compareProducts.forEach(p => {
      Object.keys(p.specifications).forEach(catName => {
        if (!cats[catName]) cats[catName] = new Set();
        if (p.specifications[catName]) {
          Object.keys(p.specifications[catName]).forEach(k => cats[catName].add(k));
        }
      });
    });
    const result = {};
    Object.keys(cats).forEach(cat => {
      result[cat] = [...cats[cat]];
    });
    return result;
  }, [compareProducts]);

  // Initial expand logic
  useMemo(() => {
    const initExp = {};
    Object.keys(allCategories).forEach(cat => initExp[cat] = true);
    initExp["FDA 510(k) Details"] = true;
    setExpandedCategories(initExp);
  }, [allCategories]);

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const resetFilters = () => {
    setSearchText('');
    setFilterMfg('all');
    setFilterCategory('all');
    setFilterRows('all');
  };

  const hasActiveFilters = searchText || filterMfg !== 'all' || filterCategory !== 'all' || filterRows !== 'all';

  return (
    <div className="app-container">
      {/* Premium Animated Background */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <header className="app-header glass-panel">
        <div className="header-content">
          <div className="header-brand-group" onClick={() => { setShowCompare(false); setShowSources(false); }} style={{ cursor: 'pointer' }}>
            <h1>
              <span className="gradient-text">CT-SpecHub</span>
            </h1>
            <p>Global CT Scanner Database & Comparison Engine</p>
          </div>
          <nav className="header-nav">
            <button 
              className={`nav-btn ${!showCompare && !showSources ? 'nav-btn--active' : ''}`} 
              onClick={() => { setShowCompare(false); setShowSources(false); }}
            >
              🖥️ 产品目录 (Catalog)
            </button>
            <button 
              className={`nav-btn ${showCompare && !showSources ? 'nav-btn--active' : ''}`} 
              onClick={() => { setShowCompare(true); setShowSources(false); }}
            >
              📊 参数对比 (Compare)
            </button>
            <button 
              className={`nav-btn ${showSources ? 'nav-btn--active' : ''}`} 
              onClick={() => { setShowCompare(false); setShowSources(true); }}
            >
              📖 数据来源 (Sources)
            </button>
          </nav>
        </div>
      </header>

      {!showSources && (
        <div className="dashboard-stats">
          <div className="stat-card glass-panel">
            <h3>{productsData.length}</h3>
            <p>Global Models</p>
          </div>
          <div className="stat-card glass-panel">
            <h3>{manufacturersData.length}</h3>
            <p>Manufacturers</p>
          </div>
          <div className="stat-card glass-panel">
            <h3>{filteredProducts.length}</h3>
            <p>Filtered Results</p>
          </div>
          {compareList.length > 0 && (
            <div className="stat-card glass-panel stat-card--accent hover-lift" onClick={() => {
              const nextShow = !showCompare;
              setShowCompare(nextShow);
              setShowSources(false);
              if (nextShow) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}>
              <div className="compare-indicator">
                <h3>{compareList.length} <span className="text-sm">/ 4</span></h3>
              </div>
              <p className="font-semibold">{showCompare ? '← View Catalog' : 'Compare Now →'}</p>
            </div>
          )}
        </div>
      )}

      {!showCompare && !showSources && (
        <div className="filter-bar glass-panel">
          <div className="filter-group">
            <span className="filter-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search model, feature, brand..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          
          <div className="filter-select-wrapper">
            <select className="filter-select" value={filterMfg} onChange={e => setFilterMfg(e.target.value)}>
              <option value="all">All Manufacturers</option>
              {manufacturersData.map(m => (
                <option key={m.id} value={m.id}>{m.name_en}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select className="filter-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="all">All Tiers</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select className="filter-select" value={filterRows} onChange={e => setFilterRows(e.target.value)}>
              <option value="all">Detector Rows</option>
              {rowOptions.map(r => (
                <option key={r} value={r}>≥ {r} Slices</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button className="reset-btn glass-btn" onClick={resetFilters}>
              <span className="icon">✕</span> Reset
            </button>
          )}
        </div>
      )}

      <main className="app-main">
        {showSources ? (
          <section className="sources-section glass-panel animate-fade-in">
            <h2 className="section-title gradient-text">数据来源与抓取策略 (Data Sources & Crawling Strategy)</h2>
            <div className="sources-doc-content">
              <h3>1. 数据来源 (Data Sources)</h3>
              <p>CT-SpecHub 平台的数据来源于多个权威渠道，确保设备参数的客观性与严谨性：</p>
              <ul>
                <li><strong>官方技术白皮书与规格表 (Official Datasheets)</strong>: 搜集并整理了西门子、GE、联影、飞利浦、佳能、东软等全球六大厂商官方发布的产品手册和详细规格白皮书。</li>
                <li><strong>国家药监局 (NMPA) 医疗器械注册证信息</strong>: 从国家药品监督管理局数据库提取官方备案的“结构及组成”与“产品技术要求”，作为成像层数、发生器功率、管球容量等核心硬件性能的法定依据。</li>
                <li><strong>FDA 510(k) 申报及批准数据</strong>: 对接美国 FDA 510(k) 注册数据库（代码 JAK），通过 openFDA API 自动拉取关联的 K-Number 申报文档，获取公开的底层硬件工程参数。</li>
                <li><strong>Europe PMC 学术文献库</strong>: 自动匹配各型号设备在临床试验或物理测试中的学术文献，用于校验物理实测空间分辨率、对比度检测限等前沿临床指标。</li>
                <li><strong>Frank's Hospital Workshop 服务手册</strong>: 爬取医疗设备维护社区，建立各机型服务手册（Service Manuals）和工程电路文档的映射索引。</li>
              </ul>

              <h3>2. 抓取与富化策略 (Crawling & Enrichment Strategy)</h3>
              <p>为了保证数据库的完整度并消除信息孤岛，平台采取了如下的智能网络爬取与富化策略：</p>
              <ul>
                <li><strong>定向多源爬虫 (Targeted Crawling)</strong>: 基于 Python + HTTP 异步库定向抓取各厂商全球分支机构官网（特别是对数据公开度极高的厂商日本官网）的二级页面，提取原始 HTML 参数矩阵并进行清洗结构化。</li>
                <li><strong>可信度分层与冲突消解逻辑 (Trust Hierarchy & Conflict Resolution)</strong>:
                  <ol>
                    <li>优先信任<strong>官方产品规格书（Datasheet）</strong>及<strong>药监局准入证（NMPA/FDA）</strong>，将其设为数据源的第一优先级。</li>
                    <li>若不同国家或不同批次的采购招标文件存在配置偏离（如选配大容量发生器或低配置层数），保留平台最大硬件上限作为数据库基准。</li>
                    <li>对于多源比对中存在的不确定性或偏离，自动导出至差异对比报告 <code>unresolved_discrepancies.txt</code>，而不做主观过度推导。</li>
                  </ol>
                </li>
                <li><strong>增量日志与 Schema 校验 (Validation & Logging)</strong>: 每次更新均通过自动化脚本执行 JSON 强约束校验，核对各维度数据完整度（Completeness Score），并在本地及线上生产环境同步记录数据更新流。</li>
              </ul>
            </div>
          </section>
        ) : showCompare && compareProducts.length >= 2 ? (
          <section className="compare-section animate-fade-in">
            <div className="compare-header-row">
              <h2 className="section-title gradient-text">Multi-dimensional Benchmarking</h2>
              <button className="clear-compare-btn glass-btn" onClick={() => { setCompareList([]); setShowCompare(false); setShowSources(false); }}>
                ✕ Clear All
              </button>
            </div>

            <div className="radar-section glass-panel">
              <h3 className="glass-title">Performance Radar</h3>
              <div className="radar-wrapper">
                <Radar
                  data={{
                    labels: RADAR_AXES.map(a => a.label),
                    datasets: compareProducts.map((p, idx) => {
                      const color = RADAR_COLORS[idx % RADAR_COLORS.length];
                      return {
                        label: p.model_name,
                        data: RADAR_AXES.map(axis => {
                          const raw = p.specifications[axis.category]?.[axis.key]?.value ?? 0;
                          const allVals = compareProducts.map(cp => cp.specifications[axis.category]?.[axis.key]?.value ?? 0);
                          const maxV = Math.max(...allVals);
                          const minV = Math.min(...allVals);
                          if (maxV === minV) return 100; // If all same, max out radar for that spec
                          if (axis.invert) {
                            return Math.round(((maxV - raw) / (maxV - minV)) * 80 + 20);
                          }
                          return Math.round(((raw - minV) / (maxV - minV)) * 80 + 20);
                        }),
                        backgroundColor: color.bg,
                        borderColor: color.border,
                        borderWidth: 2,
                        pointBackgroundColor: color.border,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.1, // Smooth the radar lines slightly
                      };
                    }),
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false, // Use custom CSS flex legend below instead
                      },
                      tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#f8fafc',
                        bodyColor: '#cbd5e1',
                        borderColor: 'rgba(51, 65, 85, 0.8)',
                        borderWidth: 1,
                        padding: 14,
                        cornerRadius: 8,
                        titleFont: { size: 14, weight: '600' },
                        bodyFont: { size: 13 },
                        callbacks: {
                          label: (ctx) => {
                            const product = compareProducts[ctx.datasetIndex];
                            const axis = RADAR_AXES[ctx.dataIndex];
                            const spec = product.specifications[axis.category]?.[axis.key];
                            return `${ctx.dataset.label}: ${spec?.value ?? '—'} ${spec?.unit ?? ''}`;
                          },
                        },
                      },
                    },
                    scales: {
                      r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { display: false, stepSize: 20 },
                        grid: { color: 'rgba(148, 163, 184, 0.15)', circular: true },
                        angleLines: { color: 'rgba(148, 163, 184, 0.25)' },
                        pointLabels: {
                          color: '#e2e8f0',
                          font: { 
                            family: 'Inter', 
                            size: isMobile ? 10 : 12, 
                            weight: '500' 
                          },
                          padding: isMobile ? 6 : 10,
                        },
                      },
                    },
                  }}
                />
              </div>
              
              {/* Custom CSS Flex Legend */}
              <div className="radar-legend-container">
                {compareProducts.map((p, idx) => {
                  const color = RADAR_COLORS[idx % RADAR_COLORS.length];
                  return (
                    <div key={p.id} className="radar-legend-item">
                      <span className="radar-legend-color" style={{ backgroundColor: color.border }}></span>
                      <span className="radar-legend-text">{p.model_name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="compare-table-header-controls">
              <h3 className="glass-title-small">Specification Comparison</h3>
              <div className="zoom-slider-control">
                <span className="zoom-icon">🔍</span>
                <span className="zoom-label">视图缩放:</span>
                <input 
                  type="range" 
                  min="45" 
                  max="100" 
                  step="5"
                  value={Math.round(zoomLevel * 100)} 
                  onChange={(e) => setZoomLevel(Number(e.target.value) / 100)}
                  className="zoom-range-input"
                  title="拖动滑块调节对比表格的缩放大小"
                />
                <span className="zoom-value">{Math.round(zoomLevel * 100)}%</span>
                <button 
                  className="zoom-reset-btn" 
                  onClick={() => setZoomLevel(isMobile ? (compareProducts.length > 3 ? 0.65 : compareProducts.length === 3 ? 0.75 : 1.0) : 1.0)}
                  title="重置缩放"
                >
                  重置
                </button>
              </div>
            </div>

            <div 
              className="compare-table-wrapper glass-panel" 
              style={{ '--table-zoom': zoomLevel }}
            >
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="spec-label-col spec-header-corner">Specification</th>
                    {compareProducts.map(p => {
                      const mfg = getManufacturer(p.manufacturer_id);
                      return (
                        <th key={p.id}>
                          <div className="th-mfg-name">{mfg?.name_en}</div>
                          <div className="th-model-name gradient-text">{p.model_name}</div>
                          <div className="th-tier-badge">{p.category}</div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="spec-label-col">Release Year</td>
                    {compareProducts.map(p => <td key={p.id} className="font-medium text-slate-300">{p.release_year}</td>)}
                  </tr>

                  {Object.entries(allCategories).map(([catName, keys]) => (
                    <React.Fragment key={catName}>
                      <tr className="compare-category-row" onClick={() => toggleCategory(catName)}>
                        <td colSpan={compareProducts.length + 1} className="category-header">
                          <span className={`accordion-icon ${expandedCategories[catName] ? 'expanded' : ''}`}>▼</span>
                          {catName}
                        </td>
                      </tr>
                      {expandedCategories[catName] && keys.map(key => {
                        const values = compareProducts.map(p => p.specifications[catName]?.[key]?.value);
                        const validVals = values.filter(v => v !== undefined && v !== null);
                        const maxVal = validVals.length > 0 ? Math.max(...validVals) : 0;
                        const minVal = validVals.length > 0 ? Math.min(...validVals) : 0;
                        const hasVariance = maxVal !== minVal;

                        let label = key;
                        let unit = '';
                        for(let p of compareProducts) {
                           if(p.specifications[catName]?.[key]) {
                               label = p.specifications[catName][key].label || key;
                               unit = p.specifications[catName][key].unit || '';
                               break;
                           }
                        }

                        const lowerIsBetter = ['rotation_speed', 'temporal_resolution', 'low_contrast'].includes(key);

                        return (
                          <tr key={`${catName}-${key}`} className="spec-row hover-highlight">
                            <td className="spec-label-col indented">{label}</td>
                            {compareProducts.map(p => {
                              const spec = p.specifications[catName]?.[key];
                              if (!spec || spec.value === undefined) return <td key={p.id} className="text-slate-500">—</td>;
                              const isBest = hasVariance && (lowerIsBetter ? spec.value === minVal : spec.value === maxVal);
                              return (
                                <td key={p.id} className={isBest ? 'cell-best' : hasVariance ? 'cell-diff' : ''}>
                                  <span className="spec-val-number">{spec.value}</span> 
                                  <span className="spec-val-unit">{unit}</span>
                                  {isBest && <span className="best-badge" title="Best in class">✦</span>}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}

                  <tr className="compare-category-row" onClick={() => toggleCategory("FDA 510(k) Details")}>
                    <td colSpan={compareProducts.length + 1} className="category-header">
                      <span className={`accordion-icon ${expandedCategories["FDA 510(k) Details"] ? 'expanded' : ''}`}>▼</span>
                      🛡️ FDA 510(k) Clearance Details (FDA 510k 准入与性能详情)
                    </td>
                  </tr>
                  {expandedCategories["FDA 510(k) Details"] && (
                    <>
                      <tr className="spec-row hover-highlight">
                        <td className="spec-label-col indented">510(k) Clearance Number</td>
                        {compareProducts.map(p => (
                          <td key={p.id}>
                            {p.fda_510k_number ? (
                              <a 
                                href={`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${p.fda_510k_number}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detail-link"
                              >
                                {p.fda_510k_number} ↗
                              </a>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="spec-row hover-highlight">
                        <td className="spec-label-col indented">Submitter (申请单位)</td>
                        {compareProducts.map(p => (
                          <td key={p.id} className="text-sm text-slate-300">
                            {p.fda_clearance_details?.submitter || "—"}
                          </td>
                        ))}
                      </tr>
                      <tr className="spec-row hover-highlight">
                        <td className="spec-label-col indented">Predicate Devices (前代参考)</td>
                        {compareProducts.map(p => (
                          <td key={p.id}>
                            {p.fda_clearance_details?.predicate_devices?.length > 0 ? (
                              <div className="predicate-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                                {p.fda_clearance_details.predicate_devices.map((pred, i) => (
                                  <a
                                    key={i}
                                    href={`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${pred}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="predicate-badge"
                                  >
                                    {pred}
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="spec-row hover-highlight">
                        <td className="spec-label-col indented">Clinical Indications (获批临床适用)</td>
                        {compareProducts.map(p => (
                          <td key={p.id}>
                            {p.fda_clearance_details?.cleared_clinical_indications?.length > 0 ? (
                              <div className="fda-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                                {p.fda_clearance_details.cleared_clinical_indications.map((tag, i) => (
                                  <span key={i} className="fda-tag clinical-tag" style={{ fontSize: '0.75rem', padding: '2px 6px' }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="spec-row hover-highlight">
                        <td className="spec-label-col indented">Software Features (获批软件特性)</td>
                        {compareProducts.map(p => (
                          <td key={p.id}>
                            {p.fda_clearance_details?.cleared_software_features?.length > 0 ? (
                              <div className="fda-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                                {p.fda_clearance_details.cleared_software_features.map((tag, i) => (
                                  <span key={i} className="fda-tag software-tag" style={{ fontSize: '0.75rem', padding: '2px 6px' }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="spec-row hover-highlight">
                        <td className="spec-label-col indented">Reconstruction Algorithms (获批重建算法)</td>
                        {compareProducts.map(p => (
                          <td key={p.id}>
                            {p.fda_clearance_details?.reconstruction_algorithms?.length > 0 ? (
                              <div className="fda-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                                {p.fda_clearance_details.reconstruction_algorithms.map((tag, i) => (
                                  <span key={i} className="fda-tag algo-tag" style={{ fontSize: '0.75rem', padding: '2px 6px' }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  <tr>
                    <td className="spec-label-col">Key Features</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="features-cell">
                        <div className="feature-tags">
                          {p.features.map((f, i) => <span key={i} className="feature-tag">{f}</span>)}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        ) : showCompare && compareProducts.length < 2 ? (
          <section className="compare-section animate-fade-in">
            <div className="empty-state glass-panel">
              <div className="empty-icon">📊</div>
              <h3>Select More Models</h3>
              <p>Please select at least 2 models to begin benchmarking.</p>
              <button className="glass-btn primary-btn" onClick={() => { setShowCompare(false); setShowSources(false); }}>← Back to Catalog</button>
            </div>
          </section>
        ) : (
          <section className="product-section animate-fade-in">
            <div className="section-header">
              <h2 className="section-title">Equipment Catalog</h2>
              <p className="section-subtitle">Showing {filteredProducts.length} high-end systems grouped by manufacturer</p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="empty-state glass-panel">
                <div className="empty-icon">🔭</div>
                <h3>No Results Found</h3>
                <p>Try adjusting your search filters to find what you're looking for.</p>
                <button className="glass-btn primary-btn" onClick={resetFilters}>Reset All Filters</button>
              </div>
            ) : (
              <div className="mfg-groups-container">
                {manufacturersData.map(mfg => {
                  const mfgProducts = groupedProducts[mfg.id];
                  if (!mfgProducts || mfgProducts.length === 0) return null;
                  
                  return (
                    <div key={mfg.id} className="mfg-section animate-fade-in">
                      <div className="mfg-section-header glass-panel">
                        <div className="mfg-info-wrapper">
                          <div className="mfg-text-details">
                            <h3 className="mfg-name">
                              <span className="mfg-cn">{mfg.name_cn}</span>
                              <span className="mfg-en">{mfg.name_en}</span>
                            </h3>
                            {mfg.description && <p className="mfg-desc">{mfg.description}</p>}
                          </div>
                        </div>
                        <div className="mfg-badge-count">
                          {mfgProducts.length} Systems
                        </div>
                      </div>
                      
                      <div className="product-grid">
                        {mfgProducts.map(product => {
                          const inCompare = isInCompare(product.id);
                          return (
                            <div key={product.id} className={`product-card glass-panel hover-lift ${inCompare ? 'product-card--selected' : ''}`}>
                              <div className="card-header">
                                <span className="mfg-badge">{mfg.name_en}</span>
                                <div className="card-header-right">
                                  <span className="completeness-badge" title="Data completeness relative to the most detailed model in database">
                                    📊 {productCompletenessScores[product.id]}%
                                  </span>
                                  <span className="category-badge">{product.category}</span>
                                </div>
                              </div>
                              
                              <div className="card-body">
                                <h3 className="model-title gradient-text">{product.model_name}</h3>
                                <p className="description">{product.description}</p>
                                
                                <div className="specs-grid">
                                  {(() => {
                                     const targetKeys = ['bore_size', 'rotation_speed', 'detector_z_coverage', 'physical_detector_rows'];
                                     const specsToShow = [];
                                     
                                     targetKeys.forEach(k => {
                                       for (const cat of Object.values(product.specifications)) {
                                         if (cat[k] && cat[k].value !== null && cat[k].value !== undefined && cat[k].value !== '') {
                                           specsToShow.push(cat[k]);
                                           break;
                                         }
                                       }
                                     });

                                     // Fallback: fill with other specs if we don't have 4
                                     if (specsToShow.length < 4) {
                                       Object.values(product.specifications).forEach(cat => {
                                          Object.values(cat).forEach(spec => {
                                            if (spec && spec.value !== null && spec.value !== undefined && spec.value !== '' && !specsToShow.includes(spec) && specsToShow.length < 4) {
                                              specsToShow.push(spec);
                                            }
                                          });
                                       });
                                     }

                                     return specsToShow.map((spec, idx) => (
                                       <div key={idx} className="spec-item">
                                         <span className="spec-label">{spec.label}</span>
                                         <span className="spec-value">
                                           {spec.value} <span className="spec-unit">{spec.unit}</span>
                                         </span>
                                       </div>
                                     ));
                                  })()}
                                </div>
                              </div>

                              <div className="card-footer">
                                <div className="card-tags">
                                  {product.features.slice(0, 2).map((f, i) => (
                                    <span key={i} className="feature-tag-sm">{f}</span>
                                  ))}
                                </div>
                                <div className="card-actions">
                                  <button
                                    className="details-btn glass-btn"
                                    onClick={() => setActiveDetailProduct(product)}
                                  >
                                    🔍 Details
                                  </button>
                                  <button
                                    className={`compare-btn ${inCompare ? 'compare-btn--active' : ''}`}
                                    onClick={() => toggleCompare(product.id)}
                                    disabled={!inCompare && compareList.length >= 4}
                                  >
                                    {inCompare ? '✓ Selected' : '+ Compare'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Desktop Fixed Sidebar Widget (Option 2 - smaller, bottom-right) */}
      {!showCompare && !showSources && compareList.length > 0 && !isMobile && (
        <div className="desktop-compare-widget animate-fade-in">
          <div className="desktop-compare-widget-header">
            <span>Compare Selected</span>
            <span className="desktop-compare-badge">{compareList.length}</span>
          </div>
          <div className="desktop-compare-widget-list">
            {compareProducts.map(product => {
              const mfg = getManufacturer(product.manufacturer_id);
              return (
                <div key={product.id} className="desktop-compare-widget-item">
                  <div className="desktop-compare-item-info">
                    <span className="desktop-compare-item-mfg">{mfg?.name_en}</span>
                    <span className="desktop-compare-item-model" title={product.model_name}>{product.model_name}</span>
                  </div>
                  <span className="desktop-compare-remove" onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }} title="Remove">✕</span>
                </div>
              );
            })}
          </div>
          <div className="desktop-compare-widget-action">
            <button 
              className="glass-btn primary-btn desktop-compare-btn-full"
              onClick={() => {
                setShowCompare(true);
                setShowSources(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Compare Now →
            </button>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Buttons */}
      {!showCompare && !showSources && (
        <div className="mobile-fab-container">
          <button className="mobile-fab-btn mobile-fab-secondary glass-panel hover-lift" onClick={() => setShowQuickSelect(true)}>
            <span className="fab-icon">🔍</span>
            <span className="mobile-fab-btn-text">Select ({compareList.length}/4)</span>
          </button>
          {compareList.length > 0 && (
            <button className="mobile-fab-btn mobile-fab-primary hover-lift animate-pulse-subtle" onClick={() => {
              setShowCompare(true);
              setShowSources(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <span className="fab-icon">📊</span>
              <span className="mobile-fab-btn-text">Compare Now ({compareList.length})</span>
            </button>
          )}
        </div>
      )}

      {/* Quick Select Drawer Component */}
      {showQuickSelect && (
        <div className="drawer-overlay animate-fade-in" onClick={() => setShowQuickSelect(false)}>
          <div className="drawer-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Quick Select Scanners</h3>
              <button className="drawer-close-btn" onClick={() => setShowQuickSelect(false)}>✕</button>
            </div>
            
            <p className="drawer-subtitle">Select up to 4 models to compare ({compareList.length}/4)</p>
            
            <div className="drawer-search-wrapper">
              <span className="drawer-search-icon">🔍</span>
              <input
                type="text"
                className="drawer-search-input"
                placeholder="Search scanner name or brand..."
                value={drawerSearch}
                onChange={e => setDrawerSearch(e.target.value)}
              />
              {drawerSearch && (
                <button className="drawer-search-clear" onClick={() => setDrawerSearch('')}>✕</button>
              )}
            </div>
            
            <div className="drawer-list">
              {filteredDrawerProducts.map(product => {
                const mfg = getManufacturer(product.manufacturer_id);
                const inCompare = isInCompare(product.id);
                return (
                  <div key={product.id} className={`drawer-item ${inCompare ? 'drawer-item--selected' : ''}`} onClick={() => toggleCompare(product.id)}>
                    <div className="drawer-item-info">
                      <span className="drawer-item-mfg">{mfg ? mfg.name_en : ''}</span>
                      <span className="drawer-item-model">{product.model_name}</span>
                      <span className="drawer-item-category">{product.category}</span>
                    </div>
                    <div className="drawer-item-checkbox">
                      <input
                        type="checkbox"
                        checked={inCompare}
                        onChange={() => {}} // handled by parent onClick
                        disabled={!inCompare && compareList.length >= 4}
                      />
                    </div>
                  </div>
                );
              })}
              {filteredDrawerProducts.length === 0 && (
                <div className="drawer-empty">No matching scanners found.</div>
              )}
            </div>
            
            <div className="drawer-footer">
              <button 
                className="glass-btn primary-btn drawer-compare-btn" 
                disabled={compareList.length < 2}
                onClick={() => {
                  setShowCompare(true);
                  setShowSources(false);
                  setShowQuickSelect(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                📊 Compare Selected ({compareList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal Overlay */}
      {activeDetailProduct && (
        <div className="drawer-overlay animate-fade-in" onClick={() => setActiveDetailProduct(null)}>
          <div className="detail-modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="detail-modal-title-group">
                <span className="drawer-item-mfg">
                  {getManufacturer(activeDetailProduct.manufacturer_id)?.name_en}
                </span>
                <h3>{activeDetailProduct.model_name}</h3>
                <span className="th-tier-badge">{activeDetailProduct.category}</span>
              </div>
              <button className="drawer-close-btn" onClick={() => setActiveDetailProduct(null)}>✕</button>
            </div>
            
            <div className="detail-modal-body">
              <p className="detail-description">{activeDetailProduct.description}</p>
              
              <div className="detail-meta-row">
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Release Year</span>
                  <span className="detail-meta-val">{activeDetailProduct.release_year}</span>
                </div>
                <div className="detail-meta-item completeness-item" style={{ flexGrow: 1 }}>
                  <span className="detail-meta-label">Data Completeness (数据完整度)</span>
                  <div className="completeness-bar-wrapper" title="与本库中最全的机型数据进行横向对比的完整度得分">
                    <div className="completeness-bar-fill" style={{ width: `${productCompletenessScores[activeDetailProduct.id]}%` }}></div>
                    <span className="completeness-bar-text">{productCompletenessScores[activeDetailProduct.id]}%</span>
                  </div>
                </div>
                {activeDetailProduct.fda_510k_number && (
                  <div className="detail-meta-item">
                    <span className="detail-meta-label">FDA 510(k)</span>
                    <span className="detail-meta-val">
                      <a 
                        href={`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${activeDetailProduct.fda_510k_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link"
                      >
                        {activeDetailProduct.fda_510k_number} ↗
                      </a>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="detail-specs-section">
                {Object.entries(activeDetailProduct.specifications).map(([catName, specsObj]) => {
                  const hasSpecs = Object.values(specsObj).some(spec => spec.value !== null && spec.value !== undefined && spec.value !== '');
                  if (!hasSpecs) return null;
                  
                  return (
                    <div key={catName} className="detail-spec-category">
                      <h4 className="detail-category-title">{catName}</h4>
                      <div className="detail-spec-list">
                        {Object.entries(specsObj).map(([key, spec]) => {
                          if (spec.value === null || spec.value === undefined || spec.value === '') return null;
                          return (
                            <div key={key} className="detail-spec-row">
                              <span className="detail-spec-label">{spec.label || key}</span>
                              <span className="detail-spec-value">
                                {spec.value} <span className="spec-val-unit">{spec.unit}</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeDetailProduct.fda_clearance_details && (
                <div className="detail-spec-category fda-clearance-card" style={{ marginTop: '20px', marginBottom: '24px' }}>
                  <h4 className="detail-category-title fda-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🛡️</span> FDA 510(k) Clearance & Parameters (FDA 510k 准入与提取详情)
                  </h4>
                  
                  <div className="fda-details-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                    {activeDetailProduct.fda_clearance_details.submitter && (
                      <div className="fda-detail-row">
                        <span className="fda-detail-label">Submitter (申请机构)</span>
                        <span className="fda-detail-value">{activeDetailProduct.fda_clearance_details.submitter}</span>
                      </div>
                    )}
                    
                    {activeDetailProduct.fda_clearance_details.predicate_devices && activeDetailProduct.fda_clearance_details.predicate_devices.length > 0 && (
                      <div className="fda-detail-row">
                        <span className="fda-detail-label">Predicate Devices (对比前代)</span>
                        <span className="fda-detail-value">
                          <div className="predicate-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {activeDetailProduct.fda_clearance_details.predicate_devices.map((pred, idx) => (
                              <a
                                key={idx}
                                href={`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${pred}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="predicate-badge"
                              >
                                {pred} ↗
                              </a>
                            ))}
                          </div>
                        </span>
                      </div>
                    )}

                    {activeDetailProduct.fda_clearance_details.cleared_clinical_indications && activeDetailProduct.fda_clearance_details.cleared_clinical_indications.length > 0 && (
                      <div className="fda-detail-row">
                        <span className="fda-detail-label">Cleared Clinical Indications (获批临床适用)</span>
                        <span className="fda-detail-value">
                          <div className="fda-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {activeDetailProduct.fda_clearance_details.cleared_clinical_indications.map((ind, idx) => (
                              <span key={idx} className="fda-tag clinical-tag">
                                🩺 {ind}
                              </span>
                            ))}
                          </div>
                        </span>
                      </div>
                    )}

                    {activeDetailProduct.fda_clearance_details.cleared_software_features && activeDetailProduct.fda_clearance_details.cleared_software_features.length > 0 && (
                      <div className="fda-detail-row">
                        <span className="fda-detail-label">Cleared Software Features (获批软件特性)</span>
                        <span className="fda-detail-value">
                          <div className="fda-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {activeDetailProduct.fda_clearance_details.cleared_software_features.map((feat, idx) => (
                              <span key={idx} className="fda-tag software-tag">
                                💻 {feat}
                              </span>
                            ))}
                          </div>
                        </span>
                      </div>
                    )}

                    {activeDetailProduct.fda_clearance_details.reconstruction_algorithms && activeDetailProduct.fda_clearance_details.reconstruction_algorithms.length > 0 && (
                      <div className="fda-detail-row">
                        <span className="fda-detail-label">Reconstruction Algorithms (重建算法)</span>
                        <span className="fda-detail-value">
                          <div className="fda-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {activeDetailProduct.fda_clearance_details.reconstruction_algorithms.map((algo, idx) => (
                              <span key={idx} className="fda-tag algo-tag">
                                🧬 {algo}
                              </span>
                            ))}
                          </div>
                        </span>
                      </div>
                    )}

                    {activeDetailProduct.fda_clearance_details.extracted_technical_specs && Object.keys(activeDetailProduct.fda_clearance_details.extracted_technical_specs).length > 0 && (
                      <div className="fda-detail-row">
                        <span className="fda-detail-label">Extracted Technical Specs (FDA提取指标)</span>
                        <span className="fda-detail-value">
                          <div className="fda-tech-specs" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                            {Object.entries(activeDetailProduct.fda_clearance_details.extracted_technical_specs).map(([specKey, specVal]) => (
                              <div key={specKey} className="fda-tech-spec-item">
                                <span className="fda-tech-key">{specKey}:</span>
                                <span className="fda-tech-val">{specVal}</span>
                              </div>
                            ))}
                          </div>
                        </span>
                      </div>
                    )}
                  </div>

                  {activeDetailProduct.fda_clearance_details.indications_for_use_summary && (
                    <div className="fda-summary-block" style={{ marginTop: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                      <details className="fda-details-accordion">
                        <summary className="fda-accordion-summary">
                          <strong>Indications for Use (临床适用证摘要)</strong>
                        </summary>
                        <p className="fda-accordion-content">
                          {activeDetailProduct.fda_clearance_details.indications_for_use_summary}
                        </p>
                      </details>
                    </div>
                  )}

                  {activeDetailProduct.fda_clearance_details.device_description_summary && (
                    <div className="fda-summary-block" style={{ marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                      <details className="fda-details-accordion">
                        <summary className="fda-accordion-summary">
                          <strong>Device Description (申报设备描述)</strong>
                        </summary>
                        <p className="fda-accordion-content">
                          {activeDetailProduct.fda_clearance_details.device_description_summary}
                        </p>
                      </details>
                    </div>
                  )}
                </div>
              )}

              {activeDetailProduct.features && activeDetailProduct.features.length > 0 && (
                <div className="detail-spec-category">
                  <h4 className="detail-category-title">Key Features & Technologies</h4>
                  <div className="feature-tags-row">
                    {activeDetailProduct.features.map((f, i) => (
                      <span key={i} className="feature-tag">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeDetailProduct.clinical_trials && activeDetailProduct.clinical_trials.length > 0 && (
                <div className="detail-spec-category">
                  <h4 className="detail-category-title">Clinical Trials</h4>
                  <div className="detail-links-grid">
                    {activeDetailProduct.clinical_trials.map((trialId) => (
                      <a
                        key={trialId}
                        href={`https://clinicaltrials.gov/study/${trialId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="trial-link-badge"
                      >
                        🧬 {trialId} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {activeDetailProduct.service_manuals && activeDetailProduct.service_manuals.length > 0 && (
                <div className="detail-spec-category">
                  <h4 className="detail-category-title">Service Manuals & Documentation</h4>
                  <div className="detail-links-grid">
                    {activeDetailProduct.service_manuals.map((manual, i) => (
                      <a
                        key={i}
                        href={manual.url || manual}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manual-link-badge"
                      >
                        📖 {manual.title || `Service Manual ${i+1}`} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer glass-panel">
        <div className="footer-content">
          <div className="footer-brand">
            <h4>CT-SpecHub</h4>
            <p>高阶 CT 扫描仪技术规格参考平台 (Premium CT Scanner Technical Reference Platform)</p>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-contact">
            <h5>联系作者 (Contact Me)</h5>
            <div className="contact-methods">
              <a 
                href="mailto:lxymark999@gmail.com" 
                className="contact-link glass-btn"
                title="点击发送邮件联系我"
              >
                <span className="contact-icon">📧</span>
                <span className="contact-text">
                  电子邮件 (Email): <strong className="email-highlight">lxymark999@gmail.com</strong>
                </span>
                <span className="click-hint">点击发送 ↗</span>
              </a>
            </div>
            <p className="contact-note">如有任何技术交流、数据纠错或业务合作意向，欢迎随时来信。</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CT-SpecHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
