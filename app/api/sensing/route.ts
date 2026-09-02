import { NextResponse } from "next/server";
import { fetchLiveExternalSignals } from "@/lib/signals/ustr";

export async function GET() {
  const result = await fetchLiveExternalSignals();

  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    isLiveFeed: result.isLive,
    feedSource: result.source,
    liveSignalsCount: result.liveHeadlinesCount,
    signals: result.signals,
    activeHeroSignal: result.signals.find((s) => s.id === "SIG-02481") || result.signals[0],
  });
}
