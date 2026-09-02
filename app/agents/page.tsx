"use client";

import React, { useState } from "react";
import {
  Cpu,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Radio,
  FileCheck2,
  DollarSign,
  Leaf,
  Scale,
  GitPullRequest,
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
  const [filter, setFilter] = useState<string>("ALL");

  const agents: AgentDisplay[] = [
    {
      id: "agt-sensing-01",
      name: "SENSING AGENT",
      category: "INTELLIGENCE",
      status: "ACTIVE",
      lastAction: "Ingesting East Asia maritime telemetry & AIS signals",
      timestamp: "17:42:08 UTC",
      itemsProcessed: 148,
      confidence: 0.94,
      icon: Radio,
      metricLabel: "SOURCES MONITORED",
      metricValue: "4 Feeds (Live & Synthetic)",
      logExcerpt: "Detected crane network desync at Yangshan Deepwater Terminal.",
    },
    {
      id: "agt-val-02",
      name: "SIGNAL VALIDATION AGENT",
      category: "INTELLIGENCE",
      status: "COMPLETED",
      lastAction: "Multi-source correlation verification on SIG-02481",
      timestamp: "17:42:10 UTC",
      itemsProcessed: 42,
      confidence: 0.96,
      icon: ShieldCheck,
      metricLabel: "CORROBORATING SOURCES",
      metricValue: "4 Independent Feeds (PASS)",
      logExcerpt: "Golden Rule verified: One article never triggers decision.",
    },
    {
      id: "agt-scen-03",
      name: "SCENARIO AGENT",
      category: "REHEARSAL",
      status: "SIMULATING",
      lastAction: "Simulating 2h, 24h, 7d, and Permanent closure futures",
      timestamp: "17:42:12 UTC",
      itemsProcessed: 43,
      confidence: 0.92,
      icon: Layers,
      metricLabel: "STRESS SCENARIOS",
      metricValue: "43 Permutations Generated",
      logExcerpt: "Matched pre-rehearsed 24-hour Shanghai Port playbook.",
    },
    {
      id: "agt-log-04",
      name: "LOGISTICS AGENT",
      category: "DOMAIN DECISION",
      status: "ACTIVE",
      lastAction: "Evaluated Busan Port transshipment feeder vs air cargo",
      timestamp: "17:42:14 UTC",
      itemsProcessed: 14,
      confidence: 0.95,
      icon: Activity,
      metricLabel: "TRANSIT TIME DELTA",
      metricValue: "+2.0 Days (Feeder Connect)",
      logExcerpt: "Identified Port of Busan feeder berth reservation.",
    },
    {
      id: "agt-inv-05",
      name: "INVENTORY AGENT",
      category: "DOMAIN DECISION",
      status: "ACTIVE",
      lastAction: "Calculated inter-facility transfer from Texas to Chicago",
      timestamp: "17:42:15 UTC",
      itemsProcessed: 28,
      confidence: 0.98,
      icon: Cpu,
      metricLabel: "REDISTRIBUTION UNITS",
      metricValue: "1,500 Units (Auto-Eligible)",
      logExcerpt: "Texas buffer has 31.5d surplus; safe to reallocate.",
    },
    {
      id: "agt-proc-06",
      name: "PROCUREMENT AGENT",
      category: "DOMAIN DECISION",
      status: "REQUIRES_APPROVAL",
      lastAction: "Qualified reserve capacity shift to Midwest Semi (Detroit)",
      timestamp: "17:42:16 UTC",
      itemsProcessed: 8,
      confidence: 0.93,
      icon: GitPullRequest,
      metricLabel: "RESERVE CAPACITY",
      metricValue: "8,000 Units/mo Qualified",
      logExcerpt: "Contract shift requires ₹6.8L; routed to human gate.",
    },
    {
      id: "agt-fin-07",
      name: "FINANCE AGENT",
      category: "EVALUATION",
      status: "COMPLETED",
      lastAction: "Quantified ₹18.7 Cr revenue risk vs ₹6.8L recovery cost",
      timestamp: "17:42:17 UTC",
      itemsProcessed: 32,
      confidence: 0.99,
      icon: DollarSign,
      metricLabel: "MITIGATION ROI",
      metricValue: "27.5x Capital Preservation",
      logExcerpt: "Financial viability confirmed: ₹6.8L cost vs ₹18.7 Cr exposure.",
    },
    {
      id: "agt-sust-08",
      name: "SUSTAINABILITY AGENT",
      category: "EVALUATION",
      status: "COMPLETED",
      lastAction: "Audited air freight (+480% CO2) vs maritime/road footprint",
      timestamp: "17:42:18 UTC",
      itemsProcessed: 18,
      confidence: 0.94,
      icon: Leaf,
      metricLabel: "SCOPE 3 LOGISTICS CO2",
      metricValue: "4,200 kg (Medium Acceptable)",
      logExcerpt: "Charter air uplift rejected on carbon ceiling breach.",
    },
    {
      id: "agt-comp-09",
      name: "COMPLIANCE AGENT",
      category: "EVALUATION",
      status: "COMPLETED",
      lastAction: "Audited USMCA rules of origin and Section 301 tariffs",
      timestamp: "17:42:19 UTC",
      itemsProcessed: 22,
      confidence: 1.0,
      icon: Scale,
      metricLabel: "REGULATORY COMPLIANCE",
      metricValue: "0 Hard Violations (PASS)",
      logExcerpt: "USMCA Regional Content verified: 78.4% passing.",
    },
  ];

  const statusColors = {
    ACTIVE: "text-[#73B58A] bg-[#122117] border-[#244931]",
    SIMULATING: "text-[#62B8C8] bg-[#112226] border-[#234E57]",
    COMPLETED: "text-[#E8E5DD] bg-[#171B1D] border-[#292E2F]",
    REQUIRES_APPROVAL: "text-[#D6A84F] bg-[#241D12] border-[#544121]",
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto w-full font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292E2F] pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] tracking-widest text-[#62B8C8] bg-[#112226] border border-[#234E57] px-2 py-0.5">
              AGENTIC COGNITIVE ARCHITECTURE
            </span>
            <span className="text-xs text-[#5F6564]">
              9 SPECIALIZED PROCESSES + CENTRAL ORCHESTRATOR
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#E8E5DD] tracking-tight mt-1">
            Operational Agent Machines & Real-Time Telemetry
          </h1>
        </div>

        <div className="text-xs text-[#9A9C97] font-sans max-w-sm">
          "Agents are structured operational machine processes with deterministic inputs, not chatbot personas or avatars."
        </div>
      </div>

      {/* Orchestrator Funnel Banner */}
      <div className="border border-[#292E2F] bg-[#111416] p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#1C2123] mb-3 text-xs gap-2">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-[#62B8C8]" />
            <span className="text-[#E8E5DD] font-bold uppercase tracking-wider">
              CENTRAL ORCHESTRATOR DETERMINISTIC EVALUATION FUNNEL
            </span>
          </div>
          <span className="text-[#D6A84F]">STATUS: SYNCHRONIZED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="bg-[#171B1D] border border-[#292E2F] p-2.5">
            <span className="text-[#5F6564] text-[10px] block">1. GENERATED</span>
            <span className="text-base font-bold text-[#E8E5DD]">43 Scenarios</span>
            <span className="text-[10px] text-[#5F6564] block mt-0.5">Scenario Agent</span>
          </div>
          <div className="bg-[#171B1D] border border-[#292E2F] p-2.5">
            <span className="text-[#5F6564] text-[10px] block">2. FEASIBLE</span>
            <span className="text-base font-bold text-[#62B8C8]">18 Physically</span>
            <span className="text-[10px] text-[#5F6564] block mt-0.5">Logistics & Supply</span>
          </div>
          <div className="bg-[#171B1D] border border-[#292E2F] p-2.5">
            <span className="text-[#5F6564] text-[10px] block">3. COMPLIANT</span>
            <span className="text-base font-bold text-[#73B58A]">11 Trade Clean</span>
            <span className="text-[10px] text-[#5F6564] block mt-0.5">Compliance Agent</span>
          </div>
          <div className="bg-[#171B1D] border border-[#292E2F] p-2.5">
            <span className="text-[#5F6564] text-[10px] block">4. FINANCIALLY VIABLE</span>
            <span className="text-base font-bold text-[#D6A84F]">6 Positive ROI</span>
            <span className="text-[10px] text-[#5F6564] block mt-0.5">Finance Agent</span>
          </div>
          <div className="bg-[#171B1D] border border-[#292E2F] p-2.5">
            <span className="text-[#5F6564] text-[10px] block">5. RESILIENT CANDIDATES</span>
            <span className="text-base font-bold text-[#E8E5DD]">3 Playbooks</span>
            <span className="text-[10px] text-[#5F6564] block mt-0.5">Sustainability Check</span>
          </div>
          <div className="bg-[#171B1D] border border-[#62B8C8] p-2.5">
            <span className="text-[#62B8C8] text-[10px] block font-bold">6. NEXT-BEST ACTION</span>
            <span className="text-base font-bold text-[#62B8C8]">1 Selected</span>
            <span className="text-[10px] text-[#62B8C8] block mt-0.5">Hybrid Response</span>
          </div>
        </div>
      </div>

      {/* 9 Agents Operational Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agt) => {
          const Icon = agt.icon;
          return (
            <div
              key={agt.id}
              className="border border-[#292E2F] bg-[#111416] p-3.5 flex flex-col justify-between hover:border-[#414A4D] transition-colors tech-mark-corner"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] mb-2.5 text-xs">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-[#9A9C97]" />
                    <span className="text-[#E8E5DD] font-bold">{agt.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 border font-semibold ${
                      statusColors[agt.status]
                    }`}
                  >
                    {agt.status}
                  </span>
                </div>

                {/* Subtitle / Last Action */}
                <div className="text-[11px] text-[#5F6564] mb-1">
                  LAST ACTION: {agt.timestamp}
                </div>
                <div className="text-xs font-sans text-[#E8E5DD] mb-3">
                  {agt.lastAction}
                </div>

                {/* Key Metric Box */}
                <div className="bg-[#171B1D] border border-[#292E2F] p-2.5 mb-3 text-xs">
                  <span className="text-[#5F6564] text-[10px] block uppercase">
                    {agt.metricLabel}
                  </span>
                  <span className="text-sm font-bold text-[#62B8C8]">
                    {agt.metricValue}
                  </span>
                </div>
              </div>

              {/* Log Snippet & Confidence */}
              <div className="pt-2 border-t border-[#1C2123] text-[10px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#5F6564]">CONFIDENCE SCORE:</span>
                  <span className="text-[#73B58A] font-bold">{(agt.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="text-[#9A9C97] font-mono truncate">
                  LOG: "{agt.logExcerpt}"
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
