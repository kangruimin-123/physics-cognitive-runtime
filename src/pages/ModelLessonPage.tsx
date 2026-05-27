import { useEffect, useMemo, useState } from "react";
import { Beaker, RotateCcw } from "lucide-react";
import { runPhysicsRuntime, type PhysicsRuntimeState } from "../engine/physicsRuntime";
import type { CupMode } from "../physics/forceTransfer";
import type { ModelId } from "../data/models";
import type { PredictionChoice } from "../engine/cognitiveRuntime";
import { SimulationCanvas } from "../components/canvas/SimulationCanvas";
import { VariablePanel } from "../components/panels/VariablePanel";
import { VariableTimeline } from "../components/charts/VariableTimeline";
import { CognitiveConflictPanel } from "../components/panels/CognitiveConflictPanel";
import { ForceFlowView } from "../components/canvas/ForceFlowView";
import { KnowledgePanel } from "../components/panels/KnowledgePanel";
import { QuestionPanel } from "../components/panels/QuestionPanel";
import { FeedbackPanel } from "../components/panels/FeedbackPanel";
import { MotherProblemGraph } from "../components/graphs/MotherProblemGraph";
import { ForceDiagram } from "../components/canvas/ForceDiagram";
import { FHChart } from "../components/charts/FHChart";
import { KnowledgeGraph } from "../components/graphs/KnowledgeGraph";

type Props = {
  activeModel: ModelId;
};

