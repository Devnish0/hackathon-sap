import { NextResponse } from "next/server";
import networkData from "@/data/network.json";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    network: networkData,
  });
}
