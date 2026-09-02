"use client";

import React, { useState, useMemo } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import worldGeoJson from "@/data/world-geojson.json";
import osintHotspots from "@/data/osintHotspots.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import {
  Globe,
  Radio,
  ShieldAlert,
  AlertTriangle,
  Flame,
  ExternalLink,
  Filter,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Hotspot {
  id: string;
  title: string;
  category: string;
  eventType: string;
  severity: string;
  coordinates: [number, number];
  locationName: string;
  source: string;
  summary: string;
  affectedLanes: string[];
  threatLevel: string;
  activeSince: string;
  corridorImpact: string;
  chokePoint: string;
}

const SHIPPING_ROUTES: { id: string; name: string; coordinates: [number, number][] }[] = [
  {
    id: "route-pacific",
    name: "Trans-Pacific Great Circle",
    coordinates: [
      [121.46, 31.22], // Shanghai
      [129.04, 35.10], // Busan
      [145.0, 42.0],  // North of Japan
      [-160.0, 45.0], // Mid-Pacific
      [-122.4, 37.8], // San Francisco
      [-118.2, 33.7], // Long Beach
    ],
  },
  {
    id: "route-suez",
    name: "Asia-Europe Maritime Corridor",
    coordinates: [
      [121.46, 31.22], // Shanghai
      [103.8, 1.3],   // Singapore
      [80.0, 6.0],    // Sri Lanka
      [43.33, 12.58], // Bab el-Mandeb
      [32.3, 30.5],   // Suez
      [14.0, 36.0],   // Mediterranean
      [-5.6, 36.0],   // Gibraltar
      [4.4, 51.9],    // Rotterdam
    ],
  },
  {
    id: "route-cape",
    name: "Cape of Good Hope Bypass",
    coordinates: [
      [103.8, 1.3],   // Singapore
      [60.0, -10.0],  // Indian Ocean
      [18.5, -34.5],  // Cape of Good Hope
      [-10.0, 0.0],   // South Atlantic
      [-5.6, 36.0],   // Gibraltar
      [4.4, 51.9],    // Rotterdam
    ],
  },
  {
    id: "route-atlantic",
    name: "North Atlantic Corridor",
    coordinates: [
      [4.4, 51.9],    // Rotterdam
      [-30.0, 48.0],  // Mid Atlantic
      [-74.0, 40.7],  // New York
    ],
  },
];

const STRATEGIC_CHOKEPOINTS = [
  { name: "Malacca Strait", coordinates: [101.4, 2.5] as [number, number], volume: "16M bbl/d" },
  { name: "Bab el-Mandeb", coordinates: [43.3, 12.6] as [number, number], volume: "6.2M bbl/d" },
  { name: "Suez Canal", coordinates: [32.3, 30.5] as [number, number], volume: "12% World Trade" },
  { name: "Strait of Hormuz", coordinates: [56.3, 26.6] as [number, number], volume: "21M bbl/d" },
  { name: "Panama Canal", coordinates: [-79.7, 9.1] as [number, number], volume: "5% World Trade" },
  { name: "Taiwan Strait", coordinates: [119.5, 24.5] as [number, number], volume: "High Semi Tier" },
];

