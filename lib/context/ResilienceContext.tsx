"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SystemMode, DisruptionSignal, StrategyOption } from "@/lib/types";
import {
  MOCK_SCENARIO_SUITES,
  MockScenarioSuite,
  RehearsalScenario,
  generateDynamicScenariosForSignal,
} from "@/lib/simulation/dynamicScenarios";
import { EnhancedSignal } from "@/lib/signals/multiSource";

export type DataMode = "REAL_TIME" | "MOCK_SCENARIO";

interface ResilienceContextType {
  systemMode: SystemMode;
  setSystemMode: (mode: SystemMode) => void;
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
  networkHealth: number;
  activeScenarioId: string;
  setActiveScenarioId: (id: string) => void;

  // Mock Scenario Selection
  activeMockSuite: MockScenarioSuite;
  setActiveMockSuiteId: (id: string) => void;
  availableMockSuites: MockScenarioSuite[];

  // Real-Time Signal Selection
  activeRealTimeSignal: EnhancedSignal | null;
  setActiveRealTimeSignal: (signal: EnhancedSignal) => void;

  // Dynamic context getters based on active dataMode
  currentSignal: DisruptionSignal;
  currentScenarios: RehearsalScenario[];
  currentStrategy: StrategyOption;
  disruptedNodeId: string;

  approvedActions: string[];
  isRecovering: boolean;
  recoveryStep: number;
  triggerLiveDisruption: () => void;
  resetToRehearsal: () => void;
  executeRecovery: () => void;
}

const ResilienceContext = createContext<ResilienceContextType | undefined>(undefined);

