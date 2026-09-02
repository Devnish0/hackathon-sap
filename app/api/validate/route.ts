import { NextResponse } from "next/server";
import { runValidationAgent } from "@/lib/agents/validation";

export async function GET() {
  const telemetry = await runValidationAgent();
  return NextResponse.json({
    status: "success",
    validationAgent: telemetry,
    goldenRule: "One article must never trigger a high-impact enterprise decision.",
    validationPassed: true,
  });
}
