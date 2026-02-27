import React from 'react';
import { useTheme } from '../App';
import { StatCard, Card, SectionHeader, PracticeScoreGauge, Badge, AlertItem } from '../components/Shared';
import { mockData } from '../mockData';
import { DollarSign, BarChart2, Users, FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const fmtK = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;

export function ExecutiveDashboard() {
    const { dark } = useTheme();

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-300">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <StatCard label="Cash Position" value={fmtK(mockData.cashPosition.total)} sub="Across all sites" icon={<DollarSign size={20} />} trend={6.2} color="green" />
                <StatCard label="Total AR" value={fmtK(mockData.cashPosition.ar)} sub="Outstanding receivables" icon={<BarChart2 size={20} />} trend={-2.1} color="blue" />
                <StatCard label="Active Staff" value="23" sub="Across 4 locations" icon={<Users size={20} />} trend={8.3} color="purple" />
                <StatCard label="Active Contracts" value="8" sub="3 requiring attention" icon={<FileText size={20} />} color="cyan" />
            </div>

            {/* Main Grid: Practice Overview vs Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                <Card className="lg:col-span-1 border border-slate-200 dark:border-slate-800">
                    <div className="p-5 h-full flex flex-col justify-between">
                        <SectionHeader title="Practice Overview" />
                        <PracticeScoreGauge score={mockData.practiceScore} />

                        <div className="mt-6 flex flex-col gap-4">
                            {[
                                { label: "Financial Health", val: 82, color: "bg-emerald-500", text: "text-emerald-500" },
                                { label: "HR Compliance", val: 61, color: "bg-amber-500", text: "text-amber-500" },
                                { label: "Contract Status", val: 79, color: "bg-blue-500", text: "text-blue-500" },
                            ].map(m => (
                                <div key={m.label} className="w-full">
                                    <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                                        <span className="text-slate-500 dark:text-slate-400">{m.label}</span>
                                        <span className={`font-bold ${m.text}`}>{m.val}/100</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden w-full">
                                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${m.color}`} style={{ width: `${m.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-2 border border-slate-200 dark:border-slate-800 relative z-0">
                    <div className="p-5 flex flex-col h-full w-full">
                        <SectionHeader title="Revenue vs Expenses — Last 7 Months" right={<Badge color="blue">Monthly</Badge>} />
                        <div className="flex items-end gap-1.5 sm:gap-3 h-48 w-full mt-2">
                            {mockData.monthlyRevenue.map((d, i) => {
                                const max = 467000;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full group">
                                        <div className="w-full flex-1 flex flex-col justify-end gap-[1px] relative rounded-t-md overflow-hidden bg-slate-50 dark:bg-slate-800/30">
                                            {/* Tooltip on hover */}
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs py-1 px-2 rounded-md whitespace-nowrap z-10 transition-opacity pointer-events-none shadow-lg font-medium">
                                                Rev: {fmtK(d.revenue)} | Exp: {fmtK(d.expenses)}
                                            </div>
                                            <div className="w-full rounded-t-sm bg-red-400/80 dark:bg-red-500/80 transition-all duration-300 hover:brightness-110" style={{ height: `${(d.expenses / max) * 100}%` }} />
                                            <div className="w-full rounded-t-sm bg-emerald-500 transition-all duration-300 hover:brightness-110" style={{ height: `${((d.revenue - d.expenses) / max) * 100}%` }} />
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-medium">{d.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-4 sm:gap-6 mt-5 justify-center sm:justify-start">
                            {[
                                { label: "Net Margin", color: "bg-emerald-500" },
                                { label: "Expenses", color: "bg-red-400/80 dark:bg-red-500/80" },
                            ].map(l => (
                                <div key={l.label} className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-sm ${l.color} shadow-sm`} />
                                    <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Alerts & Action Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                <Card className="w-full">
                    <div className="p-5 h-full">
                        <SectionHeader title="Active Alerts" right={<Badge color="red">2 Critical</Badge>} />
                        <div className="flex flex-col w-full h-full gap-1 overflow-y-auto pr-1" style={{ maxHeight: 250 }}>
                            {mockData.alerts.map(a => <AlertItem key={a.id} alert={a} />)}
                        </div>
                    </div>
                </Card>

                <Card className="w-full">
                    <div className="p-5 h-full">
                        <SectionHeader title="Action Items" />
                        <div className="flex flex-col gap-2 w-full h-full overflow-y-auto pr-1" style={{ maxHeight: 250 }}>
                            {[
                                { priority: "high", title: "Renew Dr. Chen board certification", due: "Overdue", module: "HR" },
                                { priority: "high", title: "Review BlueCross contract renewal", due: "47 days", module: "Contracts" },
                                { priority: "medium", title: "Upload Feb billing — North Clinic", due: "3 days", module: "Financial" },
                                { priority: "medium", title: "Dr. Patel DEA registration renewal", due: "23 days", module: "HR" },
                                { priority: "low", title: "Schedule PA workflow review session", due: "2 weeks", module: "Operations" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-1 bg-slate-50 hover:bg-slate-100 dark:bg-[#1E293B]/40 dark:hover:bg-[#1E293B]/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 cursor-pointer w-full group">
                                    <div className={`w-2 h-2 rounded-full shrink-0 shadow-sm ${item.priority === "high" ? "bg-red-500" : item.priority === "medium" ? "bg-amber-500" : "bg-blue-500"}`} />
                                    <div className="flex-1 min-w-0 pr-2">
                                        <p className="m-0 text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</p>
                                        <div className="flex items-center gap-2 mt-1 w-full">
                                            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 shrink-0">Due: {item.due}</span>
                                            <Badge color={item.module === "HR" ? "purple" : item.module === "Financial" ? "blue" : "cyan"}>{item.module}</Badge>
                                        </div>
                                    </div>
                                    <button className="text-[11px] font-semibold px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all shrink-0">View</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Site Performance Overview */}
            <Card className="w-full mb-6">
                <div className="p-5 w-full">
                    <SectionHeader title="Site Performance Overview" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-2">
                        {mockData.revenueBySite.map(s => (
                            <div key={s.site} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1E293B]/20 hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors w-full">
                                <div className="text-[13px] font-semibold text-slate-600 dark:text-slate-400 mb-2 truncate">{s.site}</div>

                                <div className="mb-4">
                                    <div className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{fmtK(s.revenue)}</div>
                                    <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Revenue</div>
                                </div>

                                <div>
                                    <div className="text-[15px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">{fmtK(s.revenue - s.expenses)}</div>
                                    <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Net Margin</div>
                                </div>

                                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 w-full overflow-hidden">
                                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${((s.revenue - s.expenses) / s.revenue) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
