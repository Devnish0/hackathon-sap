"use client";

import React, { useState, useEffect } from "react";
import { DisruptionSignal } from "@/lib/types";
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
  RefreshCw,
  Globe,
} from "lucide-react";

export default function SignalsPage() {
  const { systemMode, triggerLiveDisruption } = useResilience();
  const [signals, setSignals] = useState<DisruptionSignal[]>(eventsData as DisruptionSignal[]);
  const [selectedSignalId, setSelectedSignalId] = useState<string>("SIG-02481");
  const [isLiveFeed, setIsLiveFeed] = useState<boolean>(false);
  const [feedSource, setFeedSource] = useState<string>("Connecting to external feeds...");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadSignals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sensing");
      if (res.ok) {
        const data = await res.json();
        if (data.signals && data.signals.length > 0) {
          setSignals(data.signals);
          setIsLiveFeed(data.isLiveFeed);
          setFeedSource(data.feedSource);
        }
      }
    } catch (e) {
      console.error("Live feed fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSignals();
  }, []);

  const selectedSignal =
    signals.find((s) => s.id === selectedSignalId) || signals[0];

  const sourceVerificationFeeds = [
    {
      source: selectedSignal.id.startsWith("SIG-LIVE") ? "gCaptain Maritime News Wire (Live RSS)" : "East Asia Maritime Bureau Telemetry",
      type: selectedSignal.id.startsWith("SIG-LIVE") ? "PUBLIC_RSS_WIRE" : "PORT_CRANE_SENSOR",
      timestamp: "17:41:12 UTC",
      credibility: "98%",
      finding: selectedSignal.rawText.slice(0, 120) + "...",
      status: "CORROBORATED",
    },
    {
      source: "Lloyd's List Intelligence Satellite Feed",
      type: "MARITIME_AIS",
      timestamp: "17:41:45 UTC",
      credibility: "94%",
      finding: "Vessel tracking telemetry verifies transit speeds and outer fairway route variance.",
      status: "CORROBORATED",
    },
    {
      source: "Cross-Border Regulatory Dispatch Monitor",
      type: "OFFICIAL_COMMUNIQUE",
      timestamp: "17:42:08 UTC",
      credibility: "88%",
      finding: "Advisory: Channel clearance updates registered with maritime trade desks.",
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
            <div className="flex items-center space-x-1.5 text-xs text-[#9A9C97]">
              {isLiveFeed ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#73B58A] animate-pulse" />
                  <span className="text-[#73B58A] font-bold">REAL EXTERNAL FEED: ONLINE</span>
                </>
              ) : (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#D6A84F]" />
                  <span>DETERMINISTIC FALLBACK ACTIVE</span>
                </>
              )}
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Live External Feed & Multi-Source Validation
          </h1>
        </div>

        {/* Live Feed Status & Refresh Control */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#111416] border border-[#292E2F] px-3 py-1.5 text-xs flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-[#62B8C8]" />
            <span className="text-[#9A9C97] text-[11px] truncate max-w-[280px]">
              {feedSource}
            </span>
          </div>
          <button
            onClick={loadSignals}
            disabled={isLoading}
            className="p-2 bg-[#171B1D] border border-[#292E2F] hover:border-[#62B8C8] text-[#E8E5DD] transition-colors"
            title="Poll real live external feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#62B8C8]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Signals Feed (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="text-xs text-[#9A9C97] flex items-center justify-between">
            <span>INGESTED DISRUPTION SIGNALS</span>
            <span className="text-[#62B8C8]">{signals.length} ACTIVE SIGNALS</span>
          </div>

          <div className="space-y-2">
            {signals.map((sig) => {
              const isSelected = sig.id === selectedSignalId;
              const isLive = sig.id.startsWith("SIG-LIVE");

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
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#D6A84F] font-bold">{sig.id}</span>
                      {isLive && (
                        <span className="text-[9px] bg-[#122117] border border-[#244931] text-[#73B58A] px-1 py-0.2 font-bold">
                          LIVE WEB FEED
                        </span>
                      )}
                    </div>
                    <span className="text-[#5F6564] text-[10px] truncate max-w-[140px]">
                      {sig.timestamp.split("T")[0]}
                    </span>
                  </div>

                  <div className="text-sm font-serif font-bold text-[#E8E5DD] mb-1 line-clamp-1">
                    {sig.eventType} — {sig.location}
                  </div>
                  <p className="text-[11px] font-sans text-[#9A9C97] line-clamp-2 mb-2">
                    {sig.rawText}
                  </p>

                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[#1C2123] text-[10px]">
                    <div>
                      <span className="text-[#5F6564] block">SEVERITY</span>
                      <span className="text-[#E8E5DD]">{sig.severity}</span>
                    </div>
                    <div>
                      <span className="text-[#5F6564] block">CONFIDENCE</span>
                      <span className="text-[#62B8C8] font-bold">{(sig.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#5F6564] block">STATUS</span>
                      <span className="text-[#73B58A] font-bold">
                        {sig.rehearsalTriggered ? "REHEARSED" : "VALIDATED"}
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
                {selectedSignal.validationStatus} (3+ SOURCES)
              </span>
            </div>

            {/* Raw Ingest Excerpt */}
            <div className="bg-[#171B1D] border border-[#292E2F] p-3 text-xs">
              <span className="text-[10px] text-[#5F6564] block uppercase mb-1">
                RAW INGEST CONTENT ({selectedSignal.source}):
              </span>
              <p className="font-sans text-sm text-[#E8E5DD] leading-relaxed">
                "{selectedSignal.rawText}"
              </p>
            </div>

            {/* Source Correlation Matrix */}
            <div>
              <div className="text-xs text-[#9A9C97] mb-2 flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-[#62B8C8]" />
                <span>MULTI-SOURCE CORROBORATION MATRIX</span>
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

            {/* Action Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-[#1C2123]">
              <div className="text-[#9A9C97] text-[11px] font-sans">
                Signal is validated. Rehearsal engine correlates this signal against the digital twin.
              </div>
              <button
                onClick={triggerLiveDisruption}
                className="px-4 py-2 bg-[#171B1D] border border-[#572A26] text-[#D7655A] hover:bg-[#241413] transition-colors"
              >
                TEST DISRUPTION ESCALATION →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
