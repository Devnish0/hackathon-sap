import { NextResponse } from "next/server";
import { runOrchestrator } from "@/lib/agents/orchestrator";

export async function GET() {
  const result = await runOrchestrator();
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    nextBestAction: result.nextBestAction,
    rankedStrategies: result.rankedStrategies,
    funnel: result.funnel,
    weights: result.weights,
  });
}
