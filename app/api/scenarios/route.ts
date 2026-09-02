import { NextResponse } from "next/server";
import scenariosData from "@/data/scenarios.json";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    horizons: scenariosData,
    baselineTrigger: "Port of Shanghai (CNSHG) - 2 Hours Advisory",
  });
}
