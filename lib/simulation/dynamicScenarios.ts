import { DisruptionSignal } from "@/lib/types";

export interface RehearsalScenario {
  id: string;
  durationHours: number;
  label: "2 HOURS" | "24 HOURS" | "7 DAYS" | "PERMANENT";
  closureProbability: number;
  affectedShipments: number;
  revenueExposure: number;
  inventoryDaysRemaining: number;
  serviceLevelImpact: number;
  recoveryTimeDays: number;
  compoundRisks: {
    alternatePortCongestion: boolean;
    supplierShortage: boolean;
    demandSpike: boolean;
  };
  narrative: string;
  preparedPlaybook: string;
}

export interface MockScenarioSuite {
  id: string;
  title: string;
  category: "PORT" | "INVENTORY_DESTROYED" | "SUPPLIER_OUTAGE" | "WEATHER_DISASTER";
  signal: DisruptionSignal;
  scenarios: RehearsalScenario[];
  recommendedStrategy: {
    id: string;
    title: string;
    summary: string;
    costFormatted: string;
    recoveryDays: number;
    serviceLevelPercent: number;
    risk: "LOW" | "HIGH";
    autonomyLevel: "AUTO_EXECUTE" | "HUMAN_APPROVAL_REQUIRED";
    tradeoffRationale: string;
  };
  initialHealth: number;
  disruptedNodeId: string;
  disruptedNodeLabel: string;
}

/**
 * Multiple Rich Benchmark Test Scenarios for Mock Mode
 * 1. Shanghai Port Berth Automation Stoppage (Gateway Disruption)
 * 2. Detroit Staging Hub Catastrophic Fire (Inventory Destroyed)
 * 3. Taiwan Semiconductor Fab Outage (Supplier Force Majeure)
 * 4. Trans-Pacific Category 5 Super Typhoon (Weather / In-Transit)
 */
