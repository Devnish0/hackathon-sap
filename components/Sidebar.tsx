"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  LayoutDashboard,
  Network,
  Radio,
  GitFork,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Activity,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { systemMode, networkHealth, triggerLiveDisruption, resetToRehearsal } =
    useResilience();

  const navItems = [
    { href: "/control-tower", label: "Control Tower", icon: LayoutDashboard },
    { href: "/network", label: "Digital Twin", icon: Network },
    { href: "/signals", label: "Signals", icon: Radio },
    { href: "/scenarios", label: "Rehearsals", icon: GitFork },
    { href: "/agents", label: "Agents", icon: Cpu },
    { href: "/decisions", label: "Decisions", icon: ShieldCheck },
  ];

  return (
    <aside className="w-60 shrink-0 bg-base-200 flex flex-col justify-between select-none z-30 border-r border-base-300">
      <div>
        {/* Brand Header */}
        <div className="px-5 pt-6 pb-5">
          <Link href="/" className="block group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-content" />
              </div>
              <div>
                <span className="font-serif text-lg tracking-tight text-base-content group-hover:text-primary transition-colors block leading-tight">
                  Resilience
                </span>
                <span className="text-[10px] font-mono text-base-content/40 tracking-widest uppercase block">
                  Autopilot
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="px-3">
          <div className="px-3 pb-2 text-[10px] font-mono text-base-content/30 tracking-widest uppercase">
            Operations
          </div>
          <ul className="menu menu-sm rounded-box w-full p-0 gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${isActive ? "active font-medium" : ""}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 space-y-3">
        {/* Network Health */}
        <div className="bg-base-100 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-base-content/50">Network Health</span>
            <span
              className={`badge badge-sm font-mono ${
                networkHealth >= 80
                  ? "badge-success"
                  : networkHealth >= 60
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              {networkHealth}%
            </span>
          </div>
          <progress
            className={`progress w-full h-1.5 ${
              networkHealth >= 80
                ? "progress-success"
                : networkHealth >= 60
                ? "progress-warning"
                : "progress-error"
            }`}
            value={networkHealth}
            max="100"
          />
        </div>

        {/* Mode Toggle */}
        {systemMode === "REHEARSAL" ? (
          <button
            onClick={triggerLiveDisruption}
            className="btn btn-warning btn-outline btn-sm w-full gap-2 font-mono text-[11px]"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            MODE A: REHEARSAL
          </button>
        ) : (
          <button
            onClick={resetToRehearsal}
            className="btn btn-error btn-outline btn-sm w-full gap-2 font-mono text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET REHEARSAL
          </button>
        )}
      </div>
    </aside>
  );
}
