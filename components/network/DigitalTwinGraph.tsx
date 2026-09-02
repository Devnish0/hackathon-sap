"use client";

import React, { useMemo, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomNode } from "./CustomNode";
import networkData from "@/data/network.json";
import { useResilience } from "@/lib/context/ResilienceContext";
import { ShieldAlert, Clock, DollarSign, X } from "lucide-react";

const nodeTypes = {
  custom: CustomNode,
};

interface DigitalTwinGraphProps {
  height?: string;
  showInspector?: boolean;
}

export default function DigitalTwinGraph({
  height = "560px",
  showInspector = true,
}: DigitalTwinGraphProps) {
  const { systemMode } = useResilience();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("PORT-01");

  // Spatial Pipeline Coordinates: SUPPLIER -> PORT -> SHIPMENT -> PLANT -> INVENTORY -> CUSTOMER
  const pipelinePositions: Record<string, { x: number; y: number }> = {
    // Column 1: Suppliers
    "SUP-01": { x: 30, y: 70 },
    "SUP-02": { x: 30, y: 220 },
    "SUP-03": { x: 30, y: 370 },

    // Column 2: Ports / Maritime Gateways
    "PORT-01": { x: 280, y: 70 },
    "PORT-02": { x: 280, y: 220 },
    "PORT-03": { x: 500, y: 150 },

    // Column 3: Shipments (In Transit)
    "SHP-8821": { x: 390, y: 20 },

    // Column 4: Manufacturing Plants
    "PLANT-01": { x: 730, y: 150 },

    // Column 5: Regional Inventory Buffers
    "INV-01": { x: 970, y: 90 },
    "INV-02": { x: 970, y: 260 },

    // Column 6: OEM Customer SLAs
    "CUST-01": { x: 1210, y: 180 },
  };

  const initialNodes: Node[] = useMemo(() => {
    return networkData.nodes.map((n) => {
      let status = n.status as "HEALTHY" | "AT_RISK" | "DISRUPTED" | "RECOVERED";
      let health = n.healthScore;

      if (systemMode === "REHEARSAL") {
        if (n.id === "PORT-01") {
          status = "DISRUPTED";
          health = 68;
        } else if (n.id === "SHP-8821") {
          status = "AT_RISK";
          health = 70;
        } else {
          status = "HEALTHY";
          health = 98;
        }
      } else if (systemMode === "LIVE_DISRUPTION") {
        // Disruption propagates down the critical path
        if (n.id === "PORT-01") {
          status = "DISRUPTED";
          health = 22;
        } else if (n.id === "SHP-8821") {
          status = "DISRUPTED";
          health = 15;
        } else if (n.id === "PLANT-01") {
          status = "AT_RISK";
          health = 48;
        } else if (n.id === "INV-01" || n.id === "CUST-01") {
          status = "AT_RISK";
          health = 54;
        }
      } else if (systemMode === "RECOVERED") {
        status = "RECOVERED";
        health = 96;
      }

      const pos = pipelinePositions[n.id] || { x: n.coordinates.x, y: n.coordinates.y };

      return {
        id: n.id,
        type: "custom",
        position: pos,
        data: {
          ...n,
          status,
          healthScore: health,
          selected: n.id === selectedNodeId,
          onSelect: (id: string) => setSelectedNodeId(id),
        },
      };
    });
  }, [systemMode, selectedNodeId]);

  const initialEdges: Edge[] = useMemo(() => {
    return networkData.edges.map((e) => {
      const isCriticalDisruptedCorridor =
        e.source === "PORT-01" ||
        e.target === "PORT-01" ||
        e.source === "SHP-8821" ||
        e.target === "SHP-8821" ||
        (systemMode === "LIVE_DISRUPTION" && e.target === "PLANT-01");

      let stroke = "#242A2C";
      let animated = false;

      if (systemMode === "LIVE_DISRUPTION" && isCriticalDisruptedCorridor) {
        stroke = "#D7655A";
        animated = true;
      } else if (systemMode === "RECOVERED") {
        stroke = "#73B58A";
        animated = false;
      } else if (e.status === "ACTIVE") {
        stroke = "#373F42";
      }

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        animated,
        style: {
          stroke,
          strokeWidth: isCriticalDisruptedCorridor && systemMode === "LIVE_DISRUPTION" ? 2.5 : 1.5,
        },
      };
    });
  }, [systemMode]);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return networkData.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  return (
    <div className="relative w-full flex flex-col bg-[#0B0D0E] overflow-hidden rounded-sm">
      {/* Visual Pipeline Stages Bar */}
      <div className="px-4 py-2 border-b border-[#1C2123] bg-[#0E1012] flex items-center justify-between text-[11px] font-mono text-[#656B69]">
        <div className="flex items-center space-x-6 overflow-x-auto">
          <span className="text-[#9A9C97] font-semibold tracking-wider uppercase">SUPPLY CHAIN PIPELINE:</span>
          <span>1. SUPPLIERS</span>
          <span>→</span>
          <span className={systemMode === "LIVE_DISRUPTION" ? "text-[#D7655A] font-bold" : ""}>
            2. GATEWAY PORTS
          </span>
          <span>→</span>
          <span className={systemMode === "LIVE_DISRUPTION" ? "text-[#D7655A] font-bold" : ""}>
            3. CARGO TRANSIT
          </span>
          <span>→</span>
          <span className={systemMode === "LIVE_DISRUPTION" ? "text-[#D6A84F] font-bold" : ""}>
            4. PLANTS
          </span>
          <span>→</span>
          <span className={systemMode === "LIVE_DISRUPTION" ? "text-[#D6A84F] font-bold" : ""}>
            5. REGIONAL HUBS
          </span>
          <span>→</span>
          <span>6. OEM SLAS</span>
        </div>

        <div className="hidden sm:flex items-center space-x-4 text-[10px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#73B58A]" />
            <span>Operational</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D6A84F]" />
            <span>At Risk</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D7655A]" />
            <span>Disrupted</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full" style={{ height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
          maxZoom={1.4}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#242A2C" gap={32} size={1} />
          <Controls showInteractive={false} className="!left-3 !bottom-3" />
        </ReactFlow>

        {/* Live Propagation Alert Tag */}
        {systemMode === "LIVE_DISRUPTION" && (
          <div className="absolute top-4 left-4 bg-[#1C1211] border border-[#572A26] px-3.5 py-2 flex items-center space-x-2.5 text-xs font-mono z-10 shadow-lg">
            <ShieldAlert className="w-4 h-4 text-[#D7655A] animate-pulse shrink-0" />
            <div>
              <span className="text-[#D7655A] font-bold block">PROPAGATING IMPACT:</span>
              <span className="text-[#E8E5DD] text-[11px] font-sans">
                Port of Shanghai stalled → Vessel Ever Vanguard delayed → Detroit buffer depleted to 1.4d
              </span>
            </div>
          </div>
        )}

        {/* Selected Node Inspector Drawer (Subtle, Overlay) */}
        {showInspector && selectedNode && (
          <div className="absolute top-4 right-4 w-72 bg-[#111416] border border-[#23282A] p-4 shadow-xl z-20 text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] mb-2.5">
              <span className="text-[10px] text-[#656B69] uppercase font-bold">
                {selectedNode.type} TELEMETRY
              </span>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="text-[#656B69] hover:text-[#E8E5DD] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-sm font-sans font-bold text-[#E8E5DD] mb-0.5">
              {selectedNode.label}
            </div>
            <div className="text-[11px] text-[#9A9C97] mb-3">
              {selectedNode.location}
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between py-1 border-b border-[#1C2123]">
                <span className="text-[#656B69]">HEALTH INDEX</span>
                <span
                  className={`font-bold tabular-data ${
                    selectedNode.healthScore > 75
                      ? "text-[#73B58A]"
                      : selectedNode.healthScore > 40
                      ? "text-[#D6A84F]"
                      : "text-[#D7655A]"
                  }`}
                >
                  {selectedNode.healthScore}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#1C2123]">
                <span className="text-[#656B69]">BUFFER REMAINING</span>
                <span className="text-[#E8E5DD] tabular-data">
                  {selectedNode.daysOfInventory > 0
                    ? `${selectedNode.daysOfInventory} Days`
                    : "Direct Transit Pipeline"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#1C2123]">
                <span className="text-[#656B69]">FINANCIAL EXPOSURE</span>
                <span className="text-[#D6A84F] font-bold tabular-data">
                  ₹{selectedNode.financialExposure} Cr
                </span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-[#656B69] mb-1">
                  <span>THROUGHPUT: {selectedNode.throughputRate}</span>
                  <span>{selectedNode.capacityUtilization}% UTIL</span>
                </div>
                <div className="w-full bg-[#171B1D] h-1.5 rounded-none overflow-hidden">
                  <div
                    className="bg-[#62B8C8] h-full"
                    style={{ width: `${selectedNode.capacityUtilization}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
