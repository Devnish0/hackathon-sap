"use client";

import React, { useState, useEffect } from "react";
import { useResilience } from "@/lib/context/ResilienceContext";
import { Clock, Wifi } from "lucide-react";

export default function Header() {
  const { systemMode, isRecovering } = useResilience();
  const [timeString, setTimeString] = useState("17:42:08");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(" ")[0]);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar bg-base-100 min-h-10 h-10 border-b border-base-300 px-6">
      {/* Left: Operational status */}
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono">
          {systemMode === "LIVE_DISRUPTION" ? (
            <>
              <span className="badge badge-error badge-xs animate-pulse" />
              <span className="text-error font-semibold">
                LIVE DISRUPTION — SHANGHAI PORT (CNSHG)
              </span>
            </>
          ) : isRecovering ? (
            <>
              <span className="badge badge-warning badge-xs animate-bounce" />
              <span className="text-warning font-semibold">
                EXECUTING RECOVERY ACTIONS...
              </span>
            </>
          ) : (
            <>
              <span className="badge badge-primary badge-xs" />
              <span className="text-base-content/50">
                Rehearsal monitoring:{" "}
                <span className="text-base-content font-medium">Shanghai Yangshan Fairway</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Clock & sync */}
      <div className="flex-none">
        <div className="flex items-center gap-3 text-xs font-mono text-base-content/40">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-data">{timeString}</span>
          </div>
          <div className="divider divider-horizontal m-0 w-0" />
          <div className="flex items-center gap-1 text-success">
            <Wifi className="w-3 h-3" />
            <span className="text-[10px]">SYNCED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
