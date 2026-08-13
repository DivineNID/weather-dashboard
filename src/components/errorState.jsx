export function ErrorState({ message }) {
  return (
    <div className="text-center py-10 text-sm text-red-600 dark:text-red-400">
      ⚠️ {message}
    </div>
  );
}
