import type { BuoyancyState } from "./buoyancy";

export type LessonPhase = "predict" | "experiment" | "explain" | "practice" | "feedback";

export function nextPhase(phase: LessonPhase): LessonPhase {
  const order: LessonPhase[] = ["predict", "experiment", "explain", "practice", "feedback"];
  return order[(order.indexOf(phase) + 1) % order.length];
}

export function stateExplanation(state: BuoyancyState) {
  const copy: Record<BuoyancyState, string> = {
    上浮: "浮力大于重力，合力向上，物体还在调整状态。",
    漂浮: "静止漂浮时浮力等于重力，只有一部分体积浸入液体。",
    悬浮: "完全浸没且浮力等于重力，物体可停在液体内部。",
    下沉: "浮力小于重力，合力向下，物体继续变深。",
    沉底: "重力由浮力和容器支持力共同承担。",
  };
  return copy[state];
}
