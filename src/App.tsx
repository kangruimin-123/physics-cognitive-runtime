import { useEffect, useMemo, useState } from "react";
import { vocabItems, type VocabItem } from "./vocab";

type Mode = "flashcard" | "quiz" | "wrong";
type ProgressMap = Record<string, "known" | "wrong">;

const storageKey = "beijing-reading-vocab-progress-v1";

function loadProgress(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    return {};
  }
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function App() {
  const [mode, setMode] = useState<Mode>("flashcard");
  const [category, setCategory] = useState("全部");
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());
  const [quizChoice, setQuizChoice] = useState("");
  const [quizResult, setQuizResult] = useState<"right" | "wrong" | "">("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress]);

  const categories = useMemo(() => ["全部", ...Array.from(new Set(vocabItems.map((item) => item.category)))], []);

  const filtered = useMemo(() => {
    const source = category === "全部" ? vocabItems : vocabItems.filter((item) => item.category === category);
    if (mode === "wrong") return source.filter((item) => progress[item.id] === "wrong");
    return source;
  }, [category, mode, progress]);

  const current = filtered[index % Math.max(filtered.length, 1)];
  const knownCount = vocabItems.filter((item) => progress[item.id] === "known").length;
  const wrongCount = vocabItems.filter((item) => progress[item.id] === "wrong").length;
  const doneCount = knownCount + wrongCount;
  const percent = Math.round((doneCount / vocabItems.length) * 100);

  const options = useMemo(() => {
    if (!current) return [];
    const distractors = shuffle(vocabItems.filter((item) => item.id !== current.id)).slice(0, 3);
    return shuffle([current, ...distractors]);
  }, [current]);

  const nextCard = () => {
    setShowMeaning(false);
    setQuizChoice("");
    setQuizResult("");
    setIndex((value) => (value + 1) % Math.max(filtered.length, 1));
  };

  const mark = (value: "known" | "wrong") => {
    if (!current) return;
    setProgress((items) => ({ ...items, [current.id]: value }));
    nextCard();
  };

  const resetProgress = () => {
    setProgress({});
    setIndex(0);
    setShowMeaning(false);
    setQuizChoice("");
    setQuizResult("");
  };

  return (
    <main className="app">
      <header className="hero">
        <div>
          <h1>北京中考 C/D 篇背单词 App</h1>
          <p>按真题主题背核心词，闪卡判断会不会，错词自动进入复习池，适合每天 10-15 分钟冲刺。</p>
        </div>
        <div className="stats">
          <Stat label="词条" value={vocabItems.length} />
          <Stat label="已处理" value={`${percent}%`} />
          <Stat label="错词" value={wrongCount} />
        </div>
      </header>

      <section className="toolbar" aria-label="学习控制">
        <div className="mode-tabs">
          <button className={mode === "flashcard" ? "active" : ""} onClick={() => setMode("flashcard")}>
            闪卡
          </button>
          <button className={mode === "quiz" ? "active" : ""} onClick={() => setMode("quiz")}>
            测验
          </button>
          <button className={mode === "wrong" ? "active" : ""} onClick={() => setMode("wrong")}>
            错词本
          </button>
        </div>
        <label>
          主题
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setIndex(0);
              setShowMeaning(false);
            }}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button className="ghost" onClick={resetProgress}>
          清空进度
        </button>
      </section>

      <section className="workspace">
        <aside className="progress-panel">
          <h2>今日目标</h2>
          <div className="progress-bar">
            <span style={{ width: `${percent}%` }} />
          </div>
          <p>
            已会 {knownCount} 个，待复习 {wrongCount} 个。建议先把错词清零，再进入下一主题。
          </p>
          <div className="mini-list">
            {categories.slice(1, 8).map((item) => {
              const total = vocabItems.filter((word) => word.category === item).length;
              const done = vocabItems.filter((word) => word.category === item && progress[word.id]).length;
              return (
                <button key={item} onClick={() => setCategory(item)}>
                  <span>{item}</span>
                  <b>
                    {done}/{total}
                  </b>
                </button>
              );
            })}
          </div>
        </aside>

        <StudyCard
          mode={mode}
          item={current}
          total={filtered.length}
          currentIndex={filtered.length ? (index % filtered.length) + 1 : 0}
          showMeaning={showMeaning}
          options={options}
          quizChoice={quizChoice}
          quizResult={quizResult}
          onFlip={() => setShowMeaning((value) => !value)}
          onKnown={() => mark("known")}
          onWrong={() => mark("wrong")}
          onNext={nextCard}
          onQuiz={(option) => {
            if (!current) return;
            setQuizChoice(option.id);
            const isRight = option.id === current.id;
            setQuizResult(isRight ? "right" : "wrong");
            setProgress((items) => ({ ...items, [current.id]: isRight ? "known" : "wrong" }));
          }}
        />
      </section>
    </main>
  );
}

function StudyCard({
  mode,
  item,
  total,
  currentIndex,
  showMeaning,
  options,
  quizChoice,
  quizResult,
  onFlip,
  onKnown,
  onWrong,
  onNext,
  onQuiz,
}: {
  mode: Mode;
  item?: VocabItem;
  total: number;
  currentIndex: number;
  showMeaning: boolean;
  options: VocabItem[];
  quizChoice: string;
  quizResult: "right" | "wrong" | "";
  onFlip: () => void;
  onKnown: () => void;
  onWrong: () => void;
  onNext: () => void;
  onQuiz: (item: VocabItem) => void;
}) {
  if (!item) {
    return (
      <section className="card empty">
        <h2>错词本已清空</h2>
        <p>很好，回到闪卡继续新主题。</p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="card-top">
        <span>{item.type}</span>
        <b>
          {currentIndex}/{total}
        </b>
      </div>

      {mode === "quiz" ? (
        <>
          <p className="prompt">请选择这个英文的中文意思</p>
          <h2>{item.word}</h2>
          <p className="phonetic">{item.phonetic || " "}</p>
          <div className="options">
            {options.map((option) => (
              <button
                key={option.id}
                className={[
                  quizChoice === option.id ? "selected" : "",
                  quizChoice && option.id === item.id ? "correct" : "",
                  quizChoice === option.id && option.id !== item.id ? "incorrect" : "",
                ].join(" ")}
                onClick={() => onQuiz(option)}
                disabled={Boolean(quizChoice)}
              >
                {option.meaning}
              </button>
            ))}
          </div>
          {quizResult && <p className={`result ${quizResult}`}>{quizResult === "right" ? "答对了，记为已会。" : `答错了，正确答案：${item.meaning}`}</p>}
          <button className="primary" onClick={onNext}>
            下一题
          </button>
        </>
      ) : (
        <>
          <p className="prompt">{item.category}</p>
          <h2>{item.word}</h2>
          <p className="phonetic">{item.phonetic || " "}</p>
          <button className="meaning" onClick={onFlip}>
            {showMeaning ? item.meaning : "点一下显示中文"}
          </button>
          <div className="actions">
            <button className="danger" onClick={onWrong}>
              不认识
            </button>
            <button className="primary" onClick={onKnown}>
              已会
            </button>
          </div>
          <button className="ghost wide" onClick={onNext}>
            跳过
          </button>
        </>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
