import { useState, useMemo, useCallback } from "react";
import { CheckCircle, XCircle, ChevronRight, Trophy } from "lucide-react";
import { ALL_WORDS, FAMILIAR_WORD_TRAPS } from "../../data/beijing/words";
import { SYNONYM_PAIRS, PHRASES } from "../../data/beijing/phrases";
import { addToErrorBook, saveQuizSession, getQuizStats } from "../../data/beijing/storage";

type QuizType = "translation" | "traps" | "synonyms" | "phrases";

interface Question {
  id: string;
  type: QuizType;
  prompt: string;
  options: string[];
  answer: string;
  explanation?: string;
  wordId?: string;
  word?: string;
  category?: string;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(type: QuizType, count = 10): Question[] {
  if (type === "translation") {
    const words = shuffle(ALL_WORDS).slice(0, count);
    return words.map((w) => {
      const distractors = shuffle(ALL_WORDS.filter((x) => x.id !== w.id))
        .slice(0, 3)
        .map((x) => x.translation);
      return {
        id: `tr-${w.id}`,
        type: "translation",
        prompt: `"${w.word}" 的中文意思是？`,
        options: shuffle([w.translation, ...distractors]),
        answer: w.translation,
        explanation: w.example,
        wordId: w.id,
        word: w.word,
        category: w.category,
      };
    });
  }

  if (type === "traps") {
    const traps = shuffle(FAMILIAR_WORD_TRAPS).slice(0, Math.min(count, FAMILIAR_WORD_TRAPS.length));
    return traps.map((t) => {
      const wrongOptions = shuffle(
        FAMILIAR_WORD_TRAPS.filter((x) => x.id !== t.id).map((x) => x.readingMeaning)
      ).slice(0, 3);
      return {
        id: `fw-${t.id}`,
        type: "traps",
        prompt: `在阅读中，"${t.word}" 通常表示？`,
        options: shuffle([t.readingMeaning, ...wrongOptions]),
        answer: t.readingMeaning,
        explanation: t.example,
        word: t.word,
      };
    });
  }

  if (type === "synonyms") {
    const pairs = shuffle(SYNONYM_PAIRS).slice(0, Math.min(count, SYNONYM_PAIRS.length));
    return pairs.map((p) => {
      const distractors = shuffle(SYNONYM_PAIRS.filter((x) => x.id !== p.id))
        .slice(0, 3)
        .map((x) => x.testSubstitute);
      return {
        id: `sy-${p.id}`,
        type: "synonyms",
        prompt: `原文用 "${p.original}"，命题人在题目中会替换成哪个词？`,
        options: shuffle([p.testSubstitute, ...distractors]),
        answer: p.testSubstitute,
        explanation: `"${p.original}" 和 "${p.testSubstitute}" 都表示"${p.chineseMeaning}"`,
      };
    });
  }

  if (type === "phrases") {
    const ph = shuffle(PHRASES).slice(0, count);
    return ph.map((p) => {
      const distractors = shuffle(PHRASES.filter((x) => x.id !== p.id))
        .slice(0, 3)
        .map((x) => x.translation);
      return {
        id: `ph-${p.id}`,
        type: "phrases",
        prompt: `"${p.phrase}" 的意思是？`,
        options: shuffle([p.translation, ...distractors]),
        answer: p.translation,
        explanation: p.example,
      };
    });
  }

  return [];
}

export function QuizPage() {
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);

  const stats = getQuizStats();

  function startQuiz(type: QuizType) {
    const qs = buildQuestions(type, 10);
    setQuizType(type);
    setQuestions(qs);
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
  }

  function handleAnswer(option: string) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const q = questions[currentIndex];
    const correct = option === q.answer;
    if (correct) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((w) => [...w, q]);
      if (q.wordId && q.word && q.category) {
        addToErrorBook({
          wordId: q.wordId,
          word: q.word,
          translation: q.answer,
          category: q.category,
        });
      }
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      saveQuizSession(score + (selected === questions[currentIndex].answer ? 1 : 0), questions.length);
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  const q = questions[currentIndex];

  const QUIZ_TYPES: { id: QuizType; label: string; desc: string; color: string }[] = [
    { id: "translation", label: "词汇翻译", desc: "英文→中文，核心200词", color: "bg-aqua" },
    { id: "traps", label: "熟词僻义", desc: "课本义 vs 阅读义", color: "bg-amber" },
    { id: "synonyms", label: "同义替换", desc: "命题人最爱的替换词", color: "bg-cobalt" },
    { id: "phrases", label: "短语搭配", desc: "50个高频短语", color: "bg-aqua" },
  ];

