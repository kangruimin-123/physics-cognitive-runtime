import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";

export function ForceFlowView({ state }: { state: PhysicsRuntimeState }) {
  const waterShare = Math.min(100, (state.buoyancy / Math.max(state.weight, 1)) * 100);
  const ropeShare = Math.min(100, (state.tension / Math.max(state.weight, 1)) * 100);

  return (
    <section className="panel p-4">
      <h3 className="text-sm font-black text-ink">力流</h3>
      <svg viewBox="0 0 310 178" className="mt-3 h-44 w-full rounded-md bg-[#f7fbfc]">
        <defs>
          <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0 8 4 0 8z" fill="#13a6b2" />
          </marker>
        </defs>
        <g className="fill-ink text-[12px] font-bold">
          <text x="126" y="22">石块重力</text>
          <text x="42" y="82">绳子 {ropeShare.toFixed(0)}%</text>
          <text x="178" y="82">水 {waterShare.toFixed(0)}%</text>
          <text x="176" y="126">容器</text>
          <text x="169" y="164">桌面 / 电子秤</text>
        </g>
        <path d="M150 30 C120 50 100 54 78 70" fill="none" stroke="#2458c8" strokeWidth="4" markerEnd="url(#flowArrow)" opacity={0.35 + ropeShare / 160} />
        <path d="M160 31 C180 52 195 55 205 70" fill="none" stroke="#13a6b2" strokeWidth="4" markerEnd="url(#flowArrow)" opacity={0.35 + waterShare / 160} />
        <path d="M205 88 V112" fill="none" stroke="#13a6b2" strokeWidth="4" markerEnd="url(#flowArrow)" />
        <path d="M205 132 V150" fill="none" stroke="#13a6b2" strokeWidth="4" markerEnd="url(#flowArrow)" />
        <circle cx="150" cy="28" r="13" fill="#5c6670" />
        <rect x="178" y="70" width="58" height="22" rx="4" fill="#d9f4f7" stroke="#13a6b2" />
        <rect x="177" y="112" width="60" height="20" rx="4" fill="#edf2f4" stroke="#64747d" />
        <rect x="162" y="150" width="88" height="17" rx="4" fill="#26343d" />
      </svg>
    </section>
  );
}
