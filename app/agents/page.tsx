"use client";

import React from "react";
import {
  Cpu,
  Activity,
  ShieldCheck,
  Radio,
  DollarSign,
  Leaf,
  Scale,
  GitPullRequest,
  Layers,
} from "lucide-react";

interface AgentDisplay {
  id: string;
  name: string;
  category: string;
  status: "ACTIVE" | "SIMULATING" | "COMPLETED" | "REQUIRES_APPROVAL";
  lastAction: string;
  timestamp: string;
  itemsProcessed: number;
  confidence: number;
  icon: any;
  metricLabel: string;
  metricValue: string;
  logExcerpt: string;
}

export default function AgentsPage() {
  const agents: AgentDisplay[] = [
    { id: "agt-sensing-01", name: "Sensing Agent", category: "INTELLIGENCE", status: "ACTIVE", lastAction: "Ingesting East Asia maritime telemetry & AIS signals", timestamp: "17:42:08 UTC", itemsProcessed: 148, confidence: 0.94, icon: Radio, metricLabel: "SOURCES MONITORED", metricValue: "4 Feeds (Live & Synthetic)", logExcerpt: "Detected crane network desync at Yangshan Deepwater Terminal." },
    { id: "agt-val-02", name: "Signal Validation Agent", category: "INTELLIGENCE", status: "COMPLETED", lastAction: "Multi-source correlation verification on SIG-02481", timestamp: "17:42:10 UTC", itemsProcessed: 42, confidence: 0.96, icon: ShieldCheck, metricLabel: "CORROBORATING SOURCES", metricValue: "4 Independent Feeds (PASS)", logExcerpt: "Golden Rule verified: One article never triggers decision." },
    { id: "agt-scen-03", name: "Scenario Agent", category: "REHEARSAL", status: "SIMULATING", lastAction: "Simulating 2h, 24h, 7d, and Permanent closure futures", timestamp: "17:42:12 UTC", itemsProcessed: 43, confidence: 0.92, icon: Layers, metricLabel: "STRESS SCENARIOS", metricValue: "43 Permutations Generated", logExcerpt: "Matched pre-rehearsed 24-hour Shanghai Port playbook." },
    { id: "agt-log-04", name: "Logistics Agent", category: "DOMAIN DECISION", status: "ACTIVE", lastAction: "Evaluated Busan Port transshipment feeder vs air cargo", timestamp: "17:42:14 UTC", itemsProcessed: 14, confidence: 0.95, icon: Activity, metricLabel: "TRANSIT TIME DELTA", metricValue: "+2.0 Days (Feeder Connect)", logExcerpt: "Identified Port of Busan feeder berth reservation." },
    { id: "agt-inv-05", name: "Inventory Agent", category: "DOMAIN DECISION", status: "ACTIVE", lastAction: "Calculated inter-facility transfer from Texas to Chicago", timestamp: "17:42:15 UTC", itemsProcessed: 28, confidence: 0.98, icon: Cpu, metricLabel: "REDISTRIBUTION UNITS", metricValue: "1,500 Units (Auto-Eligible)", logExcerpt: "Texas buffer has 31.5d surplus; safe to reallocate." },
    { id: "agt-proc-06", name: "Procurement Agent", category: "DOMAIN DECISION", status: "REQUIRES_APPROVAL", lastAction: "Qualified reserve capacity shift to Midwest Semi (Detroit)", timestamp: "17:42:16 UTC", itemsProcessed: 8, confidence: 0.93, icon: GitPullRequest, metricLabel: "RESERVE CAPACITY", metricValue: "8,000 Units/mo Qualified", logExcerpt: "Contract shift requires ₹6.8L; routed to human gate." },
    { id: "agt-fin-07", name: "Finance Agent", category: "EVALUATION", status: "COMPLETED", lastAction: "Quantified ₹18.7 Cr revenue risk vs ₹6.8L recovery cost", timestamp: "17:42:17 UTC", itemsProcessed: 32, confidence: 0.99, icon: DollarSign, metricLabel: "MITIGATION ROI", metricValue: "27.5x Capital Preservation", logExcerpt: "Financial viability confirmed: ₹6.8L cost vs ₹18.7 Cr exposure." },
    { id: "agt-sust-08", name: "Sustainability Agent", category: "EVALUATION", status: "COMPLETED", lastAction: "Audited air freight (+480% CO2) vs maritime/road footprint", timestamp: "17:42:18 UTC", itemsProcessed: 18, confidence: 0.94, icon: Leaf, metricLabel: "SCOPE 3 LOGISTICS CO2", metricValue: "4,200 kg (Medium Acceptable)", logExcerpt: "Charter air uplift rejected on carbon ceiling breach." },
    { id: "agt-comp-09", name: "Compliance Agent", category: "EVALUATION", status: "COMPLETED", lastAction: "Audited USMCA rules of origin and Section 301 tariffs", timestamp: "17:42:19 UTC", itemsProcessed: 22, confidence: 1.0, icon: Scale, metricLabel: "REGULATORY COMPLIANCE", metricValue: "0 Hard Violations (PASS)", logExcerpt: "USMCA Regional Content verified: 78.4% passing." },
  ];

  const statusBadge: Record<string, string> = {
    ACTIVE: "badge-success",
    SIMULATING: "badge-info",
    COMPLETED: "badge-ghost",
    REQUIRES_APPROVAL: "badge-warning",
  };

  const funnelSteps = [
    { label: "Generated", value: "43", desc: "Scenario Agent", color: "text-base-content" },
    { label: "Feasible", value: "18", desc: "Logistics", color: "text-info" },
    { label: "Compliant", value: "11", desc: "Compliance", color: "text-success" },
    { label: "Viable", value: "6", desc: "Finance", color: "text-warning" },
    { label: "Resilient", value: "3", desc: "Sustainability", color: "text-base-content" },
    { label: "Selected", value: "1", desc: "Hybrid Response", color: "text-primary" },
  ];

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-[1720px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-primary badge-sm font-mono">AGENTIC ARCHITECTURE</span>
            <span className="text-xs text-base-content/40 font-mono">9 PROCESSES + ORCHESTRATOR</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-base-content tracking-tight">
            Operational Agent Machines & Real-Time Telemetry
          </h1>
        </div>
        <p className="text-xs text-base-content/40 max-w-sm italic">
          "Agents are structured operational machine processes with deterministic inputs, not chatbot personas."
        </p>
      </div>

      {/* Orchestrator Funnel */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-4 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-bold uppercase">Orchestrator Evaluation Funnel</span>
            </div>
            <span className="badge badge-accent badge-sm font-mono">SYNCHRONIZED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {funnelSteps.map((step, i) => (
              <div key={i} className={`bg-base-200 rounded-xl p-3 ${i === funnelSteps.length - 1 ? "ring-1 ring-primary" : ""}`}>
                <span className="text-[10px] font-mono text-base-content/35 block uppercase">{i + 1}. {step.label}</span>
                <span className={`text-lg font-bold ${step.color} tabular-data`}>{step.value}</span>
                <span className="text-[10px] text-base-content/30 block">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agt) => {
          const Icon = agt.icon;
          return (
            <div key={agt.id} className="card bg-base-100 border border-base-300 hover:shadow-md transition-all">
              <div className="card-body p-4 gap-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-base-200">
                      <Icon className="w-4 h-4 text-base-content/50" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-base-content block">{agt.name}</span>
                      <span className="text-[10px] font-mono text-base-content/30">{agt.category}</span>
                    </div>
                  </div>
                  <span className={`badge badge-sm ${statusBadge[agt.status]} font-mono`}>
                    {agt.status === "SIMULATING" && <span className="loading loading-dots loading-xs mr-1" />}
                    {agt.status.replace("_", " ")}
                  </span>
                </div>

                {/* Last Action */}
                <div>
                  <span className="text-[10px] font-mono text-base-content/30">{agt.timestamp}</span>
                  <p className="text-xs text-base-content/60 mt-0.5">{agt.lastAction}</p>
                </div>

                {/* Key Metric */}
                <div className="bg-base-200 rounded-lg p-2.5">
                  <span className="text-[10px] font-mono text-base-content/30 block uppercase">{agt.metricLabel}</span>
                  <span className="text-sm font-bold text-primary">{agt.metricValue}</span>
                </div>

                {/* Footer */}
                <div className="divider my-0" />
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-base-content/30">Confidence</span>
                  <span className="text-success font-bold">{(agt.confidence * 100).toFixed(0)}%</span>
                </div>
                <p className="text-[10px] text-base-content/30 truncate font-mono">
                  "{agt.logExcerpt}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
