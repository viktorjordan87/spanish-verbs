import { Languages, Settings } from "lucide-react";
import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="no-underline text-700">
        <Languages style={{ fill: "transparent" }} />
      </Link>
      <Link to="/" className="no-underline text-900">
        <p className="text-2xl font-bold">Spanish Verbs</p>
      </Link>
      <Link to="/settings" className="no-underline text-700">
        <Settings />
      </Link>
    </header>
  );
};
