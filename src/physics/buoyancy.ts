export const GRAVITY = 9.8;

export type BuoyancyState = "上浮" | "漂浮" | "悬浮" | "下沉" | "沉底";

export function calcWeight(density: number, volume: number) {
  return density * volume * GRAVITY;
}

export function calcBuoyancy(liquidDensity: number, displacedVolume: number) {
  return liquidDensity * displacedVolume * GRAVITY;
}

export function classifyBuoyancyState({
  objectDensity,
  liquidDensity,
  immersedRatio,
  supportForce,
  velocityHint,
}: {
  objectDensity: number;
  liquidDensity: number;
  immersedRatio: number;
  supportForce: number;
  velocityHint: number;
}): BuoyancyState {
  if (supportForce > 0.05) return "沉底";
  if (immersedRatio >= 0.98 && Math.abs(objectDensity - liquidDensity) / liquidDensity < 0.03) return "悬浮";
  if (immersedRatio > 0 && immersedRatio < 0.98 && objectDensity < liquidDensity) return "漂浮";
  if (velocityHint < -0.02) return "上浮";
  return "下沉";
}
