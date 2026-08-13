export function RecentCities({ cities, onSelect }) {
  if (cities.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="text-xs px-3 py-1 rounded-full border dark:border-gray-700 text-gray-600 dark:text-gray-300"
        >
          {city}
        </button>
      ))}
    </div>
  );
}
