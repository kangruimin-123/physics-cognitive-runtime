export type CupMode = "normal" | "overflow";

export function calcScaleDelta({
  cupMode,
  buoyancy,
  overflowWeight,
}: {
  cupMode: CupMode;
  buoyancy: number;
  overflowWeight: number;
}) {
  if (cupMode === "overflow") {
    return Math.max(0, buoyancy - overflowWeight);
  }

  return buoyancy;
}
