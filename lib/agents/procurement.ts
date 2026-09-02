import { AgentTelemetry } from "@/lib/types";

export async function runProcurementAgent(): Promise<AgentTelemetry> {
  return {
    id: "agt-proc-06",
    name: "PROCUREMENT AGENT",
    code: "PROCUREMENT",
    status: "REQUIRES_APPROVAL",
    lastAction: "Qualified reserve capacity shift to Midwest Semi (Detroit) + Monterrey shift",
    lastActiveTimestamp: "17:42:16 UTC",
    itemsProcessed: 8,
    confidenceScore: 0.93,
    metrics: {
      domesticReserveAvailable: "8,000 units/mo",
      supplierReliability: "99.0%",
      autonomyClassification: "HIGH_RISK_HUMAN_APPROVAL_REQUIRED",
    },
    latestLogs: [
      {
        timestamp: "17:42:16",
        level: "WARN",
        message: "Procurement shift requires capital commitment of ₹6.8L. Routed to Human Gate.",
      },
      {
        timestamp: "17:42:15",
        level: "INFO",
        message: "Midwest Semi confirmed immediate tooling line readiness for 40% allocation.",
      },
    ],
  };
}
