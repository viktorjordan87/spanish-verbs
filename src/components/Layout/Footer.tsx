import { Link, useLocation } from "react-router";
import { Home, Languages, Sun, Moon } from "lucide-react";
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
