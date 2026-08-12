import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('toolnestz_theme', prefersDark ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
