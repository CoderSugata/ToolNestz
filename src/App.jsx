import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToolHeader } from './components/layout/ToolHeader';
import { ToolCard } from './components/layout/ToolCard';
import { ToolRenderer } from './components/tools/ToolRenderer';
import { SearchModal } from './components/common/Modal';
import { Mascot } from './components/common/Mascot';
import { TOOLS } from './data/toolsRegistry';
import { CATEGORIES } from './data/categories';
import { useTheme } from './hooks/useTheme';
import { useToolHistory } from './hooks/useToolHistory';
import { Star, Clock, Grid } from 'lucide-react';
import './styles/index.css';
import './styles/tools.css';

export function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite, isFavorite, recents, addRecent } = useToolHistory();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeToolId, setActiveToolId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Open tool & update recents
  const handleSelectTool = (id) => {
    setActiveToolId(id);
    addRecent(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActiveToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener for Ctrl+K or '/' to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tools by category or search query
  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const searchModalResults = TOOLS.filter(tool => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.tags.some(t => t.toLowerCase().includes(q));
  });

  const activeTool = TOOLS.find(t => t.id === activeToolId);
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));
  const recentTools = TOOLS.filter(t => recents.includes(t.id));

  return (
    <div className="app-container">
      <Header
        currentToolId={activeToolId}
        onNavigateHome={handleNavigateHome}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
        favoritesCount={favorites.length}
      />

      <main className="main-content">
        {activeToolId && activeTool ? (
          <div>
            <ToolHeader
              tool={activeTool}
              isFavorite={isFavorite(activeTool.id)}
              onToggleFavorite={() => toggleFavorite(activeTool.id)}
              onBack={handleNavigateHome}
            />

            <ToolRenderer toolId={activeTool.id} />
          </div>
        ) : (
          <div>
            {/* Cute Hero Banner */}
            <div className="hero-banner">
              <div className="hero-text">
                <h1>ToolNestz 🪹 Everyday Tools Hub</h1>
                <p>
                  35+ cute, fast, and simple online tools. Calculators, converters, timers, generators & developer tools with 100% client-side privacy.
                </p>
              </div>
              <Mascot size={110} message="Hi friend! Which tool would you like to use today?" />
            </div>

            {/* Category Pills Navigation */}
            <div className="category-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Favorite Starred Tools Section */}
            {activeCategory === 'all' && favoriteTools.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cute-amber)' }}>
                  <Star size={20} fill="var(--accent-cute-amber)" /> Favorite Tools ({favoriteTools.length})
                </h2>
                <div className="tools-grid">
                  {favoriteTools.map(tool => (
                    <ToolCard
                      key={`fav-${tool.id}`}
                      tool={tool}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                      onClick={() => handleSelectTool(tool.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Tools Section */}
            {activeCategory === 'all' && recentTools.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Clock size={18} /> Recently Opened Tools
                </h2>
                <div className="tools-grid">
                  {recentTools.slice(0, 3).map(tool => (
                    <ToolCard
                      key={`rec-${tool.id}`}
                      tool={tool}
                      isFavorite={isFavorite(tool.id)}
                      onToggleFavorite={toggleFavorite}
                      onClick={() => handleSelectTool(tool.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Tools Grid */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Grid size={20} color="var(--accent-primary)" />
                {activeCategory === 'all' ? 'All 35+ Tools' : CATEGORIES.find(c => c.id === activeCategory)?.name}
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>({filteredTools.length})</span>
              </h2>

              <div className="tools-grid">
                {filteredTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={isFavorite(tool.id)}
                    onToggleFavorite={toggleFavorite}
                    onClick={() => handleSelectTool(tool.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer onSelectCategory={(catId) => {
        handleNavigateHome();
        setActiveCategory(catId);
      }} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={searchModalResults}
        onSelectTool={handleSelectTool}
        isFavorite={isFavorite}
      />
    </div>
  );
}

export default App;
