"use client";

import React, { useState } from "react";
import DigitalTwinGraph from "@/components/network/DigitalTwinGraph";
import { useResilience } from "@/lib/context/ResilienceContext";
import networkData from "@/data/network.json";
import {
  Network,
  Layers,
  Filter,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  Info,
} from "lucide-react";

export default function NetworkPage() {
  const { systemMode, networkHealth, triggerLiveDisruption, resetToRehearsal } = useResilience();
  const [activeLayer, setActiveLayer] = useState<string>("ALL");

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full">
      {/* Breadcrumb & Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292E2F] pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono tracking-widest text-[#62B8C8] bg-[#112226] border border-[#234E57] px-2 py-0.5">
              DIGITAL TWIN COMPUTATIONAL ENGINE
            </span>
            <span className="text-xs font-mono text-[#5F6564]">
              LAYER: MULTI-TIER DEPENDENCY GRAPH
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Global Supply Network & Critical Paths
          </h1>
        </div>

        {/* Action Controls & Simulation Quick-triggers */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <button
            onClick={resetToRehearsal}
            className={`px-3 py-1.5 border transition-colors flex items-center space-x-1.5 ${
              systemMode === "REHEARSAL"
                ? "bg-[#171B1D] border-[#62B8C8] text-[#62B8C8]"
                : "bg-[#111416] border-[#292E2F] text-[#9A9C97] hover:text-[#E8E5DD]"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET BASELINE</span>
          </button>
          <button
            onClick={triggerLiveDisruption}
            className={`px-3 py-1.5 border transition-colors flex items-center space-x-1.5 ${
              systemMode === "LIVE_DISRUPTION"
                ? "bg-[#241413] border-[#572A26] text-[#D7655A]"
                : "bg-[#111416] border-[#292E2F] text-[#D6A84F] hover:border-[#D6A84F]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>STRESS SHANGHAI PORT (24H)</span>
          </button>
        </div>
      </div>

      {/* Network Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs font-mono">
        <div className="bg-[#111416] border border-[#292E2F] p-2.5">
          <span className="text-[#5F6564] text-[10px] block uppercase">SUPPLIERS</span>
          <span className="text-base font-bold text-[#E8E5DD]">3 Tier-1/2 Units</span>
        </div>
        <div className="bg-[#111416] border border-[#292E2F] p-2.5">
          <span className="text-[#5F6564] text-[10px] block uppercase">DEEPWATER PORTS</span>
          <span className="text-base font-bold text-[#62B8C8]">3 Strategic Nodes</span>
        </div>
        <div className="bg-[#111416] border border-[#292E2F] p-2.5">
          <span className="text-[#5F6564] text-[10px] block uppercase">ACTIVE CARGO VESSELS</span>
          <span className="text-base font-bold text-[#E8E5DD]">3 Tracked Consignments</span>
        </div>
        <div className="bg-[#111416] border border-[#292E2F] p-2.5">
          <span className="text-[#5F6564] text-[10px] block uppercase">ASSEMBLY PLANTS</span>
          <span className="text-base font-bold text-[#E8E5DD]">2 Operations</span>
        </div>
        <div className="bg-[#111416] border border-[#292E2F] p-2.5">
          <span className="text-[#5F6564] text-[10px] block uppercase">STAGING WAREHOUSES</span>
          <span className="text-base font-bold text-[#73B58A]">3 Regional Buffers</span>
        </div>
        <div className="bg-[#111416] border border-[#292E2F] p-2.5">
          <span className="text-[#5F6564] text-[10px] block uppercase">OEM CUSTOMER SLAS</span>
          <span className="text-base font-bold text-[#D6A84F]">₹18.7 Cr Protected</span>
        </div>
      </div>

      {/* Full-Screen Digital Twin React Flow View */}
      <div className="flex-1 flex flex-col min-h-[620px]">
        <DigitalTwinGraph height="640px" showInspector={true} />
      </div>

      {/* Analytical Narrative Box */}
      <div className="border border-[#292E2F] bg-[#111416] p-4 text-xs font-mono space-y-2">
        <div className="flex items-center space-x-2 text-[#62B8C8]">
          <Info className="w-4 h-4" />
          <span className="font-bold tracking-wider uppercase">
            DIGITAL TWIN COMPUTATIONAL BEHAVIOR:
          </span>
        </div>
        <p className="font-sans text-sm text-[#9A9C97] leading-relaxed">
          The supply network computational graph maps upstream silicon suppliers in Shanghai, Nuevo León, and Detroit through maritime gateway nodes (CNSHG, KRPUS, USLGB) into domestic assembly complexes. When Port of Shanghai incurs a disruption, the downstream impact propagates mathematically across the Ever Vanguard shipment, depleting safety buffers in Detroit from 6.2 days down to 1.4 days.
        </p>
      </div>
    </div>
  );
}
