import { useState, useEffect } from "react";
import GalleryGrid from "../components/GalleryGrid";
import { supabase } from "../lib/supabase";

export default function Gallery() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setEntries(
          data.map((row) => ({
            id: row.id,
            photo: row.photo_url,
            caption: row.caption,
            date: row.created_at,
          }))
        );
      }
      setLoading(false);
    };

    fetchEntries();
  }, []);

  return (
    <div className="pb-10">
      <div className="px-5 mb-6 mt-4">
        <h1 className="text-2xl font-bold text-heading mb-1">Gallery</h1>
        <p className="text-muted text-sm">Everything we've cooked so far.</p>
      </div>
      {loading ? (
        <p className="text-center text-muted text-sm py-16">Loading...</p>
      ) : (
        <GalleryGrid entries={entries} />
      )}
    </div>
  );
}
