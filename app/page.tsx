"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResilience } from "@/lib/context/ResilienceContext";
import DigitalTwinGraph from "@/components/network/DigitalTwinGraph";
import scenariosData from "@/data/scenarios.json";
import strategiesData from "@/data/strategies.json";
import {
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function ControlTowerPage() {
  const {
    systemMode,
    networkHealth,
    triggerLiveDisruption,
    resetToRehearsal,
    executeRecovery,
    isRecovering,
    recoveryStep,
  } = useResilience();

  const [selectedHorizon, setSelectedHorizon] = useState<string>("SCEN-24H");

  const currentScenario =
    scenariosData.find((s) => s.id === selectedHorizon) || scenariosData[1];
  const nextBestStrategy = strategiesData[0];

  const agentStream = [
    { time: "17:42:08", agent: "SENSING", text: "Port crane desync detected at Yangshan Fairway (CNSHG)" },
    { time: "17:42:10", agent: "VALIDATION", text: "4 independent feeds correlated; 84% confidence verified" },
    { time: "17:42:12", agent: "SCENARIO", text: "43 multi-horizon future stress trees generated" },
    { time: "17:42:15", agent: "LOGISTICS", text: "Port of Busan transshipment connector reserved" },
    { time: "17:42:17", agent: "INVENTORY", text: "Texas buffer safe; 1,500 units cleared for auto-transfer" },
    { time: "17:42:19", agent: "COMPLIANCE", text: "USMCA origin rules verified (78.4% passing)" },
    { time: "17:42:21", agent: "ORCHESTRATOR", text: "Composite Rank #1: Hybrid Response selected" },
  ];

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-[1780px] mx-auto w-full">
      {/* ========================================================================= */}
      {/* 1. DOMINANT STORY HEADER: ACTIVE DISRUPTION & OPERATIONAL VITALS          */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1C2123]">
        {/* Left: What is happening? Where is it happening? How serious? */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span
              className={`px-2 py-0.5 font-bold uppercase tracking-wider ${
                systemMode === "LIVE_DISRUPTION"
                  ? "bg-[#2A1413] border border-[#572A26] text-[#D7655A]"
                  : "bg-[#241D12] border border-[#544121] text-[#D6A84F]"
              }`}
            >
              {systemMode === "LIVE_DISRUPTION" ? "CONFIRMED DISRUPTION" : "SIGNAL REHEARSAL ACTIVE"}
            </span>
            <span className="text-[#656B69]">SIG-02481</span>
            <span className="text-[#656B69]">·</span>
            <span className="text-[#9A9C97]">84% Confidence (4 Sources Corroborated)</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#E8E5DD] tracking-tight">
            Shanghai Port — 2h Berthing Stoppage
          </h1>

          <p className="text-sm font-sans text-[#9A9C97] leading-relaxed">
            Technical crane automation desynchronization at Yangshan Terminal. While baseline delay is 2 hours, 
            the system has pre-rehearsed multi-horizon escalation scenarios and prepared recovery playbooks.
          </p>
        </div>

        {/* Right: Key System Vitals (Lightweight, No Box Clutter) */}
        <div className="flex flex-wrap items-center gap-8 font-mono text-xs shrink-0">
          <div>
            <span className="text-[#656B69] text-[11px] block uppercase">Network Health</span>
            <span
              className={`text-2xl font-bold tabular-data ${
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

          <div>
            <span className="text-[#656B69] text-[11px] block uppercase">Revenue at Risk</span>
            <span className="text-2xl font-bold text-[#D7655A] tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "₹18.7 Cr" : "₹0.4 Cr"}
            </span>
          </div>

          <div>
            <span className="text-[#656B69] text-[11px] block uppercase">Detroit Buffer</span>
            <span className="text-2xl font-bold text-[#E8E5DD] tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "1.4 Days" : "6.2 Days"}
            </span>
          </div>

          <div>
            <span className="text-[#656B69] text-[11px] block uppercase">Recovery State</span>
            <span className="text-2xl font-bold text-[#62B8C8] tabular-data">
              {systemMode === "RECOVERED" ? "100%" : "91% Ready"}
            </span>
          </div>

          {/* Mode Switch Demo Control */}
          <div className="pl-4 border-l border-[#1C2123] flex flex-col gap-1.5">
            {systemMode === "REHEARSAL" ? (
              <button
                onClick={triggerLiveDisruption}
                className="px-3 py-1.5 bg-[#241413] hover:bg-[#321715] border border-[#572A26] text-[#D7655A] font-bold text-xs transition-colors rounded-sm flex items-center space-x-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>SIMULATE CLOSURE (48%)</span>
              </button>
            ) : (
              <button
                onClick={resetToRehearsal}
                className="px-3 py-1.5 bg-[#161A1C] hover:bg-[#1D2225] border border-[#23282A] text-[#9A9C97] hover:text-[#E8E5DD] text-xs transition-colors rounded-sm flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET TO REHEARSAL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CORE WORKSPACE: DIGITAL TWIN (PRIMARY) & DECISION / AGENTS (SECONDARY) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Dominant Left: Digital Twin Graph (55–60% of visual weight) */}
        <div className="xl:col-span-8 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#E8E5DD] font-medium flex items-center space-x-2">
              <span className="w-2 h-2 rounded-none bg-[#62B8C8]" />
              <span className="uppercase tracking-wider">COMPUTATIONAL DIGITAL TWIN</span>
              <span className="text-[#656B69] font-normal">// PROPAGATION FLOW</span>
            </span>
            <Link
              href="/network"
              className="text-[#62B8C8] hover:text-[#E8E5DD] text-[11px] transition-colors"
            >
              EXPAND FULL SCREEN →
            </Link>
          </div>

          <div className="border border-[#1C2123] rounded-sm bg-[#0B0D0E]">
            <DigitalTwinGraph height="520px" showInspector={true} />
          </div>
        </div>

        {/* Action & Intelligence Column (Right side, ~40% width) */}
        <div className="xl:col-span-4 flex flex-col space-y-5">
          {/* THE HERO DECISION CONSOLE (Strongest focal point on the right) */}
          <div className="bg-[#111416] border border-[#292E2F] p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] text-xs font-mono">
              <span className="text-[#D6A84F] font-bold tracking-wider uppercase flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEXT-BEST ACTION</span>
              </span>
              <span className="text-[10px] text-[#73B58A] bg-[#122117] border border-[#244931] px-1.5 py-0.2">
                ORCHESTRATOR #1
              </span>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-[#E8E5DD] leading-snug">
                {nextBestStrategy.title}
              </h2>
              <p className="text-xs font-sans text-[#9A9C97] mt-1 leading-relaxed">
                Move 40% volume to Midwest Semi (Detroit) + auto-redistribute 1,500 units from Texas to Chicago + reroute Ever Vanguard via Busan.
              </p>
            </div>

            {/* Core Outcome Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#1C2123] text-xs font-mono">
              <div>
                <span className="text-[#656B69] text-[10px] block">RECOVERY TIME</span>
                <span className="text-base font-bold text-[#62B8C8]">
                  {nextBestStrategy.recoveryDays} Days
                </span>
                <span className="text-[10px] text-[#656B69] block">vs 22d status quo</span>
              </div>
              <div>
                <span className="text-[#656B69] text-[10px] block">SERVICE LEVEL</span>
                <span className="text-base font-bold text-[#73B58A]">
                  {nextBestStrategy.serviceLevelPercent}%
                </span>
                <span className="text-[10px] text-[#656B69] block">Target: &gt;95%</span>
              </div>
              <div>
                <span className="text-[#656B69] text-[10px] block">INCREMENTAL COST</span>
                <span className="text-base font-bold text-[#E8E5DD]">
                  {nextBestStrategy.costFormatted}
                </span>
                <span className="text-[10px] text-[#73B58A] block">Avoids ₹18.7 Cr loss</span>
              </div>
              <div>
                <span className="text-[#656B69] text-[10px] block">GOVERNANCE GATE</span>
                <span className="text-base font-bold text-[#D6A84F]">
                  HUMAN APPROVAL
                </span>
                <span className="text-[10px] text-[#656B69] block">Procurement shift</span>
              </div>
            </div>

            {/* Live Interactive Recovery Execution / Approval */}
            {systemMode === "RECOVERED" ? (
              <div className="bg-[#122117] border border-[#244931] p-3 text-center space-y-1">
                <span className="text-[#73B58A] font-bold text-xs flex items-center justify-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RECOVERY COMPLETE (96% HEALTH)</span>
                </span>
                <p className="text-[11px] font-sans text-[#9A9C97]">
                  All playbooks verified. Sourcing locked with Midwest Semi and inventory buffer restabilized.
                </p>
              </div>
            ) : isRecovering || systemMode === "EXECUTING" ? (
              <div className="bg-[#1A1810] border border-[#544121] p-3 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#D6A84F] font-bold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-ping" />
                    <span>EXECUTING RECOVERY ACTIONS...</span>
                  </span>
                  <span className="text-[#E8E5DD] font-bold">{networkHealth}%</span>
                </div>
                <div className="text-[11px] font-sans text-[#9A9C97]">
                  {recoveryStep === 1 && "1. Dispatching 1,500 units from Texas to Chicago Hub (Auto)..."}
                  {recoveryStep === 2 && "2. Rerouting Ever Vanguard to Busan Port Terminal..."}
                  {recoveryStep >= 3 && "3. Binding 40% purchase contract to Midwest Semi Complex..."}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={executeRecovery}
                  className="w-full py-3 bg-[#D6A84F] hover:bg-[#E8E5DD] text-[#0B0D0E] font-mono font-bold text-xs tracking-wider transition-colors rounded-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>[ APPROVE RECOVERY ACTION ]</span>
                </button>
                <div className="text-center">
                  <Link
                    href="/decisions"
                    className="text-[11px] font-mono text-[#656B69] hover:text-[#E8E5DD] transition-colors"
                  >
                    Inspect Full Trade-Off Matrix & Scoring Funnel →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* COMPACT OPERATIONAL ACTIVITY STREAM (Timeline Format, Not 9 Big Cards) */}
          <div className="bg-[#0B0D0E] border border-[#1C2123] p-4 rounded-sm space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#1C2123]">
              <span className="text-[#9A9C97] font-semibold tracking-wider uppercase text-[11px]">
                OPERATIONAL AGENT EXECUTION STREAM
              </span>
              <span className="text-[#656B69] text-[10px]">REAL-TIME PIPELINE</span>
            </div>

            <div className="space-y-2 text-[11px]">
              {agentStream.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <span className="text-[#656B69] shrink-0">{log.time}</span>
                  <span className="text-[#62B8C8] font-bold shrink-0">{log.agent}:</span>
                  <span className="text-[#9A9C97] font-sans truncate">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTINUOUS SCENARIO REHEARSAL: TIMELINE / TREE PROGRESSION             */}
      {/* ========================================================================= */}
      <div className="pt-4 border-t border-[#1C2123] space-y-3 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
          <div>
            <span className="text-[#D6A84F] font-bold uppercase tracking-wider">
              CONTINUOUS SCENARIO REHEARSAL:
            </span>
            <span className="text-[#9A9C97] ml-2 font-sans">
              "We don't wait for disruption to plan. We continuously rehearse it."
            </span>
          </div>
          <span className="text-[#656B69] text-[11px]">
            SELECT HORIZON TO STRESS-TEST TWIN IMPACT
          </span>
        </div>

        {/* Connected Milestone Timeline (2H ── 24H ── 7D ── PERMANENT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenariosData.map((scen, idx) => {
            const isSelected = scen.id === selectedHorizon;
            return (
              <div
                key={scen.id}
                onClick={() => setSelectedHorizon(scen.id)}
                className={`p-4 border cursor-pointer transition-all rounded-sm flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#161A1C] border-[#62B8C8]"
                    : "bg-[#0E1012] border-[#1C2123] hover:border-[#2C3336]"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#E8E5DD] font-bold text-sm">
                      {idx + 1}. {scen.label}
                    </span>
                    <span className="text-[#656B69] text-[11px]">
                      {(scen.closureProbability * 100).toFixed(0)}% Risk
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[#9A9C97] line-clamp-2">
                    {scen.narrative}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#1C2123] grid grid-cols-2 text-[11px]">
                  <div>
                    <span className="text-[#656B69] text-[10px] block">EXPOSURE</span>
                    <span className="text-[#D7655A] font-bold">₹{scen.revenueExposure} Cr</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#656B69] text-[10px] block">RECOVERY</span>
                    <span className="text-[#E8E5DD]">{scen.recoveryTimeDays} Days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
