export interface StrategyWeights {
  cost: number;
  serviceLevel: number;
  recoveryTime: number;
  risk: number;
  compliance: number;
}

export const defaultWeights: StrategyWeights = {
  cost: 0.25,
  serviceLevel: 0.30,
  recoveryTime: 0.20,
  risk: 0.15,
  compliance: 0.10,
};

export function scoreStrategy(
  costINR: number,
  serviceLevelPercent: number,
  recoveryDays: number,
  isLowRisk: boolean,
  isCompliant: boolean,
  weights: StrategyWeights = defaultWeights
): number {
  if (!isCompliant) return 0; // Hard constraint elimination

  // Normalize cost: lower cost = higher score (benchmark ₹35L max)
  const costScore = Math.max(0, 100 - (costINR / 3500000) * 100);

  // Service level score (0 - 100)
  const slaScore = serviceLevelPercent;

  // Recovery days: lower is better (benchmark 30 days)
  const recoveryScore = Math.max(0, 100 - (recoveryDays / 30) * 100);

  // Risk score: low risk = 100, high risk = 40
  const riskScore = isLowRisk ? 100 : 40;

  // Compliance score: compliant = 100
  const compScore = 100;

  const totalScore =
    costScore * weights.cost +
    slaScore * weights.serviceLevel +
    recoveryScore * weights.recoveryTime +
    riskScore * weights.risk +
    compScore * weights.compliance;

  return Math.round(totalScore * 10) / 10;
}
