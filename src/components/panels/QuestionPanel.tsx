import { questions } from "../../data/questions";
import type { ModelId } from "../../data/models";

export function QuestionPanel({ model }: { model: ModelId }) {
  const modelQuestions = questions.filter((question) => question.model === model);
  const current = modelQuestions[0] ?? questions[0];

  return (
    <section className="panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mini-label">北京原题训练</p>
          <h3 className="mt-1 text-base font-black text-ink">{current.title}</h3>
          <p className="mt-1 text-sm text-muted">{current.prompt}</p>
        </div>
        <button className="rounded-md bg-ink px-4 py-2 text-sm font-black text-white">进入原题</button>
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
          <div
            key={question.id}
            className={`rounded-md border px-3 py-2 ${
              question.id === current.id ? "border-aqua bg-aqua/10" : "border-ink/10 bg-white"
            }`}
          >
            <p className="text-xs font-black text-ink">{question.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{question.prompt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
