export type LiquidRiseInput = {
  displacedVolume: number;
  containerArea: number;
};

export function calcLiquidRise({ displacedVolume, containerArea }: LiquidRiseInput) {
  if (containerArea <= 0) return 0;
  return Math.max(0, displacedVolume / containerArea);
}

export function solveImmersionWithLiquidRise({
  objectBottom,
  objectHeight,
  objectArea,
  containerArea,
  initialWaterHeight,
}: {
  objectBottom: number;
  objectHeight: number;
  objectArea: number;
  containerArea: number;
  initialWaterHeight: number;
}) {
  const ratio = objectArea / Math.max(containerArea, objectArea + 1);
  const rawImmersion = (initialWaterHeight - objectBottom) / Math.max(1 - ratio, 0.001);
  const immersedHeight = Math.max(0, Math.min(objectHeight, rawImmersion));
  const displacedVolume = immersedHeight * objectArea;
  const liquidRise = calcLiquidRise({ displacedVolume, containerArea });

  return {
    immersedHeight,
    displacedVolume,
    liquidRise,
    waterHeight: initialWaterHeight + liquidRise,
  };
}
