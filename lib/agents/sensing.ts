import { DisruptionSignal, AgentTelemetry } from "@/lib/types";
import eventsData from "@/data/events.json";

export async function runSensingAgent(): Promise<{
  telemetry: AgentTelemetry;
  detectedSignals: DisruptionSignal[];
}> {
  return {
    telemetry: {
      id: "agt-sensing-01",
      name: "SENSING AGENT",
      code: "SENSING",
      status: "ACTIVE",
      lastAction: "Ingested East Asia Maritime AIS + Lloyd's Intelligence feed",
      lastActiveTimestamp: "17:42:08 UTC",
      itemsProcessed: 148,
      confidenceScore: 0.94,
      metrics: {
        sourcesMonitored: 4,
        unstructuredPingsPerMin: 28,
        noiseFilterRate: "92.4%",
      },
      latestLogs: [
        {
          timestamp: "17:42:08",
          level: "INFO",
          message: "Detected crane network desync at Yangshan Deepwater Terminal (CNSHG).",
        },
        {
          timestamp: "17:41:45",
          level: "INFO",
          message: "Ever Vanguard vessel AIS velocity dropped to 0.0 knots.",
        },
      ],
    },
    detectedSignals: eventsData as DisruptionSignal[],
  };
}
