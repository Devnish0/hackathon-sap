"use client";

import React, { useState, useEffect, useRef } from "react";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  Cpu,
  Radio,
  ShieldCheck,
  GitFork,
  Truck,
  Box,
  Factory,
  DollarSign,
  Scale,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";

interface AgentStep {
  id: string;
  name: string;
  role: string;
  icon: any;
  status: "COMPLETED" | "RUNNING" | "PENDING";
  latencyMs: number;
  outputSummary: string;
  color: string;
  badgeClass: string;
}

export default function LiveAgentExecutionStream() {
  const { currentSignal, currentStrategy, systemMode, activeDisruptedCorridor } = useResilience();
  const [pipelineProgress, setPipelineProgress] = useState<number>(100);
  const [activeAgentIndex, setActiveAgentIndex] = useState<number>(8);
  const [isRunningCycle, setIsRunningCycle] = useState<boolean>(false);
  const [filterAgent, setFilterAgent] = useState<string>("ALL");
  const [logs, setLogs] = useState<
    { id: string; time: string; agent: string; level: string; message: string; color: string }[]
  >([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const AGENTS_LIST: Omit<AgentStep, "status" | "latencyMs" | "outputSummary">[] = [
    { id: "SENSING", name: "Sensing", role: "External Telemetry Ingest", icon: Radio, color: "text-info", badgeClass: "badge-info" },
    { id: "VALIDATION", name: "Validation", role: "Multi-Source Corroboration", icon: ShieldCheck, color: "text-success", badgeClass: "badge-success" },
    { id: "SCENARIO", name: "Scenario Engine", role: "Stress Horizon Rehearsal", icon: GitFork, color: "text-primary", badgeClass: "badge-primary" },
    { id: "LOGISTICS", name: "Logistics", role: "Transit & Feeder Routing", icon: Truck, color: "text-accent", badgeClass: "badge-accent" },
    { id: "INVENTORY", name: "Inventory", role: "Regional Buffer Modeling", icon: Box, color: "text-success", badgeClass: "badge-success" },
    { id: "PROCUREMENT", name: "Procurement", role: "Capacity & Supplier Sourcing", icon: Factory, color: "text-warning", badgeClass: "badge-warning" },
    { id: "FINANCE", name: "Finance", role: "Margin & Capital Exposure", icon: DollarSign, color: "text-warning", badgeClass: "badge-warning" },
    { id: "COMPLIANCE", name: "Compliance", role: "USMCA & Tariff Hard-Gates", icon: Scale, color: "text-secondary", badgeClass: "badge-secondary" },
    { id: "ORCHESTRATOR", name: "Orchestrator", role: "Deterministic Ranking & Autonomy", icon: Sparkles, color: "text-primary", badgeClass: "badge-primary" },
  ];

  // Dynamic log generator based on current signal
  const generateAgentLogs = () => {
    const loc = currentSignal.location || "Global Corridor";
    const fac = currentSignal.facility || "Active Gateway";
    const src = currentSignal.source || "Satellite AIS Stream";

    return [
      { id: "1", time: "17:42:01.102", agent: "SENSING", level: "INGEST", message: `Ingested real-time signal: ${currentSignal.eventType} at ${fac} via ${src}`, color: "text-info" },
      { id: "2", time: "17:42:01.890", agent: "VALIDATION", level: "VERIFY", message: `Cross-referenced 4 independent telemetry feeds. Confidence: ${(currentSignal.confidence * 100).toFixed(0)}% (CONFIRMED)`, color: "text-success" },
      { id: "3", time: "17:42:02.410", agent: "SCENARIO", level: "REHEARSE", message: `Generated 4 multi-horizon futures (2h, 24h, 7d, Perm). Compound risks: alternate port congestion detected`, color: "text-primary" },
      { id: "4", time: "17:42:03.021", agent: "LOGISTICS", level: "COMPUTE", message: `Evaluated 14 maritime & overland bypass options. Recommended: Feeder rerouting via Busan / Incheon (+2d transit)`, color: "text-accent" },
      { id: "5", time: "17:42:03.542", agent: "INVENTORY", level: "ALLOCATE", message: `Modeled buffer depletion. Auto-allocated 1,500 safety stock units Texas → Detroit (Depot arrival: 18h)`, color: "text-success" },
      { id: "6", time: "17:42:04.110", agent: "PROCUREMENT", level: "EVALUATE", message: `Audited nearshore & domestic supplier lines. Qualified 8,000 units/mo on Midwest/Monterrey reserve capacity`, color: "text-warning" },
      { id: "7", time: "17:42:04.603", agent: "FINANCE", level: "CALCULATE", message: `Simulated exposure: ₹18.7 Cr risk without action. Strategy execution cost: ${currentStrategy.costFormatted} (ROI: 27.5x)`, color: "text-warning" },
      { id: "8", time: "17:42:05.011", agent: "COMPLIANCE", level: "HARD-GATE", message: `Checked USMCA origin certifications, cabotage restrictions, and dual-source quotas: 0 Violations (PASS ✓)`, color: "text-secondary" },
      { id: "9", time: "17:42:05.490", agent: "ORCHESTRATOR", level: "SYNTHESIS", message: `Scored 6 candidate playbooks. Selected Rank #1: "${currentStrategy.title}" (Score: 92.4, Gate: ${currentStrategy.autonomyLevel})`, color: "text-primary" },
    ];
  };

  useEffect(() => {
    setLogs(generateAgentLogs());
  }, [currentSignal.id, currentStrategy.title]);

  // Run real-time animated simulation cycle
  const runSimulationCycle = () => {
    setIsRunningCycle(true);
    setPipelineProgress(0);
    setActiveAgentIndex(0);
    setLogs([]);

    const fullLogs = generateAgentLogs();
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullLogs.length) {
        const nextLog = {
          ...fullLogs[currentIdx],
          time: new Date().toLocaleTimeString("en-GB") + "." + Math.floor(100 + Math.random() * 800),
        };
        setLogs((prev) => [...prev, nextLog]);
        setActiveAgentIndex(currentIdx);
        setPipelineProgress(Math.round(((currentIdx + 1) / AGENTS_LIST.length) * 100));
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsRunningCycle(false);
        setActiveAgentIndex(AGENTS_LIST.length - 1);
        setPipelineProgress(100);
      }
    }, 450);
  };

  const filteredLogs = filterAgent === "ALL"
    ? logs
    : logs.filter((l) => l.agent === filterAgent);

  return (
    <div className="w-full bg-base-100 rounded-2xl border border-base-300 shadow-md overflow-hidden font-mono text-xs">
      {/* ── Top Header & Execution Controls ── */}
      <div className="px-5 py-3.5 border-b border-base-300 bg-base-200/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-base-content tracking-tight uppercase">
                Agent Decision Loop & Autonomous Execution Stream
              </span>
              <span className="badge badge-success badge-xs font-mono gap-1">
                <span className="animate-ping">●</span>
                {isRunningCycle ? "SIMULATING..." : "CONTINUOUSLY REHEARSING"}
              </span>
            </div>
            <p className="text-[11px] text-base-content/50 font-sans mt-0.5">
              9 Specialized Decision Agents evaluating constraints, costs, and nearshore playbooks in real time
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulationCycle}
            disabled={isRunningCycle}
            className="btn btn-primary btn-sm gap-1.5 font-mono text-xs shadow-sm"
          >
            {isRunningCycle ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                <span>Running Loop ({pipelineProgress}%)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Re-run Agent Loop</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Visual 9-Agent Horizontal Pipeline ── */}
      <div className="p-4 border-b border-base-300 bg-base-200/20 overflow-x-auto">
        <div className="min-w-[960px]">
          {/* Progress Bar */}
          <div className="w-full bg-base-300 h-1.5 rounded-full mb-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${pipelineProgress}%` }}
            />
          </div>

          {/* 9 Agent Nodes */}
          <div className="grid grid-cols-9 gap-2 text-center">
            {AGENTS_LIST.map((agent, index) => {
              const isFinished = index <= activeAgentIndex;
              const isCurrent = isRunningCycle && index === activeAgentIndex;
              const Icon = agent.icon;

              return (
                <div
                  key={agent.id}
                  onClick={() => setFilterAgent(filterAgent === agent.id ? "ALL" : agent.id)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer select-none ${
                    isCurrent
                      ? "bg-primary/10 border-primary shadow-sm scale-105"
                      : isFinished
                      ? "bg-base-100 border-base-300 hover:border-primary/50"
                      : "bg-base-200/40 border-base-300/60 opacity-50"
                  } ${filterAgent === agent.id ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex justify-center mb-1">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isCurrent
                          ? "bg-primary text-primary-content animate-pulse"
                          : isFinished
                          ? "bg-base-200 text-primary"
                          : "bg-base-300 text-base-content/40"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="font-bold text-[11px] text-base-content truncate">
                    {agent.name}
                  </div>
                  <div className="text-[9px] text-base-content/40 truncate font-sans">
                    {agent.role.split(" ")[0]}
                  </div>
                  <div className="mt-1">
                    <span
                      className={`badge badge-xs font-mono text-[9px] ${
                        isCurrent
                          ? "badge-warning animate-pulse"
                          : isFinished
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {isCurrent ? "RUNNING" : isFinished ? "DONE ✓" : "IDLE"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Live Streaming Terminal Console ── */}
      <div className="p-4 bg-[#14181a] text-[#d6dedc] space-y-2">
        {/* Terminal Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="text-white/60 uppercase tracking-wider text-[10px] font-bold">
              Autonomous Agent Telemetry & Log Console
            </span>
            <span className="text-white/30 text-[10px]">
              Showing {filteredLogs.length} events
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-white/40 text-[10px]">Filter:</span>
            {["ALL", "SENSING", "SCENARIO", "LOGISTICS", "PROCUREMENT", "ORCHESTRATOR"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilterAgent(f)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                    filterAgent === f
                      ? "bg-primary text-primary-content font-bold"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>
        </div>

        {/* Log Entries Container */}
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2 text-[11px] font-mono leading-relaxed hover:bg-white/5 px-1.5 py-1 rounded transition-colors"
            >
              <span className="text-white/30 tabular-data shrink-0 select-none">
                [{log.time}]
              </span>
              <span className={`font-bold shrink-0 w-24 text-left ${log.color}`}>
                {log.agent}
              </span>
              <span className="badge badge-neutral badge-xs font-mono text-[9px] shrink-0 text-white/50 border-white/10">
                {log.level}
              </span>
              <span className="text-white/80 font-sans flex-1">
                {log.message}
              </span>
            </div>
          ))}

          {/* Blinking Machine Cursor */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 pt-1">
            <span className="text-primary animate-pulse">●</span>
            <span className="text-[10px] italic">
              {isRunningCycle
                ? `Agent [${AGENTS_LIST[activeAgentIndex]?.name || "Active"}] computing constraints...`
                : "Continuous loop active — awaiting live corridor telemetry updates..."}
            </span>
            <span className="inline-block w-1.5 h-3 bg-primary animate-pulse ml-0.5" />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
