import { useTheme } from "@heroui/use-theme";

import { useEffect } from "react";

export const MoonIcon = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className="dark:fill-gray-200"
    >
      <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z" />
    </svg>
  );
};

export const SunIcon = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className="fill-black"
    >
      <g>
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
      </g>
    </svg>
  );
};

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  // Apply theme changes immediately
  useEffect(() => {
    // Apply the Pokemon theme class to the body based on current theme
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(
      theme === "dark" ? "dark-theme" : "light-theme"
    );

    // Apply theme to document element for Tailwind dark mode support
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Force a repaint to ensure all styles are applied
    const root = document.documentElement;
    root.style.display = "none";
    // This causes a reflow, forcing the browser to apply the new styles
    void root.offsetHeight;
    root.style.display = "";
  }, [theme]);

  return (
    <label className="pixel-border relative inline-flex items-center cursor-pointer ml-4">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={(e) => {
          setTheme(e.target.checked ? "dark" : "light");
        }}
        className="sr-only peer pokemon-font"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 flex items-center justify-between px-1 pointer-events-none">
        <span className="flex-1 flex justify-start">
          {theme === "dark" ? <MoonIcon /> : null}
        </span>
        <span className="flex-1 flex justify-end">
          {theme !== "dark" ? <SunIcon /> : null}
        </span>
      </div>
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 transition-transform peer-checked:translate-x-5 dark:border-gray-600 pointer-events-none"></div>
    </label>
  );
};
