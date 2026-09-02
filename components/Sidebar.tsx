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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { systemMode, networkHealth, triggerLiveDisruption, resetToRehearsal } =
    useResilience();

  const navItems = [
    { href: "/", label: "Control Tower", icon: LayoutDashboard },
    { href: "/network", label: "Digital Twin", icon: Network },
    { href: "/signals", label: "Signals", icon: Radio },
    { href: "/scenarios", label: "Rehearsals", icon: GitFork },
    { href: "/agents", label: "Agents", icon: Cpu },
    { href: "/decisions", label: "Decisions", icon: ShieldCheck },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-[#1C2123] bg-[#0B0D0E] flex flex-col justify-between select-none z-30">
      <div>
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-[#1C2123]">
          <Link href="/" className="block group">
            <span className="font-serif text-xl tracking-tight text-[#E8E5DD] group-hover:text-white transition-colors block">
              Resilience Autopilot
            </span>
            <span className="text-[10px] font-mono text-[#656B69] tracking-widest uppercase block mt-0.5">
              Decision Control System
            </span>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono text-[#656B69] tracking-widest uppercase">
            Operations
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 text-xs transition-colors rounded-sm ${
                    isActive
                      ? "bg-[#161A1C] text-[#E8E5DD] font-medium"
                      : "text-[#9A9C97] hover:text-[#E8E5DD] hover:bg-[#111416]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#62B8C8]" : "text-[#656B69]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer: System Status & Disruption Trigger */}
      <div className="p-4 border-t border-[#1C2123] space-y-3 bg-[#0E1012]">
        {/* Network Health Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#656B69] text-[11px]">Network Health</span>
          <div className="flex items-center space-x-1.5 font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                networkHealth >= 80
                  ? "bg-[#73B58A]"
                  : networkHealth >= 60
                  ? "bg-[#D6A84F]"
                  : "bg-[#D7655A] animate-pulse"
              }`}
            />
            <span
              className={`font-bold tabular-data ${
                networkHealth >= 80
                  ? "text-[#73B58A]"
                  : networkHealth >= 60
                  ? "text-[#D6A84F]"
                  : "text-[#D7655A]"
              }`}
            >
              {networkHealth}%
            </span>
          </div>
        </div>

        {/* Current Mode Indicator & Quick Switch */}
        <div className="space-y-1 pt-1">
          <div className="text-[10px] font-mono text-[#656B69] uppercase">
            Simulation State
          </div>
          {systemMode === "REHEARSAL" ? (
            <button
              onClick={triggerLiveDisruption}
              className="w-full text-left px-2.5 py-1.5 bg-[#161A1C] hover:bg-[#241413] hover:text-[#D7655A] border border-[#23282A] hover:border-[#572A26] transition-colors rounded-sm text-[11px] font-mono text-[#D6A84F] flex items-center justify-between group"
            >
              <span>MODE A: REHEARSAL</span>
              <AlertTriangle className="w-3 h-3 text-[#D6A84F] group-hover:text-[#D7655A]" />
            </button>
          ) : (
            <button
              onClick={resetToRehearsal}
              className="w-full text-left px-2.5 py-1.5 bg-[#241413] hover:bg-[#161A1C] border border-[#572A26] hover:border-[#23282A] transition-colors rounded-sm text-[11px] font-mono text-[#D7655A] hover:text-[#62B8C8] flex items-center justify-between group"
            >
              <span>MODE B: DISRUPTION</span>
              <RotateCcw className="w-3 h-3 text-[#D7655A] group-hover:text-[#62B8C8]" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
