import { knowledge } from "../../data/knowledge";

export function KnowledgeGraph({ activeId }: { activeId: string }) {
  return (
    <section className="panel p-4">
      <h3 className="text-sm font-black text-ink">知识图谱</h3>
      <div className="mt-3 grid gap-2">
        {knowledge.map((item) => (
          <div
            key={item.id}
            className={`rounded-md border px-3 py-2 ${
              item.id === activeId ? "border-aqua bg-aqua/10" : "border-ink/10 bg-paper"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-ink">{item.title}</p>
              <span className="text-xs font-bold text-muted">{item.mother}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-muted">{item.oneLine}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
