import React, { useState } from 'react';
import { useTheme } from '../App';
import { Card, SectionHeader, Badge } from '../components/Shared';
import { mockData } from '../mockData';

export function SettingsModule() {
    const { dark } = useTheme();
    const [prefs, setPrefs] = useState([true, true, true, false, true, false]);

    const prefLabels = [
        "Credentialing expiration alerts (90/60/30 days)",
        "Contract renewal alerts (90/60/30 days)",
        "AR milestone alerts",
        "Cash position alerts",
        "Weekly financial summary email",
        "Daily digest mode",
    ];

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-300">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* User Management */}
                <Card className="w-full h-full">
                    <div className="p-6 flex flex-col h-full w-full">
                        <SectionHeader title="User Management"
                            right={<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm cursor-pointer whitespace-nowrap">+ Invite User</button>} />
                        <div className="flex flex-col gap-3 w-full mt-4 flex-1">
                            {[
                                { name: "Maria Gonzalez", role: "Practice Admin", email: "mgonzalez@shahidrafiq.com", access: "Full Access", color: "green" },
                                { name: "Dr. Shahid Rafiq", role: "Lead Physician", email: "srafiq@shahidrafiq.com", access: "Executive View", color: "blue" },
                                { name: "James Park", role: "Billing Manager", email: "jpark@shahidrafiq.com", access: "Financial Only", color: "cyan" },
                            ].map(u => (
                                <div key={u.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 w-full hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex justify-center items-center text-sm font-bold text-white shrink-0 shadow-md">
                                            {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                        </div>
                                        <div className="flex-1 min-w-0 pr-2">
                                            <div className="text-[14px] font-bold text-slate-900 dark:text-slate-100 truncate">{u.name}</div>
                                            <div className="text-[12px] font-medium text-slate-500 mt-1 truncate">{u.email}</div>
                                        </div>
                                    </div>
                                    <div className="shrink-0 sm:ml-auto">
                                        <Badge color={u.color}>{u.access}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Role-Based Access Control */}
                <Card className="w-full h-full">
                    <div className="p-6 flex flex-col h-full w-full">
                        <SectionHeader title="Role-Based Access Control" />
                        <div className="flex flex-col gap-3 w-full mt-4 flex-1">
                            {[
                                { role: "Practice Admin", perms: ["Financial", "HR", "Contracts", "Settings"], color: "green" },
                                { role: "Executive View", perms: ["Dashboard", "Financial Read", "Reports"], color: "blue" },
                                { role: "Billing Manager", perms: ["Financial", "AR", "Reports"], color: "cyan" },
                                { role: "HR Coordinator", perms: ["HR Module", "Credentialing"], color: "purple" },
                            ].map(r => (
                                <div key={r.role} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 w-full">
                                    <div className="flex justify-between items-center mb-3 w-full">
                                        <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{r.role}</span>
                                        <Badge color={r.color}>Active</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 w-full">
                                        {r.perms.map(p => (
                                            <span key={p} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Site Configuration */}
            <Card className="w-full">
                <div className="p-6 flex flex-col w-full">
                    <SectionHeader title="Site Configuration" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
                        {mockData.sites.slice(1).map(site => (
                            <div key={site} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 w-full hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                                <div className="text-[14px] font-bold text-slate-800 dark:text-slate-100 mb-2 truncate">{site}</div>
                                <Badge color="green">Active</Badge>
                                <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-3 flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500">
                                    Reporting enabled
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="w-full mb-6">
                <div className="p-6 flex flex-col w-full">
                    <SectionHeader title="Notification Preferences" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full mt-4">
                        {prefLabels.map((label, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#1E293B]/20 border border-slate-200 dark:border-slate-800 w-full hover:bg-slate-100 dark:hover:bg-[#1E293B]/40 transition-colors">
                                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 pr-4">{label}</span>
                                <button
                                    onClick={() => setPrefs(prev => prev.map((v, j) => j === i ? !v : v))}
                                    className={`relative inline-flex items-center shrink-0 w-10 h-[22px] rounded-full cursor-pointer transition-colors duration-300 border-none outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E1529] ${prefs[i] ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
                                        }`}
                                >
                                    <span className={`absolute w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${prefs[i] ? "left-[calc(100%-18px)]" : "left-[2px]"
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

        </div>
    );
}