export default function OsintWorldMap() {
  const { triggerLiveDisruption } = useResilience();
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>("OSINT-01");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [showChokePoints, setShowChokePoints] = useState<boolean>(true);
  const [showShippingRoutes, setShowShippingRoutes] = useState<boolean>(true);

  const width = 1000;
  const height = 500;

  // d3-geo projection (Natural Earth 1)
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(165)
      .translate([width / 2, height / 2]);
  }, [width, height]);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  const graticule = useMemo(() => {
    return geoGraticule()();
  }, []);

  const landPath = useMemo(() => {
    return pathGenerator(worldGeoJson.land as any) || "";
  }, [pathGenerator]);

  const countriesPath = useMemo(() => {
    return pathGenerator(worldGeoJson.countries as any) || "";
  }, [pathGenerator]);

  const filteredHotspots = useMemo(() => {
    if (categoryFilter === "ALL") return osintHotspots as Hotspot[];
    return (osintHotspots as Hotspot[]).filter(
      (h) => h.category === categoryFilter || h.eventType === categoryFilter
    );
  }, [categoryFilter]);

  const selectedHotspot = useMemo(() => {
    return (osintHotspots as Hotspot[]).find((h) => h.id === selectedHotspotId) || null;
  }, [selectedHotspotId]);

  return (
    <div className="relative w-full bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm flex flex-col select-none">
      {/* ── Top OSINT Mission Control HUD ── */}
      <div className="px-5 py-3 border-b border-base-200 bg-base-200/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="font-bold uppercase tracking-wider text-base-content">
            OSINT Global Maritime & Chokepoint Map
          </span>
          <span className="badge badge-success badge-xs gap-1 font-mono">
            <span className="animate-ping">●</span> AIS SAT-FEED LIVE
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2">
          <div className="join">
            {["ALL", "PORT", "GEOPOLITICAL", "WEATHER_DISASTER", "TRADE_POLICY"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`btn btn-xs join-item font-mono ${
                  categoryFilter === cat ? "btn-primary" : "btn-ghost"
                }`}
              >
                {cat === "ALL" ? "All Hotspots" : cat.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="divider divider-horizontal m-0" />

          <label className="cursor-pointer label p-0 gap-1.5 text-[11px]">
            <input
              type="checkbox"
              checked={showShippingRoutes}
              onChange={(e) => setShowShippingRoutes(e.target.checked)}
              className="checkbox checkbox-primary checkbox-xs"
            />
            <span className="label-text text-[11px] text-base-content/60">Sea Lanes</span>
          </label>

          <label className="cursor-pointer label p-0 gap-1.5 text-[11px]">
            <input
              type="checkbox"
              checked={showChokePoints}
              onChange={(e) => setShowChokePoints(e.target.checked)}
              className="checkbox checkbox-primary checkbox-xs"
            />
            <span className="label-text text-[11px] text-base-content/60">Chokepoints</span>
          </label>
        </div>
      </div>

      {/* ── Map SVG Canvas ── */}
      <div className="relative w-full bg-[#f6f2ee] overflow-hidden" style={{ minHeight: "480px" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block"
          style={{ maxHeight: "580px" }}
        >
          {/* Subtle Latitude/Longitude Grid Lines */}
          <path
            d={pathGenerator(graticule) || ""}
            fill="none"
            stroke="oklch(var(--bc) / 0.05)"
            strokeWidth="0.75"
          />

          {/* Continents & Countries */}
          <path
            d={landPath}
            fill="#e5dfd8"
            stroke="#d4cdc5"
            strokeWidth="0.8"
          />
          <path
            d={countriesPath}
            fill="none"
            stroke="#d8d1c9"
            strokeWidth="0.4"
          />

          {/* Global Shipping Lanes (Animated Dashed Lines) */}
          {showShippingRoutes &&
            SHIPPING_ROUTES.map((route) => {
              const projectedPoints = route.coordinates.map((coord) => projection(coord));
              const validPoints = projectedPoints.filter(Boolean) as [number, number][];
              if (validPoints.length < 2) return null;

              const pathD = `M ${validPoints.map((p) => `${p[0]},${p[1]}`).join(" L ")}`;

              return (
                <g key={route.id} className="opacity-60 hover:opacity-100 transition-opacity">
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </g>
              );
            })}

          {/* Strategic Choke Points Markers */}
          {showChokePoints &&
            STRATEGIC_CHOKEPOINTS.map((cp) => {
              const pt = projection(cp.coordinates);
              if (!pt) return null;
              return (
                <g key={cp.name} transform={`translate(${pt[0]}, ${pt[1]})`}>
                  <rect
                    x="-3"
                    y="-3"
                    width="6"
                    height="6"
                    fill="#656b69"
                    className="opacity-70"
                    transform="rotate(45)"
                  />
                  <text
                    x="5"
                    y="3"
                    fontSize="7"
                    fontFamily="monospace"
                    fill="#656b69"
                    className="select-none pointer-events-none font-semibold"
                  >
                    {cp.name}
                  </text>
                </g>
              );
            })}

          {/* Active OSINT Disruption Hotspots (Pulsing Radar Rings) */}
          {filteredHotspots.map((spot) => {
            const pt = projection(spot.coordinates);
            if (!pt) return null;
            const isSelected = spot.id === selectedHotspotId;
            const isCritical = spot.severity === "CRITICAL";
            const color = isCritical ? "#f87272" : spot.severity === "HIGH" ? "#fbbd23" : "#3abff8";

            return (
              <g
                key={spot.id}
                transform={`translate(${pt[0]}, ${pt[1]})`}
                onClick={() => setSelectedHotspotId(spot.id)}
                className="cursor-pointer group"
              >
                {/* Outer Radar Ping Ring */}
                <circle
                  r={isSelected ? "14" : "10"}
                  fill={color}
                  className="animate-ping opacity-30 pointer-events-none"
                />

                {/* Focus Ring */}
                {isSelected && (
                  <circle
                    r="12"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    className="animate-spin pointer-events-none"
                    style={{ animationDuration: "8s" }}
                  />
                )}

                {/* Center Beacon Dot */}
                <circle
                  r={isSelected ? "6" : "4.5"}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-transform group-hover:scale-125"
                />

                {/* Micro Label */}
                <text
                  x="8"
                  y="2"
                  fontSize="8"
                  fontFamily="monospace"
                  fill="#1f2937"
                  className="font-bold select-none drop-shadow-sm"
                >
                  {spot.title.split("—")[0].slice(0, 18)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ── Active Incident Overlay Telemetry HUD (Bottom Left) ── */}
        <div className="absolute bottom-3 left-3 bg-base-100/90 backdrop-blur-sm border border-base-300 p-3 rounded-xl shadow-md text-xs font-mono max-w-xs pointer-events-none">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-base-200">
            <span className="text-[10px] text-base-content/50 uppercase font-bold">
              Active OSINT Incidents
            </span>
            <span className="badge badge-primary badge-xs font-bold">
              {filteredHotspots.length} Tracked
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div>
              <span className="text-base-content/40 block">CRITICAL</span>
              <span className="text-error font-bold">2 Ports/Lanes</span>
            </div>
            <div>
              <span className="text-base-content/40 block">WEATHER</span>
              <span className="text-warning font-bold">1 Cyclone</span>
            </div>
            <div>
              <span className="text-base-content/40 block">POLICY</span>
              <span className="text-info font-bold">1 Customs</span>
            </div>
          </div>
        </div>

        {/* ── Selected Hotspot Intelligence Briefing Drawer (Right Overlay) ── */}
        {selectedHotspot && (
          <div className="absolute top-3 right-3 w-80 bg-base-100 border border-base-300 rounded-xl p-4 shadow-xl z-20 space-y-3 font-mono text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-base-200">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-error animate-pulse" />
                <span className="font-bold text-base-content uppercase">
                  OSINT Dossier: {selectedHotspot.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedHotspotId("")}
                className="btn btn-ghost btn-xs btn-circle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`badge badge-sm font-bold ${
                  selectedHotspot.severity === "CRITICAL" ? "badge-error" : "badge-warning"
                }`}>
                  {selectedHotspot.severity} THREAT
                </span>
                <span className="text-[10px] text-base-content/40">{selectedHotspot.activeSince}</span>
              </div>
              <h3 className="font-serif font-bold text-sm text-base-content leading-snug">
                {selectedHotspot.title}
              </h3>
              <p className="text-[11px] text-base-content/50 font-sans mt-1">
                {selectedHotspot.locationName} · {selectedHotspot.chokePoint}
              </p>
            </div>

            <div className="bg-base-200 p-2.5 rounded-lg space-y-1">
              <span className="text-[9px] text-base-content/40 block uppercase">
                Source: {selectedHotspot.source}
              </span>
              <p className="text-xs text-base-content font-sans leading-relaxed">
                "{selectedHotspot.summary}"
              </p>
            </div>

            <div className="space-y-1 text-[11px]">
              <span className="text-[10px] text-accent font-bold uppercase block">
                Supply Chain Corridor Ripple:
              </span>
              <p className="text-base-content/70 font-sans">
                {selectedHotspot.corridorImpact}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-base-200 flex flex-col gap-1.5">
              <button
                onClick={triggerLiveDisruption}
                className="btn btn-error btn-sm w-full gap-1 font-mono text-xs shadow-sm"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Simulate Corridor Disruption</span>
              </button>
              <Link
                href="/signals"
                className="btn btn-ghost btn-xs w-full gap-1 font-mono text-primary text-[10px]"
              >
                <Sparkles className="w-3 h-3" />
                <span>Deep-Dive with Gemini AI in Signals →</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
