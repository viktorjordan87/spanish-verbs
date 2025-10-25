import { Link, useLocation } from "react-router";
import { Home, Languages, Sun, Moon, BookText, Dice6 } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const Footer = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="footer">
      <div className="footer-navigation">
        <Link
          to="/list"
          className={`nav-item ${
            location.pathname === "/list" ? "active" : ""
          }`}
        >
          <Home size={20} />
          <span>List</span>
        </Link>
        <Link
          to="/vocabulary"
          className={`nav-item ${
            location.pathname === "/vocabulary" ? "active" : ""
          }`}
        >
          <BookText size={20} />
          <span>Vocabulary</span>
        </Link>
        <Link
          to="/random"
          className={`nav-item ${
            location.pathname === "/random" ? "active" : ""
          }`}
        >
          <Dice6 size={20} />
          <span>Random</span>
        </Link>
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          <Languages size={20} />
          <span>Verbs</span>
        </Link>
        <div
          onClick={toggleTheme}
          className="nav-item theme-toggle cursor-pointer"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </div>
      </div>
    </footer>
  );
};
