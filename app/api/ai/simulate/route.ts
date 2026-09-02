import { NextRequest, NextResponse } from "next/server";
import { synthesizeNetworkFlowAndStrategy } from "@/lib/ai/gemini";
import { DisruptionSignal } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const signal: DisruptionSignal = body.signal;
    const apiKey = body.apiKey;

    if (!signal) {
      return NextResponse.json({ error: "Missing disruption signal" }, { status: 400 });
    }

    const result = await synthesizeNetworkFlowAndStrategy(signal, apiKey);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI simulation route error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to synthesize flow" },
      { status: 500 }
    );
  }
}
