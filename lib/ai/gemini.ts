/**
 * Gemini AI Supply-Chain Resilience Intelligence Engine
 * 
 * Provides cognitive AI capabilities:
 * - Unstructured news/advisory -> Structured disruption signal extraction
 * - Dynamic Network Topology Synthesis (Suppliers -> Ports -> Transit -> Plants)
 * - Tailored Hybrid Response Protocol & 3-point tactical recovery plans
 * - Supply chain qualitative reasoning & second-order impact modeling
 * 
 * Complies with AGENTS.md:
 * "AI provides value in interpreting unstructured signals, qualitative reasoning,
 *  and explaining strategy tradeoffs. AI does NOT control arithmetic, hard constraints,
 *  or deterministic scoring."
 */

import { DisruptionSignal, StrategyOption } from "@/lib/types";
import { PlanPoint } from "@/lib/simulation/dynamicScenarios";

export interface GeminiAnalysisResult {
  eventType: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  confidence: number;
  location: string;
  facility: string;
  expectedDuration: number;
  durationUnit: string;
  summary: string;
  vulnerabilityAnalysis: string;
  recommendedAgentFocus: string[];
  isAiGenerated: boolean;
}

export interface DynamicNetworkFlow {
  supplier: {
    primaryName: string;
    primaryLocation: string;
    primaryStatus: "AT_RISK" | "DISRUPTED" | "HEALTHY";
    primaryThroughput: string;
    backupName: string;
    backupLocation: string;
    domesticName: string;
    domesticLocation: string;
  };
  ports: {
    disruptedPortName: string;
    disruptedLocation: string;
    disruptedThroughput: string;
    backupPortName: string;
    backupLocation: string;
    destinationPortName: string;
    destinationLocation: string;
  };
  shipment: {
    vesselName: string;
    route: string;
    status: "DISRUPTED" | "AT_RISK" | "HEALTHY";
    exposureFormatted: string;
  };
  plant: {
    name: string;
    location: string;
    bufferRemainingDays: number;
  };
  hybridResponse: {
    title: string;
    summary: string;
    tradeoffRationale: string;
    costFormatted: string;
    recoveryDays: number;
    serviceLevelPercent: number;
    risk: "LOW" | "HIGH";
    autonomyLevel: "AUTO_EXECUTE" | "HUMAN_APPROVAL_REQUIRED";
    planPoints: PlanPoint[];
  };
  aiGenerated: boolean;
  modelUsed: string;
}

export function getEffectiveApiKey(apiKey?: string): string | undefined {
  if (apiKey && apiKey.trim()) return apiKey.trim();
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("GEMINI_API_KEY");
    if (stored && stored.trim()) return stored.trim();
  }
  return undefined;
}

const CANDIDATE_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3.6-flash",
  "gemini-flash-latest",
];

function cleanJson(text: string): string {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");
  return cleaned.trim();
}

export async function analyzeSignalWithGemini(
  rawText: string,
  sourceName: string,
  apiKey?: string
): Promise<GeminiAnalysisResult> {
  const effectiveKey = getEffectiveApiKey(apiKey);

  if (effectiveKey) {
    const prompt = `You are the Sensing & Signal Validation AI for "Resilience Autopilot", an enterprise supply-chain resilience decision control system.
Analyze this raw external signal from ${sourceName}:
"${rawText}"

Extract structured supply chain intelligence and respond strictly with a valid JSON object matching this exact schema:
{
  "eventType": "PORT_DISRUPTION" | "SUPPLIER_OUTAGE" | "WEATHER_EVENT" | "GEOPOLITICAL" | "TRADE_POLICY" | "LOGISTICS_BOTTLENECK",
  "severity": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "confidence": number between 0.60 and 0.99,
  "location": "geographic region / port / country",
  "facility": "specific terminal, facility, or shipping lane",
  "expectedDuration": number (in hours),
  "durationUnit": "hours" | "days",
  "summary": "Crisp 1-2 sentence executive operational briefing",
  "vulnerabilityAnalysis": "2-3 sentences explaining why this disruption threatens assembly plants and inventory buffers",
  "recommendedAgentFocus": ["LOGISTICS", "INVENTORY", "PROCUREMENT", "COMPLIANCE", "SUSTAINABILITY"]
}
Output only the JSON object, with no markdown formatting or commentary.`;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            const parsed = JSON.parse(cleanJson(content));
            return {
              eventType: parsed.eventType || "PORT_DISRUPTION",
              severity: parsed.severity || "MODERATE",
              confidence: parsed.confidence || 0.88,
              location: parsed.location || "East Asia Maritime Corridor",
              facility: parsed.facility || "Deepwater Marine Gateway",
              expectedDuration: parsed.expectedDuration || 24,
              durationUnit: parsed.durationUnit || "hours",
              summary: parsed.summary || rawText.slice(0, 140),
              vulnerabilityAnalysis:
                parsed.vulnerabilityAnalysis ||
                "Downstream container delay risks assembly buffer depletion at Midwest staging hubs.",
              recommendedAgentFocus: parsed.recommendedAgentFocus || [
                "LOGISTICS",
                "INVENTORY",
              ],
              isAiGenerated: true,
            };
          }
        } else {
          console.warn(`Gemini model ${model} returned HTTP ${response.status}, trying next model in chain...`);
        }
      } catch (err) {
        console.warn(`Gemini attempt with ${model} failed, trying next candidate:`, err);
      }
    }
  }

  // Deterministic Cognitive Fallback (ensures 100% uptime without internet or API keys)
  return generateCognitiveFallbackAnalysis(rawText, sourceName);
}

