export default function GalleryGrid({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <p className="text-4xl mb-3">🫕</p>
        <p className="text-lg font-semibold text-heading mb-1">Nothing here yet</p>
        <p className="text-muted text-sm">
          Cook this week's challenge and your creation will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-theme"
        >
          {entry.photo && (
            <img
              src={entry.photo}
              alt={entry.caption || "A dish"}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            {entry.caption && (
              <p className="text-heading text-sm font-medium mb-1">{entry.caption}</p>
            )}
            <p className="text-muted text-xs">
              {new Date(entry.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
