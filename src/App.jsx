import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { SearchBar } from "./components/searchBar";
import { RecentCities } from "./components/recentCities";
import { CurrentWeatherCard } from "./components/currentWeatherCard";
import { ForecastList } from "./components/forecastList";
import { TemperatureChart } from "./components/temperatureChart";
import { LoadingState } from "./components/loadingState";
import { ErrorState } from "./components/errorState";
import { getRecentCities, addRecentCity } from "./utils/recentCities";
import { getInitialDarkMode, applyDarkMode } from "./utils/darkMode";

const DEFAULT_CITY = "Lyon";

function App() {
  // `location` peut être une ville (string) ou des coordonnées { lat, lon }
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [recentCities, setRecentCities] = useState([]);
  const [isDark, setIsDark] = useState(getInitialDarkMode);
  const { data, loading, error } = useWeather(location, unit);

  useEffect(() => {
    applyDarkMode(isDark);
  }, [isDark]);

  useEffect(() => {
    setRecentCities(getRecentCities());

    if (!navigator.geolocation) {
      setLocation(DEFAULT_CITY);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setLocation(DEFAULT_CITY);
      },
      { timeout: 5000 }
    );
  }, []);

  function handleSearch(city) {
    setLocation(city);
    setRecentCities(addRecentCity(city));
  }

  function toggleUnit() {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Météo
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleUnit}
              className="text-sm border dark:border-gray-700 rounded-lg px-3 py-1 text-gray-900 dark:text-gray-100"
            >
              {unit === "metric" ? "°C" : "°F"}
            </button>
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="text-sm border dark:border-gray-700 rounded-lg px-3 py-1 text-gray-900 dark:text-gray-100"
              aria-label="Basculer le mode sombre"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />
        <RecentCities cities={recentCities} onSelect={handleSearch} />

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && data && (
          <>
            <CurrentWeatherCard data={data.current} unit={unit} />
            <ForecastList forecastList={data.forecast.list} />
            <TemperatureChart forecastList={data.forecast.list} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
