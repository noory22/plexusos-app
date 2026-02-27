import React from 'react';
import { useTheme } from '../App';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function Badge({ children, color = "blue" }) {
    const { dark } = useTheme();

    const dk = {
        blue: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
        amber: "bg-amber-500/15 text-amber-400 border-amber-500/25",
        red: "bg-red-500/15 text-red-400 border-red-500/25",
        purple: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
        gray: "bg-slate-500/15 text-slate-400 border-slate-500/25",
    };
    const lk = {
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-emerald-50 text-emerald-700 border-emerald-200",
        amber: "bg-amber-50 text-amber-700 border-amber-200",
        red: "bg-red-50 text-red-700 border-red-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
        gray: "bg-slate-50 text-slate-700 border-slate-200",
    };

    const classes = dark ? dk[color] : lk[color];

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${classes}`}>
            {children}
        </span>
    );
}

export function Card({ children, className = "", style = {}, onClick }) {
    const { t } = useTheme();
    return (
        <div
            className={`bg-white dark:bg-[#0E1529] border border-slate-200 dark:border-slate-800/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full ${className} ${onClick ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-700/50' : ''}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export function StatCard({ label, value, sub, icon, trend, color = "blue" }) {
    const colorMap = {
        blue: "bg-blue-500/10 border-blue-500/20 text-blue-500",
        cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
        green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
        amber: "bg-amber-500/10 border-amber-500/20 text-amber-500",
        red: "bg-red-500/10 border-red-500/20 text-red-500",
        purple: "bg-purple-500/10 border-purple-500/20 text-purple-500"
    };
    const iconClasses = colorMap[color] || colorMap.blue;

    return (
        <Card className="w-full">
            <div className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3 w-full">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${iconClasses}`}>
                        {icon}
                    </div>
                    {trend !== undefined && (
                        <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trend >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {Math.abs(trend)}%
                        </span>
                    )}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono mb-1 truncate">{value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5 truncate">{label}</div>
                {sub && <div className="text-xs text-slate-400 dark:text-slate-500 truncate">{sub}</div>}
            </div>
        </Card>
    );
}

export function TabBar({ tabs, active, onChange, accent = "blue" }) {
    const accentColors = { blue: "bg-blue-600", purple: "bg-purple-600", cyan: "bg-cyan-600" };
    const c = accentColors[accent] || accentColors.blue;
    return (
        <div className="flex flex-wrap sm:flex-nowrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#1E293B]/60 w-full overflow-x-auto">
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => onChange(tab.id)}
                    className={`flex-1 min-w-max px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer border-none transition-all duration-200 ${active === tab.id ? `${c} text-white shadow-sm` : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                        }`}
                >{tab.label}</button>
            ))}
        </div>
    );
}

export function MiniBarChart({ data, height = 56 }) {
    const max = Math.max(...data);
    return (
        <div className="flex items-end gap-[3px] w-full" style={{ height }}>
            {data.map((v, i) => (
                <div key={i} className={`flex-1 rounded-t-sm transition-all duration-300 ${i === data.length - 1 ? "bg-blue-500" : "bg-blue-500/25 hover:bg-blue-500/40"}`}
                    style={{ height: `${(v / max) * 100}%` }} />
            ))}
        </div>
    );
}

export function DonutChart({ segments, size = 120 }) {
    const total = segments.reduce((s, d) => s + d.value, 0);
    let cum = 0;
    const cx = size / 2, cy = size / 2, r = size * 0.38, ir = size * 0.26;
    const toRad = a => (a * Math.PI) / 180;

    return (
        <svg width={size} height={size} className="overflow-visible">
            {segments.map(seg => {
                const s1 = (cum / total) * 360 - 90; cum += seg.value; const s2 = (cum / total) * 360 - 90;
                const la = s2 - s1 > 180 ? 1 : 0;
                const x1 = cx + r * Math.cos(toRad(s1)), y1 = cy + r * Math.sin(toRad(s1));
                const x2 = cx + r * Math.cos(toRad(s2)), y2 = cy + r * Math.sin(toRad(s2));
                const xi1 = cx + ir * Math.cos(toRad(s1)), yi1 = cy + ir * Math.sin(toRad(s1));
                const xi2 = cx + ir * Math.cos(toRad(s2)), yi2 = cy + ir * Math.sin(toRad(s2));
                return <path key={seg.name} d={`M${x1} ${y1} A${r} ${r} 0 ${la} 1 ${x2} ${y2} L${xi2} ${yi2} A${ir} ${ir} 0 ${la} 0 ${xi1} ${yi1}Z`} fill={seg.color} className="opacity-90 hover:opacity-100 transition-opacity duration-200 cursor-pointer" />;
            })}
        </svg>
    );
}

export function ProgressBar({ value, max, color = "#3B82F6", label, sublabel }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className="mb-3.5 w-full">
            <div className="flex justify-between items-center mb-1.5 w-full">
                <span className="text-[13px] text-slate-500 dark:text-slate-400">{label}</span>
                <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">{sublabel}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
        </div>
    );
}

export function AlertItem({ alert }) {
    const cfg = {
        critical: { bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-500" },
        warning: { bg: "bg-amber-50 dark:bg-amber-500/10", dot: "bg-amber-500" },
        info: { bg: "bg-blue-50 dark:bg-blue-500/10", dot: "bg-blue-500" },
    }[alert.type];

    return (
        <div className={`flex items-start gap-3 p-3 rounded-lg w-full mb-2 ${cfg.bg} hover:brightness-95 dark:hover:brightness-110 transition-all`}>
            <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${cfg.dot}`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1 w-full">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{alert.title}</span>
                    <Badge color={alert.module === "Financial" ? "blue" : alert.module === "HR" ? "purple" : "cyan"}>{alert.module}</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug m-0 break-words w-full">{alert.desc}</p>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 whitespace-nowrap">{alert.time}</span>
        </div>
    );
}

export function InfoBanner({ icon, title, desc, action, color = "blue" }) {
    const colors = {
        blue: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400",
        amber: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400",
        red: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400",
        cyan: "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
    }[color];
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border w-full ${colors}`}>
            <div className="flex items-start sm:items-center gap-3 w-full">
                <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white/50 dark:bg-black/20">{icon}</span>
                <div className="flex-1 w-full">
                    <p className="m-0 text-[13px] font-bold currentColor truncate">{title}</p>
                    <p className="m-0 text-xs opacity-80 mt-0.5 break-words w-full">{desc}</p>
                </div>
            </div>
            {action && (
                <button className="px-3.5 py-2 shrink-0 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors border-none cursor-pointer w-full sm:w-auto">
                    {action}
                </button>
            )}
        </div>
    );
}

export function SectionHeader({ title, right }) {
    return (
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2 w-full">
            <h3 className="m-0 text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            {right}
        </div>
    );
}

export function PracticeScoreGauge({ score }) {
    const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-32 h-20">
                <svg width="128" height="80" viewBox="0 0 120 80" className="w-full h-full">
                    <path d="M 10 70 A 50 50 0 0 1 110 70" fill="none" stroke="currentColor" className="text-slate-200 dark:text-[#1E293B]" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 10 70 A 50 50 0 0 1 110 70" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(score / 100) * 157} 157`} className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{score}</span>
                </div>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">Practice Health Score</span>
        </div>
    );
}
