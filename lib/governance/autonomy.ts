import { RiskClassification, AutonomyLevel } from "@/lib/types";

export interface GovernanceRule {
  category: "INVENTORY" | "LOGISTICS" | "PROCUREMENT" | "FINANCE" | "COMPLIANCE";
  maxFinancialExposureINR: number;
  isSupplierChange: boolean;
  isPortChange: boolean;
}

export function evaluateAutonomyLevel(
  risk: RiskClassification,
  rule: GovernanceRule
): AutonomyLevel {
  // Hard policy rules for Human Gate
  if (rule.isSupplierChange) {
    return "HUMAN_APPROVAL_REQUIRED";
  }

  if (rule.maxFinancialExposureINR > 500000) {
    return "HUMAN_APPROVAL_REQUIRED";
  }

  if (risk === "HIGH") {
    return "HUMAN_APPROVAL_REQUIRED";
  }

  // Low-risk inventory redistribution or feeder reprioritization qualifies for auto-dispatch
  return "AUTO_EXECUTE";
}
