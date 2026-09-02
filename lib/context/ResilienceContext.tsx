"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { SystemMode, DisruptionSignal, StrategyOption } from "@/lib/types";
import {
  MOCK_SCENARIO_SUITES,
  MockScenarioSuite,
  RehearsalScenario,
  PlanPoint,
  generateDynamicScenariosForSignal,
} from "@/lib/simulation/dynamicScenarios";
import { EnhancedSignal } from "@/lib/signals/multiSource";
import { DynamicNetworkFlow, synthesizeNetworkFlowAndStrategy } from "@/lib/ai/gemini";

export type DataMode = "REAL_TIME" | "MOCK_SCENARIO";

interface ResilienceContextType {
  systemMode: SystemMode;
  setSystemMode: (mode: SystemMode) => void;
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
  networkHealth: number;
  activeScenarioId: string;
  setActiveScenarioId: (id: string) => void;

  // AI-Generated Topology & Flow
  dynamicNetworkFlow: DynamicNetworkFlow | null;
  isAiSynthesizing: boolean;
  refreshAiSimulation: (forceFresh?: boolean) => Promise<void>;

  // Mock Scenario Selection
  activeMockSuite: MockScenarioSuite;
  setActiveMockSuiteId: (id: string) => void;
  availableMockSuites: MockScenarioSuite[];

  // Real-Time Signal Selection
  activeRealTimeSignal: EnhancedSignal | null;
  setActiveRealTimeSignal: (signal: EnhancedSignal) => void;

  // Active Disrupted Chokepoint / Corridor (from OSINT or Digital Twin)
  activeDisruptedCorridor: string | null;

  // Dynamic context getters based on active dataMode
  currentSignal: DisruptionSignal;
  currentScenarios: RehearsalScenario[];
  currentStrategy: StrategyOption;
  currentPlanPoints: PlanPoint[];
  disruptedNodeId: string;

  approvedActions: string[];
  isRecovering: boolean;
  recoveryStep: number;
  triggerLiveDisruption: (customDisruption?: any) => void;
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
  const [activeDisruptedCorridor, setActiveDisruptedCorridor] = useState<string | null>(null);

  // Mock Scenario state
  const [activeMockSuiteId, setActiveMockSuiteId] = useState<string>("MOCK-SHANGHAI");
  const activeMockSuite =
    MOCK_SCENARIO_SUITES.find((s) => s.id === activeMockSuiteId) ||
    MOCK_SCENARIO_SUITES[0];

  // Real-time signal state
  const [activeRealTimeSignal, setActiveRealTimeSignal] = useState<EnhancedSignal | null>(null);

  // Dynamic AI Flow & Strategy State
  const [dynamicNetworkFlow, setDynamicNetworkFlow] = useState<DynamicNetworkFlow | null>(null);
  const [isAiSynthesizing, setIsAiSynthesizing] = useState<boolean>(false);

