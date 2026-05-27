import type { PhysicsRuntimeState } from "./physicsRuntime";
import type { ModelId } from "../data/models";

export type PredictionChoice = "变大" | "不变" | "变小" | null;

export type MisconceptionId =
  | "buoyancy-depth-confusion"
  | "floating-greater-than-weight"
  | "scale-reads-object-weight"
  | "pressure-total-water"
  | "sensor-submerged-tension";

export function detectMisconception({
  choice,
  state,
}: {
  choice: PredictionChoice;
  state: PhysicsRuntimeState;
}): MisconceptionId | null {
  if (choice === "变大" && state.immersedRatio >= 0.98) return "buoyancy-depth-confusion";
  if (state.state === "漂浮" && choice === "变大") return "floating-greater-than-weight";
  return null;
}

export function getConflictPrompt(state: PhysicsRuntimeState, model?: ModelId) {
  if (model === "float") {
    return "如果 rho物 > rho液，物体一定会沉底吗？";
  }

  if (model === "sensor") {
    return "控制棒完全浸没后，继续加水，拉力为什么不再变化？";
  }

  if (model === "level") {
    return "浸没后继续变深，浮力会继续变大吗？";
  }

  if (state.immersedRatio >= 0.98) {
    return "浸没后继续下沉，浮力会怎样变化？";
  }

  return "石块入水后，电子秤一定增加石块重力吗？";
}

export function explainPrediction(choice: PredictionChoice, state: PhysicsRuntimeState) {
  if (!choice) return "先预测，再拖动物体验证。";
  const misconception = detectMisconception({ choice, state });

  if (misconception === "buoyancy-depth-confusion") {
    return "这里容易把“压强随深度变大”和“浮力随深度变大”混在一起。浸没后 V排 不再增加，浮力不变。";
  }

  if (choice === "不变" && state.immersedRatio >= 0.98) {
    return "预测正确。浸没后继续变深，液体压强变大，但上下表面压力差保持不变，所以浮力不变。";
  }

  return "继续拖动并观察曲线，注意哪个变量先变、哪个变量停止变化。";
}
