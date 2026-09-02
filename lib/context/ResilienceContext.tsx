"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SystemMode, DisruptionSignal, StrategyOption } from "@/lib/types";
import strategiesData from "@/data/strategies.json";
import eventsData from "@/data/events.json";

interface ResilienceContextType {
  systemMode: SystemMode;
  setSystemMode: (mode: SystemMode) => void;
  networkHealth: number;
  activeScenarioId: string;
  setActiveScenarioId: (id: string) => void;
  activeDisruptionSignal: DisruptionSignal;
  selectedStrategy: StrategyOption;
  approvedActions: string[];
  isRecovering: boolean;
  recoveryStep: number;
  triggerLiveDisruption: () => void;
  resetToRehearsal: () => void;
  executeRecovery: () => void;
}

const defaultSignal = eventsData[0] as DisruptionSignal;
const defaultStrategy = strategiesData[0] as StrategyOption;

const ResilienceContext = createContext<ResilienceContextType | undefined>(undefined);

export function ResilienceProvider({ children }: { children: React.ReactNode }) {
  const [systemMode, setSystemMode] = useState<SystemMode>("REHEARSAL");
  const [networkHealth, setNetworkHealth] = useState<number>(97);
  const [activeScenarioId, setActiveScenarioId] = useState<string>("SCEN-2H");
  const [approvedActions, setApprovedActions] = useState<string[]>([]);
  const [isRecovering, setIsRecovering] = useState<boolean>(false);
  const [recoveryStep, setRecoveryStep] = useState<number>(0);

  // When live disruption is triggered, drop network health to 48%
  const triggerLiveDisruption = () => {
    setSystemMode("LIVE_DISRUPTION");
    setNetworkHealth(48);
    setActiveScenarioId("SCEN-24H");
    setApprovedActions([]);
    setIsRecovering(false);
    setRecoveryStep(0);
  };

  const resetToRehearsal = () => {
    setSystemMode("REHEARSAL");
    setNetworkHealth(97);
    setActiveScenarioId("SCEN-2H");
    setApprovedActions([]);
    setIsRecovering(false);
    setRecoveryStep(0);
  };

  const executeRecovery = () => {
    setIsRecovering(true);
    setSystemMode("EXECUTING");
    setApprovedActions(["ACT-101", "ACT-102", "ACT-103", "ACT-104"]);

    // Sequence the health recovery animation: 48% -> 67% -> 84% -> 96%
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
        networkHealth,
        activeScenarioId,
        setActiveScenarioId,
        activeDisruptionSignal: defaultSignal,
        selectedStrategy: defaultStrategy,
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
