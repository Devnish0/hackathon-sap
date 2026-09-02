"use client";

import React, { useState, useEffect } from "react";
import { useResilience } from "@/lib/context/ResilienceContext";
import { Clock, Radio, ShieldAlert } from "lucide-react";

export default function Header() {
  const { systemMode, isRecovering } = useResilience();
  const [timeString, setTimeString] = useState("17:42:08 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(" ")[0] + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-10 border-b border-[#1C2123] bg-[#0B0D0E] px-6 flex items-center justify-between text-xs select-none">
      {/* Active Operational Context Breadcrumb */}
      <div className="flex items-center space-x-3 text-[11px] font-mono">
        <div className="flex items-center space-x-2">
          {systemMode === "LIVE_DISRUPTION" ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#D7655A] animate-pulse" />
              <span className="text-[#D7655A] font-semibold tracking-wider">
                LIVE DISRUPTION ACTIVE: SHANGHAI PORT (CNSHG)
              </span>
            </>
          ) : isRecovering ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-ping" />
              <span className="text-[#D6A84F] font-semibold tracking-wider">
                EXECUTING MULTI-STAGE RECOVERY ACTIONS...
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#62B8C8]" />
              <span className="text-[#9A9C97]">
                CONTINUOUS REHEARSAL MONITORING: <b className="text-[#E8E5DD]">SHANGHAI YANGSHAN FAIRWAY</b>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Telemetry Clock & System Sync */}
      <div className="flex items-center space-x-4 text-[11px] font-mono text-[#656B69]">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[#9A9C97]">{timeString}</span>
        </div>
        <span>·</span>
        <div className="flex items-center space-x-1 text-[#73B58A]">
          <span>FEED SYNCED</span>
        </div>
      </div>
    </header>
  );
}
