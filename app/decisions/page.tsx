"use client";

import React from "react";
import strategiesData from "@/data/strategies.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Gauge,
  Leaf,
  Scale,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function DecisionsPage() {
  const {
    systemMode,
    networkHealth,
    executeRecovery,
    isRecovering,
    recoveryStep,
    resetToRehearsal,
    triggerLiveDisruption,
  } = useResilience();

  const primaryStrategy = strategiesData[0];
  const alternativeStrategies = strategiesData.slice(1);

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292E2F] pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] tracking-widest text-[#D6A84F] bg-[#241D12] border border-[#544121] px-2 py-0.5">
              DECISION & GOVERNANCE CENTER
            </span>
            <span className="text-xs text-[#5F6564]">
              AUTONOMY: PROPORTIONAL RISK GATE
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Next-Best Action & Human Approval Gate
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={resetToRehearsal}
            className="px-3 py-1.5 bg-[#111416] border border-[#292E2F] text-[#9A9C97] hover:text-[#E8E5DD] flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEMO</span>
          </button>
          {systemMode !== "LIVE_DISRUPTION" && systemMode !== "EXECUTING" && systemMode !== "RECOVERED" && (
            <button
              onClick={triggerLiveDisruption}
              className="px-3 py-1.5 bg-[#241413] border border-[#572A26] text-[#D7655A] hover:bg-[#2A1413] flex items-center space-x-1.5 transition-colors font-bold"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TRIGGER DISRUPTION (48%)</span>
            </button>
          )}
        </div>
      </div>

      {/* The Hero Decision Card (The Money Shot) */}
      <div className="border border-[#62B8C8] bg-[#111416] p-5 space-y-5 tech-mark-corner">
        {/* Top Tag & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1C2123] gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#62B8C8] font-bold tracking-widest uppercase">
                RECOMMENDED NEXT-BEST ACTION
              </span>
              <span className="text-[10px] text-[#73B58A] border border-[#244931] px-2 py-0.2 bg-[#122117]">
                COMPOSITE SCORE: 92.4 / 100
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#E8E5DD] font-bold mt-1">
              {primaryStrategy.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#5F6564]">GATE:</span>
            <span className="text-xs font-bold text-[#D6A84F] bg-[#241D12] border border-[#544121] px-2.5 py-1">
              HUMAN APPROVAL REQUIRED
            </span>
          </div>
        </div>

        {/* Strategic Summary */}
        <p className="font-sans text-base text-[#E8E5DD] leading-relaxed max-w-4xl">
          {primaryStrategy.description}
        </p>

        {/* 6 Key Operational Metrics (Section 20 Layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-[#171B1D] border border-[#292E2F] p-3">
            <span className="text-[#5F6564] text-[10px] block flex items-center space-x-1">
              <DollarSign className="w-3 h-3 text-[#9A9C97]" />
              <span>INCREMENTAL COST</span>
            </span>
            <span className="text-xl font-bold text-[#E8E5DD] tabular-data mt-1 block">
              {primaryStrategy.costFormatted}
            </span>
            <span className="text-[10px] text-[#73B58A] mt-0.5 block">Saves ₹18.7 Cr Loss</span>
          </div>

          <div className="bg-[#171B1D] border border-[#292E2F] p-3">
            <span className="text-[#5F6564] text-[10px] block flex items-center space-x-1">
              <Clock className="w-3 h-3 text-[#9A9C97]" />
              <span>RECOVERY TIME</span>
            </span>
            <span className="text-xl font-bold text-[#62B8C8] tabular-data mt-1 block">
              {primaryStrategy.recoveryDays} Days
            </span>
            <span className="text-[10px] text-[#5F6564] mt-0.5 block">Baseline: 22 Days</span>
          </div>

          <div className="bg-[#171B1D] border border-[#292E2F] p-3">
            <span className="text-[#5F6564] text-[10px] block flex items-center space-x-1">
              <Gauge className="w-3 h-3 text-[#9A9C97]" />
              <span>SERVICE LEVEL</span>
            </span>
            <span className="text-xl font-bold text-[#73B58A] tabular-data mt-1 block">
              {primaryStrategy.serviceLevelPercent}%
            </span>
            <span className="text-[10px] text-[#5F6564] mt-0.5 block">OEM SLA SLA &gt; 95%</span>
          </div>

          <div className="bg-[#171B1D] border border-[#292E2F] p-3">
            <span className="text-[#5F6564] text-[10px] block flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3 text-[#9A9C97]" />
              <span>RISK PROFILE</span>
            </span>
            <span className="text-xl font-bold text-[#73B58A] tabular-data mt-1 block">
              {primaryStrategy.risk}
            </span>
            <span className="text-[10px] text-[#5F6564] mt-0.5 block">Dual Sourcing</span>
          </div>

          <div className="bg-[#171B1D] border border-[#292E2F] p-3">
            <span className="text-[#5F6564] text-[10px] block flex items-center space-x-1">
              <Scale className="w-3 h-3 text-[#9A9C97]" />
              <span>COMPLIANCE</span>
            </span>
            <span className="text-xl font-bold text-[#73B58A] tabular-data mt-1 block">
              PASS (✓)
            </span>
            <span className="text-[10px] text-[#5F6564] mt-0.5 block">USMCA Verified</span>
          </div>

          <div className="bg-[#171B1D] border border-[#292E2F] p-3">
            <span className="text-[#5F6564] text-[10px] block flex items-center space-x-1">
              <Leaf className="w-3 h-3 text-[#9A9C97]" />
              <span>SUSTAINABILITY</span>
            </span>
            <span className="text-xl font-bold text-[#D6A84F] tabular-data mt-1 block">
              {primaryStrategy.sustainabilityRating}
            </span>
            <span className="text-[10px] text-[#5F6564] mt-0.5 block">4,200 kg CO2</span>
          </div>
        </div>

        {/* Why this Strategy? */}
        <div className="bg-[#171B1D] border border-[#292E2F] p-3.5 text-xs space-y-1">
          <span className="text-[10px] text-[#62B8C8] uppercase font-bold block">
            WHY THIS STRATEGY? (ORCHESTRATOR SYNTHESIS)
          </span>
          <p className="font-sans text-sm text-[#E8E5DD] leading-relaxed">
            {primaryStrategy.tradeoffRationale}
          </p>
        </div>

        {/* Autonomy Breakdown: Auto Actions vs Human Approval Required */}
        <div className="space-y-2">
          <span className="text-xs text-[#9A9C97] block uppercase">
            ACTION DISPATCH PROTOCOL & AUTONOMY GATES:
          </span>

          <div className="border border-[#292E2F] divide-y divide-[#1C2123] text-xs">
            {primaryStrategy.actions.map((act) => {
              const isAuto = act.autoExecEligible;
              const isApproved =
                systemMode === "EXECUTING" || systemMode === "RECOVERED";

              return (
                <div
                  key={act.id}
                  className="p-3 bg-[#111416] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start sm:items-center space-x-2.5">
                    {isApproved ? (
                      <CheckCircle2 className="w-4 h-4 text-[#73B58A] shrink-0 mt-0.5 sm:mt-0" />
                    ) : isAuto ? (
                      <Zap className="w-4 h-4 text-[#62B8C8] shrink-0 mt-0.5 sm:mt-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5 sm:mt-0" />
                    )}
                    <div>
                      <span className="font-bold text-[#E8E5DD] mr-2">{act.id}:</span>
                      <span className="font-sans text-xs text-[#9A9C97]">{act.description}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 text-[10px]">
                    {isApproved ? (
                      <span className="text-[#73B58A] font-bold border border-[#244931] px-2 py-0.5 bg-[#122117]">
                        EXECUTED (✓)
                      </span>
                    ) : isAuto ? (
                      <span className="text-[#62B8C8] font-bold border border-[#234E57] px-2 py-0.5 bg-[#112226]">
                        AUTO-EXECUTE (LOW RISK)
                      </span>
                    ) : (
                      <span className="text-[#D6A84F] font-bold border border-[#544121] px-2 py-0.5 bg-[#241D12]">
                        HUMAN APPROVAL REQUIRED (HIGH IMPACT)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Execution & Signature Recovery Animation Bar */}
        <div className="pt-2 border-t border-[#1C2123]">
          {systemMode === "RECOVERED" ? (
            <div className="bg-[#122117] border border-[#244931] p-4 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-[#73B58A]" />
                <div>
                  <span className="text-base font-serif font-bold text-[#73B58A] block">
                    RECOVERY COMPLETE — NETWORK RESTABILIZED
                  </span>
                  <span className="text-[#E8E5DD] text-xs font-sans">
                    All actions verified. Safety stock rebalanced, supply contract locked, OEM delivery window protected.
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#73B58A] tabular-data">96%</span>
                <span className="text-[10px] text-[#5F6564] block">NETWORK HEALTH</span>
              </div>
            </div>
          ) : isRecovering || systemMode === "EXECUTING" ? (
            <div className="bg-[#1A1810] border border-[#544121] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#D6A84F] animate-ping" />
                  <span className="text-[#D6A84F] font-bold uppercase">
                    EXECUTING RECOVERY WORKFLOW...
                  </span>
                </div>
                <span className="text-base font-bold text-[#D6A84F] tabular-data">
                  NETWORK HEALTH: {networkHealth}%
                </span>
              </div>

              {/* Step Sequence Display (Section 21) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] pt-1">
                <div className={`p-2 border ${recoveryStep >= 1 ? "bg-[#122117] border-[#244931] text-[#73B58A]" : "bg-[#111416] border-[#292E2F] text-[#5F6564]"}`}>
                  <span>1. Inventory Rebalance {recoveryStep >= 1 ? "✓" : "..."}</span>
                </div>
                <div className={`p-2 border ${recoveryStep >= 2 ? "bg-[#122117] border-[#244931] text-[#73B58A]" : "bg-[#111416] border-[#292E2F] text-[#5F6564]"}`}>
                  <span>2. Busan Reroute {recoveryStep >= 2 ? "✓" : "..."}</span>
                </div>
                <div className={`p-2 border ${recoveryStep >= 2 ? "bg-[#122117] border-[#244931] text-[#73B58A]" : "bg-[#111416] border-[#292E2F] text-[#5F6564]"}`}>
                  <span>3. Supplier Shift {recoveryStep >= 2 ? "✓" : "..."}</span>
                </div>
                <div className={`p-2 border ${recoveryStep >= 3 ? "bg-[#122117] border-[#244931] text-[#73B58A]" : "bg-[#111416] border-[#292E2F] text-[#5F6564]"}`}>
                  <span>4. Compliance Audit {recoveryStep >= 3 ? "✓" : "..."}</span>
                </div>
                <div className={`p-2 border ${recoveryStep >= 3 ? "bg-[#122117] border-[#244931] text-[#73B58A]" : "bg-[#111416] border-[#292E2F] text-[#5F6564]"}`}>
                  <span>5. Verified 96% {recoveryStep >= 3 ? "✓" : "..."}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#9A9C97] font-sans">
                Human authorization confirms the 40% procurement shift to Midwest Semi while releasing the auto-redistribution protocol.
              </div>
              <button
                onClick={executeRecovery}
                className="w-full sm:w-auto px-6 py-3 bg-[#D6A84F] hover:bg-[#E8E5DD] text-[#0B0D0E] font-mono font-bold text-sm tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>[ APPROVE RECOVERY ]</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Alternative Candidate Strategies Table */}
      <div className="border border-[#292E2F] bg-[#111416] p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] text-xs">
          <span className="text-[#62B8C8] font-bold tracking-wider uppercase">
            ALTERNATIVE STRATEGY TRADEOFF MATRIX (REHEARSED POOL)
          </span>
          <span className="text-[#5F6564]">EVALUATED BY CENTRAL ORCHESTRATOR</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#292E2F] text-[#5F6564] text-[10px]">
                <th className="pb-2">STRATEGY</th>
                <th className="pb-2">CATEGORY</th>
                <th className="pb-2">COST (INR)</th>
                <th className="pb-2">RECOVERY</th>
                <th className="pb-2">SERVICE LEVEL</th>
                <th className="pb-2">SUSTAINABILITY</th>
                <th className="pb-2">ORCHESTRATOR SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2123]">
              <tr className="bg-[#171B1D] text-[#E8E5DD]">
                <td className="py-2.5 font-bold text-[#62B8C8]">
                  {primaryStrategy.title} ★
                </td>
                <td className="py-2.5 text-[#9A9C97]">{primaryStrategy.category}</td>
                <td className="py-2.5 font-bold">{primaryStrategy.costFormatted}</td>
                <td className="py-2.5">{primaryStrategy.recoveryDays} Days</td>
                <td className="py-2.5 font-bold text-[#73B58A]">{primaryStrategy.serviceLevelPercent}%</td>
                <td className="py-2.5 text-[#D6A84F]">{primaryStrategy.sustainabilityRating}</td>
                <td className="py-2.5 font-bold text-[#62B8C8]">{primaryStrategy.score}</td>
              </tr>
              {alternativeStrategies.map((strat) => (
                <tr key={strat.id} className="text-[#9A9C97] hover:bg-[#171B1D]">
                  <td className="py-2.5 font-medium text-[#E8E5DD]">{strat.title}</td>
                  <td className="py-2.5">{strat.category}</td>
                  <td className="py-2.5">{strat.costFormatted}</td>
                  <td className="py-2.5">{strat.recoveryDays} Days</td>
                  <td className="py-2.5">{strat.serviceLevelPercent}%</td>
                  <td className="py-2.5">{strat.sustainabilityRating}</td>
                  <td className="py-2.5 font-mono">{strat.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
