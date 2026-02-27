import React, { useState } from 'react';
import { useTheme } from '../App';
import { StatCard, Card, SectionHeader, TabBar, InfoBanner, Badge } from '../components/Shared';
import { mockData } from '../mockData';
import { Users, FileCheck, DollarSign, Calendar, GraduationCap, AlertCircle, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

const fmtK = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;

export function HRModule() {
    const { dark } = useTheme();
    const [tab, setTab] = useState("directory");
    const tabs = [
        { id: "directory", label: "Staff Directory" }, { id: "credentialing", label: "Credentialing" },
        { id: "payroll", label: "Payroll & Comp" }, { id: "coverage", label: "Coverage & PTO" },
        { id: "training", label: "Training" },
    ];

    return (
        <div className="flex flex-col gap-5 w-full animate-in fade-in zoom-in-95 duration-300">
            <TabBar tabs={tabs} active={tab} onChange={setTab} accent="purple" />

            {tab === "directory" && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <StatCard label="Total Staff" value="23" sub="Across 4 sites" icon={<Users size={20} />} color="purple" />
                        <StatCard label="Providers" value="8" sub="MD/NP/PA" icon={<FileCheck size={20} />} color="blue" />
                        <StatCard label="Admin Staff" value="11" sub="Non-clinical" icon={<Calendar size={20} />} color="cyan" />
                        <StatCard label="Credentialing" value="1" sub="Tom Bradley — NP" icon={<Clock size={20} />} color="amber" />
                    </div>
                    <Card className="w-full">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800/80 gap-3">
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Staff Directory</span>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors duration-200 shadow-sm w-full sm:w-auto">
                                + Add Staff
                            </button>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full min-w-[700px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#1E293B]/20">
                                        {["Name", "Role", "Site", "Type", "License Exp.", "Status"].map(h => (
                                            <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {mockData.staff.map(s => (
                                        <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 transition-colors duration-150 group cursor-pointer">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundColor: `hsl(${s.id * 47}, 55%, 45%)` }}>
                                                        {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                                    </div>
                                                    <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{s.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 font-medium">{s.role}</td>
                                            <td className="px-4 py-3"><Badge color="blue">{s.site.split(" ")[0]}</Badge></td>
                                            <td className="px-4 py-3"><Badge color={s.type === "Provider" ? "purple" : s.type === "Admin" ? "cyan" : "gray"}>{s.type}</Badge></td>
                                            <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400">{s.license}</td>
                                            <td className="px-4 py-3"><Badge color={s.status === "Active" ? "green" : "amber"}>{s.status}</Badge></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}

            {tab === "credentialing" && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <StatCard label="Monitored Items" value="22" sub="Active licenses" icon={<CheckCircle size={20} />} color="green" />
                        <StatCard label="Expiring Soon" value="3" sub="Within 90 days" icon={<AlertCircle size={20} />} color="amber" />
                        <StatCard label="Expired" value="1" sub="Requires action" icon={<ShieldAlert size={20} />} color="red" />
                        <StatCard label="Pending" value="1" sub="Tom Bradley NP" icon={<Clock size={20} />} color="blue" />
                    </div>
                    <InfoBanner icon={<ShieldAlert size={24} className="text-red-500" strokeWidth={1.5} />} title="Revenue Impact Alert" desc="Dr. Chen board certification expired 87 days ago — estimated impact: $18,400/month if not resolved." color="red" />
                    <Card className="w-full">
                        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800/80">
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Credentialing Tracker</span>
                        </div>
                        <div className="flex flex-col w-full divide-y divide-slate-100 dark:divide-slate-800/50">
                            {mockData.credentialing.map((c, i) => {
                                const cfg = {
                                    critical: { badge: "red", label: "EXPIRED", bg: "bg-red-50/50 dark:bg-red-900/10" },
                                    warning: { badge: "amber", label: `${c.daysLeft}d`, bg: "bg-amber-50/50 dark:bg-amber-900/10" },
                                    pending: { badge: "blue", label: "PENDING", bg: "bg-blue-50/50 dark:bg-blue-900/10" },
                                    ok: { badge: "green", label: `${c.daysLeft}d`, bg: "bg-transparent" },
                                }[c.status];

                                return (
                                    <div key={i} className={`flex flex-col sm:flex-row justify-between sm:items-center p-4 gap-4 w-full hover:brightness-95 dark:hover:brightness-110 transition-all cursor-pointer ${cfg.bg}`}>
                                        <div className="flex-1 w-full min-w-0">
                                            <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate">{c.item}</div>
                                            <div className="text-[12px] font-medium text-slate-500 mt-0.5 truncate">{c.provider}</div>
                                        </div>
                                        <div className="flex items-center justify-between sm:w-auto gap-4 w-full">
                                            <div className="text-[12px] font-medium text-slate-500 whitespace-nowrap">{c.expiry || "—"}</div>
                                            <Badge color={cfg.badge}>{cfg.label}</Badge>
                                            <button className="text-[11px] font-semibold px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            )}

            {tab === "payroll" && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        <StatCard label="Monthly Payroll" value={fmtK(mockData.expenses.payroll)} sub="Feb 2026 total" icon={<DollarSign size={20} />} color="purple" />
                        <StatCard label="Per Provider Avg" value={fmtK(mockData.expenses.payroll / 4)} sub="Salary + burden" icon={<Users size={20} />} color="blue" />
                        <StatCard label="Payroll Burden" value="24.1%" sub="Benefits + taxes" icon={<FileCheck size={20} />} color="amber" />
                    </div>
                    <Card className="w-full">
                        <div className="p-6 h-full flex flex-col">
                            <SectionHeader title="Provider Compensation Overview" />
                            <div className="flex flex-col gap-3 w-full mt-2">
                                {mockData.revenueByProvider.map(p => (
                                    <div key={p.name} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/40 hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-colors w-full gap-4 group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full flex justify-center items-center text-sm font-bold text-white bg-blue-600 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                                {p.name.split(" ")[1][0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[14px] font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.name}</div>
                                                <div className="text-[12px] font-medium text-slate-500 mt-0.5 truncate">Base salary + productivity bonus</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:w-auto gap-6 sm:text-right">
                                            <div>
                                                <div className="text-[14px] font-bold text-slate-900 dark:text-white font-mono tracking-tight">{fmtK(p.expenses)}<span className="text-[11px] text-slate-400">/mo</span></div>
                                                <div className="text-[11px] font-medium text-slate-500 mt-0.5">wRVU: <span className="text-slate-700 dark:text-slate-300">{p.rvu.toLocaleString()}</span></div>
                                            </div>
                                            <Badge color="green">Active</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === "coverage" && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <StatCard label="PTO Requests" value="3" sub="Awaiting approval" icon={<Calendar size={20} />} color="cyan" />
                        <StatCard label="Coverage Gaps" value="0" sub="All shifts covered" icon={<CheckCircle size={20} />} color="green" />
                        <StatCard label="Call Schedule" value="4" sub="Providers on call" icon={<Clock size={20} />} color="blue" />
                        <StatCard label="PTO Balance Avg" value="12.4d" sub="Across all staff" icon={<Users size={20} />} color="purple" />
                    </div>
                    <Card className="w-full">
                        <div className="p-6 w-full">
                            <SectionHeader title="Coverage Calendar — March 2026" />
                            <div className="grid grid-cols-5 gap-2 mb-2 w-full mt-4">
                                {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => (
                                    <div key={d} className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-2">{d}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-5 gap-2 w-full">
                                {Array.from({ length: 20 }, (_, i) => {
                                    const ev = [2, 7, 12, 15].includes(i);
                                    return (
                                        <div key={i}
                                            className={`relative flex flex-col justify-center items-center p-3 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 border w-full
                        ${ev ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 hover:border-blue-300 dark:hover:bg-blue-900/30"
                                                    : "bg-slate-50 dark:bg-[#1E293B]/30 text-slate-500 border-slate-100 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-200 dark:hover:border-slate-700"}`}
                                        >
                                            <span className="text-sm">{i + 1}</span>
                                            {ev && <span className="text-[10px] font-bold text-blue-500 mt-1 uppercase tracking-wider">PTO</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === "training" && (
                <Card className="w-full mb-6">
                    <div className="p-6 h-full flex flex-col">
                        <SectionHeader title="Training & Compliance Status" />
                        <div className="flex flex-col gap-3 w-full mt-4">
                            {[
                                { name: "HIPAA Privacy & Security", completed: 21, total: 23, due: "2026-04-01" },
                                { name: "OSHA Safety Training", completed: 18, total: 23, due: "2026-03-15" },
                                { name: "MA Phlebotomy Certification", completed: 4, total: 5, due: "2026-06-01" },
                                { name: "EMG/EEG Prep Training", completed: 3, total: 5, due: "2026-05-30" },
                                { name: "Fire Safety & Evacuation", completed: 23, total: 23, due: "2026-12-01" },
                            ].map(tr => (
                                <div key={tr.name} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/60 transition-colors w-full">
                                    <div className="flex flex-wrap justify-between items-center mb-2.5 w-full gap-2">
                                        <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100">{tr.name}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[12px] font-semibold text-slate-500 font-mono">{tr.completed}/{tr.total}</span>
                                            <Badge color={tr.completed === tr.total ? "green" : tr.completed / tr.total > 0.8 ? "amber" : "red"}>
                                                {tr.completed === tr.total ? "Complete" : `${Math.round(tr.completed / tr.total * 100)}%`}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 w-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${tr.completed === tr.total ? "bg-emerald-500" : "bg-blue-500"}`}
                                            style={{ width: `${(tr.completed / tr.total) * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-2.5">Due: {tr.due}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
