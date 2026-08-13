import { getDailyForecast } from "../utils/getDailyForecast";

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export function ForecastList({ forecastList }) {
  const dailyForecast = getDailyForecast(forecastList);

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
        Prévisions 5 jours
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

          return (
            <div
              key={day.dt}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {DAYS[date.getDay()]}
              </p>
              <img src={iconUrl} alt={day.weather[0].description} className="mx-auto w-8 h-8" />
              <p className="text-sm font-medium mt-1 text-gray-900 dark:text-gray-100">
                {Math.round(day.main.temp)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
