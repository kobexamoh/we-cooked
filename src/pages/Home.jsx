import { Link } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import { currentChallenge } from "../data/challenges";

export default function Home() {
  return (
    <div className="px-5 pb-10">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-heading mb-1">Hey, chef 👋</h1>
        <p className="text-muted text-sm">Ready to cook something easy this week?</p>
      </div>

      <ChallengeCard challenge={currentChallenge} />

      {/* Ingredient preview */}
      <div className="mt-6 bg-surface rounded-2xl p-5 border border-theme">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          You'll need
        </p>
        <ul className="space-y-2">
          {currentChallenge.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span className="text-heading">{ing.name}</span>
              <span className="text-muted">{ing.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3">
        <Link
          to="/cook"
          className="block w-full py-4 rounded-2xl bg-primary text-white text-center
                     font-semibold text-lg no-underline transition-all
                     hover:bg-primary-dark active:scale-[0.98]"
        >
          Let's Cook 🔥
        </Link>
        <Link
          to="/gallery"
          className="block w-full py-3 rounded-2xl bg-accent text-heading text-center
                     font-medium text-sm no-underline transition-all
                     hover:opacity-80 active:scale-[0.98]"
        >
          See Gallery
        </Link>
      </div>
    </div>
  );
}
