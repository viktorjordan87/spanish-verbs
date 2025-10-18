import { useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { PrimeReactContext } from "primereact/api";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const { changeTheme } = useContext(PrimeReactContext);

  // Debug: Log the context
  useEffect(() => {
    console.log("PrimeReactContext:", { changeTheme });
    console.log("Current theme:", theme);
  }, [changeTheme, theme]);

  const handleThemeChange = () => {
    const currentTheme =
      theme === "light" ? "lara-light-blue" : "lara-dark-blue";
    const newTheme = theme === "light" ? "lara-dark-blue" : "lara-light-blue";

    console.log("Changing theme from", currentTheme, "to", newTheme);

    // Use PrimeReact's changeTheme function exactly as documented
    if (changeTheme) {
      changeTheme(currentTheme, newTheme, "theme-link", () => {
        console.log("Theme change callback executed");
        toggleTheme();
      });
    } else {
      console.log("changeTheme not available, using fallback");
      // Fallback: manually update the link
      const themeLink = document.getElementById(
        "theme-link"
      ) as HTMLLinkElement;
      if (themeLink) {
        const newPath =
          theme === "light"
            ? "/themes/lara-dark-blue/theme.css"
            : "/themes/lara-light-blue/theme.css";
        themeLink.href = newPath;
        toggleTheme();
      }
    }
  };

  return (
    <Card title="Theme Settings" className="w-full max-w-md">
      <div className="flex flex-column gap-4">
        <div className="flex align-items-center gap-3">
          <div className="flex align-items-center gap-2">
            {theme === "light" ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-blue-300" />
            )}
            <span className="font-medium">
              Current Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
        </div>

        <Button
          label={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          icon={theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          onClick={handleThemeChange}
          className="w-full"
          severity="secondary"
        />

        <div className="text-sm text-color-secondary">
          <p>
            Toggle between light and dark themes using PrimeReact's Lara theme
            variants.
          </p>
        </div>
      </div>
    </Card>
  );
};
