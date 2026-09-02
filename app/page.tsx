import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Resilience Autopilot | Supply Chain Resilience Platform",
  description:
    "Enterprise supply chain resilience platform that continuously monitors disruption signals, rehearses scenarios, and executes validated recovery playbooks.",
};

export default function Page() {
  return <HomePage />;
}
