import React, { useState } from 'react';
import { useTheme } from '../App';
import { StatCard, Card, SectionHeader, TabBar, InfoBanner, Badge } from '../components/Shared';
import { mockData } from '../mockData';
import { FileText, FileCheck, AlertTriangle, FileSignature, Search, Upload } from 'lucide-react';

export function ContractsModule() {
    const { dark } = useTheme();
    const [tab, setTab] = useState("repository");
    const [search, setSearch] = useState("");
    const tabs = [
        { id: "repository", label: "Repository" }, { id: "employment", label: "Employment" },
        { id: "lifecycle", label: "Lifecycle" }, { id: "payor", label: "Payor Intel" },
    ];

    const filtered = mockData.contracts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase()) ||
        c.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-5 w-full animate-in fade-in zoom-in-95 duration-300">
            <TabBar tabs={tabs} active={tab} onChange={setTab} accent="cyan" />

            {tab === "repository" && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <StatCard label="Total Contracts" value="30+" sub="8 digitized so far" icon={<FileText size={20} />} color="cyan" />
                        <StatCard label="Active" value="6" sub="In force" icon={<FileCheck size={20} />} color="green" />
                        <StatCard label="Renewal Window" value="2" sub="Review required" icon={<AlertTriangle size={20} />} color="amber" />
                        <StatCard label="Draft / Pending" value="1" sub="Aetna agreement" icon={<FileSignature size={20} />} color="blue" />
                    </div>
                    <InfoBanner icon={<Upload size={22} className="text-cyan-500" strokeWidth={1.5} />} title="Digitization Target: 30+ contracts remain in filing cabinets" desc="Target: 80% digitized by Day 45 of pilot. Upload outstanding provider agreements ASAP." color="cyan" />

                    <Card className="w-full">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800/80">
                            <div className="flex-1 w-full max-w-md flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#1E293B]/30 border border-slate-200 dark:border-slate-700/50 focus-within:ring-2 focus-within:ring-cyan-500/50 transition-shadow">
                                <Search size={16} className="text-slate-400 shrink-0" />
                                <input
                                    className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 w-full"
                                    placeholder="Search contracts..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <button className="px-4 py-2 w-full sm:w-auto shrink-0 border-none rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-colors shadow-sm cursor-pointer flex justify-center items-center gap-2">
                                <Upload size={14} /> Upload
                            </button>
                        </div>
                        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/50 w-full overflow-hidden">
                            {filtered.map(c => {
                                const typeColor = { Payor: "blue", Employment: "purple", Institutional: "cyan", Vendor: "gray" }[c.type] || "gray";
                                const statusColor = { Active: "green", "Renewal Window": "amber", Draft: "blue", Expired: "red" }[c.status] || "gray";

                                return (
                                    <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 transition-colors duration-150 cursor-pointer w-full group">
                                        <div className="flex-1 w-full min-w-0">
                                            <div className="text-[14px] font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{c.name}</div>
                                            <div className="flex flex-wrap items-center gap-2 mt-2 w-full">
                                                <Badge color={typeColor}>{c.type}</Badge>
                                                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap px-2 flex items-center border-l border-slate-200 dark:border-slate-700">{c.sites}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:w-auto w-full gap-5">
                                            <div className="text-left sm:text-right">
                                                <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">{c.value}</div>
                                                <div className="text-[11px] font-medium text-slate-400">Exp: {c.expiry}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge color={statusColor}>{c.status}</Badge>
                                                <button className="text-[11px] font-semibold px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            )}

            {tab === "employment" && (
                <Card className="w-full">
                    <div className="p-6 h-full flex flex-col w-full">
                        <SectionHeader title="Provider Employment Contracts"
                            right={<button className="px-3 py-1.5 rounded-md bg-transparent border border-blue-500 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">Compare Side-by-Side</button>} />
                        <div className="flex flex-col gap-3 w-full mt-4">
                            {[
                                { provider: "Dr. Shahid Rafiq", base: "$380K", bonus: "wRVU >1,800", nonCompete: "25mi / 2yr", tail: "Covered", expiry: "Jun 2027" },
                                { provider: "Dr. Linda Chen", base: "$340K", bonus: "wRVU >1,600", nonCompete: "20mi / 2yr", tail: "Covered", expiry: "Sep 2026" },
                                { provider: "Dr. Arjun Patel", base: "$340K", bonus: "wRVU >1,600", nonCompete: "20mi / 2yr", tail: "Covered", expiry: "Jan 2027" },
                                { provider: "Dr. Sarah Williams", base: "$360K", bonus: "wRVU >1,700", nonCompete: "25mi / 2yr", tail: "Covered", expiry: "Dec 2027" },
                            ].map(emp => (
                                <div key={emp.provider} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/60 hover:bg-slate-100 dark:hover:bg-[#1E293B]/40 transition-colors cursor-pointer w-full group">
                                    <div className="flex justify-between items-center mb-3 text-sm">
                                        <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{emp.provider}</span>
                                        <Badge color="green">Active</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs w-full">
                                        {[
                                            { label: "Base Salary", value: emp.base }, { label: "Productivity", value: emp.bonus },
                                            { label: "Non-Compete", value: emp.nonCompete }, { label: "Tail Coverage", value: emp.tail },
                                            { label: "Expires", value: emp.expiry },
                                        ].map(f => (
                                            <div key={f.label} className="w-full truncate">
                                                <div className="text-slate-400 dark:text-slate-500 font-medium mb-1 truncate">{f.label}</div>
                                                <div className="font-bold text-slate-700 dark:text-slate-200 truncate">{f.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {tab === "lifecycle" && (
                <Card className="w-full">
                    <div className="p-6 h-full flex flex-col w-full">
                        <SectionHeader title="Contract Renewal Calendar" />
                        <div className="flex flex-col gap-2 w-full mt-2">
                            {[
                                { name: "BlueCross Provider Agreement", expiry: "Apr 15, 2026", daysLeft: 47, urgency: "high" },
                                { name: "Metro Hospital Service Agreement", expiry: "Jun 30, 2026", daysLeft: 123, urgency: "medium" },
                                { name: "Dr. Chen Employment Contract", expiry: "Sep 1, 2026", daysLeft: 187, urgency: "medium" },
                                { name: "eClinicalWorks EHR License", expiry: "Aug 31, 2026", daysLeft: 185, urgency: "low" },
                                { name: "Office Lease — Main Campus", expiry: "Jan 1, 2028", daysLeft: 674, urgency: "low" },
                            ].map(c => (
                                <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/30 border border-slate-100 dark:border-slate-800/80 hover:bg-white dark:hover:bg-[#1E293B]/60 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all cursor-pointer w-full gap-4 group shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${c.urgency === "high" ? "bg-amber-500" : c.urgency === "medium" ? "bg-blue-500" : "bg-emerald-500"}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors w-full">{c.name}</div>
                                            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1">Expires: {c.expiry}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0">
                                        <div className="text-left sm:text-right">
                                            <div className={`text-[15px] font-bold font-mono tracking-tight ${c.daysLeft < 60 ? "text-amber-600 dark:text-amber-500" : "text-slate-900 dark:text-slate-100"}`}>{c.daysLeft}d</div>
                                            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-medium font-mono">remaining</div>
                                        </div>
                                        <button className="text-[11px] font-semibold px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
                                            Start Renewal
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {tab === "payor" && (
                <Card className="w-full mb-6">
                    <div className="p-6 h-full flex flex-col w-full">
                        <SectionHeader title="Payor Rate Comparison — Select CPT Codes" />
                        <div className="overflow-x-auto w-full mt-4">
                            <table className="w-full min-w-[700px] border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#1E293B]/20">
                                        {["CPT Code", "Description", "Medicare", "BlueCross", "Aetna", "Medicaid"].map((h, index) => (
                                            <th key={h} className={`px-4 py-3 font-bold uppercase tracking-wider text-[11px] text-slate-500 ${index < 2 ? 'text-left' : 'text-right'}`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {[
                                        { cpt: "99213", desc: "Office Visit - Level 3", mc: "$82", bc: "$94", ae: "$89", md: "$63" },
                                        { cpt: "99214", desc: "Office Visit - Level 4", mc: "$116", bc: "$135", ae: "$128", md: "$89" },
                                        { cpt: "95910", desc: "Nerve Conduction Study", mc: "$148", bc: "$172", ae: "$162", md: "$118" },
                                        { cpt: "95930", desc: "EEG - Routine", mc: "$194", bc: "$224", ae: "$218", md: "$148" },
                                        { cpt: "64615", desc: "Botox - Migraine", mc: "$88", bc: "$102", ae: "$96", md: "$71" },
                                    ].map(row => (
                                        <tr key={row.cpt} className="hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 transition-colors duration-150 cursor-pointer">
                                            <td className="px-4 py-3 font-bold font-mono tracking-tight text-cyan-600 dark:text-cyan-400">{row.cpt}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.desc}</td>
                                            <td className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-300">{row.mc}</td>
                                            <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{row.bc}</td>
                                            <td className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-300">{row.ae}</td>
                                            <td className="px-4 py-3 text-right font-bold text-red-500">{row.md}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
