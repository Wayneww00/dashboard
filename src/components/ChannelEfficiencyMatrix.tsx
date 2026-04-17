import React, { useState, useMemo } from 'react';
import { 
  Info, ArrowUpDown, ChevronDown, ChevronRight, TrendingUp, 
  AlertCircle, Download, Filter, Target, Zap, DollarSign, 
  Share2, MousePointer2, ExternalLink, HelpCircle
} from 'lucide-react';

const ChannelEfficiencyMatrix = () => {
  const [expandedRows, setExpandedRows] = useState(['retail', 'paid_ads']);

  // 1. 模拟数据模型
  const hierarchicalData = [
    {
      id: 'ib_affiliate',
      channel: 'IB & Affiliate',
      level: 1,
      spend: 18400, signup: 5.2, kyc: 12.0, ftd: 42.0, ftt: 55.0, roi: 920, ltv: 8.5
    },
    {
      id: 'retail',
      channel: 'Retail',
      level: 1,
      spend: 72150, signup: 14.5, kyc: 28.0, ftd: 98.0, ftt: 132.0, roi: 508, ltv: 3.9,
      children: [
        { id: 'kol', channel: 'KOL', level: 2, spend: 25000, signup: 8.5, kyc: 18.0, ftd: 65.0, ftt: 82.0, roi: 720, ltv: 5.8 },
        { 
          id: 'paid_ads', 
          channel: '投放 Paid ads', 
          level: 2, 
          spend: 24750, signup: 18.2, kyc: 38.0, ftd: 120.0, ftt: 155.0, roi: 450, ltv: 3.2,
          children: [
            { id: 'dsp', channel: 'DSP', level: 3, spend: 5000, signup: 15.0, kyc: 30.0, ftd: 95.0, ftt: 125.0, roi: 480, ltv: 3.5 },
            { id: 'asa', channel: 'ASA', level: 3, spend: 10400, signup: 22.0, kyc: 42.0, ftd: 145.0, ftt: 195.0, roi: 320, ltv: 2.1 },
            { id: 'google_ads', channel: 'Google Ads', level: 3, spend: 9350, signup: 12.5, kyc: 25.0, ftd: 85.0, ftt: 105.0, roi: 557, ltv: 4.2 }
          ]
        },
        { id: 'organic', channel: 'Organic', level: 2, spend: 17000, signup: 4.2, kyc: 8.5, ftd: 35.0, ftt: 48.0, roi: 1120, ltv: 9.5 },
        { id: 'raf', channel: 'RAF（Refer a Friend）', level: 2, spend: 5400, signup: 5.5, kyc: 12.0, ftd: 45.0, ftt: 58.0, roi: 890, ltv: 8.2 }
      ]
    }
  ];

  const flattenedData = useMemo(() => {
    const result = [];
    const walk = (nodes) => {
      nodes.forEach(node => {
        result.push(node);
        if (expandedRows.includes(node.id) && node.children) {
          walk(node.children);
        }
      });
    };
    walk(hierarchicalData);
    return result;
  }, [expandedRows]);

  // 2. 动态计算每列的最大值，用于热力渐变缩放
  const maxValues = useMemo(() => {
    const vals = { signup: 0, kyc: 0, ftd: 0, ftt: 0, roi: 0, ltv: 0 };
    flattenedData.forEach(row => {
      if (row.level > 1) { // 仅计算执行层，避免 L1 汇总值拉大间距
        vals.signup = Math.max(vals.signup, row.signup);
        vals.kyc = Math.max(vals.kyc, row.kyc);
        vals.ftd = Math.max(vals.ftd, row.ftd);
        vals.ftt = Math.max(vals.ftt, row.ftt);
        vals.roi = Math.max(vals.roi, row.roi);
        vals.ltv = Math.max(vals.ltv, row.ltv);
      }
    });
    return vals;
  }, [flattenedData]);

  const toggleRow = (id) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]);
  };

  // 3. 高级热力渐变函数
  const getHeatmapStyle = (val, type, columnMax, level) => {
    if (level === 1) return {}; // 第一层保持中性
    const ratio = columnMax > 0 ? val / columnMax : 0;
    // 增加非线性偏移，确保即使是低数值也有基础底色
    const opacity = 0.02 + (ratio * 0.28); 
    const color = type === 'profit' ? '16, 185, 129' : '244, 63, 94';
    return { backgroundColor: `rgba(${color}, ${opacity})` };
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-md">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">各渠道获客成本与 ROI 矩阵</h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Intelligent Gradient Attribution Matrix</p>
          </div>
        </div>
      </header>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">获客渠道</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">渠道总成本</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">注册成本</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">KYC 成本</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">FTD 成本</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">FTT 成本</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                <div className="flex items-center justify-end gap-1 relative group">
                  ROI
                  <HelpCircle size={12} className="text-slate-400 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-max bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg z-50 normal-case tracking-normal">
                    ROI = Net Deposit / 渠道总成本
                    <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {flattenedData.map((row) => (
              <tr key={row.id} className={`group transition-all duration-300 ${row.level === 1 ? 'bg-slate-50/30' : 'hover:bg-slate-50/60'}`}>
                <td className="p-4">
                  <div className="flex items-center gap-2" style={{ paddingLeft: `${(row.level - 1) * 24}px` }}>
                    {row.children ? (
                      <button onClick={() => toggleRow(row.id)} className={`w-5 h-5 rounded flex items-center justify-center shadow-sm transition-all ${expandedRows.includes(row.id) ? 'bg-white text-slate-600 border border-slate-200' : 'bg-emerald-500 text-white shadow-emerald-500/20'}`}>
                        {expandedRows.includes(row.id) ? <ChevronDown size={12} strokeWidth={3} /> : <ChevronRight size={12} strokeWidth={3} />}
                      </button>
                    ) : <div className="w-5 h-5 flex items-center justify-center opacity-20"><div className="w-1 h-1 rounded-full bg-slate-900" /></div>}
                    <span className={`${row.level === 1 ? 'font-bold text-slate-900 text-sm' : 'font-semibold text-slate-700 text-xs'} truncate`}>{row.channel}</span>
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-slate-500 text-xs tabular-nums">${row.spend.toLocaleString()}</td>
                {/* 成本列：数值越大，红色越深 */}
                <td className="p-4 text-right font-bold text-xs tabular-nums transition-colors duration-500" style={getHeatmapStyle(row.signup, 'cost', maxValues.signup, row.level)}>${row.signup.toFixed(1)}</td>
                <td className="p-4 text-right font-bold text-xs tabular-nums transition-colors duration-500" style={getHeatmapStyle(row.kyc, 'cost', maxValues.kyc, row.level)}>${row.kyc.toFixed(1)}</td>
                <td className="p-4 text-right font-bold text-xs tabular-nums transition-colors duration-500" style={getHeatmapStyle(row.ftd, 'cost', maxValues.ftd, row.level)}>${row.ftd.toFixed(1)}</td>
                <td className="p-4 text-right font-bold text-xs tabular-nums transition-colors duration-500" style={getHeatmapStyle(row.ftt, 'cost', maxValues.ftt, row.level)}>${row.ftt.toFixed(1)}</td>
                {/* LTV/CAC 列：数值越大，绿色越深 */}
                <td className="p-4 text-right font-bold text-xs transition-colors duration-500" style={getHeatmapStyle(row.ltv, 'profit', maxValues.ltv, row.level)}>
                  <span className={`${row.ltv > 5 ? 'text-emerald-600' : row.ltv > 3 ? 'text-slate-700' : 'text-rose-600'}`}>{row.ltv}x</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend & Summary Bar */}
      <div className="px-6 py-4 flex justify-between items-center border-t border-slate-50 text-[10px] font-bold uppercase tracking-widest">
         <div className="flex gap-6 items-center">
           <div className="flex items-center gap-1.5">
             <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30 border border-emerald-500/50"></div>
             <span className="text-slate-400">效率高 (High Efficiency)</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-2.5 h-2.5 rounded-sm bg-rose-500/30 border border-rose-500/50"></div>
             <span className="text-slate-400">成本高 (High Cost Alert)</span>
           </div>
         </div>
         <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 group transition-colors">
            查看完整获客漏斗归因分析 <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

      {/* Insight Cards Section */}
      <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
         
         <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50 flex flex-col justify-between h-full group hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
           <div>
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] mb-3">
                <TrendingUp size={14} /> BEST CHANNEL
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">SEO (Organic) 稳居首位</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                LTV/CAC 高达 <span className="text-emerald-600 font-bold">12.4x</span>，且获客成本仅为大盘均值的 20%。建议强化内容深度，沉淀长效私域流量。
              </p>
           </div>
         </div>

         <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100/50 flex flex-col justify-between h-full group hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300">
           <div>
              <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[10px] mb-3">
                <AlertCircle size={14} /> BUDGET ALERT
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">Apple Search Ads 风险</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                FTT 转化成本达 <span className="text-rose-600 font-bold">$195.0</span>，出现成本倒挂迹象。需紧急排查关键词精准度与首屏流失率。
              </p>
           </div>
         </div>

         <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 flex flex-col justify-between h-full group hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
           <div>
              <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] mb-3">
                <Zap size={14} /> OVERALL INSIGHT
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">全渠道 ROI: 508.4%</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                当前营销组合整体健康。FTT 是提升 ROI 的最大杠杆，建议优化支付链路，减少注册后的首笔转化摩擦。
              </p>
           </div>
         </div>

      </div>

    </div>
  );
};

export default ChannelEfficiencyMatrix;
