import { useState } from "react";

export function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Rechercher une ville..."
        className="flex-1 border dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg border dark:border-gray-700 font-medium text-gray-900 dark:text-gray-100"
      >
        Rechercher
      </button>
    </form>
  );
}
