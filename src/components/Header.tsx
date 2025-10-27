import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-3 shadow rounded-md mb-6">
      <h1 className="font-semibold text-2xl">E-Commerce Dashboard</h1>
      <ThemeToggle />
    </header>
  );
}
