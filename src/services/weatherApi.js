import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function handleWeatherError(err) {
  if (err.response && err.response.status === 404) {
    throw new Error("Ville introuvable, vérifie l'orthographe.");
  }
  throw new Error("Impossible de récupérer la météo pour le moment.");
}

export async function getCurrentWeather(city, units = "metric") {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units, lang: "fr" },
    });
    return response.data;
  } catch (err) {
    handleWeatherError(err);
  }
}

export async function getForecast(city, units = "metric") {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units, lang: "fr" },
    });
    return response.data;
  } catch (err) {
    handleWeatherError(err);
  }
}

export async function getCurrentWeatherByCoords(lat, lon, units = "metric") {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units, lang: "fr" },
    });
    return response.data;
  } catch (err) {
    handleWeatherError(err);
  }
}

export async function getForecastByCoords(lat, lon, units = "metric") {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, appid: API_KEY, units, lang: "fr" },
    });
    return response.data;
  } catch (err) {
    handleWeatherError(err);
  }
}