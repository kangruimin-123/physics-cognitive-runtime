import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";
import type { ModelId } from "../../data/models";

const rowsByModel = {
  float: [
    ["物块密度", "objectDensity", "kg/m3", "与液体比较决定状态"],
    ["重力", "weight", "N", "由物体质量决定"],
    ["浮力", "buoyancy", "N", "漂浮/悬浮时等于重力"],
    ["支持力", "supportForce", "N", "沉底时出现"],
  ],
  scale: [
    ["浮力", "buoyancy", "N", "水对物体向上的力"],
    ["拉力", "tension", "N", "G-F浮"],
    ["溢出水重", "overflowWeight", "N", "溢水杯中等于浮力"],
    ["电子秤增加", "scaleDelta", "N", "最终传给桌面的增加量"],
  ],
  level: [
    ["浸入深度", "immersedHeight", "m", "相对实时液面"],
    ["液面上升", "liquidRise", "m", "Delta h=V排/S容器"],
    ["水深", "waterHeight", "m", "实际液面高度"],
    ["压强", "pressure", "Pa", "p=rho gh"],
  ],
  sensor: [
    ["水位", "waterHeight", "m", "水位驱动浸入体积"],
    ["浮力", "buoyancy", "N", "随 V排 改变"],
    ["拉力", "tension", "N", "传感器读数"],
    ["压强", "pressure", "Pa", "深度越大压强越大"],
  ],
} as const;

export function VariablePanel({ state, model }: { state: PhysicsRuntimeState; model: ModelId }) {
  const rows = rowsByModel[model];

  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-black text-ink">实时变量</h3>
        <span className="rounded bg-aqua/10 px-2 py-1 text-xs font-bold text-aqua">{state.state}</span>
      </div>
      <div className="space-y-3">
        {rows.map(([label, key, unit, hint]) => {
          const value = state[key];
          const max =
            key === "pressure"
              ? 20000
              : key === "waterHeight" || key === "immersedHeight"
                ? 1
                : key === "liquidRise"
                  ? 0.2
                  : key === "objectDensity"
                    ? 1600
                    : 90;
          return (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-bold text-muted">{label}</span>
                <span className="value-text font-black text-ink">
                  {value.toFixed(key === "pressure" ? 0 : 2)} {unit}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-aqua" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
              </div>
              <p className="mt-1 text-[11px] leading-4 text-muted">{hint}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
