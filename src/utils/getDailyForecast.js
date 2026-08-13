export function getDailyForecast(list) {
  let daily = list.filter((entry) => entry.dt_txt.includes("12:00:00"));

  // Filet de sécurité si aucune entrée ne tombe pile à 12:00:00
  if (daily.length === 0) {
    daily = list.filter((_, index) => index % 8 === 0);
  }

  return daily.slice(0, 5);
}