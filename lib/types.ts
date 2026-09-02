/**
 * Resilience Autopilot - Core Type Definitions
 * Industrial Mission Control × Financial Terminal Architecture
 */

export type Severity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type SystemMode = "REHEARSAL" | "LIVE_DISRUPTION" | "EXECUTING" | "RECOVERED";

export type RiskClassification = "LOW" | "HIGH";

export type AutonomyLevel = "AUTO_EXECUTE" | "HUMAN_APPROVAL_REQUIRED";

export type AgentStatus = "ACTIVE" | "SIMULATING" | "WAITING" | "COMPLETED" | "BLOCKED" | "REQUIRES_APPROVAL";

export interface SignalSource {
  id: string;
  name: string;
  type: "RSS" | "MARITIME_API" | "WEATHER" | "GOV_REGULATORY" | "SYNTHETIC_MOCK";
  lastPing: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  credibilityScore: number; // 0 - 1.0
}

export interface DisruptionSignal {
  id: string; // e.g., "SIG-02481"
  timestamp: string;
  source: string;
  rawText: string;
  eventType: "PORT_DISRUPTION" | "TRADE_POLICY" | "SUPPLIER_FORCE_MAJEURE" | "WEATHER_EVENT" | "GEOPOLITICAL";
  location: string;
  facility: string;
  expectedDuration: number;
  durationUnit: "hours" | "days";
  severity: Severity;
  confidence: number; // 0.0 to 1.0
  validationStatus: "PENDING" | "CORRELATED" | "CONFIRMED" | "REJECTED";
  corroboratingSources: number;
  rehearsalTriggered: boolean;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: "SUPPLIER" | "PORT" | "SHIPMENT" | "PLANT" | "INVENTORY" | "CUSTOMER";
  location: string;
  status: "HEALTHY" | "AT_RISK" | "DISRUPTED" | "RECOVERED";
  healthScore: number; // 0 to 100
  capacityUtilization: number; // 0 to 100%
  throughputRate: string;
  daysOfInventory: number;
  financialExposure: number; // INR in Crores
  dependencies: string[]; // parent node IDs
  coordinates: { x: number; y: number };
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  mode: "SEA" | "AIR" | "ROAD" | "RAIL";
  transitDays: number;
  costPerUnit: number;
  co2PerUnitKg: number;
  status: "ACTIVE" | "CONGESTED" | "BLOCKED" | "REROUTED";
  activeShipmentCount: number;
}

export interface ScenarioHorizon {
  id: string;
  durationHours: number;
  label: string; // e.g. "2 HOURS", "24 HOURS", "7 DAYS", "PERMANENT"
  closureProbability: number;
  affectedShipments: number;
  revenueExposure: number; // in INR Crores
  inventoryDaysRemaining: number;
  serviceLevelImpact: number; // e.g., 97 -> 62%
  recoveryTimeDays: number;
  compoundRisks: {
    alternatePortCongestion: boolean;
    supplierShortage: boolean;
    demandSpike: boolean;
  };
  narrative: string;
}

export interface StrategyOption {
  id: string;
  title: string;
  category: "HYBRID_RESPONSE" | "AIR_EXPEDITE" | "SECONDARY_PORT_REROUTE" | "LOCAL_SOURCING_SHIFT" | "STATUS_QUO";
  summary: string;
  description: string;
  costINR: number; // in Rupees
  costFormatted: string; // e.g. "₹6.8L"
  recoveryDays: number;
  serviceLevelPercent: number; // e.g., 97
  risk: RiskClassification;
  complianceChecked: boolean;
  sustainabilityRating: "HIGH" | "MEDIUM" | "LOW" | "POOR";
  carbonFootprintKg: number;
  score: number; // 0 - 100
  autonomyLevel: AutonomyLevel;
  actions: {
    id: string;
    description: string;
    category: "LOGISTICS" | "INVENTORY" | "PROCUREMENT" | "COMPLIANCE";
    risk: RiskClassification;
    status: "PENDING" | "EXECUTING" | "EXECUTED" | "REQUIRES_APPROVAL";
    autoExecEligible: boolean;
  }[];
  tradeoffRationale: string;
}

export interface AgentTelemetry {
  id: string;
  name: string;
  code: "SENSING" | "VALIDATION" | "SCENARIO" | "LOGISTICS" | "INVENTORY" | "PROCUREMENT" | "FINANCE" | "SUSTAINABILITY" | "COMPLIANCE" | "ORCHESTRATOR";
  status: AgentStatus;
  lastAction: string;
  lastActiveTimestamp: string;
  itemsProcessed: number;
  confidenceScore: number;
  metrics: Record<string, string | number>;
  latestLogs: {
    timestamp: string;
    level: "INFO" | "WARN" | "CRITICAL";
    message: string;
  }[];
}

export interface ResilienceControlState {
  systemMode: SystemMode;
  networkHealth: number; // 0 to 100
  activeRisksCount: number;
  totalRevenueExposureINR: string; // e.g. "₹18.7 Cr"
  inventoryAtRiskLocations: number;
  recoveryReadinessPercent: number;
  activeDisruptionSignal: DisruptionSignal | null;
  activeScenarioId: string;
  selectedStrategy: StrategyOption | null;
  executedActions: string[];
  executionSteps: {
    title: string;
    agent: string;
    status: "QUEUED" | "RUNNING" | "DONE" | "HOLD";
    risk: RiskClassification;
  }[];
}
