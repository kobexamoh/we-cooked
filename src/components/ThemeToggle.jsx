export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center 
                 text-white text-sm transition-all duration-300 hover:scale-110
                 active:scale-95 shadow-sm cursor-pointer"
      aria-label={`Switch to ${theme === "lilac" ? "charcoal" : "lilac"} theme`}
      title={theme === "lilac" ? "Switch to his theme" : "Switch to her theme"}
    >
      {theme === "lilac" ? "🌙" : "💜"}
    </button>
  );
}
