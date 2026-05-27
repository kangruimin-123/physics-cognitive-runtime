import type { PredictionChoice } from "../../engine/cognitiveRuntime";
import { detectMisconception } from "../../engine/cognitiveRuntime";
import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";
import { misconceptions } from "../../data/misconceptions";

export function FeedbackPanel({ choice, state }: { choice: PredictionChoice; state: PhysicsRuntimeState }) {
  const id = detectMisconception({ choice, state });
  const item = id ? misconceptions[id] : null;

  return (
    <section className="panel p-4">
      <h3 className="text-sm font-black text-ink">错因分析</h3>
      {item ? (
        <div className="mt-2 rounded-md border border-error/20 bg-error/5 p-3">
          <p className="font-black text-error">{item.title}</p>
          <p className="mt-1 text-sm leading-6 text-ink">{item.diagnosis}</p>
          <p className="mt-1 text-sm font-bold leading-6 text-aqua">跳转专题：{item.repair}</p>
        </div>
      ) : (
        <p className="mt-2 text-sm leading-6 text-muted">系统会根据预测和作答识别错误模型，而不只是提示“答案错误”。</p>
      )}
    </section>
  );
}
