'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-full hover:scale-105 transition-transform"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-5 h-5 text-yellow-400" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5 text-blue-400" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}
