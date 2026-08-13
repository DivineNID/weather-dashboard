export function CurrentWeatherCard({ data, unit }) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const tempSymbol = unit === "imperial" ? "°F" : "°C";
  const windSpeed =
    unit === "imperial" ? Math.round(wind.speed) : Math.round(wind.speed * 3.6);
  const windUnit = unit === "imperial" ? "mph" : "km/h";

  return (
    <div className="rounded-2xl p-6 mb-6 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{name}</p>
        <p className="text-4xl font-semibold leading-none text-gray-900 dark:text-gray-100">
          {Math.round(main.temp)}{tempSymbol}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
          {weather[0].description} · Ressenti {Math.round(main.feels_like)}{tempSymbol}
        </p>
      </div>
      <div className="text-right">
        <img src={iconUrl} alt={weather[0].description} className="w-16 h-16 ml-auto" />
        <div className="flex gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400 justify-end">
          <span>💧 {main.humidity}%</span>
          <span>🌬 {windSpeed} {windUnit}</span>
        </div>
      </div>
    </div>
  );
}
