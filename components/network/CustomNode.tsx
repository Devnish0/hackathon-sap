"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Factory,
  Anchor,
  Ship,
  Warehouse,
  Users,
  Cpu,
} from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  type: "SUPPLIER" | "PORT" | "SHIPMENT" | "PLANT" | "INVENTORY" | "CUSTOMER";
  location: string;
  status: "HEALTHY" | "AT_RISK" | "DISRUPTED" | "RECOVERED";
  healthScore: number;
  capacityUtilization: number;
  throughputRate: string;
  daysOfInventory: number;
  financialExposure: number;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

const typeIcons = {
  SUPPLIER: Cpu,
  PORT: Anchor,
  SHIPMENT: Ship,
  PLANT: Factory,
  INVENTORY: Warehouse,
  CUSTOMER: Users,
};

export const CustomNode = memo(({ data }: { data: NodeData }) => {
  const Icon = typeIcons[data.type] || Factory;
  const isDisrupted = data.status === "DISRUPTED";
  const isAtRisk = data.status === "AT_RISK";
  const isRecovered = data.status === "RECOVERED";

  const statusBadgeClass = isDisrupted
    ? "badge-error"
    : isAtRisk
    ? "badge-warning"
    : isRecovered
    ? "badge-info"
    : "badge-success";

  return (
    <div
      onClick={() => data.onSelect && data.onSelect(data.id)}
      className={`card card-compact bg-base-100 shadow-sm min-w-[200px] max-w-[220px] cursor-pointer select-none transition-all hover:shadow-md border ${
        isDisrupted
          ? "border-error/40"
          : isAtRisk
          ? "border-warning/40"
          : isRecovered
          ? "border-info/30"
          : "border-base-300"
      } ${data.selected ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100 shadow-md" : ""}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-base-content/20 !border-none !rounded-full"
      />

      <div className="card-body p-3 gap-1">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`p-1 rounded-md ${
              isDisrupted ? "bg-error/10" : isAtRisk ? "bg-warning/10" : "bg-base-200"
            }`}>
              <Icon className={`w-3 h-3 ${
                isDisrupted ? "text-error" : isAtRisk ? "text-warning" : "text-base-content/50"
              }`} />
            </div>
            <span className="text-[9px] font-mono tracking-wider text-base-content/35 uppercase font-bold">
              {data.type}
            </span>
          </div>
          <span className={`badge badge-xs ${statusBadgeClass} gap-1 font-mono`}>
            {isDisrupted && <span className="animate-pulse">●</span>}
            {data.status}
          </span>
        </div>

        {/* Label */}
        <h3 className="text-xs font-semibold text-base-content leading-tight truncate">
          {data.label}
        </h3>

        {/* Location */}
        <p className="text-[10px] font-mono text-base-content/35 truncate">
          {data.location}
        </p>

        {/* Metric */}
        <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-base-200 text-[10px] font-mono">
          <span className="text-base-content/35">
            {data.daysOfInventory > 0 ? "Buffer" : "Exposure"}
          </span>
          <span
            className={`font-bold tabular-data ${
              isDisrupted ? "text-error" : isAtRisk ? "text-warning" : "text-base-content"
            }`}
          >
            {data.daysOfInventory > 0
              ? `${data.daysOfInventory}d`
              : `₹${data.financialExposure}Cr`}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-base-content/20 !border-none !rounded-full"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
