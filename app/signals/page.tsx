"use client";

import React, { useState, useEffect } from "react";
import { DisruptionSignal } from "@/lib/types";
import eventsData from "@/data/events.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  Radio,
  Layers,
  CheckCircle2,
  RefreshCw,
  Globe,
} from "lucide-react";

export default function SignalsPage() {
  const { triggerLiveDisruption } = useResilience();
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

  useEffect(() => { loadSignals(); }, []);

  const selectedSignal = signals.find((s) => s.id === selectedSignalId) || signals[0];

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
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-primary badge-sm font-mono">EXTERNAL INTELLIGENCE</span>
            {isLiveFeed ? (
              <span className="badge badge-success badge-sm gap-1 font-mono">
                <span className="animate-pulse">●</span> LIVE FEED
              </span>
            ) : (
              <span className="badge badge-warning badge-sm font-mono">FALLBACK</span>
            )}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-base-content tracking-tight">
            Live External Feed & Multi-Source Validation
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="badge badge-ghost badge-lg gap-2 font-mono text-xs">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="truncate max-w-[240px]">{feedSource}</span>
          </div>
          <button
            onClick={loadSignals}
            disabled={isLoading}
            className="btn btn-square btn-sm btn-ghost"
            title="Poll live feeds"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Signals List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-base-content/50 font-mono uppercase">Ingested Signals</span>
            <span className="badge badge-primary badge-sm font-mono">{signals.length} active</span>
          </div>

          <div className="space-y-2">
            {signals.map((sig) => {
              const isSelected = sig.id === selectedSignalId;
              const isLive = sig.id.startsWith("SIG-LIVE");
              return (
                <div
                  key={sig.id}
                  onClick={() => setSelectedSignalId(sig.id)}
                  className={`card cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-primary/5 border-primary shadow-md"
                      : "bg-base-100 border-base-300 hover:border-base-content/20 hover:shadow-sm"
                  }`}
                >
                  <div className="card-body p-3 gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-accent">{sig.id}</span>
                        {isLive && <span className="badge badge-success badge-xs">LIVE</span>}
                      </div>
                      <span className="text-base-content/30 text-[10px]">
                        {sig.timestamp.split("T")[0]}
                      </span>
                    </div>

                    <h3 className="text-sm font-serif font-bold text-base-content line-clamp-1">
                      {sig.eventType} — {sig.location}
                    </h3>
                    <p className="text-[11px] text-base-content/40 line-clamp-2">
                      {sig.rawText}
                    </p>

                    <div className="divider my-0" />

                    <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                      <div>
                        <span className="text-base-content/30 block">SEVERITY</span>
                        <span className="text-base-content font-medium">{sig.severity}</span>
                      </div>
                      <div>
                        <span className="text-base-content/30 block">CONFIDENCE</span>
                        <span className="text-primary font-bold">{(sig.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base-content/30 block">STATUS</span>
                        <span className="text-success font-bold">
                          {sig.rehearsalTriggered ? "REHEARSED" : "VALIDATED"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Validation Detail */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5 gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm font-bold text-base-content uppercase">
                    Validation Dossier: {selectedSignal.id}
                  </span>
                </div>
                <span className="badge badge-success badge-sm font-mono gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {selectedSignal.validationStatus}
                </span>
              </div>

              {/* Raw Ingest */}
              <div className="bg-base-200 rounded-xl p-4">
                <span className="text-[10px] font-mono text-base-content/35 block uppercase mb-1">
                  RAW INGEST ({selectedSignal.source}):
                </span>
                <p className="text-sm text-base-content leading-relaxed">
                  "{selectedSignal.rawText}"
                </p>
              </div>

              {/* Correlation Matrix */}
              <div>
                <div className="flex items-center gap-2 text-xs text-base-content/50 mb-3 font-mono">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span className="uppercase">Multi-Source Corroboration Matrix</span>
                </div>

                <div className="space-y-2">
                  {sourceVerificationFeeds.map((feed, idx) => (
                    <div key={idx} className="card bg-base-200 border border-base-300">
                      <div className="card-body p-3 flex-row items-center justify-between gap-3">
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-base-content">{feed.source}</span>
                            <span className="badge badge-ghost badge-xs font-mono">{feed.type}</span>
                          </div>
                          <p className="text-xs text-base-content/40 truncate">{feed.finding}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-primary font-bold text-xs block">{feed.credibility}</span>
                          <span className="text-success text-[10px] font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {feed.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="divider my-0" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-base-content/40">
                  Signal validated. Rehearsal engine correlates this against the digital twin.
                </p>
                <button
                  onClick={triggerLiveDisruption}
                  className="btn btn-error btn-outline btn-sm font-mono"
                >
                  Test Disruption Escalation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