export const MOCK_SCENARIO_SUITES: MockScenarioSuite[] = [
  {
    id: "MOCK-SHANGHAI",
    title: "Shanghai Port — 2h Berthing Stoppage",
    category: "PORT",
    initialHealth: 48,
    disruptedNodeId: "PORT-01",
    disruptedNodeLabel: "Port of Shanghai (CNSHG)",
    signal: {
      id: "SIG-02481",
      timestamp: new Date().toISOString(),
      source: "East Asia Maritime Bureau Telemetry",
      rawText: "Urgent advisory: Port of Shanghai Yangshan Terminal reports technical crane network desynchronization and tidal berth lock. Stalled vessel Ever Vanguard expected to clear within evening window.",
      eventType: "PORT_DISRUPTION",
      location: "Shanghai, China (CNSHG)",
      facility: "Yangshan Deepwater Container Terminal",
      expectedDuration: 2,
      durationUnit: "hours",
      severity: "MODERATE",
      confidence: 0.84,
      validationStatus: "CONFIRMED",
      corroboratingSources: 4,
      rehearsalTriggered: true,
    },
    scenarios: [
      {
        id: "SCEN-2H",
        durationHours: 2,
        label: "2 HOURS",
        closureProbability: 0.88,
        affectedShipments: 1,
        revenueExposure: 0.4,
        inventoryDaysRemaining: 6.2,
        serviceLevelImpact: 99.1,
        recoveryTimeDays: 1,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: false, demandSpike: false },
        narrative: "Tidal crane delay at Yangshan terminal. Stalled vessel Ever Vanguard cleared without assembly line stoppage.",
        preparedPlaybook: "Standard Port Delay Buffer Absorption",
      },
      {
        id: "SCEN-24H",
        durationHours: 24,
        label: "24 HOURS",
        closureProbability: 0.54,
        affectedShipments: 3,
        revenueExposure: 3.2,
        inventoryDaysRemaining: 5.1,
        serviceLevelImpact: 96.4,
        recoveryTimeDays: 4,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: false, demandSpike: false },
        narrative: "Demurrage extends into full day. Chicago warehouse buffers drop to 5.1 days; inventory redistribution auto-executes.",
        preparedPlaybook: "Inter-Facility Inventory Rebalancing",
      },
      {
        id: "SCEN-7D",
        durationHours: 168,
        label: "7 DAYS",
        closureProbability: 0.28,
        affectedShipments: 9,
        revenueExposure: 18.7,
        inventoryDaysRemaining: 1.4,
        serviceLevelImpact: 78.2,
        recoveryTimeDays: 8,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: false },
        narrative: "Prolonged port gridlock cascades across North Asia. Sourcing shifts to Midwest Semi; cargo diverted through Busan.",
        preparedPlaybook: "Hybrid Response: Dual-Source Shift & Port Bypass",
      },
      {
        id: "SCEN-PERM",
        durationHours: 720,
        label: "PERMANENT",
        closureProbability: 0.08,
        affectedShipments: 24,
        revenueExposure: 64.2,
        inventoryDaysRemaining: 0.0,
        serviceLevelImpact: 42.0,
        recoveryTimeDays: 45,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: true },
        narrative: "Structural trade corridor severance. Complete 100% transfer to nearshore Americas supplier network.",
        preparedPlaybook: "Full Structural Nearshore Re-platforming",
      },
    ],
    recommendedStrategy: {
      id: "STRAT-01",
      title: "Hybrid Response Protocol (Optimized)",
      summary: "Move 40% volume to Midwest Semi + auto-redistribute 1,500 units from Texas to Chicago + reroute Ever Vanguard via Busan.",
      costFormatted: "₹6.8L",
      recoveryDays: 8,
      serviceLevelPercent: 97,
      risk: "LOW",
      autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
      tradeoffRationale: "Reduces Pacific disruption exposure while maintaining 97% service level within capacity constraints.",
    },
  },
  {
    id: "MOCK-FIRE",
    title: "Detroit Staging Hub — Catastrophic Fire (Inventory Destroyed)",
    category: "INVENTORY_DESTROYED",
    initialHealth: 34,
    disruptedNodeId: "INV-01",
    disruptedNodeLabel: "Chicago / Detroit Buffer Hub",
    signal: {
      id: "SIG-FIRE-901",
      timestamp: new Date().toISOString(),
      source: "Midwest Logistics Facility IoT Fire Suppression Telemetry",
      rawText: "EMERGENCY: 4-alarm chemical fire in Staging Zone B destroyed 14,000 finished safety stock units and wiring harnesses. Warehouse buffer reduced to 0.0 days. OEM line halt imminent within 16 hours.",
      eventType: "SUPPLIER_FORCE_MAJEURE",
      location: "Detroit Logistics Corridor (US)",
      facility: "Primary Midwest Staging Distribution Hub",
      expectedDuration: 120,
      durationUnit: "hours",
      severity: "CRITICAL",
      confidence: 0.99,
      validationStatus: "CONFIRMED",
      corroboratingSources: 5,
      rehearsalTriggered: true,
    },
    scenarios: [
      {
        id: "SCEN-2H",
        durationHours: 2,
        label: "2 HOURS",
        closureProbability: 0.95,
        affectedShipments: 4,
        revenueExposure: 8.5,
        inventoryDaysRemaining: 0.8,
        serviceLevelImpact: 84.0,
        recoveryTimeDays: 2,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: false, demandSpike: false },
        narrative: "Immediate structural triage: unaffected Sector C isolated. Emergency safety stock diverted from secondary holding.",
        preparedPlaybook: "Emergency Quarantine & Rapid Stock Audit",
      },
      {
        id: "SCEN-24H",
        durationHours: 24,
        label: "24 HOURS",
        closureProbability: 0.82,
        affectedShipments: 12,
        revenueExposure: 24.6,
        inventoryDaysRemaining: 0.0,
        serviceLevelImpact: 61.2,
        recoveryTimeDays: 5,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: true, demandSpike: false },
        narrative: "Total physical loss of 14,000 units verified. Texas distribution buffer activated for emergency hot-shot overland dispatch.",
        preparedPlaybook: "Cross-Country Overland Hot-Shot Redistribution",
      },
      {
        id: "SCEN-7D",
        durationHours: 168,
        label: "7 DAYS",
        closureProbability: 0.45,
        affectedShipments: 28,
        revenueExposure: 48.9,
        inventoryDaysRemaining: 0.0,
        serviceLevelImpact: 48.5,
        recoveryTimeDays: 14,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: true },
        narrative: "Facility completely inoperable for 6 weeks. Temporary cross-dock staging established in Toledo with emergency supplier surge.",
        preparedPlaybook: "Pop-Up Cross-Dock Re-routing & Supplier Surge",
      },
      {
        id: "SCEN-PERM",
        durationHours: 720,
        label: "PERMANENT",
        closureProbability: 0.15,
        affectedShipments: 65,
        revenueExposure: 94.0,
        inventoryDaysRemaining: 0.0,
        serviceLevelImpact: 35.0,
        recoveryTimeDays: 60,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: true },
        narrative: "Permanent write-off of logistics hub. Long-term multi-tenant warehouse lease executed with automated inventory tracking.",
        preparedPlaybook: "Strategic Network Topology Reconfiguration",
      },
    ],
    recommendedStrategy: {
      id: "STRAT-FIRE",
      title: "Emergency Stock Surge & Air-Bridge Protocol",
      summary: "Authorize immediate overland hot-shot transit of 8,500 units from Texas Buffer + charter dedicated air freight from Monterrey supplier to maintain OEM assembly line.",
      costFormatted: "₹14.2L",
      recoveryDays: 4,
      serviceLevelPercent: 94,
      risk: "LOW",
      autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
      tradeoffRationale: "Incurs higher expedited freight costs but prevents ₹48.9 Cr catastrophic assembly stoppage at OEM assembly plants.",
    },
  },
  {
    id: "MOCK-CHIP",
    title: "Semiconductor Cleanroom Contamination (Supplier Outage)",
    category: "SUPPLIER_OUTAGE",
    initialHealth: 52,
    disruptedNodeId: "SUP-01",
    disruptedNodeLabel: "Shanghai Semiconductor Fab (SUP-01)",
    signal: {
      id: "SIG-CHIP-902",
      timestamp: new Date().toISOString(),
      source: "Tier-1 Silicon Foundry Production Dispatch",
      rawText: "FORCE MAJEURE: Chemical vapor contamination in primary photolithography bay halted 300mm wafer fabrication. 6-week production outage declared on automotive microcontrollers.",
      eventType: "SUPPLIER_FORCE_MAJEURE",
      location: "East Asia Semiconductor Corridor",
      facility: "Wafer Fabrication Fab 2 (Cleanroom 100)",
      expectedDuration: 504,
      durationUnit: "hours",
      severity: "CRITICAL",
      confidence: 0.96,
      validationStatus: "CONFIRMED",
      corroboratingSources: 4,
      rehearsalTriggered: true,
    },
    scenarios: [
      {
        id: "SCEN-2H",
        durationHours: 2,
        label: "2 HOURS",
        closureProbability: 0.98,
        affectedShipments: 2,
        revenueExposure: 4.1,
        inventoryDaysRemaining: 18.0,
        serviceLevelImpact: 98.0,
        recoveryTimeDays: 3,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: true, demandSpike: false },
        narrative: "Yield test confirms defect propagation. Safety buffer at plant absorbs initial weekly assembly cycle.",
        preparedPlaybook: "Global Die Allocation Lock",
      },
      {
        id: "SCEN-24H",
        durationHours: 24,
        label: "24 HOURS",
        closureProbability: 0.90,
        affectedShipments: 8,
        revenueExposure: 16.4,
        inventoryDaysRemaining: 12.0,
        serviceLevelImpact: 91.0,
        recoveryTimeDays: 9,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: true, demandSpike: false },
        narrative: "6-week fab downtime confirmed. Secondary qualification initiated with Monterrey nearshore supplier.",
        preparedPlaybook: "Nearshore Sourcing Ramp-Up",
      },
      {
        id: "SCEN-7D",
        durationHours: 168,
        label: "7 DAYS",
        closureProbability: 0.65,
        affectedShipments: 22,
        revenueExposure: 42.8,
        inventoryDaysRemaining: 4.0,
        serviceLevelImpact: 68.0,
        recoveryTimeDays: 18,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: true, demandSpike: true },
        narrative: "Buffer exhausted. OEM product mix shifted to lower-chip trim lines to preserve cash flow.",
        preparedPlaybook: "Component De-contenting & Build-Mix Throttling",
      },
      {
        id: "SCEN-PERM",
        durationHours: 720,
        label: "PERMANENT",
        closureProbability: 0.20,
        affectedShipments: 45,
        revenueExposure: 82.0,
        inventoryDaysRemaining: 0.0,
        serviceLevelImpact: 50.0,
        recoveryTimeDays: 45,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: true },
        narrative: "Total fab decommission. Long-term contract shifted to domestic U.S. foundry.",
        preparedPlaybook: "Domestic Sourcing Dual-Fab Re-qualification",
      },
    ],
    recommendedStrategy: {
      id: "STRAT-CHIP",
      title: "Monterrey Nearshore Sourcing Pivot & Allocation Surge",
      summary: "Shift 75% of wafer volume to Monterrey Supplier (SUP-02) reserve line + throttle build configurations to preserve high-margin OEM vehicle lines.",
      costFormatted: "₹18.5L",
      recoveryDays: 9,
      serviceLevelPercent: 91,
      risk: "LOW",
      autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
      tradeoffRationale: "Qualifies certified nearshore fab capacity without long transit times, maintaining 91% vehicle delivery schedule.",
    },
  },
  {
    id: "MOCK-TYPHOON",
    title: "Super Typhoon Kagami — Trans-Pacific Lane Gridlock",
    category: "WEATHER_DISASTER",
    initialHealth: 58,
    disruptedNodeId: "SHP-8821",
    disruptedNodeLabel: "Vessel Ever Vanguard (In-Transit)",
    signal: {
      id: "SIG-WX-903",
      timestamp: new Date().toISOString(),
      source: "Joint Typhoon Warning Center (JTWC)",
      rawText: "CATEGORY 5 CYCLONE: Super Typhoon Kagami generating 45ft waves and 140kt gusts directly across Great Circle shipping lane. Ever Vanguard and 12 container vessels ordered to hold outer drift anchorage.",
      eventType: "WEATHER_EVENT",
      location: "North Pacific Shipping Corridor",
      facility: "Great Circle Container Sea Lane",
      expectedDuration: 96,
      durationUnit: "hours",
      severity: "HIGH",
      confidence: 0.97,
      validationStatus: "CONFIRMED",
      corroboratingSources: 4,
      rehearsalTriggered: true,
    },
    scenarios: [
      {
        id: "SCEN-2H",
        durationHours: 2,
        label: "2 HOURS",
        closureProbability: 0.94,
        affectedShipments: 3,
        revenueExposure: 2.2,
        inventoryDaysRemaining: 5.8,
        serviceLevelImpact: 97.0,
        recoveryTimeDays: 2,
        compoundRisks: { alternatePortCongestion: false, supplierShortage: false, demandSpike: false },
        narrative: "Storm coordinates confirmed. Vessels reduce cruising speed to 6kt to avoid storm eye.",
        preparedPlaybook: "Southern Rhumb Line Reroute Advisory",
      },
      {
        id: "SCEN-24H",
        durationHours: 24,
        label: "24 HOURS",
        closureProbability: 0.76,
        affectedShipments: 10,
        revenueExposure: 9.8,
        inventoryDaysRemaining: 4.2,
        serviceLevelImpact: 88.0,
        recoveryTimeDays: 6,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: false, demandSpike: false },
        narrative: "Southern course diversion adds 6 sailing days. Long Beach berth reservation rescheduled.",
        preparedPlaybook: "West Coast Port Congestion Buffer Reservation",
      },
      {
        id: "SCEN-7D",
        durationHours: 168,
        label: "7 DAYS",
        closureProbability: 0.38,
        affectedShipments: 24,
        revenueExposure: 26.5,
        inventoryDaysRemaining: 1.8,
        serviceLevelImpact: 74.0,
        recoveryTimeDays: 12,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: false },
        narrative: "Fleet arrival clustering creates severe berth bottleneck at Port of Long Beach.",
        preparedPlaybook: "Intermodal Rail Expedite & Seattle Port Divert",
      },
      {
        id: "SCEN-PERM",
        durationHours: 720,
        label: "PERMANENT",
        closureProbability: 0.05,
        affectedShipments: 40,
        revenueExposure: 58.0,
        inventoryDaysRemaining: 0.0,
        serviceLevelImpact: 45.0,
        recoveryTimeDays: 30,
        compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: true },
        narrative: "Seasonal storm frequency forces permanent southern trade lane re-routing.",
        preparedPlaybook: "Trans-Pacific Route Re-chartering",
      },
    ],
    recommendedStrategy: {
      id: "STRAT-TYPHOON",
      title: "Seattle Port Diversion & Expedited Rail Shuttle",
      summary: "Divert Ever Vanguard from congested Long Beach to Port of Seattle + pre-book BNSF intermodal express freight directly to Detroit.",
      costFormatted: "₹5.4L",
      recoveryDays: 6,
      serviceLevelPercent: 96,
      risk: "LOW",
      autonomyLevel: "AUTO_EXECUTE",
      tradeoffRationale: "Avoids 10-day California port berth demurrage and catches up 4 days of lost sailing time.",
    },
  },
];

