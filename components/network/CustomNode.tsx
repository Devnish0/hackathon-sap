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
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
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

const statusBorderColors = {
  HEALTHY: "border-[#292E2F] hover:border-[#62B8C8]",
  AT_RISK: "border-[#544121] bg-[#14120D]",
  DISRUPTED: "border-[#572A26] bg-[#1A0F0E]",
  RECOVERED: "border-[#244931] bg-[#0E1712]",
};

const statusTextColors = {
  HEALTHY: "text-[#73B58A]",
  AT_RISK: "text-[#D6A84F]",
  DISRUPTED: "text-[#D7655A]",
  RECOVERED: "text-[#62B8C8]",
};

export const CustomNode = memo(({ data }: { data: NodeData }) => {
  const Icon = typeIcons[data.type] || Factory;
  const isDisrupted = data.status === "DISRUPTED";
  const isAtRisk = data.status === "AT_RISK";

  return (
    <div
      onClick={() => data.onSelect && data.onSelect(data.id)}
      className={`min-w-[190px] max-w-[220px] p-2.5 bg-[#111416] border transition-all cursor-pointer select-none tech-mark-corner ${
        statusBorderColors[data.status] || "border-[#292E2F]"
      } ${data.selected ? "ring-1 ring-[#62B8C8] bg-[#171B1D]" : ""}`}
    >
      {/* Target input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-[#292E2F] !border-none"
      />

      {/* Header with Type & Status */}
      <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#1C2123]">
        <div className="flex items-center space-x-1.5">
          <Icon className="w-3.5 h-3.5 text-[#9A9C97]" />
          <span className="text-[10px] font-mono tracking-wider text-[#9A9C97] uppercase">
            {data.type}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {isDisrupted ? (
            <AlertOctagon className="w-3 h-3 text-[#D7655A] animate-pulse" />
          ) : isAtRisk ? (
            <AlertTriangle className="w-3 h-3 text-[#D6A84F]" />
          ) : (
            <CheckCircle2 className="w-3 h-3 text-[#73B58A]" />
          )}
          <span
            className={`text-[10px] font-mono font-bold ${
              statusTextColors[data.status]
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>

      {/* Node Label */}
      <div className="text-xs font-semibold text-[#E8E5DD] leading-snug truncate mb-1">
        {data.label}
      </div>

      {/* Subtitle / Location */}
      <div className="text-[10px] font-mono text-[#5F6564] truncate mb-2">
        LOC: {data.location}
      </div>

      {/* Key Metric Row */}
      <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-[#1C2123] text-[10px] font-mono">
        <div>
          <span className="text-[#5F6564] block">HEALTH</span>
          <span
            className={`font-bold tabular-data ${
              data.healthScore > 75
                ? "text-[#73B58A]"
                : data.healthScore > 40
                ? "text-[#D6A84F]"
                : "text-[#D7655A]"
            }`}
          >
            {data.healthScore}%
          </span>
        </div>
        <div className="text-right">
          <span className="text-[#5F6564] block">BUFFER</span>
          <span className="text-[#E8E5DD] tabular-data">
            {data.daysOfInventory > 0 ? `${data.daysOfInventory}d` : "0d"}
          </span>
        </div>
      </div>

      {/* Source output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-[#292E2F] !border-none"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
