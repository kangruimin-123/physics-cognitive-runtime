import { ArrowDown, ArrowUp, MoveVertical } from "lucide-react";
import type { PointerEvent } from "react";
import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";
import type { ModelId } from "../../data/models";

type Props = {
  state: PhysicsRuntimeState;
  model: ModelId;
  onObjectBottomChange: (bottom: number) => void;
};

const world = {
  width: 760,
  height: 520,
  floorY: 445,
  cupX: 190,
  cupY: 70,
  cupWidth: 360,
  cupHeight: 330,
};

export function SimulationCanvas({ state, model, onObjectBottomChange }: Props) {
  const scale = world.cupHeight / state.containerDepth;
  const cupBottomY = world.cupY + world.cupHeight;
  const waterY = cupBottomY - state.waterHeight * scale;
  const objectWidth = 86;
  const objectHeight = state.objectHeight * scale;
  const objectX = world.cupX + world.cupWidth / 2 - objectWidth / 2;
  const objectBottomY = cupBottomY - state.objectBottom * scale;
  const objectY = objectBottomY - objectHeight;
  const immersedY = Math.max(objectY, waterY);
  const immersedHeightPx = Math.max(0, objectBottomY - immersedY);
  const scaleRead = 42 + state.scaleDelta / 85;
  const scenario = scenarios[model];
  const canDrag = model === "scale" || model === "level";

  function handlePointerMove(event: PointerEvent<SVGRectElement>) {
    if (!canDrag) return;
    if (event.buttons !== 1) return;
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const cursor = point.matrixTransform(svg.getScreenCTM()?.inverse());
    const nextBottom = (cupBottomY - cursor.y) / scale;
    onObjectBottomChange(Math.max(0, Math.min(state.containerDepth - state.objectHeight * 0.1, nextBottom)));
  }

  return (
    <section className="panel overflow-hidden bg-white">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
        <div>
          <h2 className="text-lg font-black text-ink">动态物理世界</h2>
          <p className="text-sm text-muted">{scenario.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-aqua/30 bg-aqua/10 px-3 py-2 text-sm font-bold text-aqua">
          <MoveVertical size={16} />
          {canDrag ? "鼠标拖拽" : scenario.control}
        </div>
      </div>

      <svg viewBox={`0 0 ${world.width} ${world.height}`} className="h-[520px] w-full touch-none bg-[#f7fbfc]">
        <defs>
          <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#87ddeb" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#1aa1b5" stopOpacity="0.82" />
          </linearGradient>
          <pattern id="stone" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#5c6670" />
            <path d="M0 12 12 0" stroke="#727e87" strokeWidth="2" />
          </pattern>
          <marker id="arrowUp" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
            <path d="M4.5 0 9 9 4.5 6 0 9z" fill="#13a6b2" />
          </marker>
          <marker id="arrowDown" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
            <path d="M4.5 9 9 0 4.5 3 0 0z" fill="#c2413b" />
          </marker>
        </defs>

        <rect x="90" y={world.floorY} width="560" height="26" rx="4" fill="#d8e3e7" />
        {model !== "float" && (
          <>
            <rect x="250" y="410" width="240" height="44" rx="8" fill="#26343d" />
            <rect x="302" y="419" width="136" height="24" rx="4" fill="#e9fbf7" />
            <text x="370" y="436" textAnchor="middle" className="fill-ink text-[13px] font-black">
              {model === "sensor" ? `传感器 ${state.tension.toFixed(1)} N` : `电子秤 ${scaleRead.toFixed(1)} N`}
            </text>
          </>
        )}

        <path
          d={`M${world.cupX} ${world.cupY} V${cupBottomY} H${world.cupX + world.cupWidth} V${world.cupY}`}
          fill="none"
          stroke="#314653"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x={world.cupX + 5} y={waterY} width={world.cupWidth - 10} height={cupBottomY - waterY} fill="url(#water)" />
        <line x1={world.cupX + 4} x2={world.cupX + world.cupWidth - 4} y1={waterY} y2={waterY} stroke="#0f93a7" strokeWidth="3" />
        <text x={world.cupX + world.cupWidth + 24} y={waterY + 4} className="fill-aqua text-[13px] font-bold">
          液面 +{(state.liquidRise * 100).toFixed(1)} cm
        </text>

        {(model === "scale" || model === "sensor") && (
          <line x1={objectX + objectWidth / 2} x2={objectX + objectWidth / 2} y1="38" y2={objectY} stroke="#64747d" strokeWidth="3" />
        )}
        <rect
          x={objectX}
          y={objectY}
          width={objectWidth}
          height={objectHeight}
          rx="7"
          fill="url(#stone)"
          stroke="#27343d"
          strokeWidth="2"
          onPointerMove={handlePointerMove}
          onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
          className={canDrag ? "cursor-ns-resize" : ""}
        />
        {immersedHeightPx > 0 && (
          <rect
            x={objectX}
            y={immersedY}
            width={objectWidth}
            height={immersedHeightPx}
            rx="7"
            fill="#0f9eb3"
            opacity="0.28"
            pointerEvents="none"
          />
        )}

        <line
          x1={objectX - 20}
          x2={objectX - 20}
          y1={objectBottomY - 12}
          y2={objectBottomY - 12 - Math.min(116, state.buoyancy / 28)}
          stroke="#13a6b2"
          strokeWidth="5"
          markerEnd="url(#arrowUp)"
        />
        <line
          x1={objectX + objectWidth + 20}
          x2={objectX + objectWidth + 20}
          y1={objectY + 12}
          y2={objectY + 12 + Math.min(126, state.weight / 28)}
          stroke="#c2413b"
          strokeWidth="5"
          markerEnd="url(#arrowDown)"
        />
        {state.supportForce > 0 && (
          <line
            x1={objectX + objectWidth / 2}
            x2={objectX + objectWidth / 2}
            y1={objectBottomY + 8}
            y2={objectBottomY - 48}
            stroke="#c98014"
            strokeWidth="5"
            markerEnd="url(#arrowUp)"
          />
        )}

        <g className="text-[12px] font-black">
          <foreignObject x={objectX - 92} y={objectBottomY - 84} width="80" height="42">
            <div className="flex items-center gap-1 rounded border border-aqua/30 bg-white/90 px-2 py-1 text-aqua">
              <ArrowUp size={14} /> 浮力
            </div>
          </foreignObject>
          <foreignObject x={objectX + objectWidth + 30} y={objectY + 44} width="80" height="42">
            <div className="flex items-center gap-1 rounded border border-error/30 bg-white/90 px-2 py-1 text-error">
              <ArrowDown size={14} /> 重力
            </div>
          </foreignObject>
        </g>

        <path
          d={`M${objectX + objectWidth} ${objectY + objectHeight * 0.62} C600 290 610 380 370 410`}
          fill="none"
          stroke="#13a6b2"
          strokeDasharray="8 8"
          strokeWidth="4"
          opacity={model === "float" ? 0.18 : 0.6}
        />
        <foreignObject x="34" y="34" width="190" height="108">
          <div className="rounded-md border border-ink/10 bg-white/90 p-3">
            <p className="text-xs font-black text-ink">{scenario.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{scenario.focus}</p>
          </div>
        </foreignObject>
      </svg>
    </section>
  );
}

const scenarios: Record<ModelId, { title: string; subtitle: string; control: string; focus: string }> = {
  float: {
    title: "A 漂浮 / 悬浮 / 沉底",
    subtitle: "调节物块和液体密度，系统自动进入漂浮、悬浮、下沉或沉底状态。",
    control: "调密度观察",
    focus: "看 F浮、G、F支 如何决定最终状态。",
  },
  scale: {
    title: "B 电子秤 / 溢水杯",
    subtitle: "拖动吊石块入水，观察水如何替物体承担力并传给电子秤。",
    control: "鼠标拖拽",
    focus: "普通杯看 Delta F秤=F浮；溢水杯看 G溢出=F浮。",
  },
  level: {
    title: "C 液面 / 压强",
    subtitle: "拖动物体改变排水体积，实时修正液面、实际水深和底部压强。",
    control: "鼠标拖拽",
    focus: "浮力看 V排，压强看 rho 和 h。",
  },
  sensor: {
    title: "D 拉力 / 传感器",
    subtitle: "调节水位，观察浸入体积如何改变浮力、拉力和 F-h 图像。",
    control: "水位滑块",
    focus: "水位 → 浮力 → 拉力 → 传感器。",
  },
};
