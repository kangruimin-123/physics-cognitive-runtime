const coreWords = [
  {
    title: "科学研究",
    words: [
      "research",
      "study",
      "scientist",
      "discover",
      "evidence",
      "data",
      "theory",
      "result",
      "experiment",
      "observe",
      "analyze",
      "factor",
      "influence",
      "affect",
      "process",
      "method",
      "approach",
      "solution",
      "challenge",
      "achievement",
    ],
  },
  {
    title: "科技 AI",
    words: [
      "technology",
      "artificial",
      "intelligence",
      "digital",
      "device",
      "assistant",
      "robot",
      "healthcare",
      "system",
      "platform",
      "advanced",
      "automatic",
      "recognition",
      "simulation",
      "virtual",
      "efficient",
      "innovation",
      "smart",
      "visual",
      "analysis",
    ],
  },
  {
    title: "心理成长",
    words: [
      "happiness",
      "emotion",
      "confidence",
      "stress",
      "anxiety",
      "wellbeing",
      "motivation",
      "satisfaction",
      "attitude",
      "behavior",
      "awareness",
      "mental",
      "positive",
      "negative",
      "growth",
      "courage",
      "patience",
      "resilience",
      "mindset",
      "strength",
    ],
  },
  {
    title: "教育成长",
    words: [
      "potential",
      "ability",
      "skill",
      "improve",
      "progress",
      "develop",
      "encourage",
      "performance",
      "success",
      "failure",
      "effort",
      "practice",
      "mistake",
      "experience",
      "opportunity",
      "goal",
      "focus",
      "accept",
      "manage",
      "control",
    ],
  },
  {
    title: "环保生态",
    words: [
      "environment",
      "climate",
      "pollution",
      "energy",
      "renewable",
      "wildlife",
      "habitat",
      "ecosystem",
      "resource",
      "protect",
      "reduce",
      "recycle",
      "sustainable",
      "forest",
      "nature",
      "species",
      "carbon",
      "biodiversity",
      "conservation",
      "greenhouse",
    ],
  },
];

const phrases = [
  ["因果", "lead to", "result in", "contribute to", "because of", "as a result", "due to", "thanks to"],
  ["转折", "however", "although", "though", "while", "yet", "nevertheless", "even though"],
  ["举例", "for example", "such as", "for instance", "including"],
  ["递进", "moreover", "furthermore", "besides", "in addition", "what's more"],
  ["对比", "compared with", "rather than", "instead of", "unlike", "in contrast"],
  ["万能短语", "focus on", "be likely to", "deal with", "benefit from", "depend on", "be aware of"],
];

const specialMeanings = [
  ["address", "地址", "处理；解决", "address a problem"],
  ["challenge", "挑战", "难题；困难", "face a challenge"],
  ["support", "支持", "帮助；支撑；证据", "support an idea"],
  ["develop", "发展", "培养；形成；开发", "develop a skill"],
  ["concern", "关心", "担忧；顾虑", "a growing concern"],
  ["issue", "发行", "问题；议题", "social issues"],
  ["present", "礼物", "呈现；展示", "present evidence"],
  ["matter", "事情", "重要；有关系", "what matters is"],
];

const synonymPairs = [
  ["help", "support"],
  ["important", "significant"],
  ["change", "transform"],
  ["problem", "challenge"],
  ["improve", "enhance"],
  ["show", "demonstrate"],
  ["use", "apply"],
  ["learn", "acquire"],
];

