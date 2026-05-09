import { useState, useEffect } from "react";
import GalleryGrid from "../components/GalleryGrid";

const GALLERY_KEY = "we-cooked-gallery";

export default function Gallery() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(GALLERY_KEY) || "[]");
    setEntries(stored);
  }, []);

  return (
    <div className="pb-10">
      <div className="px-5 mb-6 mt-4">
        <h1 className="text-2xl font-bold text-heading mb-1">Gallery</h1>
        <p className="text-muted text-sm">Everything you've cooked so far.</p>
      </div>
      <GalleryGrid entries={entries} />
    </div>
  );
}