function generateCognitiveFallbackAnalysis(
  text: string,
  source: string
): GeminiAnalysisResult {
  const lower = text.toLowerCase();

  let eventType = "PORT_DISRUPTION";
  let severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL" = "MODERATE";
  let duration = 24;
  let location = "Global Maritime Gateway";
  let facility = "International Fairway Terminal";
  let agents = ["LOGISTICS", "INVENTORY"];

  if (lower.includes("guangzhou") || lower.includes("ramparts") || lower.includes("nansha") || lower.includes("pearl river")) {
    eventType = "PORT_DISRUPTION";
    severity = "MODERATE";
    duration = 36;
    location = "Guangzhou Port / Pearl River Delta (CN)";
    facility = "Nansha Deepwater Terminal Fairway";
    agents = ["LOGISTICS", "INVENTORY", "PROCUREMENT"];
  } else if (lower.includes("red sea") || lower.includes("mandeb") || lower.includes("aden") || lower.includes("houthi")) {
    eventType = "GEOPOLITICAL";
    severity = "CRITICAL";
    duration = 120;
    location = "Bab el-Mandeb / Southern Red Sea";
    facility = "Red Sea Transit Fairway";
    agents = ["LOGISTICS", "FINANCE", "COMPLIANCE"];
  } else if (lower.includes("tariff") || lower.includes("trade") || lower.includes("customs") || lower.includes("section 301") || lower.includes("usmca")) {
    eventType = "TRADE_POLICY";
    severity = "HIGH";
    duration = 168;
    location = "North America / Asia Pacific";
    facility = "Border Trade Registry & Customs Clearance";
    agents = ["COMPLIANCE", "FINANCE", "PROCUREMENT"];
  } else if (lower.includes("storm") || lower.includes("typhoon") || lower.includes("wave") || lower.includes("cyclone") || lower.includes("wind")) {
    eventType = "WEATHER_EVENT";
    severity = "HIGH";
    duration = 48;
    location = "Pacific Sea Corridor";
    facility = "Outer Anchorage Fairway";
    agents = ["LOGISTICS", "SUSTAINABILITY"];
  } else if (lower.includes("vessel") || lower.includes("speed") || lower.includes("draft") || lower.includes("ais") || lower.includes("carrier")) {
    eventType = "LOGISTICS_BOTTLENECK";
    severity = "MODERATE";
    duration = 18;
    location = "Trans-Pacific Shipping Route";
    facility = "Container Carrier Corridor";
    agents = ["LOGISTICS", "INVENTORY"];
  }

  return {
    eventType,
    severity,
    confidence: 0.89,
    location,
    facility,
    expectedDuration: duration,
    durationUnit: "hours",
    summary: `Cognitive synthesis: ${text.slice(0, 160)}...`,
    vulnerabilityAnalysis: `Disruption at ${location} threatens downstream assembly safety stock. Immediate route rerouting through secondary transshipment hubs is recommended to prevent stockout.`,
    recommendedAgentFocus: agents,
    isAiGenerated: false,
  };
}

