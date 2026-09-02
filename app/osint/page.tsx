"use client";

import React from "react";
import OsintWorldMap from "@/components/map/OsintWorldMap";
import { useResilience } from "@/lib/context/ResilienceContext";
import osintHotspots from "@/data/osintHotspots.json";
import {
  Globe,
  Radio,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  Radar,
  Navigation,
} from "lucide-react";

export default function OsintPage() {
  const { dataMode, setDataMode, triggerLiveDisruption, resetToRehearsal } = useResilience();

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-[1780px] mx-auto w-full">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-base-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-primary badge-sm font-mono gap-1">
              <Radar className="w-3.5 h-3.5" />
              OSINT MARITIME RECONNAISSANCE
            </span>
            <span className="badge badge-success badge-sm font-mono gap-1">
              <span className="animate-ping">●</span> AIS SAT-FEED ONLINE
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-base-content tracking-tight">
            Live Global Disruption Map & Strategic Chokepoints
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToRehearsal}
            className="btn btn-ghost btn-sm gap-1.5 font-mono text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Baseline
          </button>
          <button
            onClick={triggerLiveDisruption}
            className="btn btn-error btn-outline btn-sm gap-1.5 font-mono text-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Trigger Active Hotspot
          </button>
        </div>
      </div>

      {/* ── World Map Component ── */}
      <OsintWorldMap />

      {/* ── Bottom Grid: Strategic Chokepoint Risk Matrix & Live Feeds ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs">
        {/* Card 1: Critical Chokepoints Status */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-4 gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-base-200">
              <span className="font-bold text-base-content uppercase tracking-wider text-[11px]">
                Strategic Maritime Chokepoints
              </span>
              <span className="badge badge-error badge-xs font-mono">2 AT RISK</span>
            </div>

            <div className="space-y-2 text-[11px] pt-1">
              <div className="flex items-center justify-between">
                <span>1. Bab el-Mandeb (Red Sea)</span>
                <span className="badge badge-error badge-xs">DIVERTED (+14d)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>2. Strait of Hormuz (Mideast)</span>
                <span className="badge badge-warning badge-xs">ESCORT REQ</span>
              </div>
              <div className="flex items-center justify-between">
                <span>3. Malacca Strait (Singapore)</span>
                <span className="badge badge-success badge-xs">NORMAL TRANSIT</span>
              </div>
              <div className="flex items-center justify-between">
                <span>4. Panama Canal (Gatun Lake)</span>
                <span className="badge badge-warning badge-xs">DRAFT THROTTLED</span>
              </div>
              <div className="flex items-center justify-between">
                <span>5. Taiwan Strait (East Asia)</span>
                <span className="badge badge-success badge-xs">CLEAR FAIRWAY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Real-Time Intelligence Telemetry */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-4 gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-base-200">
              <span className="font-bold text-base-content uppercase tracking-wider text-[11px]">
                Satellite Constellation Status
              </span>
              <span className="badge badge-success badge-xs font-mono">100% COVERAGE</span>
            </div>

            <div className="space-y-2 text-[11px] pt-1">
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">AIS Ingest Stream:</span>
                <span className="font-bold text-base-content">AISStream Live Telemetry</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Orbital Refresh Rate:</span>
                <span className="font-bold text-base-content">Every 30 Seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Vessels Tracked:</span>
                <span className="font-bold text-primary">3,840 Container Carriers</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">ETA Desync Threshold:</span>
                <span className="font-bold text-warning">&gt; 12 Hours Deviation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Autonomous Pre-Rehearsal Playbooks */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body p-4 gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-base-200">
              <span className="font-bold text-base-content uppercase tracking-wider text-[11px]">
                Active Pre-Rehearsal Playbooks
              </span>
              <span className="badge badge-primary badge-xs font-mono">AUTO-ENGAGED</span>
            </div>

            <div className="space-y-2 text-[11px] pt-1">
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Shanghai Berth Stoppage:</span>
                <span className="text-primary font-bold">Hybrid Response (Busan Reroute)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Red Sea Cape Bypass:</span>
                <span className="text-base-content font-bold">Overland Air-Bridge Option</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Pacific Typhoon Divert:</span>
                <span className="text-base-content font-bold">Seattle Rail Transfer</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Laredo USMCA Queue:</span>
                <span className="text-warning font-bold">Air-Charter Subassembly Surge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
