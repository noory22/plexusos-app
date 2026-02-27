import React, { useState } from 'react';
import { useTheme } from '../App';
import { StatCard, Card, SectionHeader, TabBar, InfoBanner, MiniBarChart, DonutChart, ProgressBar, Badge } from '../components/Shared';
import { mockData } from '../mockData';
import { DollarSign, LineChart, TrendingDown, Clock, FolderDown, AlertTriangle } from 'lucide-react';

const fmtK = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;
const fmtCurrency = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function FinancialModule() {
    const { dark } = useTheme();
    const [tab, setTab] = useState("cash");
    const tabs = [
        { id: "cash", label: "Cash Position" }, { id: "revenue", label: "Revenue Analytics" },
        { id: "expenses", label: "Expenses" }, { id: "ar", label: "AR Aging" },
        { id: "projections", label: "Projections" },
    ];

    return (
        <div className="flex flex-col gap-5 w-full animate-in fade-in zoom-in-95 duration-300">
            <TabBar tabs={tabs} active={tab} onChange={setTab} accent="blue" />
            <InfoBanner icon={<FolderDown size={22} className="text-blue-500" strokeWidth={1.5} />} title="Data Import Engine Active" desc="Upload CSV, Excel, or PDF billing reports — inbox watching active." action="Import Data" color="blue" />

            {tab === "cash" && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <StatCard label="Cash Position" value={fmtK(mockData.cashPosition.total)} sub="All bank accounts" icon={<DollarSign size={20} />} trend={6.2} color="green" />
                        <StatCard label="Accounts Receivable" value={fmtK(mockData.cashPosition.ar)} sub="Outstanding billings" icon={<LineChart size={20} />} trend={-2.1} color="blue" />
                        <StatCard label="Accounts Payable" value={fmtK(mockData.cashPosition.ap)} sub="Due obligations" icon={<TrendingDown size={20} />} trend={1.4} color="amber" />
                        <StatCard label="Cash Runway" value={`${mockData.cashPosition.runway} days`} sub="At current burn rate" icon={<Clock size={20} />} color="cyan" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-4">
                        <Card className="w-full">
                            <div className="p-6 h-full flex flex-col justify-between">
                                <SectionHeader title="Cash Position Trend (8 Months)" />
                                <div className="w-full h-24 mb-2 mt-4">
                                    <MiniBarChart data={mockData.cashPosition.trend} height={96} />
                                </div>
                                <div className="flex justify-between w-full mt-2">
                                    {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map(m => (
                                        <span key={m} className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 w-full text-center">{m}</span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                        <Card className="w-full">
                            <div className="p-6 h-full flex flex-col justify-between">
                                <SectionHeader title="Cash Flow Summary — Feb 2026" />
                                <div className="flex flex-col flex-1 justify-center py-2">
                                    {[
                                        { label: "Total Revenue", value: fmtCurrency(445500), color: "text-emerald-600 dark:text-emerald-400" },
                                        { label: "Total Expenses", value: fmtCurrency(295000), color: "text-red-500 dark:text-red-400" },
                                    ].map(row => (
                                        <div key={row.label} className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800/80 w-full">
                                            <span className="text-[14px] font-medium text-slate-600 dark:text-slate-400">{row.label}</span>
                                            <span className={`text-[15px] font-bold font-mono tracking-tight ${row.color}`}>{row.value}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center pt-6 w-full">
                                        <span className="text-[15px] font-bold text-slate-900 dark:text-white">Net Income</span>
                                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">{fmtCurrency(150500)}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {tab === "revenue" && (
                <div className="flex flex-col gap-4 w-full mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        <Card className="w-full">
                            <div className="p-6 h-full flex flex-col">
                                <SectionHeader title="Revenue by Payor" />
                                <div className="flex flex-col sm:flex-row items-center gap-8 w-full flex-1 justify-center mt-2">
                                    <div className="shrink-0 drop-shadow-md">
                                        <DonutChart segments={mockData.revenueByPayor} size={150} />
                                    </div>
                                    <div className="flex-1 flex flex-col w-full gap-3 justify-center">
                                        {mockData.revenueByPayor.map(p => (
                                            <div key={p.name} className="flex items-center justify-between w-full group">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-3 h-3 rounded-full shadow-sm group-hover:scale-125 transition-transform" style={{ backgroundColor: p.color }} />
                                                    <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{p.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[13px] font-bold text-slate-900 dark:text-slate-100">{p.value}%</span>
                                                    <span className="block text-[11px] text-slate-400 dark:text-slate-500">{fmtK(p.amount)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="w-full">
                            <div className="p-6 h-full flex flex-col max-h-[400px]">
                                <SectionHeader title="Revenue by Provider" />
                                <div className="flex flex-col gap-3 w-full h-full overflow-y-auto pr-1">
                                    {mockData.revenueByProvider.map(p => (
                                        <div key={p.name} className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-100 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-700 transition-colors w-full">
                                            <div className="flex justify-between items-center mb-1.5 w-full">
                                                <span className="text-[14px] font-bold text-slate-900 dark:text-slate-100">{p.name}</span>
                                                <span className="text-[14px] font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">{fmtK(p.revenue)}</span>
                                            </div>
                                            <div className="flex gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2.5 w-full">
                                                <span className="bg-slate-200/50 dark:bg-slate-800/50 px-2 py-0.5 rounded-md">wRVU: {p.rvu.toLocaleString()}</span>
                                                <span className="bg-slate-200/50 dark:bg-slate-800/50 px-2 py-0.5 rounded-md">Exp: {fmtK(p.expenses)}</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 w-full overflow-hidden">
                                                <div className="h-full rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${(p.revenue / 124500) * 100}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card className="w-full">
                        <div className="p-6 w-full">
                            <SectionHeader title="Revenue by Site — Feb 2026" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 w-full">
                                {mockData.revenueBySite.map(s => (
                                    <ProgressBar key={s.site} label={s.site} sublabel={fmtK(s.revenue)} value={s.revenue} max={248000} color="#3B82F6" />
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === "expenses" && (
                <div className="flex flex-col gap-4 w-full mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <StatCard label="Total Expenses" value={fmtK(mockData.expenses.payroll + mockData.expenses.nonPayroll)} sub="February 2026" icon={<TrendingDown size={20} />} color="red" />
                        <StatCard label="Payroll Expenses" value={fmtK(mockData.expenses.payroll)} sub="66% of total" icon={<LineChart size={20} />} color="purple" />
                        <StatCard label="Non-Payroll" value={fmtK(mockData.expenses.nonPayroll)} sub="Operational costs" icon={<BarChart2 size={20} />} color="amber" />
                    </div>
                    <Card className="w-full">
                        <div className="p-6 w-full">
                            <SectionHeader title="Expense Breakdown by Category" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
                                {mockData.expenses.categories.map(c => (
                                    <div key={c.name} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/60 transition-colors w-full">
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{fmtK(c.amount)}</div>
                                        <div className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mt-1 mb-3">{c.name}</div>
                                        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 w-full overflow-hidden">
                                            <div className="h-full rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${(c.amount / 380000) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === "ar" && (
                <div className="flex flex-col gap-4 w-full mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <StatCard label="Total AR" value={fmtK(mockData.cashPosition.ar)} sub="Gross outstanding" icon={<LineChart size={20} />} color="blue" />
                        <StatCard label="AR Days" value="38.2" sub="Target: <35 days" icon={<Clock size={20} />} color="amber" />
                        <StatCard label="Collection Rate" value="94.2%" sub="Target: >95%" icon={<AlertTriangle size={20} />} color="green" />
                        <StatCard label="Denial Rate" value="4.8%" sub="Target: <5%" icon={<TrendingDown size={20} />} color="red" />
                    </div>
                    <Card className="w-full">
                        <div className="p-6 w-full">
                            <SectionHeader title="AR Aging Buckets" />
                            <div className="flex flex-col gap-4 w-full mt-2">
                                {mockData.arAging.map(b => (
                                    <div key={b.bucket} className="w-full p-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-lg transition-colors">
                                        <div className="flex justify-between items-center mb-2 w-full">
                                            <span className="text-[14px] font-bold text-slate-700 dark:text-slate-300">{b.bucket}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[12px] font-medium text-slate-400 dark:text-slate-500 min-w-[32px] text-right">{b.pct}%</span>
                                                <span className="text-[14px] font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight min-w-[70px] text-right">{fmtK(b.amount)}</span>
                                            </div>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 w-full overflow-hidden shadow-inner">
                                            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 w-full">
                                <InfoBanner icon={<AlertTriangle size={24} className="text-amber-500 drop-shadow-sm" strokeWidth={1.5} />} title="AR days at 38.2 — above 35-day target" desc={`${fmtK(mockData.arAging[3].amount + mockData.arAging[4].amount)} in 91+ days bucket requires active escalation with payors.`} color="amber" />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === "projections" && (
                <div className="flex flex-col gap-4 w-full mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {[
                            { label: "30-Day Forecast", value: fmtK(1380000), trend: "+7.4%" },
                            { label: "60-Day Forecast", value: fmtK(1510000), trend: "+17.5%" },
                            { label: "90-Day Forecast", value: fmtK(1640000), trend: "+27.6%" },
                        ].map(f => (
                            <Card key={f.label} className="w-full hover:-translate-y-1 transition-transform duration-300">
                                <div className="p-6 flex flex-col items-center text-center justify-center">
                                    <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500 mb-3">{f.label}</div>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white font-mono tracking-tight mb-2 drop-shadow-sm">{f.value}</div>
                                    <span className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">{f.trend} vs today</span>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 leading-tight">Based on historical run-rate + contracted revenue</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <Card className="w-full">
                        <div className="p-6 w-full">
                            <SectionHeader title="MGMA Neurology Benchmarks" right={<Badge color="cyan">2025 Data</Badge>} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
                                {[
                                    { metric: "AR Days", yours: "38.2", benchmark: "< 35", status: "warn" },
                                    { metric: "Collection Rate", yours: "94.2%", benchmark: "> 95%", status: "warn" },
                                    { metric: "Overhead %", yours: "61.8%", benchmark: "< 60%", status: "warn" },
                                    { metric: "wRVU/Provider", yours: "1,605", benchmark: "1,800+", status: "warn" },
                                ].map((b, i) => (
                                    <div key={b.metric} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 w-full group hover:border-amber-300 dark:hover:border-amber-700/50 transition-colors">
                                        <div className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 mb-2 truncate">{b.metric}</div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight mb-3 transition-colors">{b.yours}</div>
                                        <div className="flex items-center gap-1.5 text-[12px] border-t border-slate-200 dark:border-slate-800 pt-3">
                                            <span className="font-medium text-slate-400 dark:text-slate-500">Benchmark: </span>
                                            <span className="font-bold text-amber-600 dark:text-amber-400 tracking-tight">{b.benchmark}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
