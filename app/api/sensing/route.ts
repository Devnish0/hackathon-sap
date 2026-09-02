import { NextResponse } from "next/server";
import { fetchMultiSourceSignals } from "@/lib/signals/multiSource";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const modeParam = searchParams.get("mode");
    const sourceFilter = searchParams.get("source");

    const mode = modeParam === "mock" ? "MOCK_SCENARIO" : "REAL_TIME";
    const data = await fetchMultiSourceSignals(mode);

    let filteredSignals = data.signals;
    if (sourceFilter && sourceFilter !== "ALL") {
      filteredSignals = data.signals.filter(
        (s) => s.sourceCategory.toLowerCase() === sourceFilter.toLowerCase()
      );
    }

    return NextResponse.json({
      signals: filteredSignals,
      activeSources: data.activeSources,
      mode: data.mode,
      totalCount: filteredSignals.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error in sensing API:", error);
    return NextResponse.json(
      { error: "Failed to sense signals", details: error.message },
      { status: 500 }
    );
  }
}
