import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotoUpload from "../components/PhotoUpload";
import { currentChallenge } from "../data/challenges";

const GALLERY_KEY = "we-cooked-gallery";

export default function Complete() {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const save = () => {
    const entry = {
      id: Date.now().toString(),
      challengeId: currentChallenge.id,
      challengeTitle: currentChallenge.title,
      photo,
      caption,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem(GALLERY_KEY) || "[]");
    existing.unshift(entry);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(existing));
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-64px)] px-6 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-heading mb-2">Saved!</h2>
        <p className="text-muted text-sm mb-8">Your creation is in the gallery now.</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/gallery")}
            className="px-6 py-3 rounded-2xl bg-primary text-white font-semibold
                       transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer"
          >
            See Gallery
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-2xl border border-theme text-heading font-medium
                       transition-all hover:bg-accent active:scale-[0.98] cursor-pointer"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-5 pb-10 pt-6">
      <p className="text-5xl mb-3">🍝</p>
      <h2 className="text-2xl font-bold text-heading mb-1">You cooked!</h2>
      <p className="text-muted text-sm mb-8">
        Nice work. Save a photo if you want — no pressure.
      </p>

      <PhotoUpload photo={photo} onPhotoChange={setPhoto} />

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Any notes? Substitutions? How'd it taste?"
        rows={3}
        className="mt-6 w-full max-w-md rounded-xl border border-theme bg-surface p-4
                   text-heading text-sm placeholder:text-muted resize-none
                   focus:outline-none focus:ring-2 ring-primary"
      />

      <button
        onClick={save}
        className="mt-6 w-full max-w-md py-4 rounded-2xl bg-primary text-white
                   font-semibold text-lg transition-all hover:bg-primary-dark
                   active:scale-[0.98] cursor-pointer"
      >
        Save to Gallery 📸
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-3 text-muted text-sm hover:text-heading transition-colors cursor-pointer"
      >
        Skip — go home
      </button>
    </div>
  );
}
