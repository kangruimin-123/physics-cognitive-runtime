import { GRAVITY } from "./buoyancy";

export function calcPressure(liquidDensity: number, depth: number) {
  return Math.max(0, liquidDensity * GRAVITY * depth);
}
