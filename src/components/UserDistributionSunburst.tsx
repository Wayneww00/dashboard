import React, { useState, useEffect } from 'react';
import { Layers, Globe, Users, Lightbulb, Info, Megaphone, User, Leaf, Share2, ArrowRight, ChevronDown } from 'lucide-react';

const UserDistributionSunburst = () => {
  const [selectedRegion, setSelectedRegion] = useState('Global');

  // 地区列表
  const regions = ['Global', 'EU', 'Mena', 'Latam', 'Asia', 'Africa', 'Others'];

  // 根据地区动态生成数据逻辑
  const getRegionalData = (region: string) => {
    let scale = 1;
    let total = 4050;
    let globalRatio = '100%';

    const r = region.toUpperCase();
    if (r === 'GLOBAL') {
      total = 11250;
      globalRatio = '100%';
    } else if (r === 'ASIA') {
      total = Math.round(4050 * 1.4);
      globalRatio = '45%';
    } else if (r === 'EU') {
      total = 4050;
      globalRatio = '36%';
    } else if (r === 'MENA') {
      total = 1215;
      globalRatio = '12%';
    } else if (r === 'LATAM') {
      total = 810;
      globalRatio = '8%';
    } else if (r === 'AFRICA') {
      total = 520;
      globalRatio = '5%';
    } else {
      total = 405;
      globalRatio = '4%';
    }
    
    // 基础比例
    const retailPct = 0.66;
    const ibPct = 0.34;
    
    const retailVal = Math.round(total * retailPct);
    const ibVal = total - retailVal;

    const paidPct = 0.22;
    const kolPct = 0.18;
    const organicPct = 0.16;
    const rafPct = 0.10; 
    
    return {
      total,
      globalRatio,
      ib: { val: ibVal, formatPct: '34%' },
      retail: {
        val: retailVal,
        formatPct: '66%',
        children: [
          { key: 'KOL', label: 'KOL', val: Math.round(total * kolPct), pct: '18%', icon: User },
          { key: 'Paid Ads', label: 'Paid Ads', val: Math.round(total * paidPct), pct: '22%', icon: Megaphone },
          { key: 'Organic', label: 'Organic', val: Math.round(total * organicPct), pct: '16%', icon: Leaf },
          { key: 'RAF', label: 'RAF', val: Math.round(total * rafPct), pct: '10%', icon: Users },
        ]
      }
    };
  };

  const [data, setData] = useState(getRegionalData('Global'));

  useEffect(() => {
    setData(getRegionalData(selectedRegion));
  }, [selectedRegion]);

  return (
    <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md z-40 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none text-slate-900">新增用户来源构成矩阵</h1>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Multi-Tier Growth Attribution</p>
          </div>
        </div>

        {/* 地区选择 Dropdown */}
        <div className="relative group">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer hover:bg-slate-100"
          >
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
            <ChevronDown size={14} />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shrink-0">
          <div className="bg-white p-5 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-emerald-500" />
              <span className="text-xs text-slate-500 font-bold tracking-tight">总新增用户</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">{data.total.toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-400">人</span>
            </div>
          </div>
          <div className="bg-white p-5 flex flex-col items-center justify-center">
             <div className="flex items-center gap-2 mb-2">
              <Globe size={18} className="text-emerald-500" />
              <span className="text-xs text-slate-500 font-bold tracking-tight">占全球新增比例</span>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">{data.globalRatio}</div>
          </div>
        </div>

        {/* Matrix Visual Area */}
        <div className="flex gap-4 h-[440px] shrink-0">
          
          {/* Left Column: Retail */}
          <div className="flex-[1.8] flex flex-col bg-[#72926B] rounded-2xl overflow-hidden shadow-sm">
            {/* Upper Main Stats */}
            <div className="p-5 flex flex-col flex-1 relative">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-extrabold text-white tracking-tight">RETAIL（直营渠道）</span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-bold text-white uppercase tracking-widest ring-1 ring-white/20">占总新增 {data.retail.formatPct}</span>
              </div>
              
              <div className="flex flex-col mt-2">
                <div className="text-4xl font-black text-white tracking-tighter leading-tight tabular-nums">{data.retail.formatPct}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-base font-bold text-white tabular-nums">{data.retail.val.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wide">Users (New)</span>
                </div>
                <div className="text-[9px] font-bold text-white/40 mt-3 uppercase tracking-[0.15em]">Distribution: {data.retail.formatPct}</div>
              </div>
            </div>

            {/* Lower Breakdown Section */}
            <div className="m-2 bg-[#E9F3ED] rounded-xl p-4 flex flex-col">
              <div className="text-[9px] font-bold text-[#567652] mb-3 uppercase tracking-[0.12em] opacity-80">Retail Internal Breakdown (of Total New)</div>
              <div className="grid grid-cols-4 gap-3">
                {data.retail.children.map(child => {
                  const Icon = child.icon;
                  return (
                    <div key={child.key} className="bg-white rounded-xl p-3 flex flex-col shadow-sm border border-[#D1E5DA]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#F0F7F3] flex items-center justify-center">
                          <Icon size={12} className="text-[#72926B]" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{child.label}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-black text-slate-900 leading-none tabular-nums">{child.pct}</span>
                        <span className="text-[9px] font-bold text-slate-400 mt-2 tabular-nums">{child.val.toLocaleString()} ppl</span>
                        <div className="text-[7px] font-bold text-slate-300 mt-1 uppercase tracking-widest">Ratio {child.pct}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: IB & Affiliate */}
          <div className="flex-1 flex flex-col bg-[#232B3B] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 flex flex-col flex-1 relative">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-extrabold text-white tracking-tight leading-tight max-w-[120px]">IB & AFFILIATE（经纪商联盟）</span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-bold text-white uppercase tracking-widest ring-1 ring-white/10">Share {data.ib.formatPct}</span>
              </div>
              
              <div className="flex flex-col mt-2">
                <div className="text-4xl font-black text-white tracking-tighter leading-tight tabular-nums">{data.ib.formatPct}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-base font-bold text-white tabular-nums">{data.ib.val.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide">Users (New)</span>
                </div>
                <div className="text-[9px] font-bold text-white/30 mt-3 uppercase tracking-[0.15em]">Distribution: {data.ib.formatPct}</div>
              </div>
            </div>

            {/* Placeholder Empty Section */}
            <div className="m-2 min-h-[140px] border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <div className="flex justify-center"><Info size={16} className="text-white/20" /></div>
                <p className="text-[10px] font-medium text-white/40 leading-relaxed">
                  当前未展开子渠道拆分<br/>
                  (如需查看，请前往渠道明细分析)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/60 flex items-center gap-3 text-xs text-slate-700 font-bold shadow-sm">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Lightbulb size={12} className="text-emerald-600" />
          </div>
          <span>结构洞察：Retail 渠道贡献 {data.retail.formatPct} 的新增，其中付费广告占比次之（{data.retail.children[1].pct}），KOL 驱动特征明显。</span>
        </div>

      </div>

      {/* Footer */}
      <footer className="px-6 py-4 bg-white border-t border-slate-100 flex justify-between items-center z-40 shrink-0">
         <div className="flex gap-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5 leading-none">
              <div className="w-3 h-3 rounded-[3px] bg-[#72926B]"></div> 
              <span className="mt-0.5">Retail (直营)</span>
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <div className="w-3 h-3 rounded-[3px] bg-[#E9F3ED] border border-[#D1E5DA]"></div> 
              <span className="mt-0.5">Retail Breakdown</span>
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <div className="w-3 h-3 rounded-[3px] bg-[#232B3B]"></div> 
              <span className="mt-0.5">IB & Affiliate</span>
            </div>
            <div className="flex items-center gap-1.5 ml-4 leading-none text-slate-400/80 normal-case tracking-normal">
              <Info size={11} />
              <span className="mt-0.5">Ratios are based on Total New Users</span>
            </div>
         </div>
         <div className="text-slate-400 text-[10px] font-bold tabular-nums">
            UPDATED: 2024-06-30
         </div>
      </footer>
    </div>
  );
};

export default UserDistributionSunburst;

