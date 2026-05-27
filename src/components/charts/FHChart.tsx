import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { runPhysicsRuntime, type PhysicsRuntimeState } from "../../engine/physicsRuntime";

type Props = {
  state: PhysicsRuntimeState;
};

export function FHChart({ state }: Props) {
  const data = Array.from({ length: 36 }, (_, index) => {
    const h = (state.containerDepth * index) / 35;
    const point = runPhysicsRuntime({
      ...state,
      initialWaterHeight: h,
      cupMode: "normal",
    });

    return {
      h: Number((h * 100).toFixed(1)),
      tension: Number(point.tension.toFixed(2)),
      stage: getStage(point),
    };
  });
  const currentH = Number((state.initialWaterHeight * 100).toFixed(1));
  const currentTension = Number(state.tension.toFixed(2));
  const currentStage = getStage(state);

  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-ink">F-h 图像联动</h3>
          <p className="mt-1 text-xs leading-5 text-muted">当前点随水位移动，自动识别未接触、部分浸没和完全浸没三段。</p>
        </div>
        <span className="rounded bg-cobalt/10 px-2 py-1 text-xs font-black text-cobalt">{currentStage}</span>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 12, right: 18, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="#d9e5e9" strokeDasharray="4 4" />
            <XAxis dataKey="h" unit="cm" tick={{ fontSize: 11, fill: "#64747d" }} />
            <YAxis tick={{ fontSize: 11, fill: "#64747d" }} width={36} unit="N" />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid rgba(24,36,43,.12)" }}
              formatter={(value, name) => [`${value} N`, name === "tension" ? "拉力" : name]}
              labelFormatter={(label) => `水位 ${label} cm`}
            />
            <ReferenceLine x={state.objectBottom * 100} stroke="#c98014" strokeDasharray="4 4" label={{ value: "刚接触", fontSize: 11 }} />
            <ReferenceLine
              x={(state.objectBottom + state.objectHeight) * 100}
              stroke="#13a6b2"
              strokeDasharray="4 4"
              label={{ value: "全浸没", fontSize: 11 }}
            />
            <Line type="monotone" dataKey="tension" stroke="#2458c8" strokeWidth={3} dot={false} />
            <ReferenceDot x={currentH} y={currentTension} r={6} fill="#c2413b" stroke="#fff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-2 text-xs font-bold text-muted sm:grid-cols-3">
        <div className={stageClass(currentStage, "未接触水")}>未接触水：拉力恒定</div>
        <div className={stageClass(currentStage, "部分浸没")}>部分浸没：浮力增大，拉力减小</div>
        <div className={stageClass(currentStage, "完全浸没")}>完全浸没：浮力恒定，拉力恒定</div>
      </div>
    </section>
  );
}

function getStage(state: PhysicsRuntimeState) {
  if (state.immersedRatio <= 0.02) return "未接触水";
  if (state.immersedRatio >= 0.98) return "完全浸没";
  return "部分浸没";
}

function stageClass(current: string, stage: string) {
  return `rounded-md border px-3 py-2 ${
    current === stage ? "border-cobalt bg-cobalt/10 text-cobalt" : "border-ink/10 bg-paper"
  }`;
}
