import { useState } from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { CORE_WORDS, EXTENDED_WORDS, CATEGORY_LABELS } from "../../data/beijing/words";
import { PHRASES } from "../../data/beijing/phrases";
import { markDayComplete, markDayStarted, getDailyPlanProgress } from "../../data/beijing/storage";

// 20-day plan layout
// Days 1-10: Core words (10/day) + phrases (5/day)
// Days 11-20: Extended words + strategy content

interface DayPlan {
  day: number;
  title: string;
  words: typeof CORE_WORDS;
  phrases: typeof PHRASES;
  focus: string;
  strategy?: string;
}

function buildPlan(): DayPlan[] {
  const days: DayPlan[] = [];

  // Days 1-10: Core words in groups of 10
  const coreGroups = [
    { words: CORE_WORDS.slice(0, 10), title: "科学研究（上）", focus: "研究类核心词" },
    { words: CORE_WORDS.slice(10, 20), title: "科学研究（下）", focus: "分析与方法类词" },
    { words: CORE_WORDS.slice(20, 30), title: "科技AI（上）", focus: "人工智能基础词" },
    { words: CORE_WORDS.slice(30, 40), title: "科技AI（下）", focus: "数字与系统类词" },
    { words: CORE_WORDS.slice(40, 50), title: "心理成长（上）", focus: "情绪与健康词" },
    { words: CORE_WORDS.slice(50, 60), title: "心理成长（下）", focus: "心态与品质词" },
    { words: CORE_WORDS.slice(60, 70), title: "教育成长（上）", focus: "能力与学习词" },
    { words: CORE_WORDS.slice(70, 80), title: "教育成长（下）", focus: "目标与成长词" },
    { words: CORE_WORDS.slice(80, 90), title: "环保生态（上）", focus: "气候与资源词" },
    { words: CORE_WORDS.slice(90, 100), title: "环保生态（下）", focus: "保护与可持续词" },
  ];

  const extendedGroups = [
    { words: EXTENDED_WORDS.slice(0, 10), title: "AI扩展词", focus: "面部识别/算法" },
    { words: EXTENDED_WORDS.slice(10, 20), title: "医疗机器人词", focus: "陪伴/护理/康复" },
    { words: EXTENDED_WORDS.slice(20, 30), title: "心理学扩展词", focus: "创伤/正念/认知" },
    { words: EXTENDED_WORDS.slice(30, 40), title: "社会关系词", focus: "社区/合作/志愿" },
    { words: EXTENDED_WORDS.slice(40, 50), title: "学习成长扩展词", focus: "创造力/坚持" },
  ];

  const phraseGroups = [
    PHRASES.slice(0, 10),
    PHRASES.slice(10, 20),
    PHRASES.slice(20, 30),
    PHRASES.slice(30, 40),
    PHRASES.slice(40, 50),
  ];

  const strategies = [
    "C篇万能步骤：看标题→读首段→每段总结→画逻辑图",
    "D篇结构：提出问题→分析原因→给出研究→建议→总结",
    "细节题解法：定位原文→同义替换→排除法",
    "猜词题解法：看上下文→找因果关系→不查词典",
    "主旨题解法：看首尾段+每段首句→归纳共同主题",
  ];

  for (let i = 0; i < 10; i++) {
    days.push({
      day: i + 1,
      title: coreGroups[i].title,
      words: coreGroups[i].words,
      phrases: phraseGroups[i % 5],
      focus: coreGroups[i].focus,
    });
  }
  for (let i = 0; i < 5; i++) {
    days.push({
      day: 11 + i,
      title: extendedGroups[i].title,
      words: extendedGroups[i].words,
      phrases: phraseGroups[i],
      focus: extendedGroups[i].focus,
      strategy: strategies[i],
    });
  }
  for (let i = 0; i < 5; i++) {
    days.push({
      day: 16 + i,
      title: `综合复习 第${i + 1}轮`,
      words: [...CORE_WORDS.slice(i * 20, i * 20 + 10), ...EXTENDED_WORDS.slice(i * 10, i * 10 + 5)],
      phrases: phraseGroups[i],
      focus: "综合复习 + 错词强化",
      strategy: strategies[i],
    });
  }

  return days;
}

const PLAN = buildPlan();

