import networkData from "@/data/network.json";

export function calculateDisruptionImpact(disruptedNodeId: string, durationHours: number) {
  // Cascading impact multiplier based on duration
  const multiplier = Math.min(3.5, 1 + durationHours / 48);

  const affectedNodes = networkData.nodes.map((node) => {
    let healthDrop = 0;
    if (node.id === disruptedNodeId) {
      healthDrop = Math.min(80, 20 * multiplier);
    } else if (node.dependencies.includes(disruptedNodeId)) {
      healthDrop = Math.min(50, 12 * multiplier);
    }

    return {
      nodeId: node.id,
      originalHealth: node.healthScore,
      projectedHealth: Math.max(10, Math.round(node.healthScore - healthDrop)),
      isAffected: healthDrop > 0,
    };
  });

  return {
    disruptedNodeId,
    durationHours,
    affectedCount: affectedNodes.filter((n) => n.isAffected).length,
    impactedNodes: affectedNodes,
  };
}
