import { useState } from "react";
import { Trash2, RotateCcw, BookOpen, AlertTriangle } from "lucide-react";
import { getErrorBook, removeFromErrorBook, clearErrorBook, type ErrorEntry } from "../../data/beijing/storage";
import { CATEGORY_LABELS, type WordCategory } from "../../data/beijing/words";

export function ErrorBookPage() {
  const [book, setBook] = useState<ErrorEntry[]>(getErrorBook());
  const [confirmClear, setConfirmClear] = useState(false);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);

  function refresh() {
    setBook(getErrorBook());
  }

  function handleRemove(wordId: string) {
    removeFromErrorBook(wordId);
    refresh();
    if (reviewIndex !== null && reviewIndex >= book.length - 1) {
      setReviewIndex(null);
    }
  }

  function handleClear() {
    clearErrorBook();
    refresh();
    setConfirmClear(false);
    setReviewIndex(null);
  }

  // Sort by wrong count descending
  const sorted = [...book].sort((a, b) => b.wrongCount - a.wrongCount);

  if (book.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen size={48} className="text-aqua mb-4" />
        <h3 className="font-black text-xl text-ink mb-2">错词本为空</h3>
        <p className="text-sm text-muted max-w-xs">
          在 Quiz 测验中答错的词会自动加入这里。也可以在词汇记忆中点"不认识"来添加。
        </p>
      </div>
    );
  }

  // Review mode
  if (reviewIndex !== null && sorted[reviewIndex]) {
    const entry = sorted[reviewIndex];
    return (
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { setReviewIndex(null); setFlipped(false); }}
            className="text-sm font-bold text-muted hover:text-ink transition"
          >
            ← 返回错词本
          </button>
          <span className="text-sm text-muted">{reviewIndex + 1} / {sorted.length}</span>
        </div>

        <div
          className="panel p-8 text-center cursor-pointer hover:shadow-md transition mb-4"
          onClick={() => setFlipped((f) => !f)}
        >
          {!flipped ? (
            <div>
              <p className="text-3xl font-black text-ink mb-2">{entry.word}</p>
              <span className="rounded-full bg-error/10 px-3 py-1 text-xs font-bold text-error">
                错误 {entry.wrongCount} 次
              </span>
              <p className="mt-4 text-xs text-muted/60">点击翻转查看释义</p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-black text-aqua mb-1">{entry.translation}</p>
              <p className="text-sm text-ink">{entry.word}</p>
              <p className="text-xs text-muted mt-3">
                分类：{CATEGORY_LABELS[entry.category as WordCategory] ?? entry.category}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (reviewIndex > 0) { setReviewIndex((i) => i! - 1); setFlipped(false); }
            }}
            disabled={reviewIndex === 0}
            className="flex-1 rounded-xl border border-ink/10 py-3 text-sm font-bold text-muted disabled:opacity-40 hover:text-ink transition"
          >
            上一个
          </button>
          <button
            onClick={() => { handleRemove(entry.wordId); setFlipped(false); }}
            className="rounded-xl border border-aqua/30 px-4 py-3 text-sm font-bold text-aqua hover:bg-aqua/10 transition"
          >
            已掌握 ✓
          </button>
          <button
            onClick={() => {
              if (reviewIndex < sorted.length - 1) { setReviewIndex((i) => i! + 1); setFlipped(false); }
              else { setReviewIndex(null); }
            }}
            className="flex-1 rounded-xl bg-cobalt py-3 text-sm font-black text-white hover:bg-cobalt/90 transition"
          >
            {reviewIndex < sorted.length - 1 ? "下一个" : "完成"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-error" />
          <span className="font-black text-ink">共 {book.length} 个错词</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setReviewIndex(0); setFlipped(false); }}
            className="flex items-center gap-1.5 rounded-lg bg-cobalt px-3 py-2 text-xs font-bold text-white hover:bg-cobalt/90 transition"
          >
            <RotateCcw size={13} /> 开始复习
          </button>
          {confirmClear ? (
            <div className="flex gap-1">
              <button
                onClick={handleClear}
                className="rounded-lg bg-error px-3 py-2 text-xs font-bold text-white hover:bg-error/90 transition"
              >
                确认清空
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="rounded-lg border border-ink/10 px-3 py-2 text-xs text-muted hover:text-ink transition"
              >
                取消
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-1.5 rounded-lg border border-error/30 px-3 py-2 text-xs font-bold text-error hover:bg-error/5 transition"
            >
              <Trash2 size={13} /> 清空
            </button>
          )}
        </div>
      </div>

      {/* Most errors highlight */}
      {sorted[0].wrongCount > 1 && (
        <div className="panel p-4 mb-4 border-l-4 border-l-error bg-error/5">
          <p className="text-xs font-bold text-error mb-1">重点关注</p>
          <p className="text-sm text-ink">
            <strong>{sorted[0].word}</strong> 已错 {sorted[0].wrongCount} 次 — {sorted[0].translation}
          </p>
        </div>
      )}

      {/* Word list */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((entry, i) => (
          <div
            key={entry.wordId}
            className="panel p-3 cursor-pointer hover:border-cobalt/30 transition"
            onClick={() => { setReviewIndex(i); setFlipped(false); }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-black text-ink">{entry.word}</p>
                <p className="text-sm text-aqua font-semibold">{entry.translation}</p>
                <p className="text-xs text-muted mt-1">
                  {CATEGORY_LABELS[entry.category as WordCategory] ?? entry.category}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-black ${
                  entry.wrongCount >= 3 ? "bg-error/15 text-error" : "bg-amber/15 text-amber"
                }`}>
                  ×{entry.wrongCount}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(entry.wordId); }}
                  className="text-muted hover:text-error transition"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Added date info */}
      <p className="mt-4 text-xs text-muted text-center">
        最近添加：{sorted[0] ? new Date(sorted[0].addedAt).toLocaleDateString() : "—"}
      </p>
    </div>
  );
}