export function ModelLessonPage({ activeModel }: Props) {
  const [cupMode, setCupMode] = useState<CupMode>("normal");
  const [objectBottom, setObjectBottom] = useState(0.52);
  const [previousObjectBottom, setPreviousObjectBottom] = useState(0.52);
  const [objectDensity, setObjectDensity] = useState(1350);
  const [liquidDensity, setLiquidDensity] = useState(1000);
  const [objectArea, setObjectArea] = useState(0.024);
  const [waterLevel, setWaterLevel] = useState(0.48);
  const objectHeight = 0.3;
  const containerDepth = 0.78;
  const initialWaterHeight = activeModel === "sensor" ? waterLevel : 0.48;
  const runtimeObjectBottom =
    activeModel === "float"
      ? calcFloatModelBottom({ objectDensity, liquidDensity, objectHeight, waterHeight: initialWaterHeight })
      : activeModel === "sensor"
        ? 0.32
        : objectBottom;
  const [choice, setChoice] = useState<PredictionChoice>(null);
  const [history, setHistory] = useState<PhysicsRuntimeState[]>([]);
  const activeKnowledgeId =
    activeModel === "level"
      ? "liquid-pressure"
      : activeModel === "float"
        ? "floating-equilibrium"
        : activeModel === "sensor"
          ? "buoyancy-after-submerged"
          : "scale-force-transfer";
  const activeMotherId = activeModel === "scale" ? "scale" : activeModel;

  const runtime = useMemo(
    () =>
      runPhysicsRuntime({
        objectBottom: runtimeObjectBottom,
        previousObjectBottom: activeModel === "float" || activeModel === "sensor" ? runtimeObjectBottom : previousObjectBottom,
        objectHeight,
        objectArea,
        objectDensity,
        liquidDensity,
        containerArea: 0.18,
        initialWaterHeight,
        containerDepth,
        cupMode,
      }),
    [activeModel, cupMode, initialWaterHeight, liquidDensity, objectArea, objectBottom, objectDensity, previousObjectBottom, runtimeObjectBottom],
  );

  useEffect(() => {
    setHistory((items) => [...items.slice(-100), runtime]);
  }, [runtime]);

  function updateBottom(next: number) {
    setPreviousObjectBottom(objectBottom);
    setObjectBottom(next);
  }

  function reset() {
    setObjectBottom(0.52);
    setPreviousObjectBottom(0.52);
    setWaterLevel(0.48);
    setChoice(null);
    setHistory([]);
  }

  return (
    <main className="space-y-4">
      <header className="flex flex-col gap-4 rounded-none border-b border-ink/10 bg-white px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-normal text-ink">北京中考浮力压强动态认知系统 V3</h1>
          <p className="mt-1 text-sm font-medium text-muted">状态变化 → 力变化 → 变量联动 → 系统受力 → 模型迁移。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCupMode("normal")}
            className={`rounded-md border px-4 py-2 text-sm font-black ${
              cupMode === "normal" ? "border-aqua bg-aqua text-white" : "border-ink/10 bg-white text-ink"
            }`}
          >
            普通杯
          </button>
          <button
            onClick={() => setCupMode("overflow")}
            className={`rounded-md border px-4 py-2 text-sm font-black ${
              cupMode === "overflow" ? "border-aqua bg-aqua text-white" : "border-ink/10 bg-white text-ink"
            }`}
          >
            溢水杯
          </button>
          <button onClick={reset} className="rounded-md border border-ink/10 bg-white p-2 text-ink" aria-label="重置实验">
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <section className="grid gap-4 px-4 xl:grid-cols-[minmax(0,3fr)_minmax(360px,2fr)]">
        <div className="space-y-4">
          <SimulationCanvas state={runtime} model={activeModel} onObjectBottomChange={updateBottom} />
          <VariableTimeline history={history} />
          {activeModel === "sensor" && <FHChart state={runtime} />}
          <ForceFlowView state={runtime} />
          <QuestionPanel model={activeModel} />
        </div>

        <aside className="grid content-start gap-4 md:grid-cols-2 xl:grid-cols-1">
          <div className="panel p-4">
            <div className="mb-4 flex items-center gap-2">
              <Beaker size={18} className="text-aqua" />
              <h3 className="text-sm font-black text-ink">实验参数</h3>
              <span className="ml-auto rounded bg-ink px-2 py-1 text-xs font-black text-white">{activeModel}</span>
            </div>
            <Control
              label="物体密度"
              value={objectDensity / 1000}
              min={0.5}
              max={1.5}
              step={0.01}
              unit="g/cm3"
              decimals={2}
              onChange={(value) => setObjectDensity(value * 1000)}
            />
            <Control
              label="液体密度"
              value={liquidDensity / 1000}
              min={0.5}
              max={1.5}
              step={0.01}
              unit="g/cm3"
              decimals={2}
              onChange={(value) => setLiquidDensity(value * 1000)}
            />
            {(activeModel === "scale" || activeModel === "level") && (
              <Control label="物体体积" value={objectArea * 1000} min={12} max={40} step={1} unit="相对值" onChange={(value) => setObjectArea(value / 1000)} />
            )}
            {activeModel === "sensor" && (
              <Control label="水位" value={waterLevel * 100} min={8} max={72} step={1} unit="cm" onChange={(value) => setWaterLevel(value / 100)} />
            )}
          </div>
          <CognitiveConflictPanel state={runtime} choice={choice} onChoice={setChoice} model={activeModel} />
          <VariablePanel state={runtime} model={activeModel} />
          <ForceDiagram state={runtime} />
          <KnowledgePanel activeId={activeKnowledgeId} state={runtime} />
          <FeedbackPanel choice={choice} state={runtime} />
          <KnowledgeGraph activeId={activeKnowledgeId} />
          <MotherProblemGraph activeId={activeMotherId} />
        </aside>
      </section>
    </main>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  unit,
  decimals = 0,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  decimals?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 flex items-center justify-between text-xs font-bold text-muted">
        {label}
        <span className="value-text text-ink">
          {value.toFixed(decimals)} {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-aqua"
      />
    </label>
  );
}

function calcFloatModelBottom({
  objectDensity,
  liquidDensity,
  objectHeight,
  waterHeight,
}: {
  objectDensity: number;
  liquidDensity: number;
  objectHeight: number;
  waterHeight: number;
}) {
  const ratio = objectDensity / liquidDensity;

  if (Math.abs(ratio - 1) < 0.03) {
    return Math.max(0.08, waterHeight - objectHeight * 0.86);
  }

  if (ratio < 1) {
    return Math.max(0.04, waterHeight - objectHeight * ratio * 0.86);
  }

  return 0;
}
