"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResilience } from "@/lib/context/ResilienceContext";
import DigitalTwinGraph from "@/components/network/DigitalTwinGraph";
import LiveAgentExecutionStream from "@/components/dashboard/LiveAgentExecutionStream";
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
  Globe,
  FlaskConical,
  Flame,
  Anchor,
  Cpu,
  CloudLightning,
  RotateCw,
} from "lucide-react";

export default function ControlTowerPage() {
  const {
    systemMode,
    dataMode,
    setDataMode,
    networkHealth,
    currentSignal,
    currentScenarios,
    currentStrategy,
    currentPlanPoints,
    dynamicNetworkFlow,
    isAiSynthesizing,
    refreshAiSimulation,
    activeMockSuite,
    setActiveMockSuiteId,
    availableMockSuites,
    activeRealTimeSignal,
    triggerLiveDisruption,
    resetToRehearsal,
    executeRecovery,
    isRecovering,
    recoveryStep,
  } = useResilience();

  const [selectedHorizon, setSelectedHorizon] = useState<string>("SCEN-24H");

  const currentScenario =
    currentScenarios.find((s) => s.id === selectedHorizon) || currentScenarios[1] || currentScenarios[0];

  const mockIcon = (cat: string) => {
    switch (cat) {
      case "INVENTORY_DESTROYED":
        return <Flame className="w-3.5 h-3.5 text-error" />;
      case "SUPPLIER_OUTAGE":
        return <Cpu className="w-3.5 h-3.5 text-accent" />;
      case "WEATHER_DISASTER":
        return <CloudLightning className="w-3.5 h-3.5 text-warning" />;
      default:
        return <Anchor className="w-3.5 h-3.5 text-info" />;
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-[1780px] mx-auto w-full">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. MOCK SCENARIO SELECTOR (Active when in Mock Mode)               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {dataMode === "MOCK_SCENARIO" ? (
        <div className="card bg-base-100 border border-base-300 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-base-content">
                Select Benchmark Test Scenario:
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {availableMockSuites.map((suite) => (
                <button
                  key={suite.id}
                  onClick={() => setActiveMockSuiteId(suite.id)}
                  className={`btn btn-xs font-mono rounded-lg gap-1.5 transition-all ${
                    activeMockSuite.id === suite.id
                      ? "btn-accent shadow-sm"
                      : "btn-ghost border border-base-300"
                  }`}
                >
                  {mockIcon(suite.category)}
                  <span>{suite.title.split("—")[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info py-2 px-4 shadow-sm text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0" />
            <span>
              <b>Real-Time Live Feed Active:</b> Ingesting live external signals from gCaptain, Federal Register, OpenWeather, and AISStream. Scenarios are dynamically generated for the real-world signal.
            </span>
          </div>
          <Link href="/signals" className="btn btn-xs btn-ghost underline font-mono">
            Browse All 8 Feeds →
          </Link>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. DOMINANT HERO EVENT HEADER: STORY & VITALS                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        {/* Left: What is happening? Where? Severity? */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`badge ${systemMode === "LIVE_DISRUPTION" ? "badge-error" : "badge-warning"} badge-sm font-mono gap-1`}>
              {systemMode === "LIVE_DISRUPTION" && <span className="animate-pulse">●</span>}
              {systemMode === "LIVE_DISRUPTION" ? "CONFIRMED DISRUPTION" : "REHEARSAL ACTIVE"}
            </span>
            <span className="badge badge-ghost badge-sm font-mono">{currentSignal.id}</span>
            <span className="badge badge-primary badge-xs font-mono">{currentSignal.sourceCategory || "LIVE FEED"}</span>
            <span className="text-xs text-base-content/40">
              {(currentSignal.confidence * 100).toFixed(0)}% Confidence · {currentSignal.corroboratingSources || 4} Sources
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-base-content tracking-tight leading-tight">
            {dataMode === "MOCK_SCENARIO" ? activeMockSuite.title : `${currentSignal.eventType.replace("_", " ")} — ${currentSignal.location}`}
          </h1>

          <p className="text-sm text-base-content/60 leading-relaxed max-w-xl">
            {currentSignal.rawText}
          </p>
        </div>

        {/* Right: Key Operational Vitals */}
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
              ₹{currentScenario?.revenueExposure || 18.7}Cr
            </div>
          </div>
          <div className="stat px-5 py-3">
            <div className="stat-title text-[10px] font-mono">Buffer Left</div>
            <div className="stat-value text-2xl tabular-data">
              {currentScenario?.inventoryDaysRemaining !== undefined ? `${currentScenario.inventoryDaysRemaining}d` : "1.4d"}
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
      {/* 3. CORE WORKSPACE: DIGITAL TWIN + NEXT-BEST ACTION DECISION        */}
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
              <span className="badge badge-ghost badge-xs font-mono">
                Disrupted Node: {currentSignal.facility || "Active Corridor"}
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
          <div className="card bg-base-100 border-2 border-primary/40 shadow-lg">
            <div className="card-body p-5 gap-3.5">
              {/* Header */}
              <div className="flex items-center justify-between pb-1 border-b border-base-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                    Next-Best Action
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isAiSynthesizing ? (
                    <span className="badge badge-warning badge-sm font-mono font-bold gap-1 animate-pulse">
                      <span className="loading loading-spinner loading-xs" />
                      AI Synthesizing...
                    </span>
                  ) : dynamicNetworkFlow && dataMode === "REAL_TIME" ? (
                    <span className="badge badge-accent badge-sm font-mono font-bold gap-1">
                      <Sparkles className="w-3 h-3" />
                      {dynamicNetworkFlow.aiGenerated ? "GEMINI AI PLAYBOOK" : "AI ADAPTIVE PLAYBOOK"}
                    </span>
                  ) : (
                    <span className="badge badge-primary badge-sm font-mono font-bold">#1 RANKED PLAYBOOK</span>
                  )}

                  {dataMode === "REAL_TIME" && (
                    <button
                      onClick={() => refreshAiSimulation(true)}
                      disabled={isAiSynthesizing}
                      title="Hard reload from Gemini AI (bypasses cache)"
                      className="btn btn-ghost btn-xs font-mono gap-1 text-base-content/60 hover:text-primary border border-base-300 hover:border-primary/40 px-2"
                    >
                      <RotateCw className={`w-3 h-3 ${isAiSynthesizing ? "animate-spin text-primary" : ""}`} />
                      <span className="text-[10px]">Fetch Again</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Strategy Name & Rationale */}
              <div>
                <h2 className="font-serif text-xl text-base-content font-bold leading-tight">
                  {currentStrategy.title}
                </h2>
                <p className="text-xs text-base-content/60 leading-relaxed mt-1">
                  {currentStrategy.tradeoffRationale}
                </p>
              </div>

              {/* Compact Secondary Metrics Bar (Made smaller to prioritize plan) */}
              <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-base-200/70 border border-base-300 text-center font-mono">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-base-content/40 block uppercase">Recovery</span>
                  <span className="text-sm font-bold text-primary tabular-data">{currentStrategy.recoveryDays}d</span>
                </div>
                <div className="space-y-0.5 border-l border-base-300">
                  <span className="text-[9px] text-base-content/40 block uppercase">Service</span>
                  <span className="text-sm font-bold text-success tabular-data">{currentStrategy.serviceLevelPercent}%</span>
                </div>
                <div className="space-y-0.5 border-l border-base-300">
                  <span className="text-[9px] text-base-content/40 block uppercase">Cost</span>
                  <span className="text-sm font-bold text-base-content tabular-data">{currentStrategy.costFormatted}</span>
                </div>
                <div className="space-y-0.5 border-l border-base-300">
                  <span className="text-[9px] text-base-content/40 block uppercase">Gate</span>
                  <span className="text-[10px] font-bold text-warning block truncate px-1">
                    {currentStrategy.autonomyLevel === "HUMAN_APPROVAL_REQUIRED" ? "Approval" : "Auto"}
                  </span>
                </div>
              </div>

              {/* ── HIGH-CLARITY RECOVERY PLAN ACTION POINTS (PRIMARY FOCUS) ── */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-base-content uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    Recovery Execution Plan:
                  </span>
                  <span className="badge badge-ghost badge-xs font-mono text-[10px]">
                    {currentPlanPoints.length} Action Points
                  </span>
                </div>

                <div className="space-y-2">
                  {currentPlanPoints.map((point) => (
                    <div
                      key={point.step}
                      className={`p-2.5 rounded-xl border transition-all ${
                        point.gate === "HUMAN_APPROVAL_REQUIRED"
                          ? "bg-warning/5 border-warning/30 shadow-xs"
                          : "bg-base-200/60 border-base-300"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                            point.gate === "HUMAN_APPROVAL_REQUIRED"
                              ? "bg-warning text-warning-content"
                              : "bg-primary text-primary-content"
                          }`}
                        >
                          {point.step}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5 flex-wrap">
                            <span className="font-bold text-xs text-base-content">
                              {point.action}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="badge badge-ghost badge-xs font-mono text-[9px]">
                                {point.agent}
                              </span>
                              <span
                                className={`badge badge-xs font-mono font-semibold ${
                                  point.gate === "HUMAN_APPROVAL_REQUIRED"
                                    ? "badge-warning"
                                    : "badge-info"
                                }`}
                              >
                                {point.gate === "HUMAN_APPROVAL_REQUIRED" ? "APPROVAL REQ" : "AUTO-EXEC"}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-base-content/60 mt-0.5 leading-snug font-sans">
                            {point.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Zone */}
              {systemMode === "RECOVERED" ? (
                <div role="alert" className="alert alert-success">
                  <CheckCircle2 className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold text-sm">Recovery Complete</h3>
                    <div className="text-xs">Network restabilized to 96% health</div>
                  </div>
                </div>
              ) : isRecovering ? (
                <div className="space-y-2">
                  <div role="alert" className="alert alert-warning">
                    <span className="loading loading-spinner loading-xs" />
                    <div>
                      <h3 className="font-bold text-sm">Executing Recovery Actions...</h3>
                      <div className="text-xs">
                        {recoveryStep === 1 && "1. Auto-redistributing regional inventory buffers..."}
                        {recoveryStep === 2 && "2. Rerouting transit corridors and feeder vessels..."}
                        {recoveryStep >= 3 && "3. Binding reserve supplier contracts & nearshore capacity..."}
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
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. FULL-WIDTH AGENT DECISION LOOP & STREAMING TERMINAL             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <LiveAgentExecutionStream />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. CONTINUOUS SCENARIO REHEARSAL HORIZONS (2H -> 24H -> 7D -> PERM) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
              Continuous Scenario Rehearsal
            </span>
            <span className="text-xs text-base-content/40 italic">
              "We don't wait for disruption to plan. We continuously rehearse it."
            </span>
          </div>
          <Link href="/scenarios" className="btn btn-ghost btn-xs font-mono text-primary gap-1">
            Deep-Dive What-If Rehearsals <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentScenarios.map((scen, idx) => {
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
                      {(scen.closureProbability * 100).toFixed(0)}% Risk
                    </span>
                  </div>

                  <p className="text-xs text-base-content/50 line-clamp-2 leading-relaxed">
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
}
