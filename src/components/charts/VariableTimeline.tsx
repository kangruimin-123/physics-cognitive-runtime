import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";

type Props = {
  history: PhysicsRuntimeState[];
};

const series = [
  ["浮力", "buoyancy", "#13a6b2", 90],
  ["拉力", "tension", "#2458c8", 90],
  ["电子秤", "scaleDelta", "#c98014", 90],
  ["压强", "pressure", "#c2413b", 18000],
] as const;

export function VariableTimeline({ history }: Props) {
  const points = history.slice(-80);

  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-black text-ink">变量时间轴</h3>
        <div className="flex gap-3">
          {series.map(([label, , color]) => (
            <span key={label} className="flex items-center gap-1 text-xs font-bold text-muted">
              <i className="h-2 w-2 rounded-full" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 700 150" className="h-36 w-full rounded-md bg-[#f7fbfc]">
        <g stroke="#d9e5e9" strokeWidth="1">
          {[30, 60, 90, 120].map((y) => (
            <line key={y} x1="35" x2="680" y1={y} y2={y} />
          ))}
        </g>
        {series.map(([, key, color, max]) => {
          const d = points
            .map((item, index) => {
              const x = 35 + (index / Math.max(1, points.length - 1)) * 645;
              const y = 130 - (Math.min(max, item[key]) / max) * 110;
              return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
            })
            .join(" ");
          return <path key={key} d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />;
        })}
      </svg>
    </section>
  );
}
