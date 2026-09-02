"use client";

import React from "react";
import strategiesData from "@/data/strategies.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  DollarSign,
  Clock,
  Gauge,
  Leaf,
  Scale,
  RotateCcw,
  Zap,
  Sparkles,
  RotateCw,
} from "lucide-react";

export default function DecisionsPage() {
  const {
    systemMode,
    dataMode,
    networkHealth,
    executeRecovery,
    isRecovering,
    recoveryStep,
    resetToRehearsal,
    triggerLiveDisruption,
    currentStrategy,
    currentPlanPoints,
    isAiSynthesizing,
    refreshAiSimulation,
  } = useResilience();

  const primaryStrategy = currentStrategy || strategiesData[0];
  const alternativeStrategies = strategiesData.slice(1);

  const recoverySteps = [
    "Inventory Rebalance",
    "Busan Reroute",
    "Supplier Shift",
    "Compliance Audit",
    "Verified 96%",
  ];

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-[1720px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent badge-sm font-mono">DECISION & GOVERNANCE</span>
            <span className="text-xs text-base-content/40 font-mono">AUTONOMY: PROPORTIONAL RISK GATE</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-base-content tracking-tight">
            Next-Best Action & Human Approval Gate
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {dataMode === "REAL_TIME" && (
            <button
              onClick={() => refreshAiSimulation(true)}
              disabled={isAiSynthesizing}
              title="Hard reload from Gemini AI (bypasses cache)"
              className="btn btn-ghost btn-sm gap-1.5 font-mono text-xs border border-base-300 hover:border-primary/40"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAiSynthesizing ? "animate-spin text-primary" : ""}`} />
              <span>{isAiSynthesizing ? "Synthesizing..." : "Refetch AI"}</span>
            </button>
          )}
          <button onClick={resetToRehearsal} className="btn btn-ghost btn-sm gap-1 font-mono text-xs">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          {systemMode !== "LIVE_DISRUPTION" && systemMode !== "EXECUTING" && systemMode !== "RECOVERED" && (
            <button onClick={triggerLiveDisruption} className="btn btn-error btn-outline btn-sm gap-1 font-mono text-xs">
              <AlertTriangle className="w-3.5 h-3.5" /> Trigger Disruption
            </button>
          )}
        </div>
      </div>

      {/* Hero Decision Card */}
      <div className="card bg-base-100 border-2 border-primary shadow-lg">
        <div className="card-body p-6 gap-5">
          {/* Top Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  Recommended Next-Best Action
                </span>
                <span className="badge badge-success badge-sm font-mono">92.4 / 100</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-base-content font-bold">
                {primaryStrategy.title}
              </h2>
            </div>
            <span className="badge badge-warning badge-lg font-mono gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              HUMAN APPROVAL REQUIRED
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-base-content/60 leading-relaxed max-w-4xl">
            {primaryStrategy.description}
          </p>

          {/* 6 Key Metrics */}
          <div className="stats stats-vertical sm:stats-horizontal shadow border border-base-300 w-full">
            <div className="stat py-3 px-4">
              <div className="stat-figure text-base-content/30"><DollarSign className="w-5 h-5" /></div>
              <div className="stat-title text-[10px] font-mono">Cost</div>
              <div className="stat-value text-xl tabular-data">{primaryStrategy.costFormatted}</div>
              <div className="stat-desc text-success text-[10px]">Saves ₹18.7Cr</div>
            </div>
            <div className="stat py-3 px-4">
              <div className="stat-figure text-base-content/30"><Clock className="w-5 h-5" /></div>
              <div className="stat-title text-[10px] font-mono">Recovery</div>
              <div className="stat-value text-xl text-primary tabular-data">{primaryStrategy.recoveryDays}d</div>
              <div className="stat-desc text-[10px]">Baseline: 22d</div>
            </div>
            <div className="stat py-3 px-4">
              <div className="stat-figure text-base-content/30"><Gauge className="w-5 h-5" /></div>
              <div className="stat-title text-[10px] font-mono">Service</div>
              <div className="stat-value text-xl text-success tabular-data">{primaryStrategy.serviceLevelPercent}%</div>
              <div className="stat-desc text-[10px]">SLA &gt;95%</div>
            </div>
            <div className="stat py-3 px-4">
              <div className="stat-title text-[10px] font-mono">Risk</div>
              <div className="stat-value text-xl text-success tabular-data">{primaryStrategy.risk}</div>
              <div className="stat-desc text-[10px]">Dual sourcing</div>
            </div>
            <div className="stat py-3 px-4">
              <div className="stat-figure text-base-content/30"><Scale className="w-5 h-5" /></div>
              <div className="stat-title text-[10px] font-mono">Compliance</div>
              <div className="stat-value text-xl text-success tabular-data">PASS ✓</div>
              <div className="stat-desc text-[10px]">USMCA</div>
            </div>
            <div className="stat py-3 px-4">
              <div className="stat-figure text-base-content/30"><Leaf className="w-5 h-5" /></div>
              <div className="stat-title text-[10px] font-mono">Carbon</div>
              <div className="stat-value text-xl text-warning tabular-data">{primaryStrategy.sustainabilityRating}</div>
              <div className="stat-desc text-[10px]">4,200 kg CO2</div>
            </div>
          </div>

          {/* Rationale */}
          <div className="bg-base-200 rounded-xl p-4">
            <span className="text-[10px] font-mono text-primary uppercase font-bold block mb-1">
              Why This Strategy? (Orchestrator Synthesis)
            </span>
            <p className="text-sm text-base-content leading-relaxed">
              {primaryStrategy.tradeoffRationale}
            </p>
          </div>

          {/* Action Dispatch Protocol — High Clarity Recovery Points */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-base-content/60 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Prepared Recovery Execution Plan ({currentPlanPoints.length} Action Points):
              </span>
              <span className="badge badge-outline badge-xs font-mono">Risk-Gated Autonomy</span>
            </div>

            <div className="space-y-2">
              {currentPlanPoints.map((point) => {
                const isAuto = point.gate === "AUTO_EXECUTE";
                const isApproved = systemMode === "EXECUTING" || systemMode === "RECOVERED";
                return (
                  <div
                    key={point.step}
                    className={`p-3.5 rounded-xl border transition-all ${
                      point.gate === "HUMAN_APPROVAL_REQUIRED"
                        ? "bg-warning/5 border-warning/30 shadow-xs"
                        : "bg-base-200/70 border-base-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          point.gate === "HUMAN_APPROVAL_REQUIRED"
                            ? "bg-warning text-warning-content"
                            : "bg-primary text-primary-content"
                        }`}
                      >
                        {point.step}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <span className="font-bold text-sm text-base-content">
                            {point.action}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="badge badge-ghost badge-xs font-mono">
                              {point.agent} AGENT
                            </span>
                            <span
                              className={`badge badge-sm font-mono font-semibold ${
                                isApproved
                                  ? "badge-success"
                                  : isAuto
                                  ? "badge-info"
                                  : "badge-warning"
                              }`}
                            >
                              {isApproved
                                ? "EXECUTED ✓"
                                : isAuto
                                ? "AUTO-EXEC"
                                : "APPROVAL REQUIRED"}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-base-content/70 leading-relaxed font-sans">
                          {point.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution Zone */}
          <div className="divider my-0" />

          {systemMode === "RECOVERED" ? (
            <div role="alert" className="alert alert-success shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <h3 className="font-bold">Recovery Complete — Network Restabilized</h3>
                <div className="text-xs">All actions verified. Safety stock rebalanced, supply contract locked.</div>
              </div>
              <div className="text-2xl font-bold tabular-data">96%</div>
            </div>
          ) : isRecovering || systemMode === "EXECUTING" ? (
            <div className="space-y-3">
              <div role="alert" className="alert alert-warning">
                <span className="loading loading-spinner loading-sm" />
                <div>
                  <h3 className="font-bold">Executing Recovery Workflow...</h3>
                  <div className="text-xs">Network Health: {networkHealth}%</div>
                </div>
              </div>
              <ul className="steps steps-horizontal w-full text-xs">
                {recoverySteps.map((step, i) => (
                  <li key={i} className={`step ${recoveryStep >= i + 1 ? "step-primary" : ""}`}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-base-content/40">
                Human authorization confirms the 40% procurement shift while releasing auto-redistribution.
              </p>
              <button onClick={executeRecovery} className="btn btn-primary btn-lg gap-2 font-mono shadow-md">
                <Play className="w-5 h-5 fill-current" />
                Approve Recovery
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Alternative Strategies Table */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-5 gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-primary uppercase">
              Alternative Strategy Trade-Off Matrix
            </span>
            <span className="text-[10px] text-base-content/40 font-mono">ORCHESTRATOR EVALUATED</span>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="text-[10px] font-mono">
                  <th>Strategy</th>
                  <th>Category</th>
                  <th>Cost</th>
                  <th>Recovery</th>
                  <th>Service</th>
                  <th>Carbon</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-primary/5 font-medium">
                  <td className="font-bold text-primary">{primaryStrategy.title} ★</td>
                  <td>{primaryStrategy.category}</td>
                  <td className="font-bold tabular-data">{primaryStrategy.costFormatted}</td>
                  <td className="tabular-data">{primaryStrategy.recoveryDays}d</td>
                  <td className="text-success font-bold tabular-data">{primaryStrategy.serviceLevelPercent}%</td>
                  <td className="text-warning">{primaryStrategy.sustainabilityRating}</td>
                  <td className="font-bold text-primary tabular-data">{primaryStrategy.score}</td>
                </tr>
                {alternativeStrategies.map((strat) => (
                  <tr key={strat.id} className="hover">
                    <td className="font-medium">{strat.title}</td>
                    <td className="text-base-content/50">{strat.category}</td>
                    <td className="tabular-data">{strat.costFormatted}</td>
                    <td className="tabular-data">{strat.recoveryDays}d</td>
                    <td className="tabular-data">{strat.serviceLevelPercent}%</td>
                    <td>{strat.sustainabilityRating}</td>
                    <td className="tabular-data">{strat.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
