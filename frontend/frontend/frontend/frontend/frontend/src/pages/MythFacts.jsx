import { useEffect, useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import MythFactCard from '../components/MythFactCard';
import SearchBar from '../components/SearchBar';
import { categoryOptions, mythFacts as mockMythFacts } from '../data/mockData';
import { getMythFacts } from '../services/api';

export default function MythFacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadMythFacts = async () => {
      setLoading(true);

      try {
        const response = await getMythFacts();
        const data = Array.isArray(response)
          ? response
          : response?.items || response?.data || mockMythFacts;

        setItems(Array.isArray(data) && data.length > 0 ? data : mockMythFacts);
        setUsingFallback(false);
        setError('');
      } catch (requestError) {
        setItems(mockMythFacts);
        setUsingFallback(true);
        setError('Previewing sample myth-versus-fact content.');
      } finally {
        setLoading(false);
      }
    };

    loadMythFacts();
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesText =
        !keyword ||
        item.myth.toLowerCase().includes(keyword) ||
        item.fact.toLowerCase().includes(keyword) ||
        item.explanation.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      return matchesCategory && matchesText;
    });
  }, [activeCategory, items, searchTerm]);

  return (
    <div>
      <header className="page-header">
        <div className="hero">
          <h1>Myth vs Fact</h1>
          <p className="page-description">
            Explore common misconceptions about men’s health and learn the evidence-based facts in a respectful, easy-to-understand way.
          </p>
        </div>
      </header>

      <div className="filters-panel">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search myths and facts"
        />
        <CategoryFilter
          options={categoryOptions}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      {loading ? <div className="loading-box">Loading myth and fact content...</div> : null}

      {!loading && filteredItems.length === 0 ? (
        <div className="empty-state">
          No myth or fact entries match this search. Please try a different keyword or filter.
        </div>
      ) : null}

      {!loading && filteredItems.length > 0 ? (
        <section className="cards-grid" aria-live="polite">
          {filteredItems.map((item) => (
            <MythFactCard key={item.id || item.myth} item={item} />
          ))}
        </section>
      ) : null}

      {!loading && usingFallback ? (
        <div className="helper-text" style={{ width: 'min(1120px, calc(100% - 32px))', margin: '18px auto 0' }}>
          This page is showing sample myth-versus-fact content for preview.
        </div>
      ) : null}
    </div>
  );
}
