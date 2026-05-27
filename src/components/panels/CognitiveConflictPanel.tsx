import type { PhysicsRuntimeState } from "../../engine/physicsRuntime";
import { type PredictionChoice, explainPrediction, getConflictPrompt } from "../../engine/cognitiveRuntime";
import type { ModelId } from "../../data/models";

type Props = {
  state: PhysicsRuntimeState;
  choice: PredictionChoice;
  onChoice: (choice: PredictionChoice) => void;
  model: ModelId;
};

export function CognitiveConflictPanel({ state, choice, onChoice, model }: Props) {
  return (
    <section className="panel border-amber/25 bg-[#fffaf0] p-4">
      <h3 className="text-sm font-black text-amber">认知预测</h3>
      <p className="mt-2 text-sm font-bold text-ink">{getConflictPrompt(state, model)}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {(["变大", "不变", "变小"] as const).map((item) => (
          <button
            key={item}
            onClick={() => onChoice(item)}
            className={`rounded-md border px-2 py-2 text-sm font-black transition ${
              choice === item ? "border-amber bg-amber text-white" : "border-amber/25 bg-white text-amber"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-3 rounded-md bg-white px-3 py-2 text-sm leading-6 text-ink">{explainPrediction(choice, state)}</p>
    </section>
  );
}
