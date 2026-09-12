'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-yellow-400 dark:hover:bg-slate-800 transition-colors"
      title={theme === 'dark' ? 'Açık Temaya Geç' : 'Karanlık Temaya Geç'}
      aria-label="Tema Değiştir"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 hover:text-indigo-600 transition-transform -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
