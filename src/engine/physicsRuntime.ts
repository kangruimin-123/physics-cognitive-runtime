import { calcBuoyancy, calcWeight, classifyBuoyancyState } from "../physics/buoyancy";
import { calcPressure } from "../physics/pressure";
import { calcScaleDelta, type CupMode } from "../physics/forceTransfer";
import { solveImmersionWithLiquidRise } from "../physics/liquidLevel";

export type PhysicsRuntimeInput = {
  objectBottom: number;
  previousObjectBottom: number;
  objectHeight: number;
  objectArea: number;
  objectDensity: number;
  liquidDensity: number;
  containerArea: number;
  initialWaterHeight: number;
  containerDepth: number;
  cupMode: CupMode;
};

export type PhysicsRuntimeState = ReturnType<typeof runPhysicsRuntime>;

export function runPhysicsRuntime(input: PhysicsRuntimeInput) {
  const volume = input.objectArea * input.objectHeight;
  const immersion = solveImmersionWithLiquidRise(input);
  const immersedRatio = immersion.immersedHeight / input.objectHeight;
  const weight = calcWeight(input.objectDensity, volume);
  const buoyancy = calcBuoyancy(input.liquidDensity, immersion.displacedVolume);
  const bottomContact = input.objectBottom <= 0;
  const supportForce = bottomContact ? Math.max(0, weight - buoyancy) : 0;
  const tension = Math.max(0, weight - buoyancy - supportForce);
  const overflowWeight = input.cupMode === "overflow" ? buoyancy : 0;
  const scaleDelta = calcScaleDelta({ cupMode: input.cupMode, buoyancy, overflowWeight });
  const probeDepth = Math.max(0, immersion.waterHeight - Math.max(0, input.objectBottom));
  const pressure = calcPressure(input.liquidDensity, probeDepth);
  const state = classifyBuoyancyState({
    objectDensity: input.objectDensity,
    liquidDensity: input.liquidDensity,
    immersedRatio,
    supportForce,
    velocityHint: input.objectBottom - input.previousObjectBottom,
  });

  return {
    ...input,
    volume,
    immersedHeight: immersion.immersedHeight,
    displacedVolume: immersion.displacedVolume,
    liquidRise: immersion.liquidRise,
    waterHeight: Math.min(input.containerDepth, immersion.waterHeight),
    immersedRatio,
    weight,
    buoyancy,
    supportForce,
    tension,
    overflowWeight,
    scaleDelta,
    pressure,
    probeDepth,
    state,
  };
}
