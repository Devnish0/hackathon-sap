export function computeRecoveryCurve(initialHealth: number = 48) {
  return [
    { step: "T0_DISRUPTION", health: initialHealth, label: "Port Stalled (CNSHG)" },
    { step: "T1_BUFFER_DISPATCH", health: 67, label: "Texas Buffer Inflow (+1500u)" },
    { step: "T2_BUSAN_CONNECT", health: 84, label: "Feeder Reroute Active" },
    { step: "T3_SUPPLIER_STEADY", health: 96, label: "Midwest Semi Sourcing Locked" },
  ];
}
