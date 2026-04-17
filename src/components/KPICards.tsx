import React from 'react';
import { Info, Landmark, ArrowRight, Wallet, BarChart2 } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, LineChart, Line, ComposedChart, Scatter, ReferenceLine, CartesianGrid
} from 'recharts';

// --- Data Definitions ---

const dataA = [
  { month: 'J', value: 20, previous: 18 }, { month: 'F', value: 25, previous: 22 }, { month: 'M', value: 23, previous: 20 },
  { month: 'A', value: 35, previous: 28 }, { month: 'M', value: 40, previous: 32 }, { month: 'J', value: 45, previous: 38 },
  { month: 'J', value: 50, previous: 42 }, { month: 'A', value: 65, previous: 55 }, { month: 'S', value: 80, previous: 60 },
  { month: 'O', value: 60, previous: 50 }, { month: 'N', value: 70, previous: 55 }, { month: 'D', value: 75, previous: 60 },
];

const dataA2 = [
  { month: '1月', current: 40, lastMonth: 38, lastYear: 35 }, { month: '2月', current: 45, lastMonth: 40, lastYear: 40 }, { month: '3月', current: 40, lastMonth: 45, lastYear: 45 },
  { month: '4月', current: 60, lastMonth: 40, lastYear: 50 }, { month: '5月', current: 75, lastMonth: 60, lastYear: 60 }, { month: '6月', current: 90, lastMonth: 75, lastYear: 70 },
  { month: '7月', current: 95, lastMonth: 90, lastYear: 75 }, { month: '8月', current: 110, lastMonth: 95, lastYear: 85 }, { month: '9月', current: 130, lastMonth: 110, lastYear: 95 },
  { month: '10月', current: 115, lastMonth: 130, lastYear: 80 }, { month: '11月', current: 115, lastMonth: 115, lastYear: 80 }, { month: '12月', current: 125, lastMonth: 115, lastYear: 90 },
];

const dataB = [
  { month: '1月', value: 30, lastMonth: 28, lastYear: 25, okr: 35, isUp: true }, { month: '2月', value: 35, lastMonth: 30, lastYear: 30, okr: 35, isUp: true },
  { month: '3月', value: 40, lastMonth: 35, lastYear: 35, okr: 45, isUp: true }, { month: '4月', value: 35, lastMonth: 40, lastYear: 40, okr: 45, isUp: false },
  { month: '5月', value: 50, lastMonth: 35, lastYear: 45, okr: 55, isUp: true }, { month: '6月', value: 60, lastMonth: 50, lastYear: 50, okr: 55, isUp: true },
  { month: '7月', value: 55, lastMonth: 60, lastYear: 60, okr: 70, isUp: false }, { month: '8月', value: 75, lastMonth: 55, lastYear: 65, okr: 70, isUp: true },
  { month: '9月', value: 85, lastMonth: 75, lastYear: 70, okr: 80, isUp: true }, { month: '10月', value: 80, lastMonth: 85, lastYear: 75, okr: 90, isUp: false },
  { month: '11月', value: 95, lastMonth: 80, lastYear: 80, okr: 90, isUp: true }, { month: '12月', value: 90, lastMonth: 95, lastYear: 85, okr: 100, isUp: false },
];

const dataC = [
  { month: '1月', actual: 40, lastMonth: 38, lastYear: 35, predict: null, barValue: 40 }, { month: '2月', actual: 52, lastMonth: 40, lastYear: 45, predict: null, barValue: 52 },
  { month: '3月', actual: 45, lastMonth: 52, lastYear: 40, predict: null, barValue: 45 }, { month: '4月', actual: 60, lastMonth: 45, lastYear: 50, predict: null, barValue: 60 },
  { month: '5月', actual: 55, lastMonth: 60, lastYear: 55, predict: null, barValue: 55 }, { month: '6月', actual: 70, lastMonth: 55, lastYear: 60, predict: null, barValue: 70 },
  { month: '7月', actual: 65, lastMonth: 70, lastYear: 65, predict: null, barValue: 65 }, { month: '8月', actual: 80, lastMonth: 65, lastYear: 70, predict: null, barValue: 80 },
  { month: '9月', actual: 75, lastMonth: 80, lastYear: 75, predict: null, barValue: 75 }, { month: '10月', actual: 85, lastMonth: 75, lastYear: 80, predict: null, barValue: 85 },
  { month: '11月', actual: 92, lastMonth: null, lastYear: 85, predict: null, barValue: 92 }, { month: '12月', actual: 105, lastMonth: null, lastYear: 90, predict: null, barValue: 105 },
];