/**
 * Dynamic Scenario Rehearsal Generator for Live Real-Time Signals
 * Generates 2H, 24H, 7D, PERMANENT scenarios dynamically based on the real signal!
 */
export function generateDynamicScenariosForSignal(signal: DisruptionSignal): RehearsalScenario[] {
  const baseExposure = signal.severity === "CRITICAL" ? 28 : signal.severity === "HIGH" ? 14 : 3.5;
  const dur = signal.expectedDuration || 24;

  return [
    {
      id: "SCEN-2H",
      durationHours: 2,
      label: "2 HOURS",
      closureProbability: 0.85,
      affectedShipments: Math.max(1, Math.round(dur / 12)),
      revenueExposure: Number((baseExposure * 0.15).toFixed(1)),
      inventoryDaysRemaining: 6.0,
      serviceLevelImpact: 98.5,
      recoveryTimeDays: 1,
      compoundRisks: { alternatePortCongestion: false, supplierShortage: false, demandSpike: false },
      narrative: `Initial operational onset of ${signal.eventType} at ${signal.location}. Local buffer absorbs delay with zero assembly line stoppages.`,
      preparedPlaybook: "Local Operational Buffer Containment",
    },
    {
      id: "SCEN-24H",
      durationHours: 24,
      label: "24 HOURS",
      closureProbability: 0.55,
      affectedShipments: Math.max(3, Math.round(dur / 4)),
      revenueExposure: Number((baseExposure * 0.6).toFixed(1)),
      inventoryDaysRemaining: 4.8,
      serviceLevelImpact: 93.2,
      recoveryTimeDays: 4,
      compoundRisks: { alternatePortCongestion: false, supplierShortage: false, demandSpike: false },
      narrative: `Disruption at ${signal.facility} persists for 24 hours. Inventory redistribution across domestic regional hubs initiated.`,
      preparedPlaybook: "Regional Inventory Balancing & Route Advisory",
    },
    {
      id: "SCEN-7D",
      durationHours: 168,
      label: "7 DAYS",
      closureProbability: 0.28,
      affectedShipments: Math.max(8, Math.round(dur / 2)),
      revenueExposure: Number((baseExposure * 2.2).toFixed(1)),
      inventoryDaysRemaining: 1.5,
      serviceLevelImpact: 76.4,
      recoveryTimeDays: 9,
      compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: false },
      narrative: `7-day sustained dislocation across ${signal.location}. Nearshore supplier reserve and secondary transshipment connectors mobilized.`,
      preparedPlaybook: "Dynamic Port/Supplier Shift & Cross-Dock Bypass",
    },
    {
      id: "SCEN-PERM",
      durationHours: 720,
      label: "PERMANENT",
      closureProbability: 0.08,
      affectedShipments: 32,
      revenueExposure: Number((baseExposure * 6.5).toFixed(1)),
      inventoryDaysRemaining: 0.0,
      serviceLevelImpact: 38.0,
      recoveryTimeDays: 45,
      compoundRisks: { alternatePortCongestion: true, supplierShortage: true, demandSpike: true },
      narrative: `Complete structural failure or trade embargo at ${signal.location}. Sourcing transferred 100% to alternate geographical partners.`,
      preparedPlaybook: "Complete Structural Network Sourcing Re-platforming",
    },
  ];
}
