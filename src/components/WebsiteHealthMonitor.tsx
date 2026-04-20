import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Globe, ShieldCheck, ChevronRight, Zap, Smartphone, AlertCircle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const generateData = (base: number, variance: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: i,
    value: Math.floor(base + Math.random() * variance),
  }));
};

const COUNTRIES = [
  { id: 'US', flag: '🇺🇸', name: 'USA', city: 'Silicon Valley', lat: 113, top: '40%', left: '20%', jitter: '2ms', packetLoss: '0.001%', iosStatus: 'normal', androidStatus: 'normal', iosDesc: 'App Store 正常访问', androidDesc: 'Google Play 正常访问' },
  { id: 'DE', flag: '🇩🇪', name: 'Germany', city: 'Frankfurt', lat: 245, top: '30%', left: '50%', jitter: '12ms', packetLoss: '0.05%', iosStatus: 'removed', androidStatus: 'normal', iosDesc: 'App Store 已下架', androidDesc: 'Google Play 正常访问' },
  { id: 'CN', flag: '🇨🇳', name: 'China', city: 'Beijing', lat: 45, top: '35%', left: '75%', jitter: '1ms', packetLoss: '0.00%', iosStatus: 'normal', androidStatus: 'normal', iosDesc: 'App Store 正常访问', androidDesc: '各安卓市场正常访问' },
  { id: 'IN', flag: '🇮🇳', name: 'India', city: 'Mumbai', lat: 180, top: '45%', left: '68%', jitter: '30ms', packetLoss: '5.2%', iosStatus: 'removed', androidStatus: 'removed', iosDesc: 'App Store 已被屏蔽', androidDesc: 'Google Play 已被屏蔽' },
  { id: 'SG', flag: '🇸🇬', name: 'SG', city: 'Singapore', lat: 420, top: '60%', left: '78%', jitter: '25ms', packetLoss: '12.4%', iosStatus: 'normal', androidStatus: 'normal', iosDesc: 'App Store 正常访问', androidDesc: 'Google Play 正常访问' },
];

