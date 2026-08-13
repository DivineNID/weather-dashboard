import { useState, useEffect } from "react";
import {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "../services/weatherApi";

// `location` accepte soit une ville en texte ("Lyon"), soit un objet { lat, lon }.
// `unit` vaut "metric" (°C) ou "imperial" (°F).
export function useWeather(location, unit = "metric") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    let isCancelled = false;

    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const isCoords = typeof location === "object";

        const [current, forecast] = isCoords
          ? await Promise.all([
              getCurrentWeatherByCoords(location.lat, location.lon, unit),
              getForecastByCoords(location.lat, location.lon, unit),
            ])
          : await Promise.all([
              getCurrentWeather(location, unit),
              getForecast(location, unit),
            ]);

        if (!isCancelled) {
          setData({ current, forecast });
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      isCancelled = true;
    };
  }, [location, unit]);

  return { data, loading, error };
}