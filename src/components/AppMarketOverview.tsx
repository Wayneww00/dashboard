import React, { useState } from 'react';
import { Target, Star, TrendingUp, TrendingDown, AlertCircle, ThumbsUp, ArrowUpRight, ArrowDownRight, Info, Calendar, ChevronDown, Trophy, Lightbulb, MessageSquare, Activity, List, ChevronUp, Clock, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const AppMarketOverview = () => {
  const [platform, setPlatform] = useState('App Store');
  const [region, setRegion] = useState('Global');
  const [trendTab, setTrendTab] = useState('评论量');
  const [selectedComp, setSelectedComp] = useState<string | null>(null);

  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const trendData = months.map((m, i) => {
    // Generate some mock data for 12 months for Vantage
    const baseScore = 4.2 + (i * 0.05);
    const baseDownloads = 100000 + (i * 12000);
    const baseReviews = 10000 + (i * 1500);

    // Mock data for a selected competitor if any
    const compScore = selectedComp ? baseScore - (Math.random() * 0.3) : undefined;
    const compDownloads = selectedComp ? baseDownloads * (0.8 + Math.random() * 0.4) : undefined;
    const compReviews = selectedComp ? baseReviews * (0.7 + Math.random() * 0.5) : undefined;
    
    return { 
      name: m, 
      score: Number(baseScore.toFixed(1)), 
      downloads: Math.round(baseDownloads), 
      reviews: Math.round(baseReviews), 
      displayReviews: `${(baseReviews / 1000).toFixed(1)}k`,
      compScore: compScore ? Number(compScore.toFixed(1)) : undefined,
      compDownloads: compDownloads ? Math.round(compDownloads) : undefined,
      compReviews: compReviews ? Math.round(compReviews) : undefined,
    }
  });

  const getChartConfig = () => {
    switch (trendTab) {
      case '下载量': return { key: 'downloads', compKey: 'compDownloads', label: 'downloads' };
      case '评分': return { key: 'score', compKey: 'compScore', label: 'score' };
      case '评论量':
      default: return { key: 'reviews', compKey: 'compReviews', label: 'reviews' };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="h-full bg-slate-50/50 rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden font-sans">
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
            <Target className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">应用市场口碑摘要</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-medium text-gray-500">核心口碑表现与竞品对比 (近30天)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
            {['App Store', 'Google Play'].map(p => (
              <button 
                key={p} 
                onClick={() => setPlatform(p)} 
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${platform === p ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {p}
              </button>
            ))}
          </div>
          
          {/* 地区选择 Dropdown */}
          <div className="relative group">
            <select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400 transition-all cursor-pointer hover:bg-slate-100"
            >
              {['Global', 'EU', 'Mena', 'Latam', 'Asia', 'Africa', 'Others'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Calendar size={14} className="text-gray-400" />
            <span>2024-01-01 ~ 2024-06-30</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-4">
        {/* Top 2 Cards (After removing Card 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-4">
          
          {/* Card 1: 核心口碑概览 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="text-base font-bold text-gray-900">核心口碑概览</span>
              <Info size={14} className="text-gray-400" />
            </div>
            
            <div className="flex items-center gap-6 mb-5">
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[44px] font-black text-slate-800 tracking-tighter leading-none">4.7</span>
                  <span className="text-lg font-bold text-gray-400">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4].map(i => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
                  <div className="relative">
                    <Star size={18} className="text-amber-400" />
                    <div className="absolute top-0 left-0 overflow-hidden w-[70%]">
                      <Star size={18} className="fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-start pb-2">
                <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm mb-1">
                  <TrendingUp size={16} />
                  <span className="text-base">0.2</span>
                </div>
                <div className="text-[11px] text-gray-400 font-medium">较上月</div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 mb-6 mt-2"></div>

            <div className="grid grid-cols-3 gap-0 mb-6 divide-x divide-gray-100">
              <div className="pr-2">
                <div className="text-[11px] text-gray-500 font-medium mb-2">评论总量</div>
                <div className="text-xl font-bold text-slate-800 mb-2">23.5k</div>
                <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-bold mb-1">
                  <ArrowUpRight size={12} /><span>12%</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">较上月</div>
              </div>
              
              <div className="px-4">
                <div className="text-[11px] text-gray-500 font-medium mb-2">5星占比</div>
                <div className="text-xl font-bold text-slate-800 mb-2">71%</div>
                <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-bold mb-1">
                  <ArrowUpRight size={12} /><span>3pct</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">较上月</div>
              </div>
              
              <div className="pl-4">
                <div className="text-[11px] text-gray-500 font-medium mb-2">好评率 (4-5星)</div>
                <div className="text-xl font-bold text-slate-800 mb-2">89%</div>
                <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-bold mb-1">
                  <ArrowUpRight size={12} /><span>2pct</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">较上月</div>
              </div>
            </div>

            <div className="mt-auto bg-[#f0fcf6] rounded-xl p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
                <ThumbsUp size={13} className="text-white fill-white" />
              </div>
              <div className="text-xs text-gray-700 leading-tight font-medium">
                口碑质量领先主要竞品，但评论规模仍有提升<span className="text-emerald-500 font-bold">空间</span>。
              </div>
            </div>
          </div>

          {/* Card 2: 评论主题洞察 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="text-sm font-bold text-gray-900 mb-6">评论主题洞察 <span className="text-xs text-gray-400 font-normal">(近30天)</span></div>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              {/* 正向 */}
              <div>
                <div className="text-[10px] font-bold text-emerald-400 mb-4">正向主题 TOP 3</div>
                <div className="space-y-4">
                  {[
                    { name: '易用性', pct: 28, change: 4, color: 'bg-emerald-400' },
                    { name: '交易体验', pct: 18, change: 2, color: 'bg-emerald-400' },
                    { name: '速度/流畅', pct: 12, change: 1, color: 'bg-emerald-400' },
                  ].map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-700 font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{item.pct}%</span>
                          <span className="text-[9px] text-emerald-400 font-bold flex items-center"><ArrowUpRight size={10}/>{item.change}ppt</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct * 2}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 负向 */}
              <div>
                <div className="text-[10px] font-bold text-rose-600 mb-4">负向主题 TOP 3</div>
                <div className="space-y-4">
                  {[
                    { name: '应用崩溃', pct: 12, change: 4, color: 'bg-rose-500' },
                    { name: '提现问题', pct: 9, change: 2, color: 'bg-rose-500' },
                    { name: '登录问题', pct: 6, change: 1, color: 'bg-rose-500' },
                  ].map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-700 font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{item.pct}%</span>
                          <span className="text-[9px] text-rose-500 font-bold flex items-center"><ArrowUpRight size={10}/>{item.change}ppt</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct * 4}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 代表性差评原声 - 优化布局 */}
            <div className="mt-auto flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                  <span className="text-[13px] font-bold text-slate-800">代表性差评原声</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-rose-50 text-rose-500 border border-rose-100 rounded-md font-bold">REVIEWS</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                  <ChevronDown size={12}/> 滑动查看更多
                </div>
              </div>

              <div className="bg-rose-50/20 border border-rose-100/40 rounded-2xl overflow-hidden">
                <div className="h-[100px] overflow-y-auto snap-y snap-mandatory scrollbar-hide p-2 space-y-2">
                  {[
                    { id: 1, text: "App crashes frequently. Very frustrating when trying to close a position.", date: "2024-06-28", rating: 1, tag: "稳定性" },
                    { id: 2, text: "Withdrawal has been pending for 3 days. Support is not answering.", date: "2024-06-26", rating: 1, tag: "出金" },
                    { id: 3, text: "Cannot login since yesterday. Kept saying wrong password but I just reset it.", date: "2024-06-25", rating: 2, tag: "登录" },
                    { id: 4, text: "Charts are lagging significantly during high volatility.", date: "2024-06-22", rating: 2, tag: "行情" },
                    { id: 5, text: "Customer service takes forever to reply. Disappointed.", date: "2024-06-20", rating: 1, tag: "服务" },
                  ].map(review => (
                    <div key={review.id} className="snap-start bg-white border border-rose-100/50 rounded-xl p-3 shadow-sm hover:border-rose-300 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
                            "{review.text}"
                          </p>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={8} className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                            ))}
                          </div>
                          <span className="text-[9px] px-1 bg-rose-50 text-rose-400 font-bold border border-rose-100/50 rounded">{review.tag}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                            <User size={10} className="text-slate-400" />
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold">匿名用户</span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] text-slate-400">
                          <Clock size={10} />
                          {review.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Section (Always Expanded) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50/30">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
                
                {/* Trend Chart */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-sm font-bold text-gray-900">{trendTab}趋势</span>
                      {selectedComp && (
                        <div className="flex items-center gap-3 mt-2 text-[10px] font-bold">
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> <span className="text-gray-600">Vantage</span></div>
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> <span className="text-gray-600">{selectedComp}</span></div>
                        </div>
                      )}
                    </div>
                    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                      {['评论量', '评分', '下载量'].map(t => (
                        <button 
                          key={t}
                          onClick={() => setTrendTab(t)}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold transition-colors ${trendTab === t ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end gap-6 mb-6">
                    <div className="text-3xl font-black text-gray-900 tracking-tight">23.5k</div>
                    <div className="flex gap-4 pb-1">
                      <div>
                        <div className="flex items-center gap-0.5 text-emerald-400 text-xs font-bold">
                          <ArrowUpRight size={12} /> 12%
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">较上月</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-0.5 text-emerald-400 text-xs font-bold">
                          <ArrowUpRight size={12} /> 48%
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">较去年同期</div>
                      </div>
                      <div className="border-l border-gray-100 pl-4">
                        <div className="text-[10px] text-gray-500 mb-0.5">vs 竞品均值</div>
                        <div className="text-rose-500 text-xs font-bold">-8%</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34d399" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <YAxis hide domain={['auto', 'auto']} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                        <Tooltip 
                          cursor={{ stroke: '#cbd5e1', strokeWidth: 1.5 }} 
                          content={(props: any) => {
                            if (props.active && props.payload && props.payload.length) {
                               const isScore = trendTab === '评分';
                               const formatVal = (val: number) => {
                                  if (isScore) return val.toFixed(1);
                                  if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
                                  return val;
                               };
                               return (
                                 <div className="bg-white p-3.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[140px]">
                                   <div className="text-[11px] font-bold text-slate-400 mb-2.5 pb-2 border-b border-slate-50 uppercase tracking-widest">{props.label} · {trendTab}</div>
                                   <div className="space-y-2">
                                     {props.payload.map((entry: any, index: number) => {
                                        const isComp = entry.dataKey.startsWith('comp');
                                        const name = isComp && selectedComp ? selectedComp : 'Vantage';
                                        const color = isComp ? '#8b5cf6' : '#34d399';
                                        return (
                                          <div key={index} className="flex justify-between items-center gap-6">
                                            <div className="flex items-center gap-1.5">
                                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                                              <span className="text-xs font-bold text-slate-600">{name}</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-900">{formatVal(entry.value)}</span>
                                          </div>
                                        );
                                     })}
                                   </div>
                                 </div>
                               );
                            }
                            return null;
                          }} 
                        />
                        
                        {/* Competitor Trend Line (if selected) */}
                        {selectedComp && (
                          <Area 
                            type="monotone" 
                            dataKey={chartConfig.compKey}
                            stroke="#8b5cf6" // purple for competitor
                            strokeWidth={2} 
                            fillOpacity={0.1} 
                            fill="#8b5cf6" 
                            activeDot={{ r: 5, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} 
                            strokeDasharray="4 4"
                          />
                        )}

                        {/* Vantage Trend Line */}
                        <Area 
                          type="monotone" 
                          dataKey={chartConfig.key}
                          stroke="#34d399" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorGreen)" 
                          activeDot={{ r: 6, fill: '#34d399', stroke: '#fff', strokeWidth: 3 }} 
                        >
                          {trendTab === '评论量' && !selectedComp && (
                            <LabelList dataKey="displayReviews" position="top" offset={10} style={{ fontSize: '10px', fill: '#475569', fontWeight: 'bold' }} />
                          )}
                        </Area>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Theme Insights */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-emerald-50 rounded flex items-center justify-center">
                      <List size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">竞品对比</span>
                  </div>
                  
                  <div className="flex-1">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-3 text-[10px] font-bold text-gray-400 font-medium">应用</th>
                          <th className="pb-3 text-[10px] font-bold text-gray-400 font-medium text-right">评分 (/5.0)</th>
                          <th className="pb-3 text-[10px] font-bold text-gray-400 font-medium text-right">评论总量</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { name: 'Vantage', isSelf: true, logo: 'V', rating: 4.7, ratingChange: 0.2, reviews: '23.5k', reviewsChange: 12 },
                          { name: 'Exness', isSelf: false, logo: 'EX', rating: 4.5, ratingChange: 0.1, reviews: '28.9k', reviewsChange: 18 },
                          { name: 'TradeMaster', isSelf: false, logo: 'TM', rating: 4.4, ratingChange: -0.1, reviews: '19.8k', reviewsChange: 5 },
                          { name: 'MetaNext', isSelf: false, logo: 'MN', rating: 4.6, ratingChange: 0.3, reviews: '15.6k', reviewsChange: 8 },
                        ].map((comp, idx) => (
                          <tr 
                            key={comp.name} 
                            onClick={() => !comp.isSelf && setSelectedComp(selectedComp === comp.name ? null : comp.name)}
                            className={`group ${!comp.isSelf ? 'cursor-pointer hover:bg-slate-50' : ''} ${selectedComp === comp.name ? 'bg-purple-50/50' : ''}`}
                          >
                            <td className="py-2.5 rounded-l-lg pl-2">
                              <div className="flex items-center gap-1.5">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${comp.isSelf ? 'bg-gray-900' : comp.name === 'Exness' ? 'bg-amber-500' : comp.name === 'TradeMaster' ? 'bg-blue-600' : 'bg-purple-600'} ${selectedComp === comp.name ? 'ring-2 ring-purple-200 ring-offset-1' : ''}`}>
                                  {comp.logo}
                                </div>
                                <span className={`text-xs font-bold ${selectedComp === comp.name ? 'text-purple-700' : 'text-gray-900'}`}>{comp.name}</span>
                                {comp.isSelf && <span className="text-[9px] text-gray-400 leading-none ml-0.5">(本应用)</span>}
                              </div>
                            </td>
                            <td className="py-2.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-xs font-bold text-gray-900">{comp.rating}</span>
                              </div>
                            </td>
                            <td className="py-2.5 text-right rounded-r-lg pr-2">
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-xs font-bold text-gray-900">{comp.reviews}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppMarketOverview;
