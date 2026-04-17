import React, { useState } from 'react';
import { Target, Star, TrendingUp, TrendingDown, AlertCircle, ThumbsUp, ArrowUpRight, ArrowDownRight, Info, Calendar, ChevronDown, Trophy, Lightbulb, MessageSquare, Activity, List, ChevronUp, Clock, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    let val = payload[0].value;
    if (payload[0].name !== 'score' && typeof val === 'number' && val >= 1000) {
      val = (val / 1000).toFixed(1) + 'k';
    }
    return (
      <div className="bg-white p-3.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[110px]">
        <div className="text-xs font-bold text-slate-400 mb-1.5">{label}</div>
        <div className="text-sm font-black text-slate-900">
          {payload[0].name} : {val}
        </div>
      </div>
    );
  }
  return null;
};

const AppMarketOverview = () => {
  const [platform, setPlatform] = useState('App Store');
  const [region, setRegion] = useState('Global');
  const [trendTab, setTrendTab] = useState('评论量');
  const [isExpanded, setIsExpanded] = useState(true);

  const trendData = [
    { name: '2月', score: 4.6, downloads: 145000, reviews: 16100, displayReviews: '16.1k' },
    { name: '3月', score: 4.6, downloads: 130000, reviews: 17800, displayReviews: '17.8k' },
    { name: '4月', score: 4.7, downloads: 160000, reviews: 18900, displayReviews: '18.9k' },
    { name: '5月', score: 4.7, downloads: 185000, reviews: 21000, displayReviews: '21.0k' },
    { name: '6月', score: 4.7, downloads: 210000, reviews: 23500, displayReviews: '23.5k' },
  ];

  const getChartConfig = () => {
    switch (trendTab) {
      case '下载量': return { key: 'downloads', label: 'downloads' };
      case '评分': return { key: 'score', label: 'score' };
      case '评论量':
      default: return { key: 'reviews', label: 'reviews' };
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
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer hover:bg-slate-100"
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
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          
          {/* Card 1: 口碑总览 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-emerald-50 rounded flex items-center justify-center">
                <Activity size={14} className="text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">口碑总览</span>
            </div>
            
            <div className="flex gap-6 mb-6">
              <div className="flex-1">
                <div className="text-[10px] text-gray-500 font-medium mb-1">应用评分</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-gray-900 tracking-tighter">4.7</span>
                  <span className="text-xs font-bold text-gray-400">/ 5.0</span>
                  <div className="flex items-center gap-0.5 text-emerald-600 font-bold text-xs ml-1">
                    <ArrowUpRight size={12} /> 0.2
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map(i => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
                  <div className="relative">
                    <Star size={16} className="text-amber-400" />
                    <div className="absolute top-0 left-0 overflow-hidden w-[70%]">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-px bg-gray-100"></div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-gray-500 font-medium mb-1">评论总量</div>
                  <div className="text-lg font-bold text-gray-900 mb-0.5">23.5k</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-emerald-600 text-[10px] font-bold">
                      <ArrowUpRight size={10} /> 12%
                    </div>
                    <div className="text-[9px] text-gray-400">较上月</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-[10px] text-gray-500 font-medium mb-1">好评率 (4-5星)</div>
                  <div className="text-lg font-bold text-gray-900 mb-0.5">89%</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-emerald-600 text-[10px] font-bold">
                      <ArrowUpRight size={10} /> 2ppt
                    </div>
                    <div className="text-[9px] text-gray-400">较上月</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 竞品对比 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-emerald-50 rounded flex items-center justify-center">
                <List size={14} className="text-emerald-600" />
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
                    <th className="pb-3 text-[10px] font-bold text-gray-400 font-medium text-center">评分排名</th>
                    <th className="pb-3 text-[10px] font-bold text-gray-400 font-medium text-center">评论量排名</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Vantage', isSelf: true, logo: 'V', rating: 4.7, ratingChange: 0.2, reviews: '23.5k', reviewsChange: 12, rankScore: 1, rankReviews: 3 },
                    { name: 'Exness', isSelf: false, logo: 'EX', rating: 4.5, ratingChange: 0.1, reviews: '28.9k', reviewsChange: 18, rankScore: 2, rankReviews: 1 },
                    { name: 'TradeMaster', isSelf: false, logo: 'TM', rating: 4.4, ratingChange: -0.1, reviews: '19.8k', reviewsChange: 5, rankScore: 3, rankReviews: 4 },
                    { name: 'MetaNext', isSelf: false, logo: 'MN', rating: 4.6, ratingChange: 0.3, reviews: '15.6k', reviewsChange: 8, rankScore: 4, rankReviews: 5 },
                  ].map((comp, idx) => (
                    <tr key={comp.name}>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${comp.isSelf ? 'bg-gray-900' : comp.name === 'Exness' ? 'bg-amber-500' : comp.name === 'TradeMaster' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                            {comp.logo}
                          </div>
                          <span className="text-xs font-bold text-gray-900">{comp.name}</span>
                          {comp.isSelf && <span className="text-[9px] text-gray-400">(本应用)</span>}
                        </div>
                      </td>
                      <td className="py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-xs font-bold text-gray-900">{comp.rating}</span>
                          <div className={`flex items-center text-[9px] font-bold ${comp.ratingChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {comp.ratingChange >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {Math.abs(comp.ratingChange)}
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-xs font-bold text-gray-900">{comp.reviews}</span>
                          <div className={`flex items-center text-[9px] font-bold ${comp.reviewsChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {comp.reviewsChange >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {Math.abs(comp.reviewsChange)}%
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block w-5 h-5 rounded text-[10px] font-bold leading-5 ${comp.rankScore === 1 ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{comp.rankScore}</span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block w-5 h-5 rounded text-[10px] font-bold leading-5 ${comp.rankReviews === 1 || comp.isSelf ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{comp.rankReviews}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3: 核心负面问题提醒 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-rose-50 rounded flex items-center justify-center">
                <AlertCircle size={14} className="text-rose-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">核心负面问题提醒</span>
            </div>
            
            <div className="text-xs text-gray-600 mb-4">
              近期负面反馈主要集中在以下问题，需重点关注：
            </div>
            
            <div className="space-y-3 mb-6">
              {[
                { name: '应用崩溃 (Crashes)', pct: 12, change: 4, icon: Target },
                { name: '提现问题 (Withdrawal)', pct: 9, change: 2, icon: Clock },
                { name: '登录问题 (Login)', pct: 6, change: 1, icon: User },
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <item.icon size={10} />
                    </div>
                    {item.name}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">{item.pct}%</span>
                    <div className="flex items-center text-[10px] font-bold text-rose-500 w-10 justify-end">
                      <ArrowUpRight size={10} /> {item.change}ppt
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto bg-rose-50/30 border border-rose-100/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">代表性差评原声</span>
                <div className="flex">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  {[1,2,3,4].map(i => <Star key={i} size={10} className="fill-gray-200 text-gray-200" />)}
                </div>
              </div>
              <div className="text-xs text-gray-700 leading-relaxed italic mb-2">
                "App crashes frequently. Very frustrating when trying to close a position."
              </div>
              <div className="text-[9px] text-gray-400">2024-06-28</div>
            </div>
          </div>

        </div>

        {/* Detailed Analysis Section (Always Expanded) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
            <div className="p-6 bg-slate-50/30">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_250px] gap-6">
                
                {/* Trend Chart */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sm font-bold text-gray-900">评论量趋势</span>
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
                        <div className="flex items-center gap-0.5 text-emerald-600 text-xs font-bold">
                          <ArrowUpRight size={12} /> 12%
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">较上月</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-0.5 text-emerald-600 text-xs font-bold">
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
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <YAxis hide domain={['auto', 'auto']} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1.5 }} />
                        <Area 
                          type="monotone" 
                          dataKey={chartConfig.key}
                          stroke="#10b981" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorGreen)" 
                          activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }} 
                        >
                          {trendTab === '评论量' && (
                            <LabelList dataKey="displayReviews" position="top" offset={10} style={{ fontSize: '10px', fill: '#475569', fontWeight: 'bold' }} />
                          )}
                        </Area>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Theme Insights */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-sm font-bold text-gray-900 mb-6">评论主题洞察 <span className="text-xs text-gray-400 font-normal">(近30天)</span></div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {/* 正向 */}
                    <div>
                      <div className="text-[10px] font-bold text-emerald-600 mb-4">正向主题 TOP 3</div>
                      <div className="space-y-4">
                        {[
                          { name: '易用性', pct: 28, change: 4, color: 'bg-emerald-500' },
                          { name: '交易体验', pct: 18, change: 2, color: 'bg-emerald-500' },
                          { name: '速度/流畅', pct: 12, change: 1, color: 'bg-emerald-500' },
                        ].map(item => (
                          <div key={item.name}>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-gray-700 font-medium">{item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{item.pct}%</span>
                                <span className="text-[9px] text-emerald-600 font-bold flex items-center"><ArrowUpRight size={10}/>{item.change}ppt</span>
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
                          { name: '应用崩溃 (Crashes)', pct: 12, change: 4, color: 'bg-rose-500' },
                          { name: '提现问题 (Withdrawal)', pct: 9, change: 2, color: 'bg-rose-500' },
                          { name: '登录问题 (Login)', pct: 6, change: 1, color: 'bg-rose-500' },
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
                </div>

                {/* Legend */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <div className="text-sm font-bold text-gray-900 mb-6">对比维度说明</div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Star size={16} className="text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 mb-0.5">评分 <span className="text-[10px] text-gray-400 font-normal">(5.0)</span></div>
                        <div className="text-[10px] text-gray-500">越高越好</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 mb-0.5">评论量</div>
                        <div className="text-[10px] text-gray-500">越多越好</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 mb-0.5">变化趋势</div>
                        <div className="text-[10px] text-gray-500">较上月</div>
                      </div>
                    </div>
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
