// localStorage keys
const KEYS = {
  ERROR_BOOK: "bjr_error_book",
  PROGRESS: "bjr_word_progress",
  DAILY_PLAN: "bjr_daily_plan",
  QUIZ_STATS: "bjr_quiz_stats",
};

// Ebbinghaus review intervals in days
export const REVIEW_INTERVALS = [1, 2, 4, 7, 15, 30];

export interface WordProgress {
  wordId: string;
  firstLearnedAt: number;
  nextReviewAt: number;
  intervalIndex: number; // index into REVIEW_INTERVALS
  totalReviews: number;
  correct: number;
  mastered: boolean;
}

export interface ErrorEntry {
  wordId: string;
  word: string;
  translation: string;
  addedAt: number;
  wrongCount: number;
  category: string;
}

export interface DailyPlanProgress {
  completedDays: number[];
  dayStartedAt: Record<number, number>;
}

export interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  lastSession: number;
  sessionHistory: { date: number; score: number; total: number }[];
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Word Progress / Ebbinghaus
export function getWordProgress(): Record<string, WordProgress> {
  return load<Record<string, WordProgress>>(KEYS.PROGRESS, {});
}

export function markWordLearned(wordId: string): void {
  const all = getWordProgress();
  const now = Date.now();
  if (!all[wordId]) {
    all[wordId] = {
      wordId,
      firstLearnedAt: now,
      nextReviewAt: now + REVIEW_INTERVALS[0] * 86400000,
      intervalIndex: 0,
      totalReviews: 0,
      correct: 0,
      mastered: false,
    };
  }
  save(KEYS.PROGRESS, all);
}

export function recordReview(wordId: string, wasCorrect: boolean): void {
  const all = getWordProgress();
  const now = Date.now();
  if (!all[wordId]) {
    markWordLearned(wordId);
    return;
  }
  const p = all[wordId];
  p.totalReviews += 1;
  if (wasCorrect) {
    p.correct += 1;
    p.intervalIndex = Math.min(p.intervalIndex + 1, REVIEW_INTERVALS.length - 1);
  } else {
    p.intervalIndex = 0;
  }
  p.nextReviewAt = now + REVIEW_INTERVALS[p.intervalIndex] * 86400000;
  p.mastered = p.intervalIndex >= REVIEW_INTERVALS.length - 1 && wasCorrect;
  all[wordId] = p;
  save(KEYS.PROGRESS, all);
}

export function getWordsDueForReview(): string[] {
  const all = getWordProgress();
  const now = Date.now();
  return Object.values(all)
    .filter((p) => !p.mastered && p.nextReviewAt <= now)
    .map((p) => p.wordId);
}

export function getLearnedWordIds(): string[] {
  return Object.keys(getWordProgress());
}

// Error Book
export function getErrorBook(): ErrorEntry[] {
  return load<ErrorEntry[]>(KEYS.ERROR_BOOK, []);
}

export function addToErrorBook(entry: Omit<ErrorEntry, "addedAt" | "wrongCount">): void {
  const book = getErrorBook();
  const existing = book.find((e) => e.wordId === entry.wordId);
  if (existing) {
    existing.wrongCount += 1;
  } else {
    book.push({ ...entry, addedAt: Date.now(), wrongCount: 1 });
  }
  save(KEYS.ERROR_BOOK, book);
}

export function removeFromErrorBook(wordId: string): void {
  const book = getErrorBook().filter((e) => e.wordId !== wordId);
  save(KEYS.ERROR_BOOK, book);
}

export function clearErrorBook(): void {
  save(KEYS.ERROR_BOOK, []);
}

// Daily Plan
export function getDailyPlanProgress(): DailyPlanProgress {
  return load<DailyPlanProgress>(KEYS.DAILY_PLAN, { completedDays: [], dayStartedAt: {} });
}

export function markDayComplete(day: number): void {
  const p = getDailyPlanProgress();
  if (!p.completedDays.includes(day)) {
    p.completedDays.push(day);
  }
  save(KEYS.DAILY_PLAN, p);
}

export function markDayStarted(day: number): void {
  const p = getDailyPlanProgress();
  if (!p.dayStartedAt[day]) {
    p.dayStartedAt[day] = Date.now();
  }
  save(KEYS.DAILY_PLAN, p);
}

// Quiz Stats
export function getQuizStats(): QuizStats {
  return load<QuizStats>(KEYS.QUIZ_STATS, {
    totalQuestions: 0,
    correctAnswers: 0,
    lastSession: 0,
    sessionHistory: [],
  });
}

export function saveQuizSession(score: number, total: number): void {
  const stats = getQuizStats();
  stats.totalQuestions += total;
  stats.correctAnswers += score;
  stats.lastSession = Date.now();
  stats.sessionHistory = [
    { date: Date.now(), score, total },
    ...stats.sessionHistory.slice(0, 9),
  ];
  save(KEYS.QUIZ_STATS, stats);
}
