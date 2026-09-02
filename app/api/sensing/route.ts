import { NextResponse } from "next/server";
import eventsData from "@/data/events.json";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    signals: eventsData,
    activeHeroSignal: eventsData[0],
  });
}
