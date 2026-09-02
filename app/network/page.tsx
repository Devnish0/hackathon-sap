"use client";

import React from "react";
import DigitalTwinGraph from "@/components/network/DigitalTwinGraph";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  AlertTriangle,
  RotateCcw,
  Info,
} from "lucide-react";

export default function NetworkPage() {
  const { systemMode, triggerLiveDisruption, resetToRehearsal } = useResilience();

  const networkStats = [
    { label: "Suppliers", value: "3 Tier-1/2", color: "text-base-content" },
    { label: "Deepwater Ports", value: "3 Nodes", color: "text-primary" },
    { label: "Active Vessels", value: "3 Tracked", color: "text-base-content" },
    { label: "Assembly Plants", value: "2 Operations", color: "text-base-content" },
    { label: "Staging Hubs", value: "3 Buffers", color: "text-success" },
    { label: "OEM Contracts", value: "₹18.7Cr", color: "text-warning" },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-primary badge-sm font-mono">DIGITAL TWIN ENGINE</span>
            <span className="text-xs text-base-content/40 font-mono">MULTI-TIER DEPENDENCY GRAPH</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-base-content tracking-tight">
            Global Supply Network & Critical Paths
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToRehearsal}
            className={`btn btn-sm gap-1.5 font-mono text-xs ${
              systemMode === "REHEARSAL" ? "btn-primary btn-outline" : "btn-ghost"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Baseline
          </button>
          <button
            onClick={triggerLiveDisruption}
            className={`btn btn-sm gap-1.5 font-mono text-xs ${
              systemMode === "LIVE_DISRUPTION" ? "btn-error" : "btn-warning btn-outline"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Stress Shanghai (24H)
          </button>
        </div>
      </div>

      {/* Network Stats Row */}
      <div className="stats shadow border border-base-300 w-full">
        {networkStats.map((stat) => (
          <div key={stat.label} className="stat py-2 px-4">
            <div className="stat-title text-[10px] font-mono uppercase">{stat.label}</div>
            <div className={`stat-value text-base font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Full-Screen Digital Twin */}
      <div className="flex-1 flex flex-col min-h-[620px]">
        <DigitalTwinGraph height="640px" showInspector={true} />
      </div>

      {/* Narrative Box */}
      <div role="alert" className="alert shadow-sm">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <div>
          <h3 className="font-bold text-sm">Digital Twin Computational Behavior</h3>
          <p className="text-xs text-base-content/50 leading-relaxed">
            The supply network computational graph maps upstream silicon suppliers in Shanghai, Nuevo León, and Detroit through maritime gateway nodes (CNSHG, KRPUS, USLGB) into domestic assembly complexes. When Port of Shanghai incurs a disruption, the downstream impact propagates mathematically across the Ever Vanguard shipment, depleting safety buffers in Detroit from 6.2 days down to 1.4 days.
          </p>
        </div>
      </div>
    </div>
  );
}