const sentenceTemplates = [
  ["定语从句", "A college introduced a robot which provides students with information.", "A college introduced a robot."],
  ["过去分词", "ElliQ, developed by Intuition Robotics, acts as a friend.", "ElliQ acts as a friend."],
  ["宾语从句", "Research shows that happier people are more likely to succeed.", "Research shows + that..."],
  ["非谓语", "Using trackers, researchers studied whales.", "Researchers studied whales."],
  ["被动语态", "Smart technologies are used in schools.", "Technologies are used."],
  ["长主语", "People who scored higher on the analytical tests were less likely to mistake fake news.", "People were less likely."],
];

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">北京中考英语</div>
        <nav>
          {["主题地图", "核心词", "高频短语", "熟词僻义", "同义替换", "长难句", "C/D步骤", "20天计划"].map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <div className="content">
        <section className="hero">
          <div>
            <h1>阅读 C/D 篇终极冲刺手册</h1>
            <p>2024-2026 北京各区一模二模真题版：核心词、长难句、作者观点、命题人思维，一屏一屏背。</p>
          </div>
          <div className="score-card">
            <span>目标</span>
            <strong>80-85 -> 95+</strong>
            <p>C 篇科普说明文 + D 篇议论文，是阅读拉分的主战场。</p>
          </div>
        </section>

        <section id="主题地图" className="section">
          <h2>北京中考阅读主题地图</h2>
          <div className="tier-grid">
            <TopicTier title="第一梯队（每年必出）" items={["人工智能", "科技创新", "心理健康", "成长教育", "环境保护", "社会现象"]} />
            <TopicTier title="第二梯队" items={["医疗健康", "机器人", "幸福感研究", "社交媒体", "学习能力", "校园科技"]} />
            <TopicTier title="第三梯队" items={["建筑设计", "城市规划", "生物保护", "海洋动物", "能源发展", "历史文化"]} />
          </div>
        </section>

        <section id="核心词" className="section">
          <div className="section-heading">
            <h2>必背 100 词</h2>
            <p>不要按 A-Z 背，按主题背。做 C/D 篇时这些词会反复出现。</p>
          </div>
          <div className="word-grid">
            {coreWords.map((group) => (
              <article className="word-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="chips">
                  {group.words.map((word) => (
                    <span key={word}>{word}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="高频短语" className="section">
          <h2>北京中考最爱考的 50 个短语</h2>
          <div className="phrase-list">
            {phrases.map(([title, ...items]) => (
              <div className="phrase-row" key={title}>
                <strong>{title}</strong>
                <p>{items.join(" / ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="熟词僻义" className="section">
          <h2>命题人最爱考的熟词僻义</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>词</th>
                  <th>课本意思</th>
                  <th>阅读意思</th>
                  <th>真题场景</th>
                </tr>
              </thead>
              <tbody>
                {specialMeanings.map(([word, textbook, reading, scene]) => (
                  <tr key={word}>
                    <td>{word}</td>
                    <td>{textbook}</td>
                    <td>{reading}</td>
                    <td>{scene}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="同义替换" className="section">
          <h2>高频同义替换</h2>
          <div className="pair-grid">
            {synonymPairs.map(([from, to]) => (
              <div className="pair" key={from}>
                <span>{from}</span>
                <b>-></b>
                <span>{to}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="长难句" className="section">
          <h2>长难句拆解模板</h2>
          <div className="sentence-stack">
            {sentenceTemplates.map(([title, original, core]) => (
              <article className="sentence-card" key={title}>
                <h3>{title}</h3>
                <p className="original">{original}</p>
                <p className="core">主干：{core}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="C/D步骤" className="section split">
          <article>
            <h2>C 篇阅读万能步骤</h2>
            <ol>
              <li>看标题</li>
              <li>看第一段，找主题</li>
              <li>每段一句话总结</li>
              <li>画逻辑图：主题 -> 案例 -> 解释 -> 总结</li>
            </ol>
          </article>
          <article>
            <h2>D 篇阅读万能步骤</h2>
            <ol>
              <li>第一段：作者在讨论什么问题？</li>
              <li>全文：作者观点是什么？</li>
              <li>找理由 1 / 2 / 3</li>
              <li>最后看结尾：建议是什么？</li>
            </ol>
          </article>
        </section>

        <section id="20天计划" className="section plan">
          <h2>孩子每天背什么</h2>
          <div className="plan-grid">
            <div>
              <strong>Day 1-10</strong>
              <p>每天 10 个核心词 + 5 个短语 + 2 个长句。</p>
            </div>
            <div>
              <strong>Day 11-20</strong>
              <p>每天 C 篇一篇 + D 篇一篇，必须复盘主题、作者观点、段落功能和错因。</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TopicTier({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="tier">
      <h3>{title}</h3>
      <div className="chips">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

export default App;
