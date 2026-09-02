import { NextResponse } from "next/server";
import { analyzeSignalWithGemini } from "@/lib/ai/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rawText, sourceName, apiKey } = body;

    if (!rawText) {
      return NextResponse.json(
        { error: "Missing rawText in request body" },
        { status: 400 }
      );
    }

    const analysis = await analyzeSignalWithGemini(
      rawText,
      sourceName || "External Intelligence Wire",
      apiKey
    );

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("AI Analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze signal", details: error.message },
      { status: 500 }
    );
  }
}
