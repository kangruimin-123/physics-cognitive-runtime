import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import { SENTENCES, TEMPLATE_LABELS, type SentenceTemplate } from "../../data/beijing/sentences";

const TEMPLATE_COLORS: Record<SentenceTemplate, string> = {
  relative_clause: "bg-aqua/10 text-aqua border-aqua/30",
  past_participle: "bg-cobalt/10 text-cobalt border-cobalt/30",
  object_clause: "bg-amber/10 text-amber border-amber/30",
  non_finite: "bg-aqua/10 text-aqua border-aqua/30",
  passive: "bg-cobalt/10 text-cobalt border-cobalt/30",
  long_subject: "bg-amber/10 text-amber border-amber/30",
  causal: "bg-error/10 text-error border-error/30",
  concessive: "bg-aqua/10 text-aqua border-aqua/30",
  comparative: "bg-cobalt/10 text-cobalt border-cobalt/30",
  emphasis: "bg-amber/10 text-amber border-amber/30",
};

export function SentencePage() {
  const [filter, setFilter] = useState<SentenceTemplate | "all">("all");
  const [mode, setMode] = useState<"browse" | "practice">("browse");
  const [index, setIndex] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all" ? SENTENCES : SENTENCES.filter((s) => s.template === filter);
  const current = filtered[index];

  const templates = [...new Set(SENTENCES.map((s) => s.template))] as SentenceTemplate[];

  function next() {
    setIndex((i) => (i + 1) % filtered.length);
    setRevealedSteps(0);
    setShowTranslation(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    setRevealedSteps(0);
    setShowTranslation(false);
  }

  function selectFilter(f: SentenceTemplate | "all") {
    setFilter(f);
    setIndex(0);
    setRevealedSteps(0);
    setShowTranslation(false);
  }

  // Template summary card
  function TemplateCard({ template }: { template: SentenceTemplate }) {
    const sentences = SENTENCES.filter((s) => s.template === template);
    return (
      <div
        className="panel p-4 cursor-pointer hover:shadow-md transition"
        onClick={() => { selectFilter(template); setMode("practice"); }}
      >
        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold mb-2 ${TEMPLATE_COLORS[template]}`}>
          {TEMPLATE_LABELS[template]}
        </span>
        <p className="text-sm text-muted">{sentences.length} 道练习</p>
        <p className="text-xs text-ink/60 mt-1 line-clamp-2 leading-4">
          {sentences[0]?.tip}
        </p>
      </div>
    );
  }

  if (mode === "browse") {
    return (
      <div>
        {/* Intro */}
        <div className="panel p-4 mb-5 border-l-4 border-l-cobalt bg-cobalt/5">
          <p className="text-xs font-bold text-cobalt mb-1">长难句拆解核心方法</p>
          <p className="text-sm text-ink">
            遇到长句，先找<strong>谓语动词</strong>，再确定<strong>主语</strong>，最后删去修饰成分，剩下的就是主干。
          </p>
        </div>

        <h3 className="font-black text-ink mb-4">6大句型模板</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {templates.map((t) => <TemplateCard key={t} template={t} />)}
        </div>

        <button
          onClick={() => { setFilter("all"); setMode("practice"); setIndex(0); }}
          className="w-full rounded-xl bg-aqua py-3 text-sm font-black text-white hover:bg-aqua/90 transition"
        >
          开始综合练习（全部 {SENTENCES.length} 句）
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back + filter */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button
          onClick={() => setMode("browse")}
          className="text-sm font-bold text-muted hover:text-ink transition"
        >
          ← 返回模板总览
        </button>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => selectFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-bold transition ${
              filter === "all" ? "bg-cobalt text-white" : "bg-white border border-ink/10 text-muted"
            }`}
          >
            全部
          </button>
          {templates.map((t) => (
            <button
              key={t}
              onClick={() => selectFilter(t)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                filter === t ? "bg-cobalt text-white" : "bg-white border border-ink/10 text-muted"
              }`}
            >
              {TEMPLATE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-muted">{index + 1} / {filtered.length}</span>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${TEMPLATE_COLORS[current.template]}`}>
          {TEMPLATE_LABELS[current.template]}
        </span>
      </div>

      {/* Sentence card */}
      <div className="panel p-5 mb-4">
        <p className="text-sm font-bold text-muted mb-2">原句</p>
        <p className="text-base leading-7 text-ink font-semibold">{current.sentence}</p>

        {/* Key words */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {current.keyWords.map((kw) => (
            <span key={kw} className="rounded bg-amber/15 px-1.5 py-0.5 text-xs font-bold text-amber">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Step by step reveal */}
      <div className="panel p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-black text-ink">拆解步骤</p>
          <button
            onClick={() => setRevealedSteps(current.steps.length)}
            className="text-xs text-cobalt font-bold hover:text-cobalt/70 transition"
          >
            全部显示
          </button>
        </div>

        <div className="space-y-2">
          {current.steps.map((step, i) => (
            <div key={i}>
              {i < revealedSteps ? (
                <div className="rounded-lg bg-ink/3 px-3 py-2 text-sm text-ink">{step}</div>
              ) : (
                <button
                  onClick={() => setRevealedSteps(i + 1)}
                  className="w-full text-left rounded-lg border border-dashed border-ink/15 px-3 py-2 text-sm text-muted hover:border-cobalt/40 hover:text-ink transition"
                >
                  👆 点击显示第 {i + 1} 步
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton */}
      {revealedSteps >= current.steps.length && (
        <div className="panel p-4 mb-4 border-l-4 border-l-aqua bg-aqua/5">
          <p className="text-xs font-bold text-aqua mb-1">句子主干</p>
          <p className="text-base font-black text-ink">{current.skeleton}</p>
          <p className="text-xs font-bold text-cobalt mt-2">拆解技巧</p>
          <p className="text-sm text-ink mt-1">{current.tip}</p>
        </div>
      )}

      {/* Translation toggle */}
      <button
        onClick={() => setShowTranslation((v) => !v)}
        className="w-full flex items-center justify-between panel px-4 py-3 mb-4 text-sm font-bold text-muted hover:text-ink transition"
      >
        查看中文翻译
        {showTranslation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {showTranslation && (
        <div className="panel p-4 mb-4 bg-cobalt/5 border-cobalt/20">
          <p className="text-sm text-ink leading-6">{current.translation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={prev}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-ink/10 py-3 text-sm font-bold text-muted hover:text-ink transition"
        >
          <ChevronLeft size={16} /> 上一句
        </button>
        <button
          onClick={next}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cobalt py-3 text-sm font-black text-white hover:bg-cobalt/90 transition"
        >
          下一句 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