const WebsiteHealthMonitor = () => {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [hoveredCountry, setHoveredCountry] = useState<typeof COUNTRIES[0] | null>(null);
  const [platform, setPlatform] = useState<'app' | 'web'>('app');
  const [trend, setTrend] = useState(generateData(100, 40));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const displayNode = hoveredCountry || selected;

  const getHealthStatus = (node: typeof COUNTRIES[0]) => {
    if (platform === 'app' && (node.iosStatus === 'removed' || node.androidStatus === 'removed')) return { color: 'rose', text: 'Critical', bg: 'bg-rose-500', textLight: 'text-rose-600' };
    if (node.lat > 400) return { color: 'rose', text: 'Critical', bg: 'bg-rose-500', textLight: 'text-rose-600' };
    if (node.lat < 150) return { color: 'emerald', text: 'Healthy', bg: 'bg-emerald-400', textLight: 'text-emerald-400' };
    if (node.lat < 300) return { color: 'amber', text: 'Warning', bg: 'bg-amber-500', textLight: 'text-amber-600' };
    return { color: 'rose', text: 'Critical', bg: 'bg-rose-500', textLight: 'text-rose-600' };
  };

  const currentStatus = getHealthStatus(displayNode);

  useEffect(() => {
    const base = displayNode.lat;
    setTrend(generateData(base * 0.7, base * 0.3));
  }, [displayNode]);

  const analyzeNodeStatus = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1500);
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative flex flex-col">
      {/* 背景氛围层 */}
      <div className={`absolute top-0 left-0 w-full h-40 transition-colors duration-1000 opacity-5 ${currentStatus.bg}`}></div>

      <div className="relative z-10 p-6 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">官网/APP健康度监测</h2>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Global Network Command</p>
            </div>
          </div>
          <div className="flex bg-slate-100/80 p-1 rounded-xl">
            <button
              onClick={() => setPlatform('app')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                platform === 'app' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Smartphone size={14} />
              App
            </button>
            <button
              onClick={() => setPlatform('web')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                platform === 'web' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Globe size={14} />
              Web
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 p-6 flex flex-col">
        {/* Map Area */}
        <div className="relative w-full flex-1 min-h-[14rem] bg-slate-50/50 rounded-2xl border border-slate-100 mb-4 overflow-hidden flex items-center justify-center">
          {/* World Map Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg")',
              backgroundSize: '110%',
              backgroundPosition: 'center 40%',
              backgroundRepeat: 'no-repeat',
              filter: 'grayscale(100%)'
            }}
          ></div>

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <line x1="20%" y1="40%" x2="50%" y2="30%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="30%" x2="75%" y2="35%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="75%" y1="35%" x2="78%" y2="60%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="20%" y1="40%" x2="78%" y2="60%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          </svg>

          {/* Nodes */}
          {COUNTRIES.map(country => {
            const isSelected = selected.id === country.id;
            const isAppRemoved = platform === 'app' && (country.iosStatus === 'removed' || country.androidStatus === 'removed');
            const isBothRemoved = platform === 'app' && country.iosStatus === 'removed' && country.androidStatus === 'removed';
            
            return (
              <div 
                key={country.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ top: country.top, left: country.left }}
                onClick={() => setSelected(country)}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {platform === 'web' && (
                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${isSelected ? 'bg-emerald-400 text-white opacity-100 shadow-md' : 'bg-white text-slate-500 shadow-sm opacity-0 group-hover:opacity-100'}`}>
                    {country.lat}ms
                  </div>
                )}
                {platform === 'app' && isSelected && !isAppRemoved && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all bg-emerald-400 text-white opacity-100 shadow-md">
                    {country.lat}ms
                  </div>
                )}

                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-md transition-all ${isSelected ? 'bg-white ring-4 ring-emerald-100 scale-110' : 'bg-white/80 hover:bg-white hover:scale-110'}`}>
                  {country.flag}
                </div>

                {isAppRemoved ? (
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 ${isBothRemoved ? 'bg-rose-600' : 'bg-amber-500'} rounded-full border border-white flex items-center justify-center text-white shadow-md z-20`}>
                    <span className="text-[10px] font-black leading-none">!</span>
                  </div>
                ) : (
                  <>
                    {isSelected && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></div>
                    )}
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                  </>
                )}
              </div>
            );
          })}

          {/* App Tab Hover/Selected Map Overlay */}
        </div>

        {/* Dynamic Display Region based on Platform */}
        {platform === 'web' ? (
          <div className={`border-[2px] ${displayNode.lat > 400 ? 'border-rose-400/80' : 'border-emerald-400/80'} rounded-2xl p-4 mb-4 shadow-sm bg-white flex justify-between items-center transition-all`}>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                <div className={`w-6 h-6 rounded-full ${currentStatus.bg}`}></div>
              </div>
              <div>
                <h3 className="text-[14px] font-black tracking-tight text-slate-900 uppercase">{displayNode.city}</h3>
                <p className="text-[10px] text-slate-400 font-bold italic uppercase tracking-wider">{displayNode.name} NODE</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex gap-6">
                 <div>
                  <div className="text-[10px] text-slate-400 font-bold mb-0.5">网站可用性</div>
                  <div className="text-base font-black text-slate-900">99.99%</div>
                 </div>
                 <div>
                  <div className="text-[10px] text-slate-400 font-bold mb-0.5">加载速度</div>
                  <div className={`text-base font-black ${currentStatus.textLight}`}>{displayNode.lat * 10 + 20}ms</div>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 mb-4">
            {/* iOS Status */}
            <div className={`border-[2px] ${displayNode.iosStatus === 'removed' ? 'border-rose-400/80' : 'border-emerald-400/80'} rounded-2xl p-4 shadow-sm bg-white flex justify-between items-center transition-all`}>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-xl shadow-sm">
                  
                </div>
                <div>
                  <h3 className="text-[14px] font-black tracking-tight text-slate-900">{displayNode.name} App Store</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{displayNode.iosDesc}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-base font-black flex items-center justify-end gap-0.5 tracking-wide ${displayNode.iosStatus === 'removed' ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {displayNode.iosStatus === 'removed' ? '已下架' : '正常上架'}
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>

            {/* Android Status */}
            <div className={`border-[2px] ${displayNode.androidStatus === 'removed' ? 'border-rose-400/80' : 'border-emerald-400/80'} rounded-2xl p-4 shadow-sm bg-white flex justify-between items-center transition-all`}>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-lg shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="text-[14px] font-black tracking-tight text-slate-900">{displayNode.name} Google Play</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{displayNode.androidDesc}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-base font-black flex items-center justify-end gap-0.5 tracking-wide ${displayNode.androidStatus === 'removed' ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {displayNode.androidStatus === 'removed' ? '已下架' : '正常上架'}
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </div>
        )}

        {platform === 'web' ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <ShieldCheck size={14} className="text-emerald-400" /> 可用性 (LCP&lt;2.5S)
              </div>
              <div className="text-3xl font-black text-slate-900">99.98<span className="text-lg text-slate-500">%</span></div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">
                <Zap size={14} className="text-emerald-400" /> 页面加载速度
              </div>
              <div className="text-3xl font-black text-emerald-400 relative z-10">{displayNode.lat * 10 + 20}<span className="text-lg text-emerald-300 italic ml-1">ms</span></div>
              <div className="absolute bottom-0 left-0 w-full h-12 opacity-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <Area type="monotone" dataKey="value" stroke="#34d399" fill="#34d399" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-[2px] border-emerald-400/80 rounded-2xl p-5 mb-4 shadow-sm bg-white relative">
            <div className="flex items-center gap-1.5 text-slate-900 mb-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span className="text-[13px] font-bold tracking-wide">全平台状态汇总</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-[40px] font-black text-slate-900 leading-none">3</span>
              <span className="text-2xl font-bold text-slate-400 leading-none">/ 90</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500 mb-4 tracking-wider">异常点位 (iOS/安卓) / 总监控点位</div>
            
            <div className="h-[1px] w-full bg-slate-100 mb-3.5"></div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                <span><span className="font-bold text-slate-700">Germany</span>: iOS App Store 已下架</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                <span><span className="font-bold text-slate-700">India</span>: iOS/安卓 市场均不可访问</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#1a1f2e] rounded-2xl p-4 flex items-center gap-4 text-white mt-auto shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
            <Sparkles size={80} />
          </div>

          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-white" />
          </div>
          
          <div className="flex-1 min-w-0 pr-4">
            <div className="text-[10px] font-bold text-slate-400 mb-1">AI 总结</div>
            <p className="text-xs font-bold text-slate-200 leading-snug">
              {platform === 'web' 
                ? `系统运行平稳，${displayNode.city} 节点加载速度 ${displayNode.lat * 10 + 20}ms，建议优化 Singapore 节点的边缘缓存策略。`
                : `当前需重点关注: Germany, India，存在延迟异常波动或市场状态异常。`}
            </p>
          </div>

          <button className="bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-[10px] font-bold shrink-0 flex items-center gap-1 transition-colors border border-white/5">
            完整分析 <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteHealthMonitor;