const dataD = [
  { month: 'J', current: 300, previous: 200 }, { month: 'F', current: 400, previous: 250 },
  { month: 'M', current: 350, previous: 300 }, { month: 'A', current: 700, previous: 450 },
  { month: 'M', current: 500, previous: 400 }, { month: 'J', current: 600, previous: 500 },
  { month: 'J', current: 550, previous: 450 }, { month: 'A', current: 800, previous: 600 },
  { month: 'S', current: 750, previous: 550 }, { month: 'O', current: 900, previous: 700 },
  { month: 'N', current: 850, previous: 650 }, { month: 'D', current: 1000, previous: 800 },
];

const dataE = [
  { month: 'Jan', deposit: 4000, withdrawal: -2000 }, { month: 'Feb', deposit: 5000, withdrawal: -2500 },
  { month: 'Mar', deposit: 4500, withdrawal: -3000 }, { month: 'Apr', deposit: 6000, withdrawal: -2000 },
  { month: 'May', deposit: 7000, withdrawal: -3500 }, { month: 'Jun', deposit: 6500, withdrawal: -4000 },
  { month: 'Jul', deposit: 8000, withdrawal: -3000 }, { month: 'Aug', deposit: 9000, withdrawal: -4500 },
  { month: 'Sep', deposit: 13400, withdrawal: -4500 }, { month: 'Oct', deposit: 11000, withdrawal: -5000 },
  { month: 'Nov', deposit: 12000, withdrawal: -6000 }, { month: 'Dec', deposit: 14000, withdrawal: -5500 },
].reverse();

