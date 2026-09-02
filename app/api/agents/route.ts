import { NextResponse } from "next/server";
import { runSensingAgent } from "@/lib/agents/sensing";
import { runValidationAgent } from "@/lib/agents/validation";
import { runScenarioAgent } from "@/lib/agents/scenario";
import { runLogisticsAgent } from "@/lib/agents/logistics";
import { runInventoryAgent } from "@/lib/agents/inventory";
import { runProcurementAgent } from "@/lib/agents/procurement";
import { runFinanceAgent } from "@/lib/agents/finance";
import { runSustainabilityAgent } from "@/lib/agents/sustainability";
import { runComplianceAgent } from "@/lib/agents/compliance";
import { runOrchestrator } from "@/lib/agents/orchestrator";

export async function GET() {
  const [
    sensing,
    validation,
    scenario,
    logistics,
    inventory,
    procurement,
    finance,
    sustainability,
    compliance,
    orchestrator,
  ] = await Promise.all([
    runSensingAgent(),
    runValidationAgent(),
    runScenarioAgent(),
    runLogisticsAgent(),
    runInventoryAgent(),
    runProcurementAgent(),
    runFinanceAgent(),
    runSustainabilityAgent(),
    runComplianceAgent(),
    runOrchestrator(),
  ]);

  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    agents: [
      sensing.telemetry,
      validation,
      scenario,
      logistics,
      inventory,
      procurement,
      finance,
      sustainability,
      compliance,
      orchestrator.telemetry,
    ],
    orchestratorFunnel: orchestrator.funnel,
  });
}
