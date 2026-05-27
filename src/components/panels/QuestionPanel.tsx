import { useEffect, useState } from "react";
import { questions } from "../../data/questions";
import type { ModelId } from "../../data/models";

export function QuestionPanel({ model }: { model: ModelId }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const modelQuestions = questions.filter((question) => question.model === model);
  const current = modelQuestions.find((question) => question.id === selectedId) ?? modelQuestions[0] ?? questions[0];
  const isCorrect = submitted && selectedOption === current.answer;
  const chosen = current.options.find((option) => option.id === selectedOption);

  useEffect(() => {
    setSelectedId(null);
    setSelectedOption(null);
    setSubmitted(false);
  }, [model]);

  function chooseQuestion(id: string) {
    setSelectedId(id);
    setSelectedOption(null);
    setSubmitted(false);
  }

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
      <div className="mt-4 rounded-md border border-ink/10 bg-paper p-4">
        <p className="mini-label">原题作答</p>
        <p className="mt-2 text-sm font-bold leading-6 text-ink">{current.stem}</p>
        <div className="mt-3 grid gap-2">
          {current.options.map((option) => {
            const active = selectedOption === option.id;
            const revealCorrect = submitted && option.id === current.answer;
            const revealWrong = submitted && active && option.id !== current.answer;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelectedOption(option.id);
                  setSubmitted(false);
                }}
                className={`rounded-md border px-3 py-2 text-left text-sm font-bold leading-6 transition ${
                  revealCorrect
                    ? "border-aqua bg-aqua/10 text-aqua"
                    : revealWrong
                      ? "border-error bg-error/5 text-error"
                      : active
                        ? "border-cobalt bg-cobalt/10 text-cobalt"
                        : "border-ink/10 bg-white text-ink hover:border-cobalt/40"
                }`}
              >
                {option.id}. {option.text}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={!selectedOption}
            onClick={() => setSubmitted(true)}
            className="rounded-md bg-ink px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            提交判断
          </button>
          {submitted && (
            <span className={`rounded px-2 py-1 text-xs font-black ${isCorrect ? "bg-aqua/10 text-aqua" : "bg-error/10 text-error"}`}>
              {isCorrect ? "判断正确" : "暴露了一个错误模型"}
            </span>
          )}
        </div>
        {submitted && (
          <div className={`mt-3 rounded-md border p-3 ${isCorrect ? "border-aqua/20 bg-aqua/5" : "border-error/20 bg-error/5"}`}>
            <p className="text-sm font-black text-ink">{isCorrect ? current.correct : current.wrong}</p>
            {!isCorrect && chosen?.misconception && (
              <p className="mt-2 text-sm leading-6 text-error">错误模型：{chosen.misconception}</p>
            )}
            <p className="mt-2 text-sm font-bold leading-6 text-cobalt">迁移提示：{current.transfer}</p>
          </div>
        )}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {modelQuestions.map((question) => (
          <button
            key={question.id}
            type="button"
            onClick={() => chooseQuestion(question.id)}
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