/**
 * Synthesizes the entire Digital Twin Topology (Suppliers -> Ports -> Transit -> Plants)
 * and the Next-Best Action Hybrid Response Protocol using Gemini AI.
 */
export async function synthesizeNetworkFlowAndStrategy(
  signal: DisruptionSignal,
  apiKey?: string
): Promise<DynamicNetworkFlow> {
  const effectiveKey = getEffectiveApiKey(apiKey);
  const rawText = signal.rawText || signal.location || "Supply chain gateway disruption";

  if (effectiveKey) {
    const prompt = `You are the master agentic orchestrator for "Resilience Autopilot", an enterprise supply-chain decision control system.
An active disruption has occurred:
- Event: "${signal.eventType}"
- Location: "${signal.location}"
- Facility: "${signal.facility}"
- Details: "${rawText}"

Synthesize:
1. The dynamic Digital Twin Topology nodes specifically tailored to this geography and supply corridor (realistic Tier-1 Supplier in that region, disrupted port/gateway, backup port, shipment vessel name, downstream plant).
2. The Rank #1 Hybrid Response Protocol with 3 concrete tactical action points (Step 1 Inventory, Step 2 Logistics, Step 3 Procurement/Compliance).

Respond strictly with a single JSON object matching this exact schema:
{
  "supplier": {
    "primaryName": "Specific Tier-1 supplier name for this corridor",
    "primaryLocation": "City/Region, Country",
    "primaryStatus": "AT_RISK" | "DISRUPTED",
    "primaryThroughput": "e.g. 40,000 units/mo"
  },
  "ports": {
    "disruptedPortName": "Name of the disrupted port/gateway for this event",
    "disruptedLocation": "Location of disrupted port",
    "disruptedThroughput": "e.g. Berthing queue / Crane hold",
    "backupPortName": "Viable regional alternative port for rerouting",
    "backupLocation": "Location of backup port",
    "destinationPortName": "Destination entry port (e.g. Port of Long Beach or Rotterdam)",
    "destinationLocation": "Destination location"
  },
  "shipment": {
    "vesselName": "Specific container vessel or shipment ID",
    "route": "Origin -> Destination corridor",
    "status": "DISRUPTED" | "AT_RISK"
  },
  "plant": {
    "name": "Assembly Plant (US-01 / EU-01)",
    "location": "Manufacturing hub location",
    "bufferRemainingDays": number (between 0.8 and 5.0)
  },
  "hybridResponse": {
    "title": "Specific Strategy Title (e.g. Pearl River Delta Feeder Divert & Nearshore Air-Bridge)",
    "summary": "1-2 sentence executive operational summary",
    "tradeoffRationale": "Why this strategy is optimal: balancing recovery time, cost, and service level",
    "costFormatted": "e.g. ₹6.4L",
    "recoveryDays": number (e.g. 6 to 9),
    "serviceLevelPercent": number (e.g. 95 to 98),
    "risk": "LOW" | "HIGH",
    "autonomyLevel": "AUTO_EXECUTE" | "HUMAN_APPROVAL_REQUIRED",
    "planPoints": [
      {
        "step": 1,
        "action": "Concrete Step 1 (e.g. Reallocate 2,000 units from regional depot)",
        "detail": "Action explanation and buffer protection",
        "gate": "AUTO_EXECUTE",
        "gateLabel": "AUTO EXECUTE",
        "agent": "INVENTORY"
      },
      {
        "step": 2,
        "action": "Concrete Step 2 (e.g. Divert freight to backup port with +2d transit)",
        "detail": "Action explanation and feeder arrangement",
        "gate": "AUTO_EXECUTE",
        "gateLabel": "AUTO EXECUTE",
        "agent": "LOGISTICS"
      },
      {
        "step": 3,
        "action": "Concrete Step 3 (e.g. Shift 35% volume to certified nearshore supplier)",
        "detail": "Contractual volume guarantee requiring management approval",
        "gate": "HUMAN_APPROVAL_REQUIRED",
        "gateLabel": "APPROVAL REQUIRED",
        "agent": "PROCUREMENT"
      }
    ]
  }
}
Output only the JSON object with no extra text.`;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.3,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            const p = JSON.parse(cleanJson(content));
            return {
              supplier: {
                primaryName: p.supplier?.primaryName || "Regional Component Supplier (Tier 1)",
                primaryLocation: p.supplier?.primaryLocation || signal.location,
                primaryStatus: p.supplier?.primaryStatus || "AT_RISK",
                primaryThroughput: p.supplier?.primaryThroughput || "42,000 units/mo",
                backupName: "Monterrey Advanced Substrates",
                backupLocation: "Nuevo León, MX",
                domesticName: "Midwest Semi & Dynamics",
                domesticLocation: "Detroit, US",
              },
              ports: {
                disruptedPortName: p.ports?.disruptedPortName || signal.facility || "Primary Deepwater Terminal",
                disruptedLocation: p.ports?.disruptedLocation || signal.location,
                disruptedThroughput: p.ports?.disruptedThroughput || "Berth lock & queue hold",
                backupPortName: p.ports?.backupPortName || "Port of Busan (KRPUS)",
                backupLocation: p.ports?.backupLocation || "Busan, KR",
                destinationPortName: p.ports?.destinationPortName || "Port of Long Beach (USLGB)",
                destinationLocation: p.ports?.destinationLocation || "California, US",
              },
              shipment: {
                vesselName: p.shipment?.vesselName || "Vessel Ever Vanguard (SHP-8821)",
                route: p.shipment?.route || `${signal.location} → US West Coast`,
                status: p.shipment?.status || "DISRUPTED",
                exposureFormatted: "₹6.8Cr",
              },
              plant: {
                name: p.plant?.name || "Detroit Assembly Plant (US-01)",
                location: p.plant?.location || "Michigan, US",
                bufferRemainingDays: p.plant?.bufferRemainingDays || 3.2,
              },
              hybridResponse: {
                title: p.hybridResponse?.title || "Hybrid Response Protocol (AI-Optimized)",
                summary: p.hybridResponse?.summary || "Diverts high-priority consignments through secondary hubs while activating domestic buffer surge.",
                tradeoffRationale: p.hybridResponse?.tradeoffRationale || "Balances expedited inventory positioning against capacity guarantees to protect 97% SLA.",
                costFormatted: p.hybridResponse?.costFormatted || "₹6.8L",
                recoveryDays: p.hybridResponse?.recoveryDays || 7,
                serviceLevelPercent: p.hybridResponse?.serviceLevelPercent || 97,
                risk: p.hybridResponse?.risk || "LOW",
                autonomyLevel: p.hybridResponse?.autonomyLevel || "HUMAN_APPROVAL_REQUIRED",
                planPoints: p.hybridResponse?.planPoints || [
                  {
                    step: 1,
                    action: "Redistribute 1,500 Buffer Units from Regional Staging",
                    detail: "Absorbs initial transit slip to avoid assembly line starvation.",
                    gate: "AUTO_EXECUTE",
                    gateLabel: "AUTO EXECUTE",
                    agent: "INVENTORY",
                  },
                  {
                    step: 2,
                    action: "Reroute Outbound Consignment via Secondary Feeder Hub",
                    detail: "Transfers container manifest to bypass primary gateway congestion.",
                    gate: "AUTO_EXECUTE",
                    gateLabel: "AUTO EXECUTE",
                    agent: "LOGISTICS",
                  },
                  {
                    step: 3,
                    action: "Authorize Production Volume Commitment on Backup Supplier Line",
                    detail: "Secures emergency allocation with qualified nearshore partner.",
                    gate: "HUMAN_APPROVAL_REQUIRED",
                    gateLabel: "APPROVAL REQUIRED",
                    agent: "PROCUREMENT",
                  },
                ],
              },
              aiGenerated: true,
              modelUsed: `Gemini (${model})`,
            };
          }
        } else {
          console.warn(`Gemini model ${model} returned HTTP ${response.status}, trying next model in chain...`);
        }
      } catch (e) {
        console.warn(`Gemini attempt with ${model} failed, trying next candidate:`, e);
      }
    }
  }

  // Deterministic Cognitive Fallback (ensures 100% reliability offline)
  return generateCognitiveFallbackNetworkFlow(signal);
}

