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
import { ShieldAlert, Info, ArrowRight, Gauge, Clock, DollarSign } from "lucide-react";

const nodeTypes = {
  custom: CustomNode,
};

interface DigitalTwinGraphProps {
  height?: string;
  showInspector?: boolean;
}

export default function DigitalTwinGraph({
  height = "520px",
  showInspector = true,
}: DigitalTwinGraphProps) {
  const { systemMode, networkHealth } = useResilience();
  const [selectedNodeId, setSelectedNodeId] = useState<string>("PORT-01");

  // Dynamically update nodes and edges based on whether disruption is active
  const initialNodes: Node[] = useMemo(() => {
    return networkData.nodes.map((n) => {
      let status = n.status as "HEALTHY" | "AT_RISK" | "DISRUPTED" | "RECOVERED";
      let health = n.healthScore;

      // When in REHEARSAL mode, show baseline healthy status for non-disrupted nodes
      if (systemMode === "REHEARSAL") {
        if (n.id === "PORT-01") {
          status = "AT_RISK";
          health = 74;
        } else if (n.id === "SHP-8821") {
          status = "AT_RISK";
          health = 70;
        } else {
          status = "HEALTHY";
          health = 98;
        }
      } else if (systemMode === "RECOVERED") {
        status = "RECOVERED";
        health = 96;
      }

      return {
        id: n.id,
        type: "custom",
        position: { x: n.coordinates.x, y: n.coordinates.y },
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
      const isDisruptedPath =
        e.source === "PORT-01" ||
        e.target === "PORT-01" ||
        e.source === "SHP-8821" ||
        (systemMode === "LIVE_DISRUPTION" && e.target === "PLANT-01");

      let stroke = "#292E2F";
      let animated = false;

      if (systemMode === "LIVE_DISRUPTION" && isDisruptedPath) {
        stroke = "#D7655A";
        animated = true;
      } else if (systemMode === "RECOVERED") {
        stroke = "#73B58A";
        animated = false;
      } else if (e.status === "ACTIVE") {
        stroke = "#414A4D";
      }

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        animated,
        style: {
          stroke,
          strokeWidth: isDisruptedPath && systemMode === "LIVE_DISRUPTION" ? 2.5 : 1.5,
        },
      };
    });
  }, [systemMode]);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Sync state when systemMode or selectedNodeId changes
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const selectedNode = useMemo(() => {
    return networkData.nodes.find((n) => n.id === selectedNodeId) || networkData.nodes[0];
  }, [selectedNodeId]);

  return (
    <div className="relative border border-[#292E2F] bg-[#0B0D0E] flex flex-col w-full overflow-hidden">
      {/* Network Header with Legend & Telemetry */}
      <div className="px-3.5 py-2 border-b border-[#292E2F] bg-[#111416] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-[#62B8C8] font-bold tracking-wider uppercase">
            COMPUTATIONAL TWIN TOPOLOGY
          </span>
          <span className="text-[#5F6564]">|</span>
          <span className="text-[#9A9C97]">
            NODES: <b className="text-[#E8E5DD]">{networkData.nodes.length}</b>
          </span>
          <span className="text-[#9A9C97]">
            TRANSIT ARCS: <b className="text-[#E8E5DD]">{networkData.edges.length}</b>
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center space-x-3 text-[11px]">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-[#73B58A]" />
            <span className="text-[#9A9C97]">HEALTHY</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-[#D6A84F]" />
            <span className="text-[#9A9C97]">AT RISK</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-[#D7655A]" />
            <span className="text-[#9A9C97]">DISRUPTED</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-[#62B8C8]" />
            <span className="text-[#9A9C97]">RECOVERED</span>
          </div>
        </div>
      </div>

      {/* Main Flow Canvas & Optional Sidebar */}
      <div className="relative flex-1 flex flex-col md:flex-row" style={{ height }}>
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#292E2F" gap={24} size={1} />
            <Controls showInteractive={false} className="!left-2 !bottom-2" />
          </ReactFlow>

          {/* Real-time cascading alert overlay */}
          {systemMode === "LIVE_DISRUPTION" && (
            <div className="absolute top-3 left-3 bg-[#1A0F0E] border border-[#572A26] px-3 py-2 flex items-center space-x-2 text-xs font-mono z-10">
              <ShieldAlert className="w-4 h-4 text-[#D7655A] animate-pulse" />
              <div>
                <span className="text-[#D7655A] font-bold">CRITICAL IMPACT PROPAGATION:</span>
                <span className="text-[#E8E5DD] ml-1.5">
                  Port of Shanghai Stalled → 3 Dependent Entities Degraded
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Selected Entity Inspector Panel */}
        {showInspector && selectedNode && (
          <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-[#292E2F] bg-[#111416] p-3.5 flex flex-col justify-between text-xs font-mono">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#1C2123] mb-2.5">
                <span className="text-[10px] text-[#5F6564] uppercase tracking-wider">
                  NODE TELEMETRY
                </span>
                <span className="text-[#62B8C8] font-bold">{selectedNode.id}</span>
              </div>

              <div className="text-sm font-serif font-bold text-[#E8E5DD] mb-1">
                {selectedNode.label}
              </div>
              <div className="text-[11px] text-[#9A9C97] mb-3">
                {selectedNode.location}
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-1 border-b border-[#1C2123]">
                  <span className="text-[#5F6564] flex items-center space-x-1.5">
                    <Gauge className="w-3 h-3 text-[#9A9C97]" />
                    <span>HEALTH SCORE</span>
                  </span>
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
                  <span className="text-[#5F6564] flex items-center space-x-1.5">
                    <Clock className="w-3 h-3 text-[#9A9C97]" />
                    <span>BUFFER DAYS</span>
                  </span>
                  <span className="text-[#E8E5DD] tabular-data">
                    {selectedNode.daysOfInventory > 0
                      ? `${selectedNode.daysOfInventory} Days`
                      : "0 (Direct Pipeline)"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#1C2123]">
                  <span className="text-[#5F6564] flex items-center space-x-1.5">
                    <DollarSign className="w-3 h-3 text-[#9A9C97]" />
                    <span>FINANCIAL EXPOSURE</span>
                  </span>
                  <span className="text-[#D6A84F] font-bold tabular-data">
                    ₹{selectedNode.financialExposure} Cr
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[#5F6564] block mb-1">OPERATIONAL CAPACITY:</span>
                  <div className="w-full bg-[#171B1D] border border-[#292E2F] h-2">
                    <div
                      className="bg-[#62B8C8] h-full transition-all duration-500"
                      style={{ width: `${selectedNode.capacityUtilization}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#5F6564] mt-1">
                    <span>{selectedNode.throughputRate}</span>
                    <span>{selectedNode.capacityUtilization}% UTIL</span>
                  </div>
                </div>

                {selectedNode.dependencies.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[#5F6564] block mb-1">UPSTREAM DEPENDENCIES:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.dependencies.map((dep) => (
                        <button
                          key={dep}
                          onClick={() => setSelectedNodeId(dep)}
                          className="px-1.5 py-0.5 bg-[#171B1D] border border-[#292E2F] text-[10px] text-[#62B8C8] hover:border-[#62B8C8]"
                        >
                          {dep} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-[#1C2123] text-[10px] text-[#5F6564]">
              Click any node to inspect operational parameters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
