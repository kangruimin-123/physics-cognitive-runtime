import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";

export function ForceDiagram({ state }: { state: PhysicsRuntimeState }) {
  return (
    <section className="panel p-4">
      <h3 className="text-sm font-black text-ink">受力关系</h3>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold">
        <div className="rounded-md bg-aqua/10 p-2 text-aqua">F浮 {state.buoyancy.toFixed(1)}N</div>
        <div className="rounded-md bg-error/10 p-2 text-error">G {state.weight.toFixed(1)}N</div>
        <div className="rounded-md bg-amber/10 p-2 text-amber">F支 {state.supportForce.toFixed(1)}N</div>
      </div>
    </section>
  );
}
