import { useLocalStorage } from './useLocalStorage';

export function useToolHistory() {
  const [favorites, setFavorites] = useLocalStorage('toolnestz_favorites', ['scientific-calculator', 'qr-generator', 'word-counter', 'age-calculator']);
  const [recents, setRecents] = useLocalStorage('toolnestz_recents', []);

  const toggleFavorite = (toolId) => {
    setFavorites(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  const isFavorite = (toolId) => favorites.includes(toolId);

  const addRecent = (toolId) => {
    setRecents(prev => {
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, 8); // Keep top 8 recent tools
    });
  };

  return { favorites, toggleFavorite, isFavorite, recents, addRecent };
}
