"use client";

import React, { useState } from "react";
import scenariosData from "@/data/scenarios.json";
import strategiesData from "@/data/strategies.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  GitFork,
  ArrowRight,
  Sliders,
} from "lucide-react";
import Link from "next/link";

export default function ScenariosPage() {
  const { activeScenarioId, setActiveScenarioId } = useResilience();
  const [selectedHorizon, setSelectedHorizon] = useState<string>("SCEN-24H");

  const [alternatePortCongestion, setAlternatePortCongestion] = useState(true);
  const [supplierShortage, setSupplierShortage] = useState(false);
  const [demandSpike, setDemandSpike] = useState(false);

  const currentScenario =
    scenariosData.find((s) => s.id === selectedHorizon) || scenariosData[1];

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

  const horizonTitles: Record<string, string> = {
    "2 HOURS": "Baseline Tidal Delay",
    "24 HOURS": "Extended Port Demurrage",
    "7 DAYS": "Pacific Network Gridlock",
    "PERMANENT": "Structural Port Closure",
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-[1720px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent badge-sm font-mono">SCENARIO REHEARSAL</span>
            <span className="text-xs text-base-content/40 font-mono">
              HERO TRIGGER: PORT OF SHANGHAI 2H ADVISORY
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-base-content tracking-tight">
            Multi-Horizon Stress Testing & Prepared Playbooks
          </h1>
        </div>
        <p className="text-xs text-base-content/40 max-w-sm italic">
          "The system does not panic when an early signal appears. It continuously rehearses increasingly severe futures."
        </p>
      </div>

      {/* Horizon Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenariosData.map((scen) => {
          const isSelected = scen.id === selectedHorizon;
          return (
            <div
              key={scen.id}
              onClick={() => setSelectedHorizon(scen.id)}
              className={`card cursor-pointer transition-all border ${
                isSelected
                  ? "bg-primary/5 border-primary shadow-md ring-1 ring-primary/20"
                  : "bg-base-100 border-base-300 hover:border-base-content/20 hover:shadow-sm"
              }`}
            >
              <div className="card-body p-4 gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">{scen.label}</span>
                  <span className="badge badge-ghost badge-xs font-mono">
                    {(scen.closureProbability * 100).toFixed(0)}% RISK
                  </span>
                </div>

                <h3 className="text-xs font-serif font-bold text-base-content">
                  {horizonTitles[scen.label] || scen.label}
                </h3>
                <p className="text-[11px] text-base-content/40 line-clamp-2">{scen.narrative}</p>

                <div className="divider my-0" />

                <div className="grid grid-cols-2 text-[11px] font-mono">
                  <div>
                    <span className="text-base-content/30 text-[10px] block">EXPOSURE</span>
                    <span className="text-warning font-bold">₹{scen.revenueExposure} Cr</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base-content/30 text-[10px] block">RECOVERY</span>
                    <span className="text-base-content font-bold">{scen.recoveryTimeDays} Days</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Impact Dashboard */}
        <div className="lg:col-span-7 card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-5 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm font-bold uppercase">
                  Impact: {currentScenario.label}
                </span>
              </div>
              <span className="badge badge-accent badge-sm font-mono">{currentScenario.id}</span>
            </div>

            {/* Stats */}
            <div className="stats stats-vertical sm:stats-horizontal shadow border border-base-300 w-full">
              <div className="stat py-3 px-4">
                <div className="stat-title text-[10px] font-mono">Revenue at Risk</div>
                <div className="stat-value text-xl text-error tabular-data">₹{adjustedRevenueExposure}Cr</div>
                <div className="stat-desc text-[10px]">OEM Contract Penalties</div>
              </div>
              <div className="stat py-3 px-4">
                <div className="stat-title text-[10px] font-mono">Buffer</div>
                <div className="stat-value text-xl tabular-data">{currentScenario.inventoryDaysRemaining}d</div>
                <div className="stat-desc text-[10px]">Detroit Staging</div>
              </div>
              <div className="stat py-3 px-4">
                <div className="stat-title text-[10px] font-mono">Projected SLA</div>
                <div className="stat-value text-xl text-warning tabular-data">{adjustedServiceLevel}%</div>
                <div className="stat-desc text-[10px]">Target: 95.0%</div>
              </div>
              <div className="stat py-3 px-4">
                <div className="stat-title text-[10px] font-mono">Recovery</div>
                <div className="stat-value text-xl text-primary tabular-data">{currentScenario.recoveryTimeDays}d</div>
                <div className="stat-desc text-[10px]">Full Re-balance</div>
              </div>
            </div>

            {/* Compound Toggles */}
            <div className="bg-base-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  Compound Risk Stress Conditions
                </span>
                <span className="text-[10px] text-base-content/40 font-mono">MULTI-VARIABLE SHOCK</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="label cursor-pointer bg-base-100 rounded-lg px-3 py-2 border border-base-300 gap-2 justify-start">
                  <input
                    type="checkbox"
                    checked={alternatePortCongestion}
                    onChange={(e) => setAlternatePortCongestion(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text text-xs">Busan Congestion (+25%)</span>
                </label>
                <label className="label cursor-pointer bg-base-100 rounded-lg px-3 py-2 border border-base-300 gap-2 justify-start">
                  <input
                    type="checkbox"
                    checked={supplierShortage}
                    onChange={(e) => setSupplierShortage(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text text-xs">Supplier Cap (+40%)</span>
                </label>
                <label className="label cursor-pointer bg-base-100 rounded-lg px-3 py-2 border border-base-300 gap-2 justify-start">
                  <input
                    type="checkbox"
                    checked={demandSpike}
                    onChange={(e) => setDemandSpike(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text text-xs">OEM Surge (+35%)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Prepared Playbooks */}
        <div className="lg:col-span-5 card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-5 gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-primary uppercase">
                Prepared Recovery Playbooks
              </span>
              <span className="badge badge-success badge-xs font-mono">READY</span>
            </div>

            <div className="space-y-2">
              {strategiesData.slice(0, 3).map((strat, idx) => (
                <div
                  key={strat.id}
                  className={`card border transition-all ${
                    idx === 0
                      ? "bg-primary/5 border-primary"
                      : "bg-base-100 border-base-300"
                  }`}
                >
                  <div className="card-body p-3 gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-base-content">{strat.title}</span>
                      <span className="text-primary font-mono">{strat.costFormatted}</span>
                    </div>
                    <p className="text-[10px] text-base-content/40">{strat.summary}</p>
                    <div className="divider my-0" />
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-success">RECOVERY: {strat.recoveryDays}d</span>
                      <span className="text-warning">SLA: {strat.serviceLevelPercent}%</span>
                      <span className="badge badge-ghost badge-xs">{strat.autonomyLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/decisions"
              className="btn btn-primary btn-block gap-2 mt-2"
            >
              Review Decision Matrix & Autonomy Gates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
