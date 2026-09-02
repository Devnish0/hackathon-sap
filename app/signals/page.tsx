"use client";

import React, { useState } from "react";
import eventsData from "@/data/events.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  Radio,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layers,
  CheckCircle2,
  AlertOctagon,
  ExternalLink,
  Cpu,
  Info,
} from "lucide-react";

export default function SignalsPage() {
  const { systemMode, triggerLiveDisruption } = useResilience();
  const [selectedSignalId, setSelectedSignalId] = useState<string>("SIG-02481");

  const selectedSignal =
    eventsData.find((s) => s.id === selectedSignalId) || eventsData[0];

  const sourceVerificationFeeds = [
    {
      source: "East Asia Maritime Bureau Telemetry",
      type: "PORT_CRANE_SENSOR",
      timestamp: "17:41:12 UTC",
      credibility: "98%",
      finding: "Yangshan Phase IV crane automation network sync error; 14 vessel berths frozen.",
      status: "CORROBORATED",
    },
    {
      source: "Lloyd's List Intelligence Satellite Feed",
      type: "MARITIME_AIS",
      timestamp: "17:41:45 UTC",
      credibility: "94%",
      finding: "Vessel Ever Vanguard (SHP-8821) speed dropped to 0.0 knots at outer anchorage fairway.",
      status: "CORROBORATED",
    },
    {
      source: "Shanghai Municipal Port Authority Dispatch",
      type: "OFFICIAL_COMMUNIQUE",
      timestamp: "17:42:08 UTC",
      credibility: "88%",
      finding: "Advisory: Berth clearance halted pending technical reboot. Expected window 2-4 hours.",
      status: "CORROBORATED",
    },
    {
      source: "Global Weather Doppler Radar (NOAA)",
      type: "METEOROLOGICAL",
      timestamp: "17:39:00 UTC",
      credibility: "99%",
      finding: "Fairway conditions nominal (wind 8kt, wave 0.6m); confirms root cause is non-weather operational.",
      status: "CORROBORATED",
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full font-mono">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292E2F] pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] tracking-widest text-[#62B8C8] bg-[#112226] border border-[#234E57] px-2 py-0.5">
              EXTERNAL INTELLIGENCE & SENSING ENGINE
            </span>
            <span className="text-xs text-[#5F6564]">
              INGEST FREQUENCY: CONTINUOUS (1000ms)
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Signal Ingestion & Multi-Source Validation
          </h1>
        </div>

        {/* Validation Golden Rule Badge */}
        <div className="bg-[#171B1D] border border-[#292E2F] px-3 py-2 text-xs flex items-center space-x-2.5 max-w-md">
          <ShieldCheck className="w-4 h-4 text-[#62B8C8] shrink-0" />
          <div className="text-[11px] text-[#9A9C97] font-sans">
            <b className="text-[#E8E5DD] font-mono block text-[10px]">CORE GOVERNANCE RULE:</b>
            "One article must never trigger a high-impact enterprise decision. High-impact actions require multi-source validation."
          </div>
        </div>
      </div>

      {/* Main Grid: Left Ingested Stream, Right In-depth Validation Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Signals Feed (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="text-xs text-[#9A9C97] flex items-center justify-between">
            <span>DETECTED DISRUPTION EVENTS</span>
            <span className="text-[#62B8C8]">{eventsData.length} ACTIVE SIGNALS</span>
          </div>

          <div className="space-y-2">
            {eventsData.map((sig) => {
              const isSelected = sig.id === selectedSignalId;
              const isDisrupted = sig.severity === "MODERATE" || sig.severity === "HIGH";

              return (
                <div
                  key={sig.id}
                  onClick={() => setSelectedSignalId(sig.id)}
                  className={`border p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#171B1D] border-[#62B8C8]"
                      : "bg-[#111416] border-[#292E2F] hover:border-[#414A4D]"
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#1C2123] text-[11px]">
                    <span className="text-[#D6A84F] font-bold">{sig.id}</span>
                    <span className="text-[#5F6564]">17:42:08 UTC</span>
                  </div>

                  <div className="text-sm font-serif font-bold text-[#E8E5DD] mb-1">
                    {sig.eventType}
                  </div>
                  <div className="text-[11px] text-[#62B8C8] mb-2">
                    {sig.facility}
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[#1C2123] text-[10px]">
                    <div>
                      <span className="text-[#5F6564] block">DURATION</span>
                      <span className="text-[#E8E5DD]">{sig.expectedDuration} {sig.durationUnit}</span>
                    </div>
                    <div>
                      <span className="text-[#5F6564] block">CONFIDENCE</span>
                      <span className="text-[#62B8C8] font-bold">{(sig.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#5F6564] block">STATUS</span>
                      <span className="text-[#73B58A] font-bold">
                        {sig.rehearsalTriggered ? "REHEARSED" : "LOGGED"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Validation & Correlation Engine (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="border border-[#292E2F] bg-[#111416] p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] text-xs">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-[#62B8C8]" />
                <span className="text-[#E8E5DD] font-bold uppercase">
                  SIGNAL VALIDATION DOSSIER: {selectedSignal.id}
                </span>
              </div>
              <span className="text-[#73B58A] border border-[#244931] px-2 py-0.5 bg-[#122117] text-[10px]">
                {selectedSignal.validationStatus} (4 INDEPENDENT SOURCES)
              </span>
            </div>

            {/* Raw Ingest Excerpt */}
            <div className="bg-[#171B1D] border border-[#292E2F] p-3 text-xs">
              <span className="text-[10px] text-[#5F6564] block uppercase mb-1">
                RAW UNSTRUCTURED INGEST TEXT:
              </span>
              <p className="font-sans text-sm text-[#E8E5DD] leading-relaxed">
                "{selectedSignal.rawText}"
              </p>
            </div>

            {/* Source Correlation Matrix */}
            <div>
              <div className="text-xs text-[#9A9C97] mb-2 flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-[#62B8C8]" />
                <span>CROSS-SOURCE CORROBORATION MATRIX</span>
              </div>

              <div className="border border-[#292E2F] divide-y divide-[#1C2123] text-xs">
                {sourceVerificationFeeds.map((feed, idx) => (
                  <div key={idx} className="p-3 bg-[#171B1D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#E8E5DD] font-semibold">{feed.source}</span>
                        <span className="text-[10px] text-[#5F6564]">({feed.type})</span>
                      </div>
                      <p className="font-sans text-xs text-[#9A9C97]">{feed.finding}</p>
                    </div>
                    <div className="text-right shrink-0 text-[11px]">
                      <span className="text-[#62B8C8] font-bold block">{feed.credibility} CONF</span>
                      <span className="text-[#73B58A] text-[10px] flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{feed.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downstream Enterprise Twin Matching */}
            <div className="border border-[#292E2F] bg-[#171B1D] p-3 text-xs space-y-2">
              <span className="text-[10px] text-[#5F6564] block uppercase">
                ENTERPRISE TWIN CROSS-REFERENCE:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="border border-[#292E2F] p-2 bg-[#111416]">
                  <span className="text-[#5F6564] text-[10px] block">AFFECTED GATEWAY</span>
                  <span className="text-[#E8E5DD] font-bold">Port of Shanghai (CNSHG)</span>
                </div>
                <div className="border border-[#292E2F] p-2 bg-[#111416]">
                  <span className="text-[#5F6564] text-[10px] block">STALLED SHIPMENT</span>
                  <span className="text-[#D7655A] font-bold">SHP-8821 (Ever Vanguard)</span>
                </div>
                <div className="border border-[#292E2F] p-2 bg-[#111416]">
                  <span className="text-[#5F6564] text-[10px] block">CRITICAL PAYLOAD</span>
                  <span className="text-[#E8E5DD] font-bold">12,000 ECU Modules</span>
                </div>
              </div>
            </div>

            {/* Continuous Rehearsal Action Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-[#9A9C97] text-[11px] font-sans">
                Signal is validated. Continuous rehearsal generated 4 scenario branches.
              </div>
              <button
                onClick={triggerLiveDisruption}
                className="px-4 py-2 bg-[#171B1D] border border-[#572A26] text-[#D7655A] hover:bg-[#241413] transition-colors"
              >
                TEST LIVE DISRUPTION ESCALATION →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
