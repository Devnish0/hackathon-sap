import { DisruptionSignal } from "@/lib/types";
import eventsData from "@/data/events.json";

export async function getMockSignals(): Promise<DisruptionSignal[]> {
  return eventsData as DisruptionSignal[];
}

export async function getSignalById(id: string): Promise<DisruptionSignal | undefined> {
  const signals = await getMockSignals();
  return signals.find((s) => s.id === id);
}