  // Fetch initial top real-time signal on mount
  useEffect(() => {
    async function initRealTime() {
      try {
        const res = await fetch("/api/sensing?mode=realtime");
        if (res.ok) {
          const data = await res.json();
          if (data.signals && data.signals.length > 0) {
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

  // Dedicated AI simulation fetcher with localStorage caching & hard reload capability
  const refreshAiSimulation = async (forceFresh = false) => {
    setIsAiSynthesizing(true);
    const cacheKey = `GEMINI_SIM_${currentSignal.id || "CUR"}_${currentSignal.location || ""}_${currentSignal.facility || ""}`
      .replace(/[^a-zA-Z0-9_]/g, "_");

    // 1. Check localStorage cache first if not hard reloading
    if (!forceFresh && typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.supplier && parsed.hybridResponse) {
            setDynamicNetworkFlow(parsed);
            setIsAiSynthesizing(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Could not read from localStorage cache:", e);
      }
    }

    // 2. Fetch fresh from server API (with fallback)
    try {
      const res = await fetch("/api/ai/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signal: currentSignal }),
      });

      if (res.ok) {
        const flow = await res.json();
        setDynamicNetworkFlow(flow);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(flow));
          } catch (e) {
            console.warn("Failed to write to localStorage:", e);
          }
        }
      } else {
        const flow = await synthesizeNetworkFlowAndStrategy(currentSignal);
        setDynamicNetworkFlow(flow);
        if (typeof window !== "undefined") {
          localStorage.setItem(cacheKey, JSON.stringify(flow));
        }
      }
    } catch (e) {
      console.error("AI flow synthesis error:", e);
      try {
        const flow = await synthesizeNetworkFlowAndStrategy(currentSignal);
        setDynamicNetworkFlow(flow);
        if (typeof window !== "undefined") {
          localStorage.setItem(cacheKey, JSON.stringify(flow));
        }
      } catch (fallbackErr) {
        console.error("Fallback synthesis error:", fallbackErr);
      }
    } finally {
      setIsAiSynthesizing(false);
    }
  };

  // Synthesize AI Topology and Hybrid Strategy on signal/mode change (checks cache first)
  useEffect(() => {
    refreshAiSimulation(false);
  }, [currentSignal.id, currentSignal.location, currentSignal.facility, dataMode]);

  // Compute current dynamic scenarios
  const currentScenarios: RehearsalScenario[] =
    dataMode === "REAL_TIME" && activeRealTimeSignal
      ? generateDynamicScenariosForSignal(activeRealTimeSignal)
      : activeMockSuite.scenarios;

  // Compute current dynamic strategy (driven by AI in Real-Time mode)
  const currentStrategy: StrategyOption = useMemo(() => {
    if (dataMode === "MOCK_SCENARIO") {
      return {
        id: activeMockSuite.recommendedStrategy.id,
        title: activeMockSuite.recommendedStrategy.title,
        category: "HYBRID_RESPONSE",
        summary: activeMockSuite.recommendedStrategy.summary,
        description: activeMockSuite.recommendedStrategy.summary,
        costINR: 680000,
        costFormatted: activeMockSuite.recommendedStrategy.costFormatted,
        recoveryDays: activeMockSuite.recommendedStrategy.recoveryDays,
        serviceLevelPercent: activeMockSuite.recommendedStrategy.serviceLevelPercent,
        risk: activeMockSuite.recommendedStrategy.risk,
        complianceChecked: true,
        sustainabilityRating: "MEDIUM",
        carbonFootprintKg: 4200,
        score: 92.4,
        autonomyLevel: activeMockSuite.recommendedStrategy.autonomyLevel,
        actions: [
          {
            id: "ACT-101",
            description: "Reallocate 1,500 safety stock units to Midwest staging hub",
            category: "INVENTORY",
            autoExecEligible: true,
            risk: "LOW",
            status: "PENDING",
          },
          {
            id: "ACT-102",
            description: "Reroute affected inbound maritime shipments to secondary transshipment feeder",
            category: "LOGISTICS",
            autoExecEligible: true,
            risk: "LOW",
            status: "PENDING",
          },
          {
            id: "ACT-103",
            description: "Authorize primary production shift and volume commitment to reserve supplier",
            category: "PROCUREMENT",
            autoExecEligible: false,
            risk: "HIGH",
            status: "REQUIRES_APPROVAL",
          },
        ],
        tradeoffRationale: activeMockSuite.recommendedStrategy.tradeoffRationale,
      };
    }

    if (dynamicNetworkFlow) {
      const hr = dynamicNetworkFlow.hybridResponse;
      return {
        id: `STRAT-AI-${currentSignal.id}`,
        title: hr.title,
        category: "HYBRID_RESPONSE",
        summary: hr.summary,
        description: hr.summary,
        costINR: 640000,
        costFormatted: hr.costFormatted,
        recoveryDays: hr.recoveryDays,
        serviceLevelPercent: hr.serviceLevelPercent,
        risk: hr.risk,
        complianceChecked: true,
        sustainabilityRating: "MEDIUM",
        carbonFootprintKg: 3900,
        score: 93.8,
        autonomyLevel: hr.autonomyLevel,
        actions: [
          {
            id: "ACT-101",
            description: hr.planPoints[0]?.action || "Buffer reallocation",
            category: "INVENTORY",
            autoExecEligible: hr.planPoints[0]?.gate === "AUTO_EXECUTE",
            risk: "LOW",
            status: "PENDING",
          },
          {
            id: "ACT-102",
            description: hr.planPoints[1]?.action || "Route bypass",
            category: "LOGISTICS",
            autoExecEligible: hr.planPoints[1]?.gate === "AUTO_EXECUTE",
            risk: "LOW",
            status: "PENDING",
          },
          {
            id: "ACT-103",
            description: hr.planPoints[2]?.action || "Supplier commitment",
            category: "PROCUREMENT",
            autoExecEligible: hr.planPoints[2]?.gate === "AUTO_EXECUTE",
            risk: "HIGH",
            status: "REQUIRES_APPROVAL",
          },
        ],
        tradeoffRationale: hr.tradeoffRationale,
      };
    }

    return {
      id: "STRAT-DEFAULT",
      title: `${currentSignal.location.split(",")[0] || "Corridor"} Bypass & Domestic Surge`,
      category: "HYBRID_RESPONSE",
      summary: `Reroute priority cargo around ${currentSignal.facility} while activating domestic buffer reallocation.`,
      description: `Reroute priority cargo around ${currentSignal.facility} while activating domestic buffer reallocation.`,
      costINR: 680000,
      costFormatted: "₹6.8L",
      recoveryDays: 7,
      serviceLevelPercent: 97,
      risk: "LOW",
      complianceChecked: true,
      sustainabilityRating: "MEDIUM",
      carbonFootprintKg: 4200,
      score: 92.4,
      autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
      actions: [
        {
          id: "ACT-101",
          description: "Reallocate safety stock units to Midwest staging hub",
          category: "INVENTORY",
          autoExecEligible: true,
          risk: "LOW",
          status: "PENDING",
        },
        {
          id: "ACT-102",
          description: "Reroute affected inbound maritime shipments to secondary transshipment feeder",
          category: "LOGISTICS",
          autoExecEligible: true,
          risk: "LOW",
          status: "PENDING",
        },
        {
          id: "ACT-103",
          description: "Authorize primary production shift and volume commitment to reserve supplier",
          category: "PROCUREMENT",
          autoExecEligible: false,
          risk: "HIGH",
          status: "REQUIRES_APPROVAL",
        },
      ],
      tradeoffRationale: `Mitigates ${currentSignal.eventType.replace("_", " ")} shock within capacity constraints, securing 97% delivery SLA.`,
    };
  }, [dataMode, activeMockSuite, dynamicNetworkFlow, currentSignal]);

  // Compute current dynamic plan points (driven by AI in Real-Time mode)
  const currentPlanPoints: PlanPoint[] = useMemo(() => {
    if (dataMode === "MOCK_SCENARIO") {
      return activeMockSuite.recommendedStrategy.planPoints;
    }
    if (dynamicNetworkFlow) {
      return dynamicNetworkFlow.hybridResponse.planPoints;
    }
    return [
      {
        step: 1,
        action: "Buffer Containment: Pre-position Domestic Safety Stock",
        detail: "Transfers 1,500 reserve units across regional distribution hubs to absorb initial lead-time shock.",
        gate: "AUTO_EXECUTE",
        gateLabel: "AUTO EXECUTE",
        agent: "INVENTORY",
      },
      {
        step: 2,
        action: "Corridor Bypass: Reroute Sea-Freight via Alternate Feeder Hub",
        detail: "Shifts container manifests to secondary deepwater feeder ports to bypass primary chokepoint queue.",
        gate: "AUTO_EXECUTE",
        gateLabel: "AUTO EXECUTE",
        agent: "LOGISTICS",
      },
      {
        step: 3,
        action: "Contractual Sourcing Shift: Activate Reserve Supplier Line",
        detail: "Allocates backup component volume with certified nearshore partner to protect OEM delivery SLA.",
        gate: "HUMAN_APPROVAL_REQUIRED",
        gateLabel: "APPROVAL REQUIRED",
        agent: "PROCUREMENT",
      },
    ];
  }, [dataMode, activeMockSuite, dynamicNetworkFlow]);

  const disruptedNodeId =
    dataMode === "REAL_TIME" && activeRealTimeSignal
      ? activeRealTimeSignal.eventType === "TRADE_POLICY"
        ? "CUST-01"
        : activeRealTimeSignal.eventType === "WEATHER_EVENT"
        ? "SHP-8821"
        : "PORT-01"
      : activeMockSuite.disruptedNodeId;

  const triggerLiveDisruption = (customDisruption?: any) => {
    let health = 48;

    if (customDisruption && (customDisruption.id || customDisruption.rawText || customDisruption.title)) {
      // Handles both Signals page EnhancedSignal and OSINT hotspots
      const enhanced: EnhancedSignal = {
        id: customDisruption.id || "SIG-LIVE-ESCALATED",
        timestamp: customDisruption.timestamp || new Date().toISOString(),
        source: customDisruption.source || "External Intelligence Telemetry",
        rawText:
          customDisruption.rawText ||
          customDisruption.summary ||
          `${customDisruption.title || "External shock"} reported. Active supply corridor disruption.`,
        eventType: (customDisruption.eventType as any) || "PORT_DISRUPTION",
        location: customDisruption.location || customDisruption.locationName || "Strategic Maritime Gateway",
        facility: customDisruption.facility || customDisruption.chokePoint || "Active Inbound Corridor",
        expectedDuration:
          customDisruption.expectedDuration ||
          (customDisruption.severity === "CRITICAL" ? 120 : 48),
        durationUnit: customDisruption.durationUnit || "hours",
        severity: (customDisruption.severity as any) || "HIGH",
        confidence: customDisruption.confidence || 0.94,
        validationStatus: "CONFIRMED",
        corroboratingSources: customDisruption.corroboratingSources || 4,
        rehearsalTriggered: true,
        sourceCategory:
          customDisruption.sourceCategory ||
          (customDisruption.category === "PORT"
            ? "Portcast"
            : customDisruption.category === "GEOPOLITICAL"
            ? "gCaptain"
            : "OpenWeather"),
        primaryAgent: customDisruption.primaryAgent || "Sensing",
        isRealTime: true,
      };

      setActiveRealTimeSignal(enhanced);
      setDataMode("REAL_TIME");
      setActiveDisruptedCorridor(
        customDisruption.facility ||
          customDisruption.chokePoint ||
          customDisruption.location ||
          customDisruption.title
      );
      health =
        customDisruption.severity === "CRITICAL"
          ? 36
          : customDisruption.severity === "HIGH"
          ? 44
          : 54;
    } else {
      health = activeMockSuite.initialHealth;
      setActiveDisruptedCorridor("Shanghai Deepwater Corridor");
    }

    setSystemMode("LIVE_DISRUPTION");
    setNetworkHealth(health);
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
    setActiveDisruptedCorridor(null);
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
        activeDisruptedCorridor,
        dynamicNetworkFlow,
        isAiSynthesizing,
        refreshAiSimulation,
        currentSignal,
        currentScenarios,
        currentStrategy,
        currentPlanPoints,
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
