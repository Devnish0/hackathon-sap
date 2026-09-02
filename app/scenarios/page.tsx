"use client";

import React, { useState } from "react";
import scenariosData from "@/data/scenarios.json";
import strategiesData from "@/data/strategies.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  GitFork,
  Clock,
  DollarSign,
  AlertTriangle,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import Link from "next/link";

export default function ScenariosPage() {
  const { activeScenarioId, setActiveScenarioId } = useResilience();
  const [selectedHorizon, setSelectedHorizon] = useState<string>("SCEN-24H");

  // Compound condition toggles
  const [alternatePortCongestion, setAlternatePortCongestion] = useState(true);
  const [supplierShortage, setSupplierShortage] = useState(false);
  const [demandSpike, setDemandSpike] = useState(false);

  const currentScenario =
    scenariosData.find((s) => s.id === selectedHorizon) || scenariosData[1];

  // Dynamically compute adjusted exposure based on compound conditions
  const compoundMultiplier =
    1.0 +
    (alternatePortCongestion ? 0.25 : 0) +
    (supplierShortage ? 0.4 : 0) +
    (demandSpike ? 0.35 : 0);

  const adjustedRevenueExposure = (
    currentScenario.revenueExposure * compoundMultiplier
  ).toFixed(1);

  const adjustedServiceLevel = Math.max(
    30,
    Math.round(
      currentScenario.serviceLevelImpact -
        (alternatePortCongestion ? 4 : 0) -
        (supplierShortage ? 8 : 0)
    )
  );

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full font-mono">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292E2F] pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] tracking-widest text-[#D6A84F] bg-[#241D12] border border-[#544121] px-2 py-0.5">
              SCENARIO REHEARSAL & WHAT-IF ENGINE
            </span>
            <span className="text-xs text-[#5F6564]">
              HERO TRIGGER: PORT OF SHANGHAI 2H ADVISORY
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Multi-Horizon Stress Testing & Prepared Playbooks
          </h1>
        </div>

        <div className="text-xs text-[#9A9C97] font-sans max-w-sm">
          "The system does not panic when an early signal appears. It continuously rehearses increasingly severe futures."
        </div>
      </div>

      {/* Horizon Selector Tree */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenariosData.map((scen) => {
          const isSelected = scen.id === selectedHorizon;
          return (
            <div
              key={scen.id}
              onClick={() => setSelectedHorizon(scen.id)}
              className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-[#171B1D] border-[#62B8C8] ring-1 ring-[#62B8C8]"
                  : "bg-[#111416] border-[#292E2F] hover:border-[#414A4D]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-1.5 border-b border-[#1C2123] mb-2 text-xs">
                  <span className="text-[#62B8C8] font-bold text-sm">{scen.label}</span>
                  <span className="text-[#5F6564]">{(scen.closureProbability * 100).toFixed(0)}% RISK</span>
                </div>

                <div className="text-xs font-serif font-bold text-[#E8E5DD] mb-1">
                  {scen.label === "2 HOURS" && "Baseline Tidal Delay"}
                  {scen.label === "24 HOURS" && "Extended Port Demurrage"}
                  {scen.label === "7 DAYS" && "Pacific Network Gridlock"}
                  {scen.label === "PERMANENT" && "Structural Port Closure"}
                </div>
                <p className="text-[11px] font-sans text-[#9A9C97] line-clamp-2 mb-3">
                  {scen.narrative}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1C2123] grid grid-cols-2 gap-1 text-[11px]">
                <div>
                  <span className="text-[#5F6564] text-[10px] block">BASE EXPOSURE</span>
                  <span className="text-[#D6A84F] font-bold">₹{scen.revenueExposure} Cr</span>
                </div>
                <div className="text-right">
                  <span className="text-[#5F6564] text-[10px] block">RECOVERY</span>
                  <span className="text-[#E8E5DD]">{scen.recoveryTimeDays} Days</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Scenario Deep Dive & Compound Stress Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Quantitative Impact Dashboard (7 cols) */}
        <div className="lg:col-span-7 border border-[#292E2F] bg-[#111416] p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] text-xs">
            <span className="text-[#62B8C8] font-bold tracking-wider uppercase flex items-center space-x-2">
              <GitFork className="w-4 h-4" />
              <span>SIMULATED ENTERPRISE IMPACT: {currentScenario.label}</span>
            </span>
            <span className="text-[#D6A84F]">
              HORIZON CODE: {currentScenario.id}
            </span>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="border border-[#292E2F] bg-[#171B1D] p-3">
              <span className="text-[#5F6564] text-[10px] block">REVENUE AT RISK</span>
              <span className="text-lg font-bold text-[#D7655A] tabular-data">
                ₹{adjustedRevenueExposure} Cr
              </span>
              <span className="text-[10px] text-[#5F6564] block mt-0.5">OEM Contract Penalties</span>
            </div>

            <div className="border border-[#292E2F] bg-[#171B1D] p-3">
              <span className="text-[#5F6564] text-[10px] block">BUFFER REMAINING</span>
              <span className="text-lg font-bold text-[#E8E5DD] tabular-data">
                {currentScenario.inventoryDaysRemaining} Days
              </span>
              <span className="text-[10px] text-[#5F6564] block mt-0.5">Detroit Staging Complex</span>
            </div>

            <div className="border border-[#292E2F] bg-[#171B1D] p-3">
              <span className="text-[#5F6564] text-[10px] block">PROJECTED SLA</span>
              <span className="text-lg font-bold text-[#D6A84F] tabular-data">
                {adjustedServiceLevel}%
              </span>
              <span className="text-[10px] text-[#5F6564] block mt-0.5">Target SLA: 95.0%</span>
            </div>

            <div className="border border-[#292E2F] bg-[#171B1D] p-3">
              <span className="text-[#5F6564] text-[10px] block">RECOVERY HORIZON</span>
              <span className="text-lg font-bold text-[#62B8C8] tabular-data">
                {currentScenario.recoveryTimeDays} Days
              </span>
              <span className="text-[10px] text-[#5F6564] block mt-0.5">Full Network Re-balance</span>
            </div>
          </div>

          {/* Compound Stress Condition Toggles */}
          <div className="border border-[#292E2F] bg-[#171B1D] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-[#1C2123]">
              <span className="text-[#E8E5DD] font-bold flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#62B8C8]" />
                <span>COMPOUND RISK STRESS CONDITIONS</span>
              </span>
              <span className="text-[10px] text-[#9A9C97]">
                MULTI-VARIABLE SHOCK PERMUTATIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <label className="flex items-center space-x-2 border border-[#292E2F] bg-[#111416] p-2 cursor-pointer hover:border-[#62B8C8]">
                <input
                  type="checkbox"
                  checked={alternatePortCongestion}
                  onChange={(e) => setAlternatePortCongestion(e.target.checked)}
                  className="accent-[#62B8C8]"
                />
                <span className="text-[11px] text-[#E8E5DD]">Busan Port Congestion (+25%)</span>
              </label>

              <label className="flex items-center space-x-2 border border-[#292E2F] bg-[#111416] p-2 cursor-pointer hover:border-[#62B8C8]">
                <input
                  type="checkbox"
                  checked={supplierShortage}
                  onChange={(e) => setSupplierShortage(e.target.checked)}
                  className="accent-[#62B8C8]"
                />
                <span className="text-[11px] text-[#E8E5DD]">Supplier Capacity Cap (+40%)</span>
              </label>

              <label className="flex items-center space-x-2 border border-[#292E2F] bg-[#111416] p-2 cursor-pointer hover:border-[#62B8C8]">
                <input
                  type="checkbox"
                  checked={demandSpike}
                  onChange={(e) => setDemandSpike(e.target.checked)}
                  className="accent-[#62B8C8]"
                />
                <span className="text-[11px] text-[#E8E5DD]">OEM Surge Orders (+35%)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Prepared Playbooks from Rehearsal (5 cols) */}
        <div className="lg:col-span-5 border border-[#292E2F] bg-[#111416] p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] text-xs mb-2">
              <span className="text-[#62B8C8] font-bold tracking-wider uppercase">
                PREPARED RECOVERY PLAYBOOKS
              </span>
              <span className="text-[10px] text-[#73B58A]">
                READY FOR EXECUTION
              </span>
            </div>

            <div className="space-y-2">
              {strategiesData.slice(0, 3).map((strat, idx) => (
                <div
                  key={strat.id}
                  className={`border p-3 ${
                    idx === 0
                      ? "bg-[#171B1D] border-[#62B8C8]"
                      : "bg-[#111416] border-[#292E2F]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#E8E5DD] font-bold">{strat.title}</span>
                    <span className="text-[#62B8C8]">{strat.costFormatted}</span>
                  </div>
                  <p className="text-[10px] font-sans text-[#9A9C97] mb-2">
                    {strat.summary}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-[#1C2123]">
                    <span className="text-[#73B58A]">RECOVERY: {strat.recoveryDays}d</span>
                    <span className="text-[#D6A84F]">SLA: {strat.serviceLevelPercent}%</span>
                    <span className="text-[#9A9C97]">{strat.autonomyLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/decisions"
            className="w-full py-2.5 bg-[#171B1D] border border-[#62B8C8] text-[#62B8C8] hover:bg-[#62B8C8] hover:text-[#0B0D0E] text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
          >
            <span>REVIEW DECISION MATRIX & AUTONOMY GATES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