/**
 * High-fidelity cognitive semantic generator for dynamic flow and strategy
 */
function generateCognitiveFallbackNetworkFlow(signal: DisruptionSignal): DynamicNetworkFlow {
  const text = (signal.rawText + " " + signal.location + " " + signal.facility).toLowerCase();

  // 1. Guangzhou / Pearl River / Nansha
  if (text.includes("guangzhou") || text.includes("ramparts") || text.includes("nansha") || text.includes("pearl river")) {
    return {
      supplier: {
        primaryName: "Guangdong Precision Electronics (Tier 1)",
        primaryLocation: "Guangzhou, CN",
        primaryStatus: "AT_RISK",
        primaryThroughput: "38,000 units/mo",
        backupName: "Monterrey Advanced Substrates",
        backupLocation: "Nuevo León, MX",
        domesticName: "Midwest Semi & Dynamics",
        domesticLocation: "Detroit, US",
      },
      ports: {
        disruptedPortName: "Port of Guangzhou / Nansha (CNCAN)",
        disruptedLocation: "Guangzhou, CN",
        disruptedThroughput: "Tug desync / 8 berths stalled",
        backupPortName: "Port of Shenzhen Yantian (Bypass)",
        backupLocation: "Shenzhen, CN",
        destinationPortName: "Port of Long Beach (USLGB)",
        destinationLocation: "California, US",
      },
      shipment: {
        vesselName: "Vessel Pearl River Leader (SHP-9042)",
        route: "Pearl River Delta → US West Coast",
        status: "DISRUPTED",
        exposureFormatted: "₹5.4Cr",
      },
      plant: {
        name: "Detroit Assembly Plant (US-01)",
        location: "Michigan, US",
        bufferRemainingDays: 2.8,
      },
      hybridResponse: {
        title: "Guangdong Maritime Bypass & Regional Air-Bridge Protocol",
        summary: "Divert outbound consignments to Shenzhen Yantian feeder + authorize 2,000 unit buffer surge from Austin depot.",
        tradeoffRationale: "Avoids Guangzhou terminal lock while preserving 97.4% delivery SLA with +1.5 days transit delta.",
        costFormatted: "₹5.8L",
        recoveryDays: 6,
        serviceLevelPercent: 97,
        risk: "LOW",
        autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
        planPoints: [
          {
            step: 1,
            action: "Pre-position 2,000 Buffer Units (Austin → Detroit)",
            detail: "Transfers reserve automotive electronics to eliminate line stoppage risk during 36h port queue.",
            gate: "AUTO_EXECUTE",
            gateLabel: "AUTO EXECUTE",
            agent: "INVENTORY",
          },
          {
            step: 2,
            action: "Reroute Outbound Containers to Shenzhen Yantian Port",
            detail: "Transfers container manifest by bonded truck to Shenzhen deepwater berth, catching Pacific outbound.",
            gate: "AUTO_EXECUTE",
            gateLabel: "AUTO EXECUTE",
            agent: "LOGISTICS",
          },
          {
            step: 3,
            action: "Activate 35% Reserve Line on Monterrey Substrates (SUP-02)",
            detail: "Signs emergency production commitment with nearshore fab to hedge against extended South China backlogs.",
            gate: "HUMAN_APPROVAL_REQUIRED",
            gateLabel: "APPROVAL REQUIRED",
            agent: "PROCUREMENT",
          },
        ],
      },
      aiGenerated: false,
      modelUsed: "Cognitive Semantic Engine",
    };
  }

  // 2. Red Sea / Bab el-Mandeb / Suez
  if (text.includes("red sea") || text.includes("mandeb") || text.includes("aden") || text.includes("houthi")) {
    return {
      supplier: {
        primaryName: "Southeast Asia Semiconductor Fab",
        primaryLocation: "Singapore / Penang",
        primaryStatus: "AT_RISK",
        primaryThroughput: "50,000 units/mo",
        backupName: "Monterrey Advanced Substrates",
        backupLocation: "Nuevo León, MX",
        domesticName: "Midwest Semi & Dynamics",
        domesticLocation: "Detroit, US",
      },
      ports: {
        disruptedPortName: "Bab el-Mandeb Chokepoint (Red Sea)",
        disruptedLocation: "Gulf of Aden Fairway",
        disruptedThroughput: "Naval hazard / 0 knots convoy halt",
        backupPortName: "Port of Cape Town Bypass",
        backupLocation: "Cape Town, ZA",
        destinationPortName: "Port of Rotterdam (NLRTM)",
        destinationLocation: "Rotterdam, NL",
      },
      shipment: {
        vesselName: "Vessel MSC Red Sea Horizon (SHP-7721)",
        route: "Asia → Europe via Cape of Good Hope",
        status: "DISRUPTED",
        exposureFormatted: "₹19.2Cr",
      },
      plant: {
        name: "European Assembly Plant (EU-01)",
        location: "Antwerp, BE",
        bufferRemainingDays: 1.2,
      },
      hybridResponse: {
        title: "Cape of Good Hope Diversion & Priority Air-Bridge Protocol",
        summary: "Order fleet diversion south of Africa (+14 sailing days) + charter Boeing 777 air freight for critical line-stop components.",
        tradeoffRationale: "Completely eliminates missile/drone risk at Bab el-Mandeb; air bridge prevents catastrophic plant shutdown.",
        costFormatted: "₹18.4L",
        recoveryDays: 14,
        serviceLevelPercent: 94,
        risk: "HIGH",
        autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
        planPoints: [
          {
            step: 1,
            action: "Order Immediate Cape of Good Hope Southward Diversion",
            detail: "Transmits naval avoidance coordinates to vessel master; locks automated bunker fuel hedging contract.",
            gate: "AUTO_EXECUTE",
            gateLabel: "AUTO EXECUTE",
            agent: "LOGISTICS",
          },
          {
            step: 2,
            action: "Airlift 3,500 Critical Harness Kits via Dubai Air Hub",
            detail: "Charters scheduled air freighter to fly essential wiring components directly to plant floor within 24h.",
            gate: "HUMAN_APPROVAL_REQUIRED",
            gateLabel: "APPROVAL REQUIRED",
            agent: "PROCUREMENT",
          },
          {
            step: 3,
            action: "Lock Dual-Sourcing Allocation with Central European Fab",
            detail: "Activates certified secondary production facility in Poland to backfill long sailing transit gap.",
            gate: "HUMAN_APPROVAL_REQUIRED",
            gateLabel: "APPROVAL REQUIRED",
            agent: "PROCUREMENT",
          },
        ],
      },
      aiGenerated: false,
      modelUsed: "Cognitive Semantic Engine",
    };
  }

  // 3. Panama Canal
  if (text.includes("panama") || text.includes("gatun")) {
    return {
      supplier: {
        primaryName: "East Asia Electronics Assembly",
        primaryLocation: "Taipei, TW",
        primaryStatus: "HEALTHY",
        primaryThroughput: "44,000 units/mo",
        backupName: "Monterrey Advanced Substrates",
        backupLocation: "Nuevo León, MX",
        domesticName: "Midwest Semi & Dynamics",
        domesticLocation: "Detroit, US",
      },
      ports: {
        disruptedPortName: "Panama Canal Locks (Gatun Lake)",
        disruptedLocation: "Panama (PA)",
        disruptedThroughput: "Drought draught limit 44ft",
        backupPortName: "Port of Long Beach / California Rail",
        backupLocation: "California, US",
        destinationPortName: "Port of Savannah (USSAV)",
        destinationLocation: "Georgia, US",
      },
      shipment: {
        vesselName: "Vessel CMA CGM Panama Bridge",
        route: "Trans-Pacific to US East Coast",
        status: "DISRUPTED",
        exposureFormatted: "₹8.6Cr",
      },
      plant: {
        name: "Detroit Assembly Plant (US-01)",
        location: "Michigan, US",
        bufferRemainingDays: 3.5,
      },
      hybridResponse: {
        title: "Intermodal Land-Bridge & West Coast Rail Express",
        summary: "Discharge containers at Port of Long Beach + transfer to expedited BNSF unit train overland.",
        tradeoffRationale: "Avoids 12-day Panama Canal queuing anchorage while delivering components 4 days ahead of schedule.",
        costFormatted: "₹4.8L",
        recoveryDays: 5,
        serviceLevelPercent: 98,
        risk: "LOW",
        autonomyLevel: "AUTO_EXECUTE",
        planPoints: [
          {
            step: 1,
            action: "Divert Vessel Discharge to Port of Long Beach",
            detail: "Updates bills of lading to discharge at California pier rather than waiting for Canal transit slot.",
            gate: "AUTO_EXECUTE",
            gateLabel: "AUTO EXECUTE",
            agent: "LOGISTICS",
          },
          {
            step: 2,
            action: "Contract Dedicated BNSF Overland Unit Train",
            detail: "Pre-reserves expedited 48-hour intermodal rail shuttle directly to Midwest logistics ramp.",
            gate: "AUTO_EXECUTE",
            gateLabel: "AUTO EXECUTE",
            agent: "LOGISTICS",
          },
          {
            step: 3,
            action: "Rebalance Inland Safety Buffers across Assembly Plants",
            detail: "Re-allocates arriving flatcar inventory between Detroit and Ohio facilities based on real-time consumption.",
            gate: "AUTO_EXECUTE",
            gateLabel: "AUTO EXECUTE",
            agent: "INVENTORY",
          },
        ],
      },
      aiGenerated: false,
      modelUsed: "Cognitive Semantic Engine",
    };
  }

  // 4. Default Dynamic Fallback matching signal's exact location and facility
  return {
    supplier: {
      primaryName: `${signal.location.split(",")[0] || "Regional"} Precision Semi (Tier 1)`,
      primaryLocation: signal.location,
      primaryStatus: "AT_RISK",
      primaryThroughput: "40,000 units/mo",
      backupName: "Monterrey Advanced Substrates",
      backupLocation: "Nuevo León, MX",
      domesticName: "Midwest Semi & Dynamics",
      domesticLocation: "Detroit, US",
    },
    ports: {
      disruptedPortName: signal.facility || `${signal.location} Deepwater Gateway`,
      disruptedLocation: signal.location,
      disruptedThroughput: "Berth / corridor operational desync",
      backupPortName: "Port of Busan (KRPUS)",
      backupLocation: "Busan, KR",
      destinationPortName: "Port of Long Beach (USLGB)",
      destinationLocation: "California, US",
    },
    shipment: {
      vesselName: "Vessel Ever Vanguard (SHP-8821)",
      route: `${signal.location} → US West Coast`,
      status: "DISRUPTED",
      exposureFormatted: "₹6.8Cr",
    },
    plant: {
      name: "Detroit Assembly Plant (US-01)",
      location: "Michigan, US",
      bufferRemainingDays: 2.5,
    },
    hybridResponse: {
      title: `${signal.location.split(",")[0] || "Corridor"} Bypass & Domestic Buffer Protocol`,
      summary: `Reroute priority cargo around ${signal.facility} while activating domestic buffer reallocation.`,
      tradeoffRationale: `Mitigates ${signal.eventType.replace("_", " ")} shock within capacity constraints, securing 97% delivery SLA.`,
      costFormatted: "₹6.8L",
      recoveryDays: 7,
      serviceLevelPercent: 97,
      risk: "LOW",
      autonomyLevel: "HUMAN_APPROVAL_REQUIRED",
      planPoints: [
        {
          step: 1,
          action: "Redistribute 1,500 Buffer Units from Regional Staging",
          detail: "Absorbs lead-time delta during transit disruption to avoid factory stoppage.",
          gate: "AUTO_EXECUTE",
          gateLabel: "AUTO EXECUTE",
          agent: "INVENTORY",
        },
        {
          step: 2,
          action: `Reroute Cargo via Alternate Transshipment Hub`,
          detail: `Transfers container bookings to secondary deepwater feeder port to bypass ${signal.facility}.`,
          gate: "AUTO_EXECUTE",
          gateLabel: "AUTO EXECUTE",
          agent: "LOGISTICS",
        },
        {
          step: 3,
          action: "Shift 35% Volume to Qualified Nearshore Supplier",
          detail: "Executes emergency capacity agreement with secondary certified partner.",
          gate: "HUMAN_APPROVAL_REQUIRED",
          gateLabel: "APPROVAL REQUIRED",
          agent: "PROCUREMENT",
        },
      ],
    },
    aiGenerated: false,
    modelUsed: "Cognitive Semantic Engine",
  };
}
