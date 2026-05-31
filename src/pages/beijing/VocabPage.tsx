import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Eye } from "lucide-react";
import {
  ALL_WORDS,
  CORE_WORDS,
  EXTENDED_WORDS,
  FAMILIAR_WORD_TRAPS,
  CATEGORY_LABELS,
  type WordCategory,
} from "../../data/beijing/words";
import { markWordLearned, addToErrorBook, getLearnedWordIds } from "../../data/beijing/storage";

type Mode = "flashcard" | "list" | "traps";
type Filter = "all" | "core" | "extended" | WordCategory;

export function VocabPage() {
  const [mode, setMode] = useState<Mode>("flashcard");
  const [filter, setFilter] = useState<Filter>("all");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set(getLearnedWordIds()));
  const [showExample, setShowExample] = useState(false);

  const filteredWords = useMemo(() => {
    if (filter === "all") return ALL_WORDS;
    if (filter === "core") return CORE_WORDS;
    if (filter === "extended") return EXTENDED_WORDS;
    return ALL_WORDS.filter((w) => w.category === filter);
  }, [filter]);

  const currentWord = filteredWords[cardIndex] ?? null;

  function next() {
    setCardIndex((i) => (i + 1) % filteredWords.length);
    setFlipped(false);
    setShowExample(false);
  }

  function prev() {
    setCardIndex((i) => (i - 1 + filteredWords.length) % filteredWords.length);
    setFlipped(false);
    setShowExample(false);
  }

  function handleKnow() {
    if (!currentWord) return;
    markWordLearned(currentWord.id);
    setLearned((s) => new Set([...s, currentWord.id]));
    next();
  }

  function handleUnknown() {
    if (!currentWord) return;
    addToErrorBook({
      wordId: currentWord.id,
      word: currentWord.word,
      translation: currentWord.translation,
      category: currentWord.category,
    });
    next();
  }

  const learnedCount = filteredWords.filter((w) => learned.has(w.id)).length;

  return (
    <div>
      {/* Mode tabs */}
      <div className="mb-4 flex gap-2">
        {(["flashcard", "list", "traps"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              mode === m ? "bg-aqua text-white" : "bg-white border border-ink/10 text-muted hover:text-ink"
            }`}
          >
            {m === "flashcard" ? "闪卡背词" : m === "list" ? "词汇列表" : "熟词僻义"}
          </button>
        ))}
      </div>

      {/* Category filter */}
      {mode !== "traps" && (
        <div className="mb-4 flex flex-wrap gap-2">
          {(["all", "core", "extended"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setCardIndex(0); setFlipped(false); }}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                filter === f ? "bg-cobalt text-white" : "bg-white border border-ink/10 text-muted hover:text-ink"
              }`}
            >
              {f === "all" ? "全部" : f === "core" ? "核心100词" : "扩展100词"}
            </button>
          ))}
          {(Object.keys(CATEGORY_LABELS) as WordCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setCardIndex(0); setFlipped(false); }}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                filter === cat ? "bg-aqua text-white" : "bg-white border border-ink/10 text-muted hover:text-ink"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      )}

      {/* Progress */}
      {mode === "flashcard" && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">{cardIndex + 1} / {filteredWords.length}</span>
            <span className="text-xs text-muted">已掌握 {learnedCount}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-ink/5">
            <div
              className="h-1.5 rounded-full bg-aqua transition-all"
              style={{ width: `${((cardIndex + 1) / filteredWords.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Flashcard */}
      {mode === "flashcard" && currentWord && (
        <div className="flex flex-col items-center">
          <div
            className="panel w-full max-w-lg cursor-pointer p-8 text-center transition hover:shadow-lg select-none"
            onClick={() => setFlipped((f) => !f)}
          >
            {!flipped ? (
              <div>
                <p className="text-3xl font-black text-ink mb-3">{currentWord.word}</p>
                <p className="text-xs text-muted">{CATEGORY_LABELS[currentWord.category]}</p>
                {currentWord.testHint && (
                  <span className="mt-3 inline-block rounded-full bg-amber/15 px-3 py-1 text-xs font-bold text-amber">
                    ⚡ {currentWord.testHint}
                  </span>
                )}
                <p className="mt-6 text-xs text-muted/60">点击翻转查看释义</p>
              </div>
            ) : (
              <div>
                <p className="text-xl font-black text-aqua mb-2">{currentWord.translation}</p>
                <p className="text-sm font-semibold text-ink mb-4">{currentWord.word}</p>
                {currentWord.example && (
                  <div className="mt-3 rounded-lg bg-cobalt/5 p-3 text-left">
                    <p className="text-xs font-bold text-cobalt mb-1">例句</p>
                    <p className="text-sm text-ink">{currentWord.example}</p>
                  </div>
                )}
                {learned.has(currentWord.id) && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-aqua">
                    <CheckCircle size={12} /> 已掌握
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={prev}
              className="rounded-lg border border-ink/10 bg-white p-2 text-muted hover:text-ink transition"
            >
              <ChevronLeft size={18} />
            </button>
            {flipped && (
              <>
                <button
                  onClick={handleUnknown}
                  className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-2 text-sm font-bold text-error hover:bg-error/20 transition"
                >
                  <XCircle size={15} /> 不认识
                </button>
                <button
                  onClick={handleKnow}
                  className="flex items-center gap-2 rounded-lg bg-aqua/10 px-4 py-2 text-sm font-bold text-aqua hover:bg-aqua/20 transition"
                >
                  <CheckCircle size={15} /> 认识
                </button>
              </>
            )}
            {!flipped && (
              <button
                onClick={() => setFlipped(true)}
                className="flex items-center gap-2 rounded-lg bg-cobalt px-4 py-2 text-sm font-bold text-white hover:bg-cobalt/90 transition"
              >
                <Eye size={15} /> 查看释义
              </button>
            )}
            <button
              onClick={next}
              className="rounded-lg border border-ink/10 bg-white p-2 text-muted hover:text-ink transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            onClick={() => { setCardIndex(0); setFlipped(false); }}
            className="mt-3 flex items-center gap-1 text-xs text-muted hover:text-ink transition"
          >
            <RotateCcw size={12} /> 重新开始
          </button>
        </div>
      )}

      {/* List mode */}
      {mode === "list" && (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWords.map((word) => (
            <div key={word.id} className={`panel p-3 ${learned.has(word.id) ? "border-aqua/30 bg-aqua/5" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-black text-ink">{word.word}</p>
                  <p className="text-sm text-aqua font-semibold">{word.translation}</p>
                  {word.testHint && (
                    <p className="text-xs text-amber mt-1">⚡ {word.testHint}</p>
                  )}
                </div>
                {learned.has(word.id) && <CheckCircle size={14} className="text-aqua flex-shrink-0 mt-1" />}
              </div>
              {word.example && (
                <p className="mt-2 text-xs text-muted leading-4">{word.example}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Traps mode */}
      {mode === "traps" && (
        <div>
          <p className="mb-4 text-sm text-muted">命题人最爱考这些单词的"阅读义"，与课本不同！</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {FAMILIAR_WORD_TRAPS.map((trap) => (
              <div key={trap.id} className="panel p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl font-black text-ink">{trap.word}</span>
                  <span className="rounded-full bg-error/10 px-2 py-0.5 text-xs font-bold text-error">课本：{trap.textbookMeaning}</span>
                  <span className="rounded-full bg-aqua/10 px-2 py-0.5 text-xs font-bold text-aqua">阅读：{trap.readingMeaning}</span>
                </div>
                <div className="rounded-lg bg-cobalt/5 p-2">
                  <p className="text-xs font-bold text-cobalt mb-1">例句</p>
                  <p className="text-sm text-ink">{trap.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example toggle for flashcard */}
      {mode === "flashcard" && showExample && currentWord?.example && (
        <div className="mt-3 panel p-3 max-w-lg mx-auto">
          <p className="text-xs font-bold text-cobalt mb-1">例句</p>
          <p className="text-sm text-ink">{currentWord.example}</p>
        </div>
      )}
    </div>
  );
}
