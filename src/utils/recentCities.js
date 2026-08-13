const STORAGE_KEY = "recentCities";
const MAX_ENTRIES = 5;

export function getRecentCities() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentCity(city) {
  const current = getRecentCities();

  // Retire les doublons (insensible à la casse) avant de remettre la ville en tête de liste
  const filtered = current.filter(
    (c) => c.toLowerCase() !== city.toLowerCase()
  );

  const updated = [city, ...filtered].slice(0, MAX_ENTRIES);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}