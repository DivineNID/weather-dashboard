const STORAGE_KEY = "darkMode";

export function getInitialDarkMode() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "true";

  // Pas de préférence enregistrée : on suit la préférence système
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyDarkMode(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(STORAGE_KEY, String(isDark));
}