const dataF = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}d`,
  d7: Math.max(20, 80 * Math.pow(0.9, i) + Math.random() * 5),
  d30: Math.max(5, 40 * Math.pow(0.95, i) + Math.random() * 3),
}));

const dataConversion1 = [
  { month: '1月', current: 18.6, lastMonth: 18.0, lastYear: 17.5, target: 22.0 }, { month: '2月', current: 19.3, lastMonth: 18.6, lastYear: 18.0, target: 22.0 },
  { month: '3月', current: 19.5, lastMonth: 19.3, lastYear: 18.5, target: 22.0 }, { month: '4月', current: 20.1, lastMonth: 19.5, lastYear: 19.0, target: 22.0 },
  { month: '5月', current: 20.8, lastMonth: 20.1, lastYear: 19.5, target: 22.0 }, { month: '6月', current: 21.2, lastMonth: 20.8, lastYear: 20.0, target: 22.0 },
  { month: '7月', current: 21.5, lastMonth: 21.2, lastYear: 20.5, target: 22.0 }, { month: '8月', current: 22.5, lastMonth: 21.5, lastYear: 21.0, target: 22.0 },
  { month: '9月', current: 21.6, lastMonth: 22.5, lastYear: 20.8, target: 22.0 }, { month: '10月', current: 22.1, lastMonth: 21.6, lastYear: 21.2, target: 22.0 },
  { month: '11月', current: 24.0, lastMonth: 22.1, lastYear: 22.0, target: 22.0 }, { month: '12月', current: 24.5, lastMonth: 24.0, lastYear: 22.5, target: 22.0 },
];

const dataConversion2 = [
  { month: '1月', current: 44.2, lastMonth: 43.5, lastYear: 42.0, target: 55.0 }, { month: '2月', current: 45.1, lastMonth: 44.2, lastYear: 43.0, target: 55.0 },
  { month: '3月', current: 46.1, lastMonth: 45.1, lastYear: 44.5, target: 55.0 }, { month: '4月', current: 46.5, lastMonth: 46.1, lastYear: 45.0, target: 55.0 },
  { month: '5月', current: 47.3, lastMonth: 46.5, lastYear: 46.0, target: 55.0 }, { month: '6月', current: 47.8, lastMonth: 47.3, lastYear: 46.5, target: 55.0 },
  { month: '7月', current: 48.2, lastMonth: 47.8, lastYear: 47.0, target: 55.0 }, { month: '8月', current: 48.0, lastMonth: 48.2, lastYear: 47.5, target: 55.0 },
  { month: '9月', current: 48.2, lastMonth: 48.0, lastYear: 47.8, target: 55.0 }, { month: '10月', current: 49.1, lastMonth: 48.2, lastYear: 48.0, target: 55.0 },
  { month: '11月', current: 50.0, lastMonth: 49.1, lastYear: 48.5, target: 55.0 }, { month: '12月', current: 50.5, lastMonth: 50.0, lastYear: 49.0, target: 55.0 },
];

// --- Custom Components & Tooltips ---

const OKRLineShape = (props: any) => {
  const { cx, cy } = props;
  const width = 14;
  return <line x1={cx - width/2} y1={cy} x2={cx + width/2} y2={cy} stroke="#1f2937" strokeWidth={2} />;
};

const TooltipB = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[120px]">
        <div className="text-gray-400 mb-2 font-medium">2023年 {label}</div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">本月:</span>
          <span className={`font-bold ${data.isUp ? 'text-rose-400' : 'text-emerald-400'}`}>{data.value}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">上月:</span>
          <span className="font-bold text-white">{data.lastMonth}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">去年:</span>
          <span className="font-bold text-white">{data.lastYear}</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-gray-700 mt-1">
          <span className="text-gray-300">OKR目标:</span>
          <span className="font-bold text-white">{data.okr}</span>
        </div>
      </div>
    );
  }
  return null;
};

const TooltipC = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[120px]">
        <div className="text-gray-400 mb-2 font-medium">2023年 {label}</div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">实际:</span>
          <span className="font-bold text-white">${data.actual}k</span>
        </div>
        {data.lastMonth !== null && (
          <div className="flex justify-between mb-1">
            <span className="text-gray-300">上月:</span>
            <span className="font-bold text-gray-300">${data.lastMonth}k</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-300">去年同期:</span>
          <span className="font-bold text-gray-400">${data.lastYear}k</span>
        </div>
      </div>
    );
  }
  return null;
};

const TooltipD = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[120px]">
        <div className="text-gray-400 mb-2 font-medium">2023年 {label}</div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">本月:</span>
          <span className="font-bold text-emerald-400">{data.current ?? data.value}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">上月:</span>
          <span className="font-bold">{data.lastMonth}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">去年:</span>
          <span className="font-bold">{data.lastYear}</span>
        </div>
      </div>
    );
  }
  return null;
};

const TooltipConversion = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[120px]">
        <div className="text-gray-400 mb-2 font-medium">2023年 {label}</div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">本月:</span>
          <span className="font-bold text-emerald-400">{data.current}%</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">上月:</span>
          <span className="font-bold">{data.lastMonth}%</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">去年:</span>
          <span className="font-bold">{data.lastYear}%</span>
        </div>
      </div>
    );
  }
  return null;
};

// --- Card Renderers ---

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow h-full min-h-[420px]">
    {children}
  </div>
);

const CardHeader = ({ title, tooltipText }: any) => (
  <div className="flex justify-between items-start mb-2">
    <div className="flex items-center gap-1.5 text-gray-500 relative group cursor-pointer">
      <span className="text-sm font-medium">{title}</span>
      <Info className="w-3.5 h-3.5 opacity-50" />
      {tooltipText && (
        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl z-20 whitespace-normal">
          {tooltipText}
        </div>
      )}
    </div>
  </div>
);

const CardValue = ({ value, mom, yoy }: any) => (
  <div className="mb-4">
    <div className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{value}</div>
    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
      <span className={`px-1.5 py-0.5 rounded ${mom.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
        MoM {mom}
      </span>
      <span className="text-gray-300">/</span>
      <span className={`px-1.5 py-0.5 rounded ${yoy.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
        YoY {yoy}
      </span>
    </div>
  </div>
);



const NetDepositChart = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const monthData = [
    { deposit: 4500, withdrawal: 2000 },
    { deposit: 5200, withdrawal: 1800 },
    { deposit: 4800, withdrawal: 3000 },
    { deposit: 7000, withdrawal: 2500 },
    { deposit: 8500, withdrawal: 4000 },
    { deposit: 9500, withdrawal: 3500 },
    { deposit: 10000, withdrawal: 5000 },
    { deposit: 11500, withdrawal: 6000 },
    { deposit: 13400, withdrawal: 4500 },
    { deposit: 11000, withdrawal: 5500 },
    { deposit: 11500, withdrawal: 4000 },
    { deposit: 12500, withdrawal: 4800 },
  ];

  const width = 400;
  const height = 180;
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const maxVal = Math.max(...monthData.map(d => Math.max(d.deposit, d.withdrawal))) * 1.2;
  const chartWidth = 160; 
  const barHeight = 10;
  const gap = height / months.length;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const index = Math.floor((y / rect.height) * months.length);
    if (index >= 0 && index < months.length) setActiveIndex(index);
  };

  return (
    <div 
      className="relative flex-1 w-full min-h-[160px] flex items-center justify-center cursor-default mt-6 mb-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(null)}
      ref={containerRef}
    >
      <svg viewBox={`0 -25 ${width} ${height + 25}`} className="w-full h-full overflow-visible">
        <line x1={width / 2} y1={-15} x2={width / 2} y2={height} stroke="#e2e8f0" strokeWidth="1" />
        
        <text x={width/2 - 30} y={-15} textAnchor="end" className="fill-gray-400 text-[10px] font-bold tracking-wider">WITHDRAWAL (出金)</text>
        <text x={width/2 + 30} y={-15} textAnchor="start" className="fill-gray-400 text-[10px] font-bold tracking-wider">DEPOSIT (入金)</text>

        {monthData.map((d, i) => {
          const yPos = i * gap + gap/2;
          const depWidth = (d.deposit / maxVal) * chartWidth;
          const withWidth = (d.withdrawal / maxVal) * chartWidth;
          const isHovered = activeIndex === i;

          return (
            <g key={i} className="transition-all duration-300">
              <text 
                x={width / 2} 
                y={yPos + 3.5} 
                textAnchor="middle" 
                className={`text-[10px] font-bold ${isHovered ? 'fill-gray-900' : 'fill-gray-400'}`}
              >
                {months[i]}
              </text>

              <rect 
                x={width / 2 - 20 - withWidth} 
                y={yPos - barHeight / 2} 
                width={withWidth} 
                height={barHeight} 
                rx={3} 
                className={`fill-rose-200 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-60'}`}
              />

              <rect 
                x={width / 2 + 20} 
                y={yPos - barHeight / 2} 
                width={depWidth} 
                height={barHeight} 
                rx={3} 
                className={`fill-emerald-400 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-60'}`}
              />
            </g>
          );
        })}
      </svg>

      {activeIndex !== null && (
        <div 
          className="absolute z-20 bg-gray-900 text-white p-3 rounded-xl shadow-xl pointer-events-none transition-all duration-75 border border-gray-700"
          style={{ 
            top: `${(activeIndex * gap / height) * 100}%`,
            right: '-10px',
            transform: 'translateY(-50%)'
          }}
        >
          <div className="text-[10px] font-black text-gray-400 mb-2 uppercase">{months[activeIndex]} 详情数据</div>
          <div className="space-y-1.5 min-w-[120px]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">入金:</span>
              <span className="font-bold text-emerald-400">+${monthData[activeIndex].deposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">出金:</span>
              <span className="font-bold text-rose-400">-${monthData[activeIndex].withdrawal.toLocaleString()}</span>
            </div>
            <div className="pt-1.5 border-t border-gray-700 flex justify-between items-center text-xs">
              <span className="text-white font-medium">净额:</span>
              <span className="font-bold">${(monthData[activeIndex].deposit - monthData[activeIndex].withdrawal).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RetentionChart = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const data7d = [100, 85, 75, 70, 68, 65, 62, 60, 59, 58];
  const data30d = [100, 50, 40, 35, 30, 28, 25, 22, 21, 20];
  const target7d = 60;
  const target30d = 20;

  const width = 400;
  const height = 110;
  const maxValue = 100;
  const labels = ['1d', '2d', '3d', '4d', '5d', '6d', '7d', '14d', '21d', '30d'];
  const gap = width / (labels.length - 1);

  const getSmoothLinePath = (values: number[]) => {
    return values.reduce((path, v, i) => {
      const x = i * gap;
      const y = height - (v / maxValue) * height;
      if (i === 0) return `M ${x},${y}`;
      const prevX = (i - 1) * gap;
      const prevY = height - (values[i - 1] / maxValue) * height;
      const cp1x = prevX + gap / 2;
      const cp2x = x - gap / 2;
      return `${path} C ${cp1x},${prevY} ${cp2x},${y} ${x},${y}`;
    }, "");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.round(x / gap);
    if (index >= 0 && index < labels.length) setActiveIndex(index);
  };

  return (
    <div 
      className="relative flex-1 w-full mt-4 cursor-crosshair pr-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(null)}
      ref={containerRef}
    >
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full h-full overflow-visible">
        {/* 基准线 - Target 7D */}
        <line x1="0" y1={height - (target7d/maxValue)*height} x2={width} y2={height - (target7d/maxValue)*height} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
        <text x={width + 5} y={height - (target7d/maxValue)*height + 3} className="fill-blue-400 text-[9px] font-bold">{target7d}%</text>

        {/* 基准线 - Target 30D */}
        <line x1="0" y1={height - (target30d/maxValue)*height} x2={width} y2={height - (target30d/maxValue)*height} stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
        <text x={width + 5} y={height - (target30d/maxValue)*height + 3} className="fill-orange-400 text-[9px] font-bold">{target30d}%</text>

        {/* 30D 面积与线条 */}
        <path d={`${getSmoothLinePath(data30d)} L ${width},${height} L 0,${height} Z`} fill="#f97316" className="opacity-10" />
        <path d={getSmoothLinePath(data30d)} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />

        {/* 7D 面积与线条 */}
        <path d={`${getSmoothLinePath(data7d)} L ${width},${height} L 0,${height} Z`} fill="#3b82f6" className="opacity-10" />
        <path d={getSmoothLinePath(data7d)} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

        {/* X 轴标签 */}
        {labels.map((l, i) => (
          <text
            key={i} x={i * gap} y={height + 16} textAnchor="middle"
            className={`text-[9px] font-bold transition-colors ${
              activeIndex === i ? 'fill-gray-900' : 'fill-gray-300'
            }`}
          >
            {l}
          </text>
        ))}

        {/* 交互指示线 */}
        {activeIndex !== null && (
          <line x1={activeIndex * gap} y1="0" x2={activeIndex * gap} y2={height} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
        )}
      </svg>

      {/* 悬停浮层 Tooltip */}
      {activeIndex !== null && (
        <div 
          className="absolute z-20 bg-gray-900 text-white p-3 rounded-xl shadow-xl pointer-events-none transition-all duration-75 border border-gray-700"
          style={{ 
            left: `${(activeIndex * gap / width) * 100}%`,
            top: '0%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest text-center">Day {labels[activeIndex]}</div>
          <div className="space-y-1.5 min-w-[90px]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-blue-400 font-bold">7D 线:</span>
              <span className="font-black">{data7d[activeIndex]}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-orange-400 font-bold">30D 线:</span>
              <span className="font-black">{data30d[activeIndex]}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      {/* 1. 注册人数 */}
      <CardWrapper>
        <CardHeader title="注册人数" />
        <CardValue value="12,480" mom="+9.4%" yoy="+21.8%" />
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] text-gray-400 font-medium">近12个月趋势（灰色虚线为去年同期）</span>
        </div>
        <div className="flex-1 w-full min-h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataA2} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
              <Tooltip content={<TooltipD />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="current" fill="url(#colorBar)" barSize={12} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="lastMonth" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardWrapper>

      {/* 2. FTD人数 */}
      <CardWrapper>
        <CardHeader title="FTD人数" />
        <CardValue value="2,995" mom="+9.4%" yoy="+22.2%" />
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] text-gray-400 font-medium">近12个月趋势（灰色虚线为去年同期）</span>
        </div>
        <div className="flex-1 w-full min-h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataB} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
              <Tooltip content={<TooltipD />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="value" fill="url(#colorBar)" barSize={12} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="lastMonth" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardWrapper>

      {/* 3. FTT人数 */}
      <CardWrapper>
        <CardHeader title="FTT人数" />
        <CardValue value="1,497" mom="+9.4%" yoy="+26.9%" />
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] text-gray-400 font-medium">近12个月趋势（灰色虚线为去年同期）</span>
        </div>
        <div className="flex-1 w-full min-h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataB} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
              <Tooltip content={<TooltipD />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="value" fill="url(#colorBar)" barSize={12} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="lastMonth" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardWrapper>

      {/* 4. Net Deposit */}
      <CardWrapper>
        <CardHeader title="Net Deposit (净入金)" />
        <CardValue value="$1,542,060" mom="+9.4%" yoy="+23.3%" />
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] text-gray-400 font-medium tracking-tight">近12个月趋势 (灰色虚线为去年同期)</span>
        </div>
        <div className="flex-1 w-full min-h-[140px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataD} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNetBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
              <Tooltip content={<TooltipD />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="current" fill="url(#colorNetBar)" barSize={12} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="previous" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardWrapper>

      {/* 5. 总交易量Trading Volume */}
      <CardWrapper>
        {/* 保真标题排版 */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5 text-gray-400 cursor-pointer group relative">
            <span className="text-sm font-bold text-slate-700">总交易量</span>
            <span className="text-sm text-slate-500 font-medium">Trading Volume</span>
            <Info className="w-3.5 h-3.5 opacity-40" />
          </div>
        </div>
        
        {/* 保真数值与标签排版 */}
        <div className="mb-4">
          <div className="text-3xl font-black text-[#1a1f2e] tracking-tighter mb-2">$15,420,600</div>
          <div className="flex items-center gap-3 text-[11px] font-bold">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
              MoM +12.5%
            </span>
            <span className="text-slate-300 font-normal">/</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
              YoY +25.6%
            </span>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[160px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataC} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorGhostBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f8fafc" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#f8fafc" stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
                dy={15} 
              />
              <Tooltip 
                content={<TooltipC />} 
                cursor={{ fill: 'transparent' }} 
              />
              {/* 背景柱体 - Ghost Bars */}
              <Bar 
                dataKey="actual" 
                fill="url(#colorGhostBar)" 
                barSize={20} 
                radius={[4, 4, 0, 0]} 
                isAnimationActive={false}
              />
              
              {/* 去年同期 - 灰色虚线 */}
              <Line 
                type="natural" 
                dataKey="lastYear" 
                stroke="#cbd5e1" 
                strokeWidth={1.5} 
                strokeDasharray="4 4" 
                dot={{ r: 2.5, fill: '#cbd5e1', stroke: 'none' }}
                activeDot={{ r: 4, fill: '#cbd5e1' }}
              />
              
              {/* 主趋势线 - 深色平滑线 */}
              <Line 
                type="natural" 
                dataKey="actual" 
                stroke="#1a1f2e" 
                strokeWidth={3} 
                dot={{ r: 4.5, fill: '#1a1f2e', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6, fill: '#1a1f2e', strokeWidth: 2, stroke: '#fff' }} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardWrapper>

      {/* 6. 注册 -> FTD 转化率 */}
      <CardWrapper>
        <CardHeader title="注册 → FTD 转化率" tooltipText="注册用户中完成首次入金的比例" />
        <div className="flex justify-between items-start mb-2">
          <div className="text-3xl font-bold text-gray-900 tracking-tight">24.0%</div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
          <span className="px-1.5 py-0.5 rounded text-emerald-600 bg-emerald-50">MoM +2.4pp</span>
          <span className="text-gray-300">/</span>
          <span className="px-1.5 py-0.5 rounded text-emerald-600 bg-emerald-50">YoY +3.9pp</span>
        </div>
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] text-gray-400 font-medium tracking-tight">近12个月趋势 (灰色虚线为去年同期)</span>
        </div>
        <div className="flex-1 w-full min-h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataConversion1} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorConv1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip content={<TooltipConversion />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="current" stroke="none" fill="url(#colorConv1)" />
              <Line type="monotone" dataKey="lastYear" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2, fill: '#fff', stroke: '#cbd5e1', strokeWidth: 1 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3.5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 bg-slate-50/80 rounded-xl p-3.5 border border-slate-100/50 flex items-center justify-between">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
              <Landmark size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-wider">注册人数</span>
            </div>
            <span className="text-sm font-black text-slate-800">12,480</span>
          </div>
          <div className="px-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
               <ArrowRight size={14} className="text-slate-400" />
            </div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1.5">
              <Wallet size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-wider">FTD人数</span>
            </div>
            <span className="text-sm font-black text-slate-800">2,995</span>
          </div>
        </div>
        <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2.5 px-2">
          <span className="tracking-tight">vs. 上月 <span className="text-slate-500 font-black">21.6%</span></span>
          <span className="tracking-tight">vs. 去年同期 <span className="text-slate-500 font-black">20.1%</span></span>
        </div>
      </CardWrapper>

      {/* 7. FTD -> FTT 转化率 */}
      <CardWrapper>
        <CardHeader title="FTD → FTT 转化率" tooltipText="首次入金用户中完成首次交易的比例" />
        <div className="flex justify-between items-start mb-2">
          <div className="text-3xl font-bold text-gray-900 tracking-tight">50.0%</div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
          <span className="px-1.5 py-0.5 rounded text-emerald-600 bg-emerald-50">MoM +1.8pp</span>
          <span className="text-gray-300">/</span>
          <span className="px-1.5 py-0.5 rounded text-emerald-600 bg-emerald-50">YoY +2.5pp</span>
        </div>
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] text-gray-400 font-medium tracking-tight">近12个月趋势 (灰色虚线为去年同期)</span>
        </div>
        <div className="flex-1 w-full min-h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataConversion2} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorConv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip content={<TooltipConversion />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="current" stroke="none" fill="url(#colorConv2)" />
              <Line type="monotone" dataKey="lastYear" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2, fill: '#fff', stroke: '#cbd5e1', strokeWidth: 1 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="current" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3.5, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 bg-slate-50/80 rounded-xl p-3.5 border border-slate-100/50 flex items-center justify-between">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
              <Wallet size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-wider">FTD人数</span>
            </div>
            <span className="text-sm font-black text-slate-800">2,995</span>
          </div>
          <div className="px-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
               <ArrowRight size={14} className="text-slate-400" />
            </div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 text-orange-500 mb-1.5">
              <BarChart2 size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-wider">FTT人数</span>
            </div>
            <span className="text-sm font-black text-slate-800">1,497</span>
          </div>
        </div>
        <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2.5 px-2">
          <span className="tracking-tight">vs. 上月 <span className="text-slate-500 font-black">48.2%</span></span>
          <span className="tracking-tight">vs. 去年同期 <span className="text-slate-500 font-black">47.5%</span></span>
        </div>
      </CardWrapper>

      {/* 8. FTT后 D30 留存率 */}
      <CardWrapper>
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-sm tracking-tight mb-2">
              <span>FTT后 D30 留存率</span>
              <Info size={14} className="opacity-40" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter transition-all">20.0%</div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mt-3">
              <span className="px-1.5 py-0.5 rounded-md text-emerald-600 bg-emerald-50">MoM +1.2pp</span>
              <span className="text-slate-200">/</span>
              <span className="px-1.5 py-0.5 rounded-md text-emerald-600 bg-emerald-50">YoY +2.0pp</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-black mb-3 border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <span className="text-slate-400 uppercase tracking-wider">D7 留存率</span>
            <span className="text-slate-900 font-black">62.0%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
            <span className="text-slate-400 uppercase tracking-wider">D30 留存率</span>
            <span className="text-orange-500 font-black">20.0%</span>
          </div>
        </div>

        <RetentionChart />
      </CardWrapper>

    </div>
  );
}