export function DailyPlanPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [progress, setProgress] = useState(getDailyPlanProgress());

  const day = selectedDay ? PLAN.find((d) => d.day === selectedDay) : null;

  function handleComplete(dayNum: number) {
    markDayComplete(dayNum);
    setProgress(getDailyPlanProgress());
  }

  function handleStart(dayNum: number) {
    markDayStarted(dayNum);
  }

  if (day) {
    const isCompleted = progress.completedDays.includes(day.day);
    return (
      <div>
        <button
          onClick={() => setSelectedDay(null)}
          className="mb-4 text-sm font-bold text-muted hover:text-ink transition"
        >
          ← 返回计划总览
        </button>

        <div className="panel p-5 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="mini-label">第 {day.day} 天</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-bold text-aqua">
                <CheckCircle2 size={14} /> 已完成
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-ink">{day.title}</h3>
          <p className="text-sm text-muted mt-1">重点：{day.focus}</p>
        </div>

        {/* Words section */}
        <div className="mb-4">
          <h4 className="font-black text-ink mb-3">今日词汇（{day.words.length}个）</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {day.words.map((word) => (
              <div key={word.id} className="panel p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-ink">{word.word}</p>
                    <p className="text-sm text-aqua font-semibold">{word.translation}</p>
                  </div>
                  <span className="text-xs text-muted bg-ink/5 rounded px-1.5 py-0.5">
                    {CATEGORY_LABELS[word.category].replace("（扩展）", "").replace("（上）", "").replace("（下）", "")}
                  </span>
                </div>
                {word.example && (
                  <p className="mt-2 text-xs text-muted leading-4 italic">{word.example}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phrases section */}
        <div className="mb-4">
          <h4 className="font-black text-ink mb-3">今日短语（{day.phrases.length}个）</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {day.phrases.map((phrase) => (
              <div key={phrase.id} className="panel p-3">
                <p className="font-black text-cobalt">{phrase.phrase}</p>
                <p className="text-sm text-ink">{phrase.translation}</p>
                {phrase.example && (
                  <p className="mt-1 text-xs text-muted italic">{phrase.example}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Strategy */}
        {day.strategy && (
          <div className="panel p-4 border-l-4 border-l-cobalt bg-cobalt/5 mb-4">
            <p className="text-xs font-bold text-cobalt mb-2">今日策略重点</p>
            <p className="text-sm text-ink">{day.strategy}</p>
          </div>
        )}

        {/* Complete button */}
        {!isCompleted && (
          <button
            onClick={() => { handleComplete(day.day); }}
            className="w-full rounded-xl bg-aqua px-6 py-3 text-sm font-black text-white hover:bg-aqua/90 transition"
          >
            标记第 {day.day} 天完成 ✓
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="panel p-4 mb-5 border-l-4 border-l-amber bg-amber/5">
        <p className="text-xs font-bold text-amber mb-1">20天冲刺计划</p>
        <p className="text-sm text-ink">
          第1-10天：核心100词 + 高频短语 | 第11-15天：扩展词 + 策略 | 第16-20天：综合复习
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>总进度</span>
          <span>{progress.completedDays.length}/20 天完成</span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink/5">
          <div
            className="h-2 rounded-full bg-aqua transition-all"
            style={{ width: `${(progress.completedDays.length / 20) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PLAN.map((d) => {
          const completed = progress.completedDays.includes(d.day);
          const prev = d.day === 1 || progress.completedDays.includes(d.day - 1);
          const locked = !prev && !completed;

          return (
            <button
              key={d.day}
              onClick={() => { if (!locked) { handleStart(d.day); setSelectedDay(d.day); } }}
              disabled={locked}
              className={`panel text-left p-4 transition ${
                completed
                  ? "border-aqua/50 bg-aqua/5"
                  : locked
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:border-cobalt/40 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${completed ? "text-aqua" : "text-muted"}`}>
                  第 {d.day} 天
                </span>
                {completed ? (
                  <CheckCircle2 size={14} className="text-aqua" />
                ) : locked ? (
                  <Lock size={12} className="text-muted" />
                ) : (
                  <Circle size={14} className="text-muted" />
                )}
              </div>
              <p className="text-sm font-black text-ink">{d.title}</p>
              <p className="text-xs text-muted mt-1">{d.words.length}词 · {d.phrases.length}短语</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
