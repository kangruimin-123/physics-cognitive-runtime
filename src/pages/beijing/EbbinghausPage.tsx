import { useState } from "react";
import { CheckCircle, XCircle, RefreshCw, Info } from "lucide-react";
import {
  getWordsDueForReview,
  getWordProgress,
  recordReview,
  markWordLearned,
  getLearnedWordIds,
  REVIEW_INTERVALS,
} from "../../data/beijing/storage";
import { ALL_WORDS } from "../../data/beijing/words";
import { CATEGORY_LABELS, type WordCategory } from "../../data/beijing/words";

export function EbbinghausPage() {
  const [mode, setMode] = useState<"overview" | "review">("overview");
  const [reviewQueue, setReviewQueue] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(getWordProgress());

  const learned = getLearnedWordIds();
  const due = getWordsDueForReview();
  const total = ALL_WORDS.length;

  // Mastery stats
  const masteredCount = Object.values(progress).filter((p) => p.mastered).length;
  const inProgress = learned.length - masteredCount;

  function startReview() {
    const queue = due.filter((id) => ALL_WORDS.find((w) => w.id === id));
    if (queue.length === 0) return;
    setReviewQueue(queue);
    setCurrentIdx(0);
    setFlipped(false);
    setSessionCorrect(0);
    setSessionTotal(0);
    setDone(false);
    setMode("review");
  }

  function handleReview(correct: boolean) {
    const wordId = reviewQueue[currentIdx];
    recordReview(wordId, correct);
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
    setProgress(getWordProgress());

    if (currentIdx + 1 >= reviewQueue.length) {
      setDone(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setFlipped(false);
    }
  }

  function getNextReviewLabel(intervalIndex: number): string {
    const days = REVIEW_INTERVALS[Math.min(intervalIndex + 1, REVIEW_INTERVALS.length - 1)];
    return `下次：${days}天后`;
  }

  const currentWordId = reviewQueue[currentIdx];
  const currentWord = ALL_WORDS.find((w) => w.id === currentWordId);
  const currentProgress = currentWord ? progress[currentWord.id] : null;

  if (mode === "review") {
    if (done) {
      return (
        <div className="max-w-md mx-auto text-center py-8">
          <div className="panel p-8 mb-6">
            <RefreshCw size={40} className="text-aqua mx-auto mb-4" />
            <h3 className="text-2xl font-black text-ink mb-2">复习完成！</h3>
            <p className="text-lg font-bold text-aqua mb-1">
              {sessionCorrect} / {sessionTotal} 正确
            </p>
            <p className="text-sm text-muted">
              {sessionCorrect === sessionTotal ? "全对！记忆已加固" :
               sessionCorrect >= sessionTotal * 0.8 ? "不错！继续保持" :
               "要加强复习，记得查看错词本"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setMode("overview")}
              className="flex-1 rounded-xl border border-ink/10 py-3 text-sm font-bold text-ink hover:bg-ink/5 transition"
            >
              返回总览
            </button>
            {due.length > 0 && (
              <button
                onClick={startReview}
                className="flex-1 rounded-xl bg-aqua py-3 text-sm font-black text-white hover:bg-aqua/90 transition"
              >
                再复习一轮
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => setMode("overview")}
          className="mb-4 text-sm font-bold text-muted hover:text-ink transition"
        >
          ← 返回
        </button>

        {/* Progress */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-muted">{currentIdx + 1} / {reviewQueue.length}</span>
          <span className="text-sm font-bold text-aqua">✓ {sessionCorrect}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-ink/5 mb-4">
          <div
            className="h-1.5 rounded-full bg-aqua transition-all"
            style={{ width: `${((currentIdx) / reviewQueue.length) * 100}%` }}
          />
        </div>

        {/* Review interval badge */}
        {currentProgress && (
          <div className="flex gap-2 mb-3">
            {REVIEW_INTERVALS.map((d, i) => (
              <div
                key={d}
                className={`flex-1 h-1.5 rounded-full ${
                  i <= currentProgress.intervalIndex ? "bg-aqua" : "bg-ink/10"
                }`}
              />
            ))}
          </div>
        )}

        {/* Card */}
        <div
          className="panel p-8 text-center cursor-pointer hover:shadow-md transition mb-4"
          onClick={() => setFlipped((f) => !f)}
        >
          {!flipped ? (
            <div>
              <p className="text-3xl font-black text-ink mb-3">{currentWord?.word}</p>
              {currentWord && (
                <p className="text-xs text-muted">
                  {CATEGORY_LABELS[currentWord.category as WordCategory]}
                </p>
              )}
              {currentProgress && (
                <p className="text-xs text-cobalt mt-2">
                  已复习 {currentProgress.totalReviews} 次
                </p>
              )}
              <p className="mt-6 text-xs text-muted/60">点击翻转</p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-black text-aqua mb-2">{currentWord?.translation}</p>
              <p className="text-sm text-ink mb-3">{currentWord?.word}</p>
              {currentWord?.example && (
                <div className="rounded-lg bg-cobalt/5 p-3 text-left">
                  <p className="text-xs font-bold text-cobalt mb-1">例句</p>
                  <p className="text-sm text-ink">{currentWord.example}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Answer buttons */}
        {flipped && (
          <div className="flex gap-3">
            <button
              onClick={() => handleReview(false)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-error/10 py-3 text-sm font-black text-error hover:bg-error/20 transition"
            >
              <XCircle size={16} /> 忘了
            </button>
            <button
              onClick={() => handleReview(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-aqua py-3 text-sm font-black text-white hover:bg-aqua/90 transition"
            >
              <CheckCircle size={16} /> 记得
            </button>
          </div>
        )}
        {!flipped && (
          <button
            onClick={() => setFlipped(true)}
            className="w-full rounded-xl bg-cobalt py-3 text-sm font-black text-white hover:bg-cobalt/90 transition"
          >
            查看答案
          </button>
        )}
      </div>
    );
  }

  // Overview
  return (
    <div>
      {/* Ebbinghaus explanation */}
      <div className="panel p-4 mb-5 border-l-4 border-l-cobalt bg-cobalt/5">
        <div className="flex items-start gap-2">
          <Info size={15} className="text-cobalt flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-cobalt mb-1">艾宾浩斯遗忘曲线</p>
            <p className="text-sm text-ink">
              科学研究表明，学一个新词后，按照 <strong>1天→2天→4天→7天→15天→30天</strong> 间隔复习，可以将记忆保留率从20%提升到90%+。
            </p>
          </div>
        </div>
      </div>

      {/* Review intervals visualization */}
      <div className="panel p-4 mb-5">
        <p className="text-xs font-bold text-muted mb-3">复习间隔计划</p>
        <div className="flex items-center gap-2 flex-wrap">
          {REVIEW_INTERVALS.map((days, i) => (
            <div key={days} className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-aqua/10 border border-aqua/30 text-xs font-black text-aqua flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm font-bold text-ink">{days}天</span>
              {i < REVIEW_INTERVALS.length - 1 && (
                <span className="text-muted">→</span>
              )}
            </div>
          ))}
          <span className="ml-2 text-xs font-bold text-aqua rounded-full bg-aqua/10 px-2 py-0.5">完全掌握</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="panel p-3 text-center">
          <p className="text-2xl font-black text-cobalt value-text">{learned.length}</p>
          <p className="text-xs text-muted">已开始学习</p>
        </div>
        <div className="panel p-3 text-center">
          <p className={`text-2xl font-black value-text ${due.length > 0 ? "text-amber" : "text-aqua"}`}>{due.length}</p>
          <p className="text-xs text-muted">今日待复习</p>
        </div>
        <div className="panel p-3 text-center">
          <p className="text-2xl font-black text-aqua value-text">{masteredCount}</p>
          <p className="text-xs text-muted">已完全掌握</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="panel p-4 mb-5">
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>学习进度</span>
          <span>{learned.length}/{total}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink/5 mb-3">
          <div
            className="h-2 rounded-full bg-cobalt/30 transition-all relative"
            style={{ width: `${(learned.length / total) * 100}%` }}
          >
            <div
              className="h-2 rounded-full bg-aqua absolute inset-0 transition-all"
              style={{ width: masteredCount > 0 ? `${(masteredCount / learned.length) * 100}%` : "0%" }}
            />
          </div>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-aqua inline-block" />已掌握</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cobalt/30 inline-block" />学习中</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-ink/10 inline-block" />未学</span>
        </div>
      </div>

      {/* Action button */}
      {due.length > 0 ? (
        <button
          onClick={startReview}
          className="w-full rounded-xl bg-amber py-3 text-sm font-black text-white hover:bg-amber/90 transition mb-3"
        >
          开始今日复习（{due.length} 个词到期）
        </button>
      ) : learned.length === 0 ? (
        <div className="panel p-4 text-center">
          <p className="text-sm text-muted">还没有学习任何词汇。</p>
          <p className="text-xs text-muted mt-1">先去"单词记忆"或"每日背诵计划"学习新词，然后来这里按艾宾浩斯间隔复习。</p>
        </div>
      ) : (
        <div className="panel p-4 text-center bg-aqua/5 border-aqua/20">
          <CheckCircle size={24} className="text-aqua mx-auto mb-2" />
          <p className="text-sm font-bold text-aqua">今日复习完成！</p>
          <p className="text-xs text-muted mt-1">明天再来继续复习到期词汇。</p>
        </div>
      )}

      {/* Word list with next review dates */}
      {learned.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-black text-ink mb-3">词汇复习状态</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {learned.slice(0, 20).map((id) => {
              const word = ALL_WORDS.find((w) => w.id === id);
              const p = progress[id];
              if (!word || !p) return null;
              const isDue = p.nextReviewAt <= Date.now() && !p.mastered;
              const daysUntil = Math.ceil((p.nextReviewAt - Date.now()) / 86400000);
              return (
                <div key={id} className={`panel p-2.5 flex items-center justify-between ${isDue ? "border-amber/40 bg-amber/5" : ""}`}>
                  <div>
                    <p className="text-sm font-bold text-ink">{word.word}</p>
                    <p className="text-xs text-muted">{word.translation}</p>
                  </div>
                  <div className="text-right">
                    {p.mastered ? (
                      <span className="text-xs font-bold text-aqua">已掌握</span>
                    ) : isDue ? (
                      <span className="text-xs font-bold text-amber">待复习</span>
                    ) : (
                      <span className="text-xs text-muted">{daysUntil}天后</span>
                    )}
                    <p className="text-xs text-muted">{REVIEW_INTERVALS[p.intervalIndex]}天间隔</p>
                  </div>
                </div>
              );
            })}
          </div>
          {learned.length > 20 && (
            <p className="text-xs text-muted text-center mt-2">仅显示前20个 · 共{learned.length}个</p>
          )}
        </div>
      )}
    </div>
  );
}
