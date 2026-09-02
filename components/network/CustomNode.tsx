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

  return (
    <div
      onClick={() => data.onSelect && data.onSelect(data.id)}
      className={`min-w-[210px] max-w-[230px] p-3 transition-all cursor-pointer select-none rounded-sm border ${
        isDisrupted
          ? "bg-[#1C1211] border-[#D7655A] shadow-[0_0_15px_rgba(215,101,90,0.15)]"
          : isAtRisk
          ? "bg-[#18150E] border-[#D6A84F]"
          : isRecovered
          ? "bg-[#0E1712] border-[#73B58A]"
          : "bg-[#121517] border-[#242A2C] hover:border-[#3E474A]"
      } ${data.selected ? "ring-1 ring-[#62B8C8] bg-[#161B1E]" : ""}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-[#656B69] !border-none"
      />

      {/* Node Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center space-x-1.5">
          <Icon className="w-3.5 h-3.5 text-[#9A9C97]" />
          <span className="text-[10px] font-mono tracking-wider text-[#656B69] uppercase font-semibold">
            {data.type}
          </span>
        </div>

        {/* Status indicator dot + text */}
        <div className="flex items-center space-x-1 font-mono text-[10px]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isDisrupted
                ? "bg-[#D7655A] animate-pulse"
                : isAtRisk
                ? "bg-[#D6A84F]"
                : isRecovered
                ? "bg-[#62B8C8]"
                : "bg-[#73B58A]"
            }`}
          />
          <span
            className={`font-semibold ${
              isDisrupted
                ? "text-[#D7655A]"
                : isAtRisk
                ? "text-[#D6A84F]"
                : isRecovered
                ? "text-[#62B8C8]"
                : "text-[#73B58A]"
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>

      {/* Main Label */}
      <div className="text-xs font-sans font-semibold text-[#E8E5DD] leading-tight truncate mb-1">
        {data.label}
      </div>

      {/* Context info / Location */}
      <div className="text-[11px] font-mono text-[#656B69] truncate mb-2">
        {data.location}
      </div>

      {/* Primary Metric Line */}
      <div className="flex items-center justify-between pt-1.5 border-t border-[#1C2123] text-[11px] font-mono">
        <span className="text-[#656B69]">
          {data.daysOfInventory > 0 ? "BUFFER" : "EXPOSURE"}
        </span>
        <span
          className={`font-bold tabular-data ${
            isDisrupted
              ? "text-[#D7655A]"
              : isAtRisk
              ? "text-[#D6A84F]"
              : "text-[#E8E5DD]"
          }`}
        >
          {data.daysOfInventory > 0
            ? `${data.daysOfInventory}d`
            : `₹${data.financialExposure} Cr`}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-[#656B69] !border-none"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
