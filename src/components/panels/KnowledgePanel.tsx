import { knowledge } from "../../data/knowledge";
import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";

export function KnowledgePanel({ activeId = "scale-force-transfer", state }: { activeId?: string; state?: PhysicsRuntimeState }) {
  const item = knowledge.find((entry) => entry.id === activeId) ?? knowledge[0];
  const highlighted =
    state?.state === "沉底"
      ? "G = F浮 + F支"
      : state?.state === "漂浮"
        ? "F浮 = G"
        : item.math;

  return (
    <section className="panel p-4">
      <h3 className="text-sm font-black text-ink">知识点</h3>
      <p className="mt-2 text-base font-black text-aqua">{item.oneLine}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{item.dynamic}</p>
      <div className="mt-3 rounded-md border border-ink/10 bg-paper px-3 py-2">
        <p className="mini-label">数学抽象</p>
        <p className="mt-1 font-mono text-sm font-bold text-ink">{highlighted}</p>
      </div>
      {state?.state === "沉底" && (
        <p className="mt-3 rounded-md bg-amber/10 px-3 py-2 text-sm font-bold leading-6 text-amber">
          沉底时浮力依然存在，但小于重力，剩余部分由支持力承担。
        </p>
      )}
    </section>
  );
}
