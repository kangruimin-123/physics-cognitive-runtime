import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAMILIAR_WORD_TRAPS } from "../../data/beijing/words";
import { SYNONYM_PAIRS } from "../../data/beijing/phrases";

type Tab = "overview" | "c_article" | "d_article" | "question_types" | "traps";

export function CDStrategyPage() {
  const [tab, setTab] = useState<Tab>("overview");

  const TABS: { id: Tab; label: string }[] = [
    { id: "overview", label: "总览" },
    { id: "c_article", label: "C篇做题法" },
    { id: "d_article", label: "D篇做题法" },
    { id: "question_types", label: "题型套路" },
    { id: "traps", label: "同义替换" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="mb-5 flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              tab === t.id
                ? "bg-cobalt text-white"
                : "bg-white border border-ink/10 text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab />}
      {tab === "c_article" && <CArticleTab />}
      {tab === "d_article" && <DArticleTab />}
      {tab === "question_types" && <QuestionTypesTab />}
      {tab === "traps" && <TrapsTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-4">
      <div className="panel p-5 border-l-4 border-l-amber bg-amber/5">
        <h3 className="font-black text-ink mb-2">北京中考阅读本质</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { type: "A篇", char: "送分题", color: "bg-aqua/10 text-aqua" },
            { type: "B篇", char: "故事类", color: "bg-cobalt/10 text-cobalt" },
            { type: "C篇", char: "科普说明文", color: "bg-amber/10 text-amber" },
            { type: "D篇", char: "议论文", color: "bg-error/10 text-error" },
          ].map((item) => (
            <div key={item.type} className={`rounded-xl p-3 text-center ${item.color}`}>
              <p className="text-lg font-black">{item.type}</p>
              <p className="text-xs font-bold mt-1">{item.char}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink">
          <strong>C + D 占阅读失分 80%+</strong>。B篇主要靠故事理解，A篇几乎送分。
          真正拉开差距的是 C/D 篇。
        </p>
      </div>

      <div className="panel p-5">
        <h3 className="font-black text-ink mb-3">近三年北京命题高频主题</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { tier: "第一梯队（必出）", topics: ["人工智能", "科技创新", "心理健康", "成长教育", "环境保护", "社会现象"] },
            { tier: "第二梯队（常出）", topics: ["医疗健康", "机器人", "幸福感研究", "社交媒体", "学习能力", "校园科技"] },
            { tier: "第三梯队（偶出）", topics: ["建筑设计", "城市规划", "生物保护", "海洋动物", "能源发展", "历史文化"] },
          ].map((group) => (
            <div key={group.tier} className="panel p-3">
              <p className="text-xs font-black text-cobalt mb-2">{group.tier}</p>
              <div className="flex flex-wrap gap-1">
                {group.topics.map((t) => (
                  <span key={t} className="rounded bg-ink/5 px-1.5 py-0.5 text-xs text-ink">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CArticleTab() {
  const [step, setStep] = useState(0);
  const steps = [
    { num: 1, title: "看标题", desc: "标题 = 文章主题的浓缩。看到标题先想：这是什么话题？是科技/环保/教育？", tip: "在选项里找和标题主题相关的词" },
    { num: 2, title: "读第一段，抓主题句", desc: "C篇第一段通常是引入背景 + 提出主题。主题句多在段首或段尾。", tip: "第一段读完后，用一句话总结：'这篇文章讲的是___'" },
    { num: 3, title: "每段首句 = 段落大意", desc: "科普说明文结构清晰，每段首句几乎就是该段主旨。快速扫读首句即可把握全文脉络。", tip: "中间几段可以先读首句，做题时再精读相关段落" },
    { num: 4, title: "画逻辑图", desc: "把文章结构图像化：引入→案例1→案例2→案例3→总结。常见结构：总分总、问题-解决方案、比较异同。", tip: "逻辑图画出来后，主旨题和结构题基本都能解决" },
    { num: 5, title: "做题：定位+替换", desc: "细节题：回到原文找对应段落，找同义替换词。不要凭印象选，一定要找原文依据。", tip: "永远不要选'读起来感觉对'的选项，要选'原文说了'的选项" },
  ];

  return (
    <div>
      <div className="panel p-4 mb-5 border-l-4 border-l-aqua bg-aqua/5">
        <p className="text-sm font-black text-aqua mb-1">C篇 = 科普说明文</p>
        <p className="text-sm text-ink">
          特点：有明确的说明对象，按逻辑顺序展开，多举例子，语言客观。<br/>
          <strong>核心策略</strong>：先把握整体结构，再做具体题目。
        </p>
      </div>

      {/* Step-by-step */}
      <div className="space-y-3 mb-5">
        {steps.map((s, i) => (
          <div key={s.num} className={`panel p-4 cursor-pointer transition ${step === i ? "border-aqua/50 bg-aqua/5" : "hover:border-aqua/30"}`}
               onClick={() => setStep(step === i ? -1 : i)}>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-aqua text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                {s.num}
              </span>
              <p className="font-black text-ink">{s.title}</p>
              {step === i ? <ChevronUp size={16} className="ml-auto text-muted" /> : <ChevronDown size={16} className="ml-auto text-muted" />}
            </div>
            {step === i && (
              <div className="mt-3 pl-10">
                <p className="text-sm text-ink mb-2">{s.desc}</p>
                <div className="rounded-lg bg-amber/10 px-3 py-2">
                  <p className="text-xs font-bold text-amber">💡 技巧</p>
                  <p className="text-xs text-ink mt-0.5">{s.tip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Example structure */}
      <div className="panel p-4">
        <p className="text-sm font-black text-ink mb-3">例：智慧校园 C篇逻辑图</p>
        <div className="flex flex-col items-center gap-1">
          {[
            "第一段：科技进入校园（引入）",
            "第二段：天津某学院案例",
            "第三段：安徽中学案例",
            "第四段：英国学校案例",
            "第五段：总结与展望",
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full max-w-sm">
              <div className={`w-full rounded-lg px-4 py-2.5 text-center text-sm font-bold ${
                i === 0 || i === 4 ? "bg-cobalt text-white" : "bg-aqua/10 text-aqua border border-aqua/20"
              }`}>
                {item}
              </div>
              {i < 4 && <div className="w-0.5 h-3 bg-ink/15" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DArticleTab() {
  const models = [
    {
      name: "模型1（最常见）",
      flow: ["提出问题/现象", "分析原因", "引用研究/数据", "提出建议", "总结"],
      examples: ["幸福与成功", "假新闻", "短视频", "心理韧性"],
      color: "aqua",
    },
    {
      name: "模型2（概念型）",
      flow: ["提出概念", "解释概念含义", "举例说明", "引用实验", "实际应用/展望"],
      examples: ["Mental Toughness", "PTG创伤后成长", "Hidden Potential"],
      color: "cobalt",
    },
  ];

  return (
    <div>
      <div className="panel p-4 mb-5 border-l-4 border-l-amber bg-amber/5">
        <p className="text-sm font-black text-amber mb-1">D篇 = 议论文</p>
        <p className="text-sm text-ink">
          特点：作者有明确观点，用理由+证据支撑，结尾有建议。<br/>
          <strong>核心问题</strong>：① 作者讨论什么？② 作者观点是什么？③ 依据是什么？
        </p>
      </div>

      {/* 4 Questions to ask */}
      <div className="panel p-4 mb-5">
        <p className="text-sm font-black text-ink mb-3">D篇4步读法</p>
        <div className="space-y-2">
          {[
            { step: "读完第一段", q: "作者在讨论什么问题？" },
            { step: "读完全文", q: "作者的核心观点是什么？" },
            { step: "找每段首句", q: "支持观点的理由有哪几个？" },
            { step: "看最后一段", q: "作者的建议/结论是什么？" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-ink/3 px-3 py-2.5">
              <span className="w-6 h-6 rounded-full bg-cobalt text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-bold text-cobalt">{item.step}</p>
                <p className="text-sm text-ink mt-0.5">{item.q}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Models */}
      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((m) => (
          <div key={m.name} className="panel p-4">
            <p className={`text-sm font-black text-${m.color} mb-3`}>{m.name}</p>
            <div className="flex flex-col gap-1 mb-3">
              {m.flow.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-full rounded-lg px-3 py-2 text-center text-xs font-bold bg-${m.color}/10 text-${m.color} border border-${m.color}/20`}>
                    {step}
                  </div>
                  {i < m.flow.length - 1 && (
                    <div className={`w-0.5 h-2 bg-${m.color}/30`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-muted mb-1">适用文章：</p>
            <div className="flex flex-wrap gap-1">
              {m.examples.map((ex) => (
                <span key={ex} className={`rounded bg-${m.color}/10 px-2 py-0.5 text-xs text-${m.color} font-semibold`}>{ex}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionTypesTab() {
  const types = [
    {
      name: "细节题",
      method: "原文定位 + 同义替换",
      steps: [
        "读题，找关键词",
        "回原文，定位到相关段落",
        "找原文中与选项对应的句子",
        "注意：选项用同义词替换了原文词汇",
      ],
      warning: "❌ 不要凭印象选，必须找到原文依据",
      color: "aqua",
    },
    {
      name: "猜词题",
      method: "只看上下文，绝不查词义",
      steps: [
        "读划线词前后各一句",
        "找因果、转折、解释等逻辑线索",
        "用上下文推断大概意思",
        "代入选项验证是否通顺",
      ],
      warning: "❌ 不要根据词的拼写猜，要从语境判断",
      color: "amber",
    },
    {
      name: "主旨题",
      method: "看首段 + 尾段 + 每段首句",
      steps: [
        "看文章标题",
        "看首段（主题介绍）",
        "看每段首句（段落大意）",
        "看尾段（总结/建议）",
      ],
      warning: "❌ 不要选'只在某段提到'的内容，要选贯穿全文的主题",
      color: "cobalt",
    },
    {
      name: "推理判断题",
      method: "排除含绝对词的选项",
      steps: [
        "找含 always/never/all/only/must/completely 的选项",
        "一般情况下排除这类选项",
        "找原文有直接支持的选项",
        "选最接近作者观点的答案",
      ],
      warning: "❌ 选项说的比原文更绝对，往往是错的",
      color: "error",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {types.map((t) => (
        <div key={t.name} className="panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`rounded-full bg-${t.color}/10 px-2.5 py-0.5 text-xs font-black text-${t.color}`}>
              {t.name}
            </span>
          </div>
          <p className="text-sm font-bold text-ink mb-3">{t.method}</p>
          <ol className="space-y-1 mb-3">
            {t.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-ink">
                <span className={`font-black text-${t.color} flex-shrink-0`}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
          <p className={`text-xs font-bold text-${t.color} rounded-lg bg-${t.color}/5 px-3 py-2`}>
            {t.warning}
          </p>
        </div>
      ))}
    </div>
  );
}

function TrapsTab() {
  return (
    <div>
      <div className="panel p-4 mb-4 border-l-4 border-l-amber bg-amber/5">
        <p className="text-xs font-bold text-amber mb-1">同义替换 — 命题人的惯用手法</p>
        <p className="text-sm text-ink">
          原文用词 A，题目或选项换成词义相近的词 B。做题时要认出这是"同一个意思"。
        </p>
      </div>

      <h4 className="font-black text-ink mb-3">常见同义替换对</h4>
      <div className="grid gap-2 sm:grid-cols-2 mb-6">
        {SYNONYM_PAIRS.map((pair) => (
          <div key={pair.id} className="panel p-3 flex items-center gap-3">
            <span className="font-black text-ink">{pair.original}</span>
            <span className="text-muted">→</span>
            <span className="font-black text-cobalt">{pair.testSubstitute}</span>
            <span className="ml-auto text-xs text-muted">{pair.chineseMeaning}</span>
          </div>
        ))}
      </div>

      <h4 className="font-black text-ink mb-3">熟词僻义（必考）</h4>
      <div className="grid gap-2 sm:grid-cols-2">
        {FAMILIAR_WORD_TRAPS.slice(0, 10).map((trap) => (
          <div key={trap.id} className="panel p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base font-black text-ink">{trap.word}</span>
              <span className="rounded bg-error/10 px-1.5 py-0.5 text-xs font-bold text-error line-through">{trap.textbookMeaning}</span>
              <span className="rounded bg-aqua/10 px-1.5 py-0.5 text-xs font-bold text-aqua">{trap.readingMeaning}</span>
            </div>
            <p className="text-xs text-muted italic">{trap.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
