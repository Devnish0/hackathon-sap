<<<<<<< HEAD
import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Resilience Autopilot | Supply Chain Resilience Platform",
  description:
    "Enterprise supply chain resilience platform that continuously monitors disruption signals, rehearses scenarios, and executes validated recovery playbooks.",
};

export default function Page() {
  return <HomePage />;
=======
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResilience } from "@/lib/context/ResilienceContext";
import DigitalTwinGraph from "@/components/network/DigitalTwinGraph";
import scenariosData from "@/data/scenarios.json";
import strategiesData from "@/data/strategies.json";
import {
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  TrendingDown,
  Shield,
  Clock,
  ArrowRight,
  Maximize2,
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
  const nextBestStrategy = strategiesData[0];

  const agentStream = [
    { time: "17:42:08", agent: "SENSING", text: "Port crane desync detected at Yangshan Fairway", color: "text-info" },
    { time: "17:42:10", agent: "VALIDATION", text: "4 independent feeds correlated — 84% confidence", color: "text-primary" },
    { time: "17:42:12", agent: "SCENARIO", text: "43 multi-horizon stress trees generated", color: "text-secondary" },
    { time: "17:42:15", agent: "LOGISTICS", text: "Busan transshipment connector reserved", color: "text-accent" },
    { time: "17:42:17", agent: "INVENTORY", text: "1,500 units cleared for auto-transfer from Texas", color: "text-success" },
    { time: "17:42:19", agent: "COMPLIANCE", text: "USMCA origin rules verified (78.4% passing)", color: "text-warning" },
    { time: "17:42:21", agent: "ORCHESTRATOR", text: "Composite Rank #1 → Hybrid Response selected", color: "text-primary" },
  ];

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-[1780px] mx-auto w-full">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO EVENT HEADER                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        {/* Left: The Story */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`badge ${systemMode === "LIVE_DISRUPTION" ? "badge-error" : "badge-warning"} badge-sm font-mono gap-1`}>
              {systemMode === "LIVE_DISRUPTION" && <span className="animate-pulse">●</span>}
              {systemMode === "LIVE_DISRUPTION" ? "CONFIRMED DISRUPTION" : "REHEARSAL ACTIVE"}
            </span>
            <span className="badge badge-ghost badge-sm font-mono">SIG-02481</span>
            <span className="text-xs text-base-content/40">84% Confidence · 4 Sources</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-base-content tracking-tight leading-tight">
            Shanghai Port — 2h Berthing Stoppage
          </h1>

          <p className="text-sm text-base-content/50 leading-relaxed max-w-xl">
            Technical crane automation desynchronization at Yangshan Terminal.
            The system has pre-rehearsed escalation scenarios and prepared recovery playbooks.
          </p>
        </div>

        {/* Right: Stats row */}
        <div className="stats stats-horizontal shadow border border-base-300 bg-base-100">
          <div className="stat px-5 py-3">
            <div className="stat-title text-[10px] font-mono">Health</div>
            <div className={`stat-value text-2xl tabular-data ${networkHealth >= 80 ? "text-success" : networkHealth >= 60 ? "text-warning" : "text-error"}`}>
              {networkHealth}%
            </div>
          </div>
          <div className="stat px-5 py-3">
            <div className="stat-title text-[10px] font-mono">Revenue Risk</div>
            <div className="stat-value text-2xl text-error tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "₹18.7Cr" : "₹0.4Cr"}
            </div>
          </div>
          <div className="stat px-5 py-3">
            <div className="stat-title text-[10px] font-mono">Detroit Buffer</div>
            <div className="stat-value text-2xl tabular-data">
              {systemMode === "LIVE_DISRUPTION" ? "1.4d" : "6.2d"}
            </div>
          </div>
          <div className="stat px-5 py-3">
            <div className="stat-title text-[10px] font-mono">Readiness</div>
            <div className="stat-value text-2xl text-primary tabular-data">
              {systemMode === "RECOVERED" ? "100%" : "91%"}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. CORE WORKSPACE: DIGITAL TWIN + DECISION CONSOLE                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

        {/* ── Digital Twin (dominant, ~60%) ── */}
        <div className="xl:col-span-8 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary badge-xs" />
              <span className="font-mono text-base-content/60 uppercase tracking-wider font-medium">
                Computational Digital Twin
              </span>
            </div>
            <Link href="/network" className="btn btn-ghost btn-xs gap-1 font-mono text-primary">
              <Maximize2 className="w-3 h-3" />
              Full Screen
            </Link>
          </div>
          <DigitalTwinGraph height="520px" showInspector={true} />
        </div>

        {/* ── Right Column: Decision + Agent Stream ── */}
        <div className="xl:col-span-4 space-y-5">

          {/* NEXT-BEST ACTION CARD */}
          <div className="card bg-base-100 border border-base-300 shadow-md">
            <div className="card-body p-5 gap-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                    Next-Best Action
                  </span>
                </div>
                <span className="badge badge-primary badge-sm font-mono">#1 RANKED</span>
              </div>

              {/* Strategy Name */}
              <h2 className="font-serif text-xl text-base-content leading-snug">
                {nextBestStrategy.title}
              </h2>
              <p className="text-xs text-base-content/50 leading-relaxed">
                Move 40% volume to Midwest Semi · Redistribute 1,500 units from Texas · Reroute via Busan
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-base-200">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-base-content/35 uppercase">Recovery</div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-lg font-bold text-primary tabular-data">{nextBestStrategy.recoveryDays}d</span>
                  </div>
                  <span className="text-[10px] text-base-content/30">vs 22d status quo</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-base-content/35 uppercase">Service Level</div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-success" />
                    <span className="text-lg font-bold text-success tabular-data">{nextBestStrategy.serviceLevelPercent}%</span>
                  </div>
                  <span className="text-[10px] text-base-content/30">Target: &gt;95%</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-base-content/35 uppercase">Cost</div>
                  <div className="flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-base-content/50" />
                    <span className="text-lg font-bold tabular-data">{nextBestStrategy.costFormatted}</span>
                  </div>
                  <span className="text-[10px] text-success">Saves ₹18.7Cr</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-base-content/35 uppercase">Gate</div>
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                    <span className="text-sm font-bold text-warning">APPROVAL</span>
                  </div>
                  <span className="text-[10px] text-base-content/30">Procurement shift</span>
                </div>
              </div>

              {/* Action Zone */}
              {systemMode === "RECOVERED" ? (
                <div role="alert" className="alert alert-success">
                  <CheckCircle2 className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold text-sm">Recovery Complete</h3>
                    <div className="text-xs">Network health restored to 96%</div>
                  </div>
                </div>
              ) : isRecovering ? (
                <div className="space-y-2">
                  <div role="alert" className="alert alert-warning">
                    <span className="loading loading-spinner loading-xs" />
                    <div>
                      <h3 className="font-bold text-sm">Executing Recovery...</h3>
                      <div className="text-xs">
                        {recoveryStep === 1 && "Dispatching 1,500 units Texas → Chicago..."}
                        {recoveryStep === 2 && "Rerouting Ever Vanguard to Busan..."}
                        {recoveryStep >= 3 && "Binding 40% contract to Midwest Semi..."}
                      </div>
                    </div>
                  </div>
                  <progress className="progress progress-warning w-full" value={networkHealth} max="100" />
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={executeRecovery}
                    className="btn btn-primary btn-block gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Approve Recovery Action
                  </button>
                  <Link
                    href="/decisions"
                    className="btn btn-ghost btn-sm btn-block font-mono text-[11px] text-base-content/40"
                  >
                    Inspect Full Trade-Off Matrix →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* AGENT ACTIVITY STREAM */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-4 gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-base-content/50 uppercase tracking-wider font-medium">
                  Agent Execution Stream
                </span>
                <span className="badge badge-ghost badge-xs font-mono">LIVE</span>
              </div>

              <div className="space-y-2">
                {agentStream.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px]">
                    <span className="font-mono text-base-content/30 shrink-0 tabular-data">{log.time}</span>
                    <span className={`font-mono font-bold shrink-0 ${log.color}`}>{log.agent}</span>
                    <span className="text-base-content/60 truncate">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. SCENARIO REHEARSAL HORIZON                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
              Continuous Rehearsal
            </span>
            <span className="text-xs text-base-content/40 italic">
              "We don't wait for disruption to plan."
            </span>
          </div>
          <Link href="/scenarios" className="btn btn-ghost btn-xs font-mono text-primary gap-1">
            View All Scenarios <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenariosData.map((scen, idx) => {
            const isSelected = scen.id === selectedHorizon;
            return (
              <div
                key={scen.id}
                onClick={() => setSelectedHorizon(scen.id)}
                className={`card cursor-pointer transition-all hover:shadow-md border ${
                  isSelected
                    ? "bg-primary/5 border-primary shadow-md ring-1 ring-primary/20"
                    : "bg-base-100 border-base-300 hover:border-base-content/20"
                }`}
              >
                <div className="card-body p-4 gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-base-content">
                      {idx + 1}. {scen.label}
                    </h3>
                    <span className="badge badge-ghost badge-xs font-mono">
                      {(scen.closureProbability * 100).toFixed(0)}%
                    </span>
                  </div>

                  <p className="text-xs text-base-content/40 line-clamp-2 leading-relaxed">
                    {scen.narrative}
                  </p>

                  <div className="divider my-0" />

                  <div className="flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-base-content/30 uppercase">Exposure</div>
                      <span className="font-bold text-error">₹{scen.revenueExposure}Cr</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-base-content/30 uppercase">Recovery</div>
                      <span className="font-bold text-base-content">{scen.recoveryTimeDays}d</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
>>>>>>> upstream/main
}