  if (!quizType) {
    return (
      <div>
        {/* Cumulative stats */}
        {stats.totalQuestions > 0 && (
          <div className="panel p-4 mb-5 flex items-center gap-4">
            <Trophy size={20} className="text-amber" />
            <div>
              <p className="text-sm font-black text-ink">
                累计答题 {stats.totalQuestions} 题，正确率{" "}
                {Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%
              </p>
              <p className="text-xs text-muted">
                最近一次：{new Date(stats.lastSession).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {QUIZ_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => startQuiz(t.id)}
              className="panel flex items-center gap-4 p-5 text-left hover:border-aqua/50 hover:shadow-md transition"
            >
              <span className={`rounded-xl p-3 text-white flex-shrink-0 ${t.color}`}>
                <Trophy size={20} />
              </span>
              <div>
                <p className="font-black text-ink">{t.label}</p>
                <p className="text-sm text-muted mt-0.5">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (finished) {
    const finalScore = score;
    const pct = Math.round((finalScore / questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto">
        <div className="panel p-8 text-center mb-6">
          <div className={`text-5xl font-black mb-2 ${pct >= 80 ? "text-aqua" : pct >= 60 ? "text-amber" : "text-error"}`}>
            {pct}%
          </div>
          <p className="text-xl font-black text-ink">{finalScore} / {questions.length}</p>
          <p className="text-sm text-muted mt-2">
            {pct >= 90 ? "优秀！继续保持" : pct >= 70 ? "不错，再巩固一下错题" : "要加油！重点复习错词本"}
          </p>
        </div>

        {wrongAnswers.length > 0 && (
          <div className="mb-6">
            <h4 className="font-black text-ink mb-3">错题回顾（{wrongAnswers.length}题）</h4>
            <div className="grid gap-2">
              {wrongAnswers.map((wq, i) => (
                <div key={i} className="panel p-3 border-l-4 border-l-error">
                  <p className="text-sm font-bold text-ink">{wq.prompt}</p>
                  <p className="text-sm text-error mt-1">正确答案：{wq.answer}</p>
                  {wq.explanation && <p className="text-xs text-muted mt-1">{wq.explanation}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => startQuiz(quizType!)}
            className="flex-1 rounded-xl bg-aqua py-3 text-sm font-black text-white hover:bg-aqua/90 transition"
          >
            再来一轮
          </button>
          <button
            onClick={() => setQuizType(null)}
            className="flex-1 rounded-xl border border-ink/10 py-3 text-sm font-black text-ink hover:bg-ink/5 transition"
          >
            换题型
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>{currentIndex + 1} / {questions.length}</span>
          <span>得分 {score}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-ink/5">
          <div
            className="h-1.5 rounded-full bg-cobalt transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="panel p-6 mb-4">
        <p className="text-sm font-bold text-muted mb-3">
          {q.type === "translation" ? "词汇翻译" :
           q.type === "traps" ? "熟词僻义" :
           q.type === "synonyms" ? "同义替换" : "短语搭配"}
        </p>
        <p className="text-lg font-black text-ink">{q.prompt}</p>
      </div>

      {/* Options */}
      <div className="grid gap-2 mb-4">
        {q.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = answered && opt === q.answer;
          const isWrong = answered && isSelected && opt !== q.answer;
          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              className={`panel w-full px-4 py-3 text-left text-sm font-semibold transition ${
                isCorrect
                  ? "border-aqua bg-aqua/10 text-aqua"
                  : isWrong
                  ? "border-error bg-error/10 text-error"
                  : isSelected
                  ? "border-cobalt/30"
                  : answered
                  ? "opacity-50"
                  : "hover:border-cobalt/40"
              }`}
            >
              <span className="flex items-center gap-2">
                {answered && isCorrect && <CheckCircle size={14} className="flex-shrink-0" />}
                {isWrong && <XCircle size={14} className="flex-shrink-0" />}
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && q.explanation && (
        <div className="panel p-3 mb-4 border-l-4 border-l-cobalt bg-cobalt/5">
          <p className="text-xs font-bold text-cobalt mb-1">解析</p>
          <p className="text-sm text-ink">{q.explanation}</p>
        </div>
      )}

      {/* Next */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-cobalt py-3 text-sm font-black text-white hover:bg-cobalt/90 transition"
        >
          {currentIndex + 1 >= questions.length ? "查看结果" : "下一题"}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
