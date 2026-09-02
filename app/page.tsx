"use client";

import React from "react";
import Link from "next/link";
import { useResilience } from "@/lib/context/ResilienceContext";
import DigitalTwinGraph from "@/components/network/DigitalTwinGraph";
import eventsData from "@/data/events.json";
import scenariosData from "@/data/scenarios.json";
import strategiesData from "@/data/strategies.json";
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Clock,
  Radio,
  FileCheck2,
  TrendingDown,
  CheckCircle2,
  Maximize2,
} from "lucide-react";

export default function ControlTowerPage() {
  const {
    systemMode,
    networkHealth,
    triggerLiveDisruption,
    resetToRehearsal,
    isRecovering,
    recoveryStep,
  } = useResilience();

  const activeSignal = eventsData[0];
  const nextBestStrategy = strategiesData[0];

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full">
      {/* Top Mission Statement & Quick Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292E2F] pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono tracking-widest text-[#62B8C8] bg-[#112226] border border-[#234E57] px-2 py-0.5">
              AUTOPILOT CONTROL TOWER
            </span>
            <span className="text-xs font-mono text-[#5F6564]">
              SESSION: SHANGHAI_PORT_HERO
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Global Resilience Matrix
          </h1>
        </div>

        {/* Global Summary KPI Bar (Clean, Solid, Non-dominant) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          <div className="bg-[#111416] border border-[#292E2F] p-2">
            <span className="text-[#5F6564] text-[10px] block">NETWORK HEALTH</span>
            <span
              className={`text-lg font-bold tabular-data ${
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

          <div className="bg-[#111416] border border-[#292E2F] p-2">
            <span className="text-[#5F6564] text-[10px] block">ACTIVE RISKS</span>
            <span className="text-lg font-bold text-[#D6A84F] tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "3 CRITICAL" : "1 MONITORED"}
            </span>
          </div>

          <div className="bg-[#111416] border border-[#292E2F] p-2">
            <span className="text-[#5F6564] text-[10px] block">REVENUE EXPOSURE</span>
            <span className="text-lg font-bold text-[#D7655A] tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "₹18.7 Cr" : "₹0.4 Cr"}
            </span>
          </div>

          <div className="bg-[#111416] border border-[#292E2F] p-2">
            <span className="text-[#5F6564] text-[10px] block">BUFFER AT RISK</span>
            <span className="text-lg font-bold text-[#E8E5DD] tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "4 Facilities" : "1 Staging"}
            </span>
          </div>

          <div className="bg-[#111416] border border-[#292E2F] p-2 col-span-2 sm:col-span-1">
            <span className="text-[#5F6564] text-[10px] block">RECOVERY READINESS</span>
            <span className="text-lg font-bold text-[#62B8C8] tabular-data">
              {systemMode === "RECOVERED" ? "100%" : "91% PREPARED"}
            </span>
          </div>
        </div>
      </div>

      {/* Disruption Alert / Rehearsal Banner */}
      {systemMode === "LIVE_DISRUPTION" ? (
        <div className="bg-[#1C1211] border border-[#572A26] p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2A1413] border border-[#572A26]">
              <AlertTriangle className="w-5 h-5 text-[#D7655A] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[#D7655A] font-bold tracking-wider uppercase">
                  CONFIRMED DISRUPTION DETECTED:
                </span>
                <span className="bg-[#572A26] text-[#E8E5DD] px-1.5 py-0.2">
                  SIG-02481
                </span>
              </div>
              <p className="text-[#E8E5DD] mt-0.5 font-sans text-sm">
                Shanghai Yangshan Terminal confirmed 24h+ berth lock. Rehearsed 24-Hour Playbook matched and verified against live twin state.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="/decisions"
              className="px-3.5 py-1.5 bg-[#D7655A] text-[#0B0D0E] font-bold text-xs hover:bg-[#E8E5DD] transition-colors flex items-center space-x-1.5"
            >
              <span>AUTHORIZE RECOVERY ACTION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : systemMode === "EXECUTING" || isRecovering ? (
        <div className="bg-[#1A1810] border border-[#544121] p-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#D6A84F] animate-ping" />
            <div>
              <span className="text-[#D6A84F] font-bold uppercase tracking-wider">
                EXECUTING MULTI-STAGE RECOVERY:
              </span>
              <span className="text-[#E8E5DD] ml-2 font-sans">
                {recoveryStep === 1 && "Inventory redistribution executing (Chicago Hub +1,500 units)..."}
                {recoveryStep === 2 && "Busan Port diversion ordered; Midwest Semi contract activated..."}
                {recoveryStep >= 3 && "All recovery actions verified. System stabilizing..."}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[#D6A84F] font-bold">HEALTH RISING: {networkHealth}%</span>
          </div>
        </div>
      ) : (
        <div className="bg-[#111718] border border-[#234E57] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-2.5">
            <Radio className="w-4 h-4 text-[#62B8C8] animate-pulse" />
            <div>
              <span className="text-[#62B8C8] font-bold uppercase">
                CONTINUOUS REHEARSAL ACTIVE:
              </span>
              <span className="text-[#9A9C97] ml-2">
                External signal detected (Shanghai Port 2h advisory). 4 multi-horizon future stress trees rehearsed.
              </span>
            </div>
          </div>
          <button
            onClick={triggerLiveDisruption}
            className="px-3 py-1 bg-[#171B1D] border border-[#292E2F] text-[#D6A84F] hover:border-[#D6A84F] text-[11px] transition-colors"
          >
            SIMULATE DISRUPTION MATERIALIZATION →
          </button>
        </div>
      )}

      {/* Primary Layout Grid: Asymmetric Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Network Graph Column (Occupies 8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#9A9C97] flex items-center space-x-1.5">
              <span>LIVE COMPUTATIONAL GRAPH</span>
              <span className="text-[#5F6564]">// INTERACTIVE IMPACT TRACE</span>
            </span>
            <Link
              href="/network"
              className="text-[#62B8C8] hover:underline flex items-center space-x-1 text-[11px]"
            >
              <span>EXPAND FULL TWIN</span>
              <Maximize2 className="w-3 h-3" />
            </Link>
          </div>
          
          <DigitalTwinGraph height="460px" showInspector={true} />
        </div>

        {/* Right Intelligence Column (Occupies 4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Signal Stream Panel */}
          <div className="border border-[#292E2F] bg-[#111416] p-3.5 flex flex-col font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] mb-2.5 text-xs">
              <span className="text-[#62B8C8] font-bold tracking-wider flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5" />
                <span>EXTERNAL SIGNAL FEED</span>
              </span>
              <Link href="/signals" className="text-[11px] text-[#9A9C97] hover:text-[#E8E5DD]">
                VIEW ALL (3) →
              </Link>
            </div>

            {/* Signal Item */}
            <div className="bg-[#171B1D] border border-[#292E2F] p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#D6A84F] font-bold">{activeSignal.id}</span>
                <span className="text-[#5F6564]">17:42:08 UTC</span>
              </div>
              <div className="text-xs font-serif text-[#E8E5DD] font-semibold">
                {activeSignal.eventType} — {activeSignal.location}
              </div>
              <p className="text-[11px] font-sans text-[#9A9C97] line-clamp-2">
                {activeSignal.rawText}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#1C2123] text-[10px]">
                <span className="text-[#9A9C97]">CONFIDENCE: <b className="text-[#62B8C8]">{(activeSignal.confidence * 100).toFixed(0)}%</b></span>
                <span className="text-[#73B58A] border border-[#244931] px-1.5 py-0.2 bg-[#122117]">
                  VALIDATED (4 SOURCES)
                </span>
              </div>
            </div>
          </div>

          {/* Next-Best Action Preview Card */}
          <div className="border border-[#292E2F] bg-[#111416] p-3.5 flex flex-col font-mono flex-1 justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] mb-2 text-xs">
                <span className="text-[#D6A84F] font-bold tracking-wider uppercase">
                  RECOMMENDED NEXT-BEST ACTION
                </span>
                <span className="text-[10px] text-[#73B58A] border border-[#244931] px-1.5 py-0.2 bg-[#122117]">
                  ORCHESTRATOR RANK #1
                </span>
              </div>

              <div className="text-sm font-serif font-bold text-[#E8E5DD] mb-1">
                {nextBestStrategy.title}
              </div>
              <p className="text-[11px] font-sans text-[#9A9C97] mb-3">
                {nextBestStrategy.summary}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#171B1D] border border-[#292E2F] p-2 mb-3">
                <div>
                  <span className="text-[#5F6564] text-[10px] block">INCREMENTAL COST</span>
                  <span className="text-[#E8E5DD] font-bold">{nextBestStrategy.costFormatted}</span>
                </div>
                <div>
                  <span className="text-[#5F6564] text-[10px] block">RECOVERY TIME</span>
                  <span className="text-[#62B8C8] font-bold">{nextBestStrategy.recoveryDays} Days</span>
                </div>
                <div>
                  <span className="text-[#5F6564] text-[10px] block">SERVICE LEVEL</span>
                  <span className="text-[#73B58A] font-bold">{nextBestStrategy.serviceLevelPercent}%</span>
                </div>
                <div>
                  <span className="text-[#5F6564] text-[10px] block">AUTONOMY GATE</span>
                  <span className="text-[#D6A84F] font-bold">HUMAN APPROVAL</span>
                </div>
              </div>
            </div>

            <Link
              href="/decisions"
              className="w-full py-2 bg-[#171B1D] border border-[#292E2F] hover:border-[#62B8C8] text-[#E8E5DD] hover:text-[#62B8C8] text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <span>INSPECT DECISION & PLAYBOOK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Continuous Rehearsal Horizon Stress Tests */}
      <div className="border border-[#292E2F] bg-[#111416] p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#1C2123] mb-3 text-xs font-mono gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-[#62B8C8] font-bold tracking-wider uppercase">
              CONTINUOUS REHEARSAL HORIZONS
            </span>
            <span className="text-[#5F6564]">|</span>
            <span className="text-[#9A9C97]">
              "We don't wait for disruption to plan. We continuously rehearse it."
            </span>
          </div>
          <Link href="/scenarios" className="text-[11px] text-[#D6A84F] hover:underline flex items-center space-x-1">
            <span>DEEP STRESS ENGINE</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
          {scenariosData.map((scen) => (
            <div
              key={scen.id}
              className="bg-[#171B1D] border border-[#292E2F] p-3 flex flex-col justify-between hover:border-[#414A4D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-[#1C2123] mb-2 text-[11px]">
                  <span className="text-[#62B8C8] font-bold">{scen.label}</span>
                  <span className="text-[#5F6564]">{(scen.closureProbability * 100).toFixed(0)}% PROB</span>
                </div>
                <div className="text-xs font-serif text-[#E8E5DD] font-semibold mb-1 line-clamp-1">
                  {scen.label === "2 HOURS" && "Tidal Crane Delay"}
                  {scen.label === "24 HOURS" && "Berth Lockout Spreading"}
                  {scen.label === "7 DAYS" && "Pacific Logistics Gridlock"}
                  {scen.label === "PERMANENT" && "Structural Port Closure"}
                </div>
                <p className="text-[10px] font-sans text-[#9A9C97] mb-2 line-clamp-2">
                  {scen.narrative}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1C2123] grid grid-cols-2 gap-1 text-[10px]">
                <div>
                  <span className="text-[#5F6564] block">EXPOSURE</span>
                  <span className="text-[#D6A84F] font-bold tabular-data">₹{scen.revenueExposure} Cr</span>
                </div>
                <div className="text-right">
                  <span className="text-[#5F6564] block">RECOVERY</span>
                  <span className="text-[#E8E5DD] tabular-data">{scen.recoveryTimeDays} Days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
