import { useEffect, useState } from "react";
import { questions } from "../../data/questions";
import type { ModelId } from "../../data/models";

export function QuestionPanel({ model }: { model: ModelId }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const modelQuestions = questions.filter((question) => question.model === model);
  const current = modelQuestions.find((question) => question.id === selectedId) ?? modelQuestions[0] ?? questions[0];

  useEffect(() => {
    setSelectedId(null);
  }, [model]);

  return (
    <section className="panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mini-label">北京原题训练</p>
          <h3 className="mt-1 text-base font-black text-ink">{current.title}</h3>
          <p className="mt-1 text-sm text-muted">{current.prompt}</p>
        </div>
        <button className="rounded-md bg-ink px-4 py-2 text-sm font-black text-white">当前题目</button>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-6">
        {current.flow?.map((step, index) => (
          <div key={step} className="rounded-md border border-ink/10 bg-paper px-3 py-2 text-xs font-bold text-ink">
            {index + 1}. {step}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {modelQuestions.map((question) => (
          <button
            key={question.id}
            type="button"
            onClick={() => setSelectedId(question.id)}
            className={`rounded-md border px-3 py-2 ${
              question.id === current.id ? "border-aqua bg-aqua/10 text-left" : "border-ink/10 bg-white text-left hover:border-aqua/50"
            }`}
            aria-pressed={question.id === current.id}
          >
            <p className="text-xs font-black text-ink">{question.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{question.prompt}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
