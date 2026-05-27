import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { ModelLessonPage } from "./pages/ModelLessonPage";
import type { ModelId } from "./data/models";

export default function App() {
  const [activeModel, setActiveModel] = useState<ModelId>("scale");

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-[1480px]">
        <div className="px-4 pt-4">
          <HomePage activeModel={activeModel} onModelChange={setActiveModel} />
        </div>
        <ModelLessonPage activeModel={activeModel} />
      </div>
    </div>
  );
}
