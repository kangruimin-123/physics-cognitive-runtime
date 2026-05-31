import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Brain,
  Layers,
  FileText,
  AlertTriangle,
  RefreshCw,
  ChevronLeft,
} from "lucide-react";
import { VocabPage } from "./VocabPage";
import { DailyPlanPage } from "./DailyPlanPage";
import { QuizPage } from "./QuizPage";
import { SentencePage } from "./SentencePage";
import { CDStrategyPage } from "./CDStrategyPage";
import { ErrorBookPage } from "./ErrorBookPage";
import { EbbinghausPage } from "./EbbinghausPage";
import {
  getLearnedWordIds,
  getErrorBook,
  getWordsDueForReview,
  getQuizStats,
  getDailyPlanProgress,
} from "../../data/beijing/storage";
import { ALL_WORDS } from "../../data/beijing/words";

type Section =
  | "home"
  | "vocab"
  | "daily"
  | "quiz"
  | "sentence"
  | "strategy"
  | "errors"
  | "ebbinghaus";

const NAV_ITEMS: {
  id: Section;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "vocab",
    label: "单词记忆",
    sublabel: "200词分类记忆 + 熟词僻义",
    icon: BookOpen,
    color: "bg-aqua text-white",
  },
  {
    id: "daily",
    label: "每日背诵计划",
    sublabel: "20天冲刺，每天10词5短语",
    icon: Calendar,
    color: "bg-cobalt text-white",
  },
  {
    id: "quiz",
    label: "Quiz 测验",
    sublabel: "选择题 / 填空 / 同义替换",
    icon: Brain,
    color: "bg-amber text-white",
  },
  {
    id: "sentence",
    label: "长难句拆解",
    sublabel: "6大模板 × 12句精练",
    icon: Layers,
    color: "bg-aqua text-white",
  },
  {
    id: "strategy",
    label: "C/D 篇策略",
    sublabel: "命题套路 + 万能做题步骤",
    icon: FileText,
    color: "bg-cobalt text-white",
  },
  {
    id: "errors",
    label: "错词本",
    sublabel: "记录每次做错的词",
    icon: AlertTriangle,
    color: "bg-error text-white",
  },
  {
    id: "ebbinghaus",
    label: "艾宾浩斯复习",
    sublabel: "科学间隔复习，防止遗忘",
    icon: RefreshCw,
    color: "bg-amber text-white",
  },
];

export function BeijingReadingApp() {
  const [section, setSection] = useState<Section>("home");

  const learned = getLearnedWordIds().length;
  const total = ALL_WORDS.length;
  const errors = getErrorBook().length;
  const due = getWordsDueForReview().length;
  const stats = getQuizStats();
  const plan = getDailyPlanProgress();
  const accuracy =
    stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

  if (section !== "home") {
    const title = NAV_ITEMS.find((n) => n.id === section)?.label ?? "";
    return (
      <div className="min-h-screen bg-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <button
            onClick={() => setSection("home")}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition"
          >
            <ChevronLeft size={16} />
            返回主页
          </button>
          <h2 className="mb-6 text-xl font-black text-ink">{title}</h2>
          {section === "vocab" && <VocabPage />}
          {section === "daily" && <DailyPlanPage />}
          {section === "quiz" && <QuizPage />}
          {section === "sentence" && <SentencePage />}
          {section === "strategy" && <CDStrategyPage />}
          {section === "errors" && <ErrorBookPage />}
          {section === "ebbinghaus" && <EbbinghausPage />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-ink">
            北京中考英语阅读 C/D 篇
          </h1>
          <p className="mt-1 text-sm text-muted">
            终极冲刺手册 · 2024-2026 各区一模二模真题版
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="已掌握" value={`${learned}/${total}`} sub="词汇" color="text-aqua" />
          <StatCard label="待复习" value={due} sub="今日到期" color={due > 0 ? "text-amber" : "text-aqua"} />
          <StatCard label="错词本" value={errors} sub="个词" color={errors > 0 ? "text-error" : "text-muted"} />
          <StatCard label="答题正确率" value={stats.totalQuestions > 0 ? `${accuracy}%` : "—"} sub={`共${stats.totalQuestions}题`} color="text-cobalt" />
        </div>

        {/* Plan progress bar */}
        <div className="panel mb-6 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted uppercase tracking-wide">20天冲刺进度</span>
            <span className="text-xs font-bold text-ink">{plan.completedDays.length}/20 天</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  plan.completedDays.includes(i + 1)
                    ? "bg-aqua"
                    : "bg-ink/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className="panel flex items-start gap-3 p-4 text-left transition hover:border-aqua/50 hover:shadow-md"
              >
                <span className={`rounded-lg p-2 flex-shrink-0 ${item.color}`}>
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-black text-ink">{item.label}</span>
                  <span className="mt-1 block text-xs leading-4 text-muted">{item.sublabel}</span>
                  {item.id === "errors" && errors > 0 && (
                    <span className="mt-1 inline-block rounded-full bg-error/10 px-2 py-0.5 text-xs font-bold text-error">
                      {errors} 个词
                    </span>
                  )}
                  {item.id === "ebbinghaus" && due > 0 && (
                    <span className="mt-1 inline-block rounded-full bg-amber/15 px-2 py-0.5 text-xs font-bold text-amber">
                      {due} 词到期
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick tip */}
        <div className="mt-6 panel p-4 border-l-4 border-l-cobalt bg-cobalt/5">
          <p className="text-xs font-bold text-cobalt mb-1">今日备考提示</p>
          <p className="text-sm text-ink">
            北京中考阅读 C/D 篇是失分重灾区。先背<strong>科学研究</strong>和<strong>心理成长</strong>两类核心词，再练<strong>定语从句</strong>和<strong>宾语从句</strong>拆解，最后刷 D 篇<strong>议论文结构分析</strong>。
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div className="panel p-3">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className={`text-2xl font-black value-text ${color}`}>{value}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}
