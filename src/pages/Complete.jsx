import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotoUpload from "../components/PhotoUpload";
import { currentChallenge } from "../data/challenges";
import { supabase } from "../lib/supabase";

export default function Complete() {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const save = async () => {
    setSaving(true);
    try {
      let photoUrl = null;

      // Upload photo to Supabase Storage if present
      if (photo) {
        const blob = await fetch(photo).then((r) => r.blob());
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(fileName, blob, { contentType: "image/jpeg" });

        if (!uploadError) {
          const { data } = supabase.storage.from("photos").getPublicUrl(fileName);
          photoUrl = data.publicUrl;
        }
      }

      // Insert submission row
      await supabase.from("submissions").insert({
        challenge_id: currentChallenge.id,
        challenge_title: currentChallenge.title,
        photo_url: photoUrl,
        caption: caption || null,
      });

      setSaved(true);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
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
        disabled={saving}
        className="mt-6 w-full max-w-md py-4 rounded-2xl bg-primary text-white
                   font-semibold text-lg transition-all hover:bg-primary-dark
                   active:scale-[0.98] cursor-pointer disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save to Gallery 📸"}
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
