import { Beaker, Gauge, Network, Waves } from "lucide-react";
import { models, type ModelId } from "../data/models";

const icons = {
  float: Waves,
  scale: Gauge,
  level: Beaker,
  sensor: Network,
};

export function HomePage({
  activeModel,
  onModelChange,
}: {
  activeModel: ModelId;
  onModelChange: (model: ModelId) => void;
}) {
  return (
    <nav className="grid gap-3 lg:grid-cols-4">
      {models.map((model) => {
        const Icon = icons[model.id];
        const active = activeModel === model.id;
        return (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`panel flex min-h-28 items-start gap-3 p-4 text-left transition ${
              active ? "border-aqua bg-aqua/10" : "hover:border-aqua/40"
            }`}
          >
            <span className={`rounded-md p-2 ${active ? "bg-aqua text-white" : "bg-ink/5 text-ink"}`}>
              <Icon size={19} />
            </span>
            <span>
              <span className="block text-sm font-black text-ink">{model.name}</span>
              <span className="mt-2 block text-xs leading-5 text-muted">{model.core}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
