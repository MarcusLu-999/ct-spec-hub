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
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto compact logic on mobile when comparing > 2 products
  useEffect(() => {
    if (isMobile && compareList.length > 2) {
      setIsCompact(true);
    } else {
      setIsCompact(false);
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
          <h1>
            <span className="gradient-text">CT-SpecHub</span>
          </h1>
          <p>Global CT Scanner Database & Comparison Engine</p>
        </div>
      </header>

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

      {!showCompare && (
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
        {showCompare && compareProducts.length >= 2 ? (
          <section className="compare-section animate-fade-in">
            <div className="compare-header-row">
              <h2 className="section-title gradient-text">Multi-dimensional Benchmarking</h2>
              <button className="clear-compare-btn glass-btn" onClick={() => { setCompareList([]); setShowCompare(false); }}>
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
              <div className="view-density-toggle">
                <span className="density-label">🔍 视图缩放 (Zoom):</span>
                <button 
                  className={`density-btn ${!isCompact ? 'active' : ''}`} 
                  onClick={() => setIsCompact(false)}
                  title="标准视图"
                >
                  100%
                </button>
                <button 
                  className={`density-btn ${isCompact ? 'active' : ''}`} 
                  onClick={() => setIsCompact(true)}
                  title="紧凑缩放视图"
                >
                  80% (紧凑)
                </button>
              </div>
            </div>

            <div className={`compare-table-wrapper glass-panel ${isCompact ? 'compact-view' : ''}`}>
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
              <button className="glass-btn primary-btn" onClick={() => setShowCompare(false)}>← Back to Catalog</button>
            </div>
          </section>
        ) : (
          <section className="product-section animate-fade-in">
            <div className="section-header">
              <h2 className="section-title">Equipment Catalog</h2>
              <p className="section-subtitle">Showing {filteredProducts.length} high-end systems</p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="empty-state glass-panel">
                <div className="empty-icon">🔭</div>
                <h3>No Results Found</h3>
                <p>Try adjusting your search filters to find what you're looking for.</p>
                <button className="glass-btn primary-btn" onClick={resetFilters}>Reset All Filters</button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => {
                  const mfg = getManufacturer(product.manufacturer_id);
                  const inCompare = isInCompare(product.id);
                  return (
                    <div key={product.id} className={`product-card glass-panel hover-lift ${inCompare ? 'product-card--selected' : ''}`}>
                      <div className="card-header">
                        <span className="mfg-badge">{mfg ? mfg.name_en : ''}</span>
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
                             const allFlatSpecs = [];
                             Object.values(product.specifications).forEach(cat => {
                                Object.values(cat).forEach(spec => {
                                  if (spec && spec.value !== null && spec.value !== undefined && spec.value !== '') {
                                    allFlatSpecs.push(spec);
                                  }
                                });
                             });
                             // Show the most impressive specs first
                             return allFlatSpecs.slice(0, 4).map((spec, idx) => (
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
            )}
          </section>
        )}
      </main>

      {/* Mobile Floating Action Buttons */}
      {!showCompare && (
        <div className="mobile-fab-container">
          <button className="mobile-fab-btn mobile-fab-secondary glass-panel hover-lift" onClick={() => setShowQuickSelect(true)}>
            <span className="fab-icon">🔍</span>
            <span className="mobile-fab-btn-text">Select ({compareList.length}/4)</span>
          </button>
          {compareList.length > 0 && (
            <button className="mobile-fab-btn mobile-fab-primary hover-lift animate-pulse-subtle" onClick={() => {
              setShowCompare(true);
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
    </div>
  );
}

export default App;
