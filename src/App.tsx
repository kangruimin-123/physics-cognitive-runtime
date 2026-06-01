const sheets = [
  ["Sheet1", "核心词汇499", "ID、单词/短语、音标、词性、中文、主题、等级、勾选、备注"],
  ["Sheet2", "真题例句精讲", "词条匹配 C/D 篇真题例句，含中文翻译、来源试卷、段落"],
  ["Sheet3", "长难句拆解", "长难句、主干、修饰成分、从句类型、结构说明、学生提示"],
  ["Sheet4", "文章结构模板", "C篇科普、AI科技、社会问题；D篇观点论证、概念、利弊分析"],
  ["Sheet5", "逐篇文章结构拆解", "每篇 C/D 篇的主题、类型、段落功能、结构图、作者观点"],
  ["Sheet6", "命题人考法", "细节、主旨、标题、推理、作者观点、词义猜测、指代等题型"],
  ["Sheet7", "阅读题干词库", "英文题干、中文、题型、关键词、答题动作"],
  ["Sheet8", "熟词僻义", "address、challenge、support、develop、concern 等阅读义"],
  ["Sheet9", "高频短语与逻辑词", "因果、转折、递进、举例、对比、观点表达"],
  ["Sheet10", "单词-句子-文章功能卡片", "单词到例句、句子主干、文章作用、命题点的完整链条"],
  ["Sheet11", "每日复习计划", "Day1-Day30，单词、短语、题干、长难句、结构任务"],
  ["Sheet12", "错词本", "日期、单词、错误原因、来源文章、三轮复习、是否掌握"],
  ["Sheet13", "英译汉测试", "英文、中文答案、学生填写、是否正确"],
  ["Sheet14", "汉译英测试", "中文、英文答案、学生填写、是否正确"],
  ["Sheet15", "欧路词典导入数据", "生成 core/theme/question/polysemy/phrases 五类 TXT"],
];

const structures = [
  ["C篇 科普说明文", "提出现象 → 解释原理 → 实验/研究 → 现实应用 → 总结意义", "海洋动物节能、短视频与大脑、倒走运动"],
  ["C篇 AI科技案例文", "提出科技 → 案例1 → 案例2 → 案例3 → 总结影响", "智慧校园、医疗机器人、智能图书馆、AI工具"],
  ["C篇 社会问题说明文", "提出问题 → 分析原因 → 说明危害 → 提出办法 → 总结提醒", "假新闻、社交媒体、短视频、网络信息"],
  ["D篇 观点论证型", "提出问题 → 作者观点 → 理由1 → 理由2 → 理由3 → 结论", "幸福与成功、早餐是否重要、心理韧性"],
  ["D篇 提出概念型", "提出概念 → 解释概念 → 研究证明 → 具体方法 → 总结升华", "PTG、Mental Toughness、Hidden Potential"],
  ["D篇 利弊分析型", "提出问题 → 支持观点 → 反对观点 → 专家意见 → 作者结论", "Skipping Breakfast、AI工具、社交媒体使用"],
];

const outputs = [
  "beijing_reading_cd_master.xlsx",
  "beijing_reading_cd_master.pdf",
  "eudic_import/core_words.txt",
  "eudic_import/theme_words.txt",
  "eudic_import/question_stems.txt",
  "eudic_import/polysemy_words.txt",
  "eudic_import/phrases.txt",
  "README.md",
];

const acceptance = [
  "生成 xlsx 和 pdf",
  "包含 499 词且不得删词",
  "每词有中文，核心词有音标",
  "有真题例句和中文翻译",
  "有长难句拆解",
  "有 C/D 篇文章结构模板",
  "有阅读题干词库",
  "有欧路导入 TXT",
  "A4 横向、黑白打印友好",
  "适合初三学生直接背诵",
];

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>北京中考英语阅读 C/D 篇打印版 Excel 手册</h1>
          <p>
            这不是普通词汇表，而是把单词、真题例句、长难句、文章结构、命题考法和题干问法串成一套可打印复习系统。
          </p>
          <div className="hero-actions">
            <a href="#sheets">查看 15 个 Sheet</a>
            <a href="#student-flow">孩子怎么用</a>
          </div>
        </div>
        <aside className="target-card">
          <span>最终产物</span>
          <strong>Excel + PDF + 欧路导入包</strong>
          <p>面向初三冲刺，解决 C篇/D篇读不懂、题干看不懂、主旨推理题失分。</p>
        </aside>
      </section>

      <section className="section output-section">
        <div className="section-title">
          <h2>输出文件结构</h2>
          <p>最终生成到 `/output` 文件夹，既能打印，也能导入欧路词典。</p>
        </div>
        <div className="output-grid">
          {outputs.map((item) => (
            <code key={item}>{item}</code>
          ))}
        </div>
      </section>

      <section id="sheets" className="section">
        <div className="section-title">
          <h2>Excel 15 个 Sheet 设计</h2>
          <p>每个 Sheet 都服务于 C/D 篇阅读理解能力，不是孤立背词。</p>
        </div>
        <div className="sheet-grid">
          {sheets.map(([id, title, desc]) => (
            <article className="sheet-card" key={id}>
              <span>{id}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>核心能力链条</h2>
          <p>最重要的实现原则：让孩子背到文章里，而不是只背单词本。</p>
        </div>
        <div className="chain">
          {["单词", "真题例句", "句子结构", "段落功能", "文章结构", "命题考法"].map((item, index) => (
            <div key={item}>
              <b>{index + 1}</b>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>C/D 篇文章结构模板</h2>
          <p>孩子做阅读时先判断文章类型，再做题，主旨题和推理题会稳很多。</p>
        </div>
        <div className="structure-list">
          {structures.map(([title, model, examples]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p className="model">{model}</p>
              <p className="examples">适用文章：{examples}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="student-flow" className="section two-col">
        <article>
          <h2>C篇阅读步骤</h2>
          <ol>
            <li>看标题</li>
            <li>判断文章类型</li>
            <li>找每段功能</li>
            <li>画结构图</li>
            <li>再做题</li>
          </ol>
          <p className="formula">是什么 → 为什么 → 怎么证明 → 有什么用 → 总结</p>
        </article>
        <article>
          <h2>D篇阅读步骤</h2>
          <ol>
            <li>找问题</li>
            <li>找作者观点</li>
            <li>找理由</li>
            <li>找结论</li>
            <li>再做主旨题和推理题</li>
          </ol>
          <p className="formula">问题 → 观点 → 理由1 → 理由2 → 理由3 → 结论</p>
        </article>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>打印与数据规则</h2>
          <p>A4 横向、冻结首行、自动换行、黑白打印友好，保留手写备注和 □ 勾选列。</p>
        </div>
        <div className="rule-grid">
          <div>
            <h3>数据优先级</h3>
            <p>优先使用 `beijing_reading_master_print.csv` 中的 499 个词；PDF 补充真题例句、长难句和结构拆解。</p>
          </div>
          <div>
            <h3>例句要求</h3>
            <p>优先从 C/D 篇原文抽取，8-25 个英文词；找不到完全匹配时标注“真题改写句”。</p>
          </div>
          <div>
            <h3>长难句覆盖</h3>
            <p>AI、心理、教育、科学、环保、社会媒体、题干类都要有足够样例。</p>
          </div>
        </div>
      </section>

      <section className="section checklist">
        <div className="section-title">
          <h2>最终验收标准</h2>
          <p>完成后按这份清单逐项检查。</p>
        </div>
        <div className="check-grid">
          {acceptance.map((item) => (
            <label key={item}>
              <input type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
