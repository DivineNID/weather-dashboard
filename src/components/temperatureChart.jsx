import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { getDailyForecast } from "../utils/getDailyForecast";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export function TemperatureChart({ forecastList }) {
  const dailyForecast = getDailyForecast(forecastList);

  const data = {
    labels: dailyForecast.map((day) => DAYS[new Date(day.dt * 1000).getDay()]),
    datasets: [
      {
        data: dailyForecast.map((day) => Math.round(day.main.temp)),
        borderColor: "#378ADD",
        backgroundColor: "#378ADD",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      y: {
        ticks: { callback: (value) => `${value}°` },
      },
    },
  };

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
        Évolution de la température
      </p>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 h-40 sm:h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
