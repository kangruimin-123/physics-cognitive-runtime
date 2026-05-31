import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { ModelLessonPage } from "./pages/ModelLessonPage";
import { BeijingReadingApp } from "./pages/beijing/BeijingReadingApp";
import type { ModelId } from "./data/models";
import { Atom, BookOpen } from "lucide-react";

type AppMode = "physics" | "reading";

export default function App() {
  const [mode, setMode] = useState<AppMode>("reading");
  const [activeModel, setActiveModel] = useState<ModelId>("scale");

  return (
    <div className="min-h-screen bg-paper">
      {/* Top mode switcher */}
      <div className="sticky top-0 z-50 border-b border-ink/8 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1480px] items-center gap-1 px-4 py-2">
          <button
            onClick={() => setMode("reading")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition ${
              mode === "reading"
                ? "bg-aqua text-white"
                : "text-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            <BookOpen size={15} />
            英语阅读
          </button>
          <button
            onClick={() => setMode("physics")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition ${
              mode === "physics"
                ? "bg-cobalt text-white"
                : "text-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            <Atom size={15} />
            物理认知
          </button>
        </div>
      </div>

      {mode === "reading" && <BeijingReadingApp />}

      {mode === "physics" && (
        <div className="mx-auto max-w-[1480px]">
          <div className="px-4 pt-4">
            <HomePage activeModel={activeModel} onModelChange={setActiveModel} />
          </div>
          <ModelLessonPage activeModel={activeModel} />
        </div>
      )}
    </div>
  );
}
