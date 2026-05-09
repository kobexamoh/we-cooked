import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Home from "./pages/Home";
import CookingFlow from "./pages/CookingFlow";
import Complete from "./pages/Complete";
import Gallery from "./pages/Gallery";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <BrowserRouter>
      <div className="max-w-lg mx-auto min-h-dvh">
        <Header theme={theme} onToggleTheme={toggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cook" element={<CookingFlow />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
