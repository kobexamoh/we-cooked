import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <Link to="/" className="text-xl font-bold text-heading no-underline">
        we cooked 🍳
      </Link>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
