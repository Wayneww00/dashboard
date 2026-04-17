import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Globe, ShieldCheck, ChevronRight, Zap, Smartphone } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const generateData = (base: number, variance: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: i,
    value: Math.floor(base + Math.random() * variance),
  }));
};

const COUNTRIES = [
  { id: 'US', flag: '🇺🇸', name: 'USA', city: 'Silicon Valley', lat: 113, top: '40%', left: '20%', jitter: '2ms', packetLoss: '0.001%' },
  { id: 'DE', flag: '🇩🇪', name: 'EU', city: 'Frankfurt', lat: 245, top: '30%', left: '50%', jitter: '12ms', packetLoss: '0.05%' },
  { id: 'CN', flag: '🇨🇳', name: 'China', city: 'Beijing', lat: 45, top: '35%', left: '75%', jitter: '1ms', packetLoss: '0.00%' },
  { id: 'SG', flag: '🇸🇬', name: 'SG', city: 'Singapore', lat: 420, top: '60%', left: '78%', jitter: '25ms', packetLoss: '12.4%' },
];

const WebsiteHealthMonitor = () => {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [platform, setPlatform] = useState<'app' | 'web'>('app');
  const [trend, setTrend] = useState(generateData(100, 40));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getHealthStatus = (lat: number) => {
    if (lat > 400) return { color: 'rose', text: 'Critical', bg: 'bg-rose-500', textLight: 'text-rose-600' };
    if (lat < 150) return { color: 'emerald', text: 'Healthy', bg: 'bg-emerald-500', textLight: 'text-emerald-600' };
    if (lat < 300) return { color: 'amber', text: 'Warning', bg: 'bg-amber-500', textLight: 'text-amber-600' };
    return { color: 'rose', text: 'Critical', bg: 'bg-rose-500', textLight: 'text-rose-600' };
  };

  const currentStatus = getHealthStatus(selected.lat);

  useEffect(() => {
    const base = selected.lat;
    setTrend(generateData(base * 0.7, base * 0.3));
  }, [selected]);

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
            return (
              <div 
                key={country.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ top: country.top, left: country.left }}
                onClick={() => setSelected(country)}
              >
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${isSelected ? 'bg-emerald-500 text-white opacity-100 shadow-md' : 'bg-white text-slate-500 shadow-sm opacity-0 group-hover:opacity-100'}`}>
                  {country.lat}ms
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-md transition-all ${isSelected ? 'bg-white ring-4 ring-emerald-100 scale-110' : 'bg-white/80 hover:bg-white hover:scale-110'}`}>
                  {country.flag}
                </div>
                {/* Ping dot */}
                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></div>
                )}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe size={16} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider">{selected.city}</div>
              <div className="text-[10px] text-slate-400 italic">{selected.name} NODE</div>
            </div>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">JITTER</div>
              <div className="text-sm font-black text-slate-800">{selected.jitter}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">LOSS</div>
              <div className={`text-sm font-black ${selected.packetLoss !== '0.00%' && selected.packetLoss !== '0.001%' ? 'text-rose-500' : 'text-slate-800'}`}>{selected.packetLoss}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <ShieldCheck size={14} className="text-emerald-500" /> 系统稳定性
            </div>
            <div className="text-3xl font-black text-slate-900">99.98<span className="text-lg text-slate-500">%</span></div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">
              <Zap size={14} className="text-emerald-500" /> 实时延迟
            </div>
            <div className="text-3xl font-black text-emerald-500 relative z-10">{selected.lat}<span className="text-lg text-emerald-300 italic ml-1">ms</span></div>
            <div className="absolute bottom-0 left-0 w-full h-12 opacity-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#1a1f2e] rounded-2xl p-2 pl-6 flex justify-between items-center text-white mt-auto shadow-lg">
          <div className="flex gap-8">
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">可用状态</div>
              <div className="text-xs font-bold text-emerald-400">稳定</div>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">安全等级</div>
              <div className="text-xs font-bold text-white">A级</div>
            </div>
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors">
            查看完整分析 <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteHealthMonitor;