export function ResilienceProvider({ children }: { children: React.ReactNode }) {
  const [systemMode, setSystemMode] = useState<SystemMode>("REHEARSAL");
  const [dataMode, setDataMode] = useState<DataMode>("REAL_TIME");
  const [networkHealth, setNetworkHealth] = useState<number>(97);
  const [activeScenarioId, setActiveScenarioId] = useState<string>("SCEN-24H");
  const [approvedActions, setApprovedActions] = useState<string[]>([]);
  const [isRecovering, setIsRecovering] = useState<boolean>(false);
  const [recoveryStep, setRecoveryStep] = useState<number>(0);

  // Mock Scenario state
  const [activeMockSuiteId, setActiveMockSuiteId] = useState<string>("MOCK-SHANGHAI");
  const activeMockSuite =
    MOCK_SCENARIO_SUITES.find((s) => s.id === activeMockSuiteId) ||
    MOCK_SCENARIO_SUITES[0];

  // Real-time signal state
  const [activeRealTimeSignal, setActiveRealTimeSignal] = useState<EnhancedSignal | null>(null);

  // Fetch initial top real-time signal on mount
  useEffect(() => {
    async function initRealTime() {
      try {
        const res = await fetch("/api/sensing?mode=realtime");
        if (res.ok) {
          const data = await res.json();
          if (data.signals && data.signals.length > 0) {
            // Find the top real external signal (e.g. gCaptain or Federal Register)
            const realSig = data.signals.find((s: EnhancedSignal) => s.isRealTime) || data.signals[0];
            setActiveRealTimeSignal(realSig);
          }
        }
      } catch (e) {
        console.error("Failed to init real-time signals:", e);
      }
    }
    initRealTime();
  }, []);

  // Compute current dynamic signal
  const currentSignal: DisruptionSignal =
    dataMode === "REAL_TIME" && activeRealTimeSignal
      ? activeRealTimeSignal
      : activeMockSuite.signal;

  // Compute current dynamic scenarios
  const currentScenarios: RehearsalScenario[] =
    dataMode === "REAL_TIME" && activeRealTimeSignal
      ? generateDynamicScenariosForSignal(activeRealTimeSignal)
      : activeMockSuite.scenarios;

  // Compute current dynamic strategy
  const currentStrategy: StrategyOption = {
    id: activeMockSuite.recommendedStrategy.id,
    title: activeMockSuite.recommendedStrategy.title,
    category: "HYBRID_RESPONSE",
    summary: activeMockSuite.recommendedStrategy.summary,
    description: activeMockSuite.recommendedStrategy.summary,
    costFormatted: activeMockSuite.recommendedStrategy.costFormatted,
    recoveryDays: activeMockSuite.recommendedStrategy.recoveryDays,
    serviceLevelPercent: activeMockSuite.recommendedStrategy.serviceLevelPercent,
    risk: activeMockSuite.recommendedStrategy.risk,
    complianceStatus: "PASS",
    sustainabilityRating: "MEDIUM",
    score: 92.4,
    autonomyLevel: activeMockSuite.recommendedStrategy.autonomyLevel,
    actions: [
      {
        id: "ACT-101",
        description: "Reallocate 1,500 safety stock units to Midwest staging hub",
        agent: "inventory",
        autoExecEligible: true,
        risk: "LOW",
        cost: 45000,
        leadTimeHours: 12,
      },
      {
        id: "ACT-102",
        description: "Reroute affected inbound maritime shipments to secondary transshipment feeder",
        agent: "logistics",
        autoExecEligible: true,
        risk: "LOW",
        cost: 120000,
        leadTimeHours: 24,
      },
      {
        id: "ACT-103",
        description: "Authorize primary production shift and volume commitment to reserve supplier",
        agent: "procurement",
        autoExecEligible: false,
        risk: "HIGH",
        cost: 680000,
        leadTimeHours: 48,
      },
    ],
    tradeoffRationale: activeMockSuite.recommendedStrategy.tradeoffRationale,
  };

  const disruptedNodeId =
    dataMode === "REAL_TIME" && activeRealTimeSignal
      ? activeRealTimeSignal.eventType === "TRADE_POLICY"
        ? "CUST-01"
        : activeRealTimeSignal.eventType === "WEATHER_EVENT"
        ? "SHP-8821"
        : "PORT-01"
      : activeMockSuite.disruptedNodeId;

  const triggerLiveDisruption = () => {
    setSystemMode("LIVE_DISRUPTION");
    setNetworkHealth(activeMockSuite.initialHealth);
    setActiveScenarioId("SCEN-24H");
    setApprovedActions([]);
    setIsRecovering(false);
    setRecoveryStep(0);
  };

  const resetToRehearsal = () => {
    setSystemMode("REHEARSAL");
    setNetworkHealth(97);
    setActiveScenarioId("SCEN-24H");
    setApprovedActions([]);
    setIsRecovering(false);
    setRecoveryStep(0);
  };

  const executeRecovery = () => {
    setIsRecovering(true);
    setSystemMode("EXECUTING");
    setApprovedActions(["ACT-101", "ACT-102", "ACT-103"]);

    setTimeout(() => {
      setNetworkHealth(67);
      setRecoveryStep(1);
    }, 1200);

    setTimeout(() => {
      setNetworkHealth(84);
      setRecoveryStep(2);
    }, 2400);

    setTimeout(() => {
      setNetworkHealth(96);
      setRecoveryStep(3);
      setSystemMode("RECOVERED");
      setIsRecovering(false);
    }, 3800);
  };

  return (
    <ResilienceContext.Provider
      value={{
        systemMode,
        setSystemMode,
        dataMode,
        setDataMode,
        networkHealth,
        activeScenarioId,
        setActiveScenarioId,
        activeMockSuite,
        setActiveMockSuiteId,
        availableMockSuites: MOCK_SCENARIO_SUITES,
        activeRealTimeSignal,
        setActiveRealTimeSignal,
        currentSignal,
        currentScenarios,
        currentStrategy,
        disruptedNodeId,
        approvedActions,
        isRecovering,
        recoveryStep,
        triggerLiveDisruption,
        resetToRehearsal,
        executeRecovery,
      }}
    >
      {children}
    </ResilienceContext.Provider>
  );
}

export function useResilience() {
  const context = useContext(ResilienceContext);
  if (!context) {
    throw new Error("useResilience must be used within a ResilienceProvider");
  }
  return context;
}
