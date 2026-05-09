export default function ChallengeCard({ challenge }) {
  return (
    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-theme">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
        This Week's Challenge
      </p>
      <h2 className="text-2xl font-bold text-heading mb-1">{challenge.title}</h2>
      <p className="text-muted text-sm mb-5">{challenge.subtitle}</p>

      <div className="flex gap-4 text-sm">
        <Pill emoji="⏱" label={`${challenge.cookTime} min`} />
        <Pill emoji="🍳" label={`${challenge.pots} pot`} />
        <Pill emoji={challenge.difficulty} label={challenge.difficultyLabel} />
        <Pill emoji="🧾" label={`${challenge.ingredients.length} items`} />
      </div>
    </div>
  );
}

function Pill({ emoji, label }) {
  return (
    <span className="inline-flex items-center gap-1 bg-accent rounded-full px-3 py-1 text-heading font-medium">
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
}
