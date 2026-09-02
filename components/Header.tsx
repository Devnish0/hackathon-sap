"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  Activity,
  Network,
  Radio,
  GitFork,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Play,
  Zap,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const {
    systemMode,
    networkHealth,
    triggerLiveDisruption,
    resetToRehearsal,
    isRecovering,
  } = useResilience();

  const [timeString, setTimeString] = useState("17:42:08 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toTimeString().split(" ")[0] + " UTC"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { href: "/", label: "CONTROL TOWER", icon: Activity },
    { href: "/network", label: "DIGITAL TWIN", icon: Network },
    { href: "/signals", label: "SIGNALS", icon: Radio },
    { href: "/scenarios", label: "REHEARSAL", icon: GitFork },
    { href: "/agents", label: "AGENTS", icon: Cpu },
    { href: "/decisions", label: "DECISION CENTER", icon: ShieldCheck },
  ];

  return (
    <header className="border-b border-[#292E2F] bg-[#0B0D0E] sticky top-0 z-50">
      {/* Top Telemetry & Control Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1C2123] text-xs font-mono">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-none bg-[#62B8C8] animate-pulse" />
            <span className="text-[#9A9C97] tracking-wider uppercase">SYS_MONITOR:</span>
            <span className="text-[#E8E5DD] font-semibold">AUTONOMOUS DISRUPTION CONTROL</span>
          </div>
          <span className="text-[#5F6564]">|</span>
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[#9A9C97]">HORIZON_REHEARSALS:</span>
            <span className="text-[#D6A84F] font-bold">4 ACTIVE PLAYBOOKS</span>
          </div>
        </div>

        {/* Demo Mode Stepper / Trigger */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-[#111416] border border-[#292E2F] p-0.5">
            <button
              onClick={resetToRehearsal}
              className={`px-2.5 py-1 text-[11px] font-mono transition-colors flex items-center space-x-1.5 ${
                systemMode === "REHEARSAL"
                  ? "bg-[#171B1D] text-[#62B8C8] border border-[#292E2F] font-semibold"
                  : "text-[#9A9C97] hover:text-[#E8E5DD]"
              }`}
            >
              <span>MODE A: REHEARSAL</span>
            </button>
            <button
              onClick={triggerLiveDisruption}
              className={`px-2.5 py-1 text-[11px] font-mono transition-colors flex items-center space-x-1.5 ${
                systemMode === "LIVE_DISRUPTION" || systemMode === "EXECUTING" || systemMode === "RECOVERED"
                  ? "bg-[#241413] text-[#D7655A] border border-[#572A26] font-semibold"
                  : "text-[#9A9C97] hover:text-[#E8E5DD]"
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>MODE B: LIVE DISRUPTION</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-[#292E2F]">
            <span className="text-[#5F6564]">CLOCK:</span>
            <span className="text-[#E8E5DD] font-mono">{timeString}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand & Editorial Title */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="group flex items-baseline space-x-2">
            <span className="font-serif text-2xl tracking-wide text-[#E8E5DD] group-hover:text-white transition-colors">
              Resilience Autopilot
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#D6A84F] border border-[#544121] px-1.5 py-0.5 bg-[#171B1D]">
              ENTERPRISE TWIN
            </span>
          </Link>
        </div>

        {/* Route Links */}
        <nav className="flex items-center space-x-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-mono tracking-wider transition-colors ${
                  isActive
                    ? "bg-[#171B1D] text-[#E8E5DD] border border-[#292E2F] font-semibold"
                    : "text-[#9A9C97] hover:text-[#E8E5DD] hover:bg-[#111416]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#62B8C8]" : "text-[#5F6564]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Global Network Health Pill */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#111416] border border-[#292E2F] px-3 py-1">
            <span className="text-[11px] font-mono text-[#9A9C97]">NETWORK HEALTH:</span>
            <span
              className={`font-mono font-bold text-sm tabular-data ${
                networkHealth >= 80
                  ? "text-[#73B58A]"
                  : networkHealth >= 60
                  ? "text-[#D6A84F]"
                  : "text-[#D7655A]"
              }`}
            >
              {networkHealth}%
            </span>
            {isRecovering && (
              <span className="inline-block w-2 h-2 bg-[#D6A84F] animate-ping" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
