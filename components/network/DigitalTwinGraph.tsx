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
import { ShieldAlert, X, Sparkles, RotateCw } from "lucide-react";

const nodeTypes = { custom: CustomNode };

interface DigitalTwinGraphProps {
  height?: string;
  showInspector?: boolean;
}

export default function DigitalTwinGraph({ height = "560px", showInspector = true }: DigitalTwinGraphProps) {
  const {
    systemMode,
    dataMode,
    disruptedNodeId,
    currentSignal,
    dynamicNetworkFlow,
    isAiSynthesizing,
    refreshAiSimulation,
  } = useResilience();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(disruptedNodeId || "PORT-01");

  // Keep selected node in sync when disruption changes
  React.useEffect(() => {
    if (disruptedNodeId) {
      setSelectedNodeId(disruptedNodeId);
    }
  }, [disruptedNodeId]);

  const pipelinePositions: Record<string, { x: number; y: number }> = {
    "SUP-01": { x: 30, y: 70 }, "SUP-02": { x: 30, y: 220 }, "SUP-03": { x: 30, y: 370 },
    "PORT-01": { x: 280, y: 70 }, "PORT-02": { x: 280, y: 220 }, "PORT-03": { x: 500, y: 150 },
    "SHP-8821": { x: 390, y: 20 }, "PLANT-01": { x: 730, y: 150 },
    "INV-01": { x: 970, y: 90 }, "INV-02": { x: 970, y: 260 }, "CUST-01": { x: 1210, y: 180 },
  };

  const initialNodes: Node[] = useMemo(() => {
    return networkData.nodes.map((n) => {
      let status = n.status as "HEALTHY" | "AT_RISK" | "DISRUPTED" | "RECOVERED";
      let health = n.healthScore;
      let label = n.label;
      let location = n.location;
      let throughputRate = n.throughputRate;

      // Dynamically adapt node parameters from AI-synthesized flow
      if (dataMode === "REAL_TIME" && dynamicNetworkFlow) {
        if (n.id === "SUP-01") {
          label = dynamicNetworkFlow.supplier.primaryName;
          location = dynamicNetworkFlow.supplier.primaryLocation;
          throughputRate = dynamicNetworkFlow.supplier.primaryThroughput;
        } else if (n.id === "SUP-02") {
          label = dynamicNetworkFlow.supplier.backupName;
          location = dynamicNetworkFlow.supplier.backupLocation;
        } else if (n.id === "SUP-03") {
          label = dynamicNetworkFlow.supplier.domesticName;
          location = dynamicNetworkFlow.supplier.domesticLocation;
        } else if (n.id === "PORT-01") {
          label = dynamicNetworkFlow.ports.disruptedPortName;
          location = dynamicNetworkFlow.ports.disruptedLocation;
          throughputRate = dynamicNetworkFlow.ports.disruptedThroughput;
        } else if (n.id === "PORT-02") {
          label = dynamicNetworkFlow.ports.backupPortName;
          location = dynamicNetworkFlow.ports.backupLocation;
        } else if (n.id === "PORT-03") {
          label = dynamicNetworkFlow.ports.destinationPortName;
          location = dynamicNetworkFlow.ports.destinationLocation;
        } else if (n.id === "SHP-8821") {
          label = dynamicNetworkFlow.shipment.vesselName;
        } else if (n.id === "PLANT-01") {
          label = dynamicNetworkFlow.plant.name;
          location = dynamicNetworkFlow.plant.location;
        }
      }

      const isDirectlyDisrupted = n.id === disruptedNodeId;
      const isDownstreamPlant = (disruptedNodeId === "INV-01" || disruptedNodeId === "PORT-01" || disruptedNodeId === "SUP-01") && n.id === "PLANT-01";
      const isTransitAffected = (disruptedNodeId === "PORT-01" || disruptedNodeId === "SHP-8821") && n.id === "SHP-8821";
      const isCustomerAffected = (disruptedNodeId === "INV-01" || disruptedNodeId === "CUST-01") && n.id === "CUST-01";

      if (systemMode === "REHEARSAL") {
        if (isDirectlyDisrupted) {
          status = "DISRUPTED";
          health = 68;
        } else if (isTransitAffected || isDownstreamPlant) {
          status = "AT_RISK";
          health = 75;
        } else {
          status = "HEALTHY";
          health = 98;
        }
      } else if (systemMode === "LIVE_DISRUPTION") {
        if (isDirectlyDisrupted) {
          status = "DISRUPTED";
          health = 18;
        } else if (isTransitAffected || isDownstreamPlant) {
          status = "DISRUPTED";
          health = 32;
        } else if (isCustomerAffected || n.id === "INV-01") {
          status = "AT_RISK";
          health = 48;
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
          label,
          location,
          throughputRate,
          status,
          healthScore: health,
          selected: n.id === selectedNodeId,
          onSelect: (id: string) => setSelectedNodeId(id),
        },
      };
    });
  }, [systemMode, selectedNodeId, disruptedNodeId, dataMode, dynamicNetworkFlow]);

  const initialEdges: Edge[] = useMemo(() => {
    return networkData.edges.map((e) => {
      const isCritical =
        e.source === disruptedNodeId ||
        e.target === disruptedNodeId ||
        (disruptedNodeId === "INV-01" && (e.source === "PLANT-01" || e.target === "CUST-01")) ||
        (disruptedNodeId === "PORT-01" && (e.source === "PORT-01" || e.target === "PLANT-01"));

      let stroke = "#d1d5db";
      let animated = false;
      if (systemMode === "LIVE_DISRUPTION" && isCritical) {
        stroke = "#f87272";
        animated = true;
      } else if (systemMode === "RECOVERED") {
        stroke = "#36d399";
      } else if (e.status === "ACTIVE") {
        stroke = "#b8b4ac";
      }
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        animated,
        style: { stroke, strokeWidth: isCritical && systemMode === "LIVE_DISRUPTION" ? 2.5 : 1.5 },
      };
    });
  }, [systemMode, disruptedNodeId]);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  React.useEffect(() => { setNodes(initialNodes); setEdges(initialEdges); }, [initialNodes, initialEdges]);
  const onNodesChange = (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds));

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return networkData.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  return (
    <div className="relative w-full flex flex-col bg-base-100 overflow-hidden rounded-2xl border border-base-300">
      {/* Pipeline stages */}
      <div className="px-4 py-2.5 border-b border-base-200 bg-base-200/50 flex items-center justify-between text-[11px] font-mono text-base-content/40">
        <div className="flex items-center gap-4 overflow-x-auto">
          <span className="text-base-content/60 font-semibold uppercase tracking-wider">Pipeline:</span>
          {["Suppliers", "Ports", "Transit", "Plants", "Hubs", "OEM"].map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <span className="text-base-content/15">→</span>}
              <span className={
                systemMode === "LIVE_DISRUPTION" && (
                  (disruptedNodeId === "SUP-01" && i === 0) ||
                  (disruptedNodeId === "PORT-01" && (i === 1 || i === 2)) ||
                  (disruptedNodeId === "INV-01" && (i === 3 || i === 4)) ||
                  (disruptedNodeId === "SHP-8821" && i === 2)
                ) ? "text-error font-bold" : ""
              }>
                {i + 1}. {s}
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          {isAiSynthesizing ? (
            <span className="badge badge-warning badge-xs font-mono gap-1 animate-pulse">
              <span className="loading loading-spinner loading-xs" />
              AI Synthesizing Flow...
            </span>
          ) : dynamicNetworkFlow && dataMode === "REAL_TIME" ? (
            <div className="flex items-center gap-1.5">
              <span className="badge badge-primary badge-xs font-mono gap-1">
                <Sparkles className="w-2.5 h-2.5 text-primary-content" />
                {dynamicNetworkFlow.aiGenerated ? "GEMINI 3.6 TOPOLOGY" : "AI ADAPTIVE FLOW"}
              </span>
              <button
                onClick={() => refreshAiSimulation(true)}
                disabled={isAiSynthesizing}
                title="Hard reload topology from Gemini AI"
                className="btn btn-ghost btn-xs px-1 h-5 min-h-0 text-base-content/50 hover:text-primary"
              >
                <RotateCw className={`w-2.5 h-2.5 ${isAiSynthesizing ? "animate-spin text-primary" : ""}`} />
              </button>
            </div>
          ) : null}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1"><span className="badge badge-success badge-xs" /><span>OK</span></div>
            <div className="flex items-center gap-1"><span className="badge badge-warning badge-xs" /><span>Risk</span></div>
            <div className="flex items-center gap-1"><span className="badge badge-error badge-xs" /><span>Down</span></div>
          </div>
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.15 }} minZoom={0.3} maxZoom={1.4} proOptions={{ hideAttribution: true }}>
          <Background color="#e7e2df" gap={32} size={1} />
          <Controls showInteractive={false} className="!left-3 !bottom-3" />
        </ReactFlow>

        {systemMode === "LIVE_DISRUPTION" && (
          <div className="absolute top-4 left-4 z-10">
            <div role="alert" className="alert alert-error shadow-lg max-w-sm">
              <ShieldAlert className="w-5 h-5 shrink-0 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm">Disruption Propagating</h3>
                <div className="text-xs">
                  {currentSignal?.facility || "Critical node"} impact cascading through supply chain dependencies
                </div>
              </div>
            </div>
          </div>
        )}

        {showInspector && selectedNode && (
          <div className="absolute top-4 right-4 z-20">
            <div className="card bg-base-100 shadow-xl w-64 border border-base-300">
              <div className="card-body p-4 gap-2">
                <div className="flex items-center justify-between">
                  <span className="badge badge-ghost badge-sm font-mono text-[10px]">{selectedNode.type}</span>
                  <button onClick={() => setSelectedNodeId(null)} className="btn btn-ghost btn-xs btn-circle"><X className="w-3.5 h-3.5" /></button>
                </div>
                <h3 className="font-semibold text-sm">{selectedNode.label}</h3>
                <p className="text-xs text-base-content/40 font-mono">{selectedNode.location}</p>
                <div className="divider my-0" />
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-base-content/40">Health</span>
                    <span className={`badge badge-sm font-bold ${
                      selectedNode.id === disruptedNodeId && systemMode === "LIVE_DISRUPTION"
                        ? "badge-error"
                        : selectedNode.healthScore > 75 ? "badge-success" : selectedNode.healthScore > 40 ? "badge-warning" : "badge-error"
                    }`}>
                      {selectedNode.id === disruptedNodeId && systemMode === "LIVE_DISRUPTION" ? "18%" : `${selectedNode.healthScore}%`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/40">Buffer</span>
                    <span className="font-medium tabular-data">
                      {selectedNode.id === "INV-01" && disruptedNodeId === "INV-01"
                        ? "0.0d (DESTROYED)"
                        : selectedNode.daysOfInventory > 0 ? `${selectedNode.daysOfInventory}d` : "Pipeline"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/40">Exposure</span>
                    <span className="font-bold text-warning tabular-data">₹{selectedNode.financialExposure}Cr</span>
                  </div>
                </div>
                <progress className="progress progress-primary w-full h-1.5 mt-2" value={selectedNode.capacityUtilization} max="100" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
