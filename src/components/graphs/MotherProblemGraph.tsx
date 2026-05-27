import { motherProblems } from "../../data/motherProblems";

export function MotherProblemGraph({ activeId = "floating" }: { activeId?: string }) {
  const mother = motherProblems.find((item) => item.id === activeId) ?? motherProblems[0];

  return (
    <section className="panel p-4">
      <h3 className="text-sm font-black text-ink">母题图谱</h3>
      <div className="mt-3 rounded-md bg-paper p-3">
        <div className="rounded-md bg-ink px-3 py-2 text-center text-sm font-black text-white">{mother.title}</div>
        <p className="mt-2 text-center text-xs font-bold text-muted">{mother.core}</p>
        <div className="mx-auto h-4 w-px bg-ink/20" />
        <div className="grid grid-cols-2 gap-2">
          {mother.variants.map((child) => (
            <div key={child} className="rounded-md border border-aqua/25 bg-white px-2 py-2 text-center text-xs font-bold text-aqua">
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
