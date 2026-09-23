import { useEffect, useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import HealthFactCard from '../components/HealthFactCard';
import SearchBar from '../components/SearchBar';
import { categoryOptions, healthFacts as mockHealthFacts } from '../data/mockData';
import { getHealthFacts } from '../services/api';

export default function HealthFacts() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadFacts = async () => {
      setLoading(true);

      try {
        const response = await getHealthFacts();
        const data = Array.isArray(response)
          ? response
          : response?.items || response?.data || mockHealthFacts;

        setFacts(Array.isArray(data) && data.length > 0 ? data : mockHealthFacts);
        setUsingFallback(false);
        setError('');
      } catch (requestError) {
        setFacts(mockHealthFacts);
        setUsingFallback(true);
        setError('Previewing sample health education content.');
      } finally {
        setLoading(false);
      }
    };

    loadFacts();
  }, []);

  const filteredFacts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return facts.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesText =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.source.toLowerCase().includes(keyword);

      return matchesCategory && matchesText;
    });
  }, [activeCategory, facts, searchTerm]);

  return (
    <div>
      <header className="page-header">
        <div className="hero">
          <h1>Health Facts</h1>
          <p className="page-description">
            Explore brief, evidence-based education about common urinary, prostate, sexual, and STI-related health topics. The content is designed to support understanding and informed conversations with healthcare professionals.
          </p>
        </div>
      </header>

      <div className="filters-panel">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search health facts"
        />
        <CategoryFilter
          options={categoryOptions}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      {loading ? (
        <div className="loading-box">Loading health facts...</div>
      ) : null}

      {!loading && filteredFacts.length === 0 ? (
        <div className="empty-state">
          No health facts match your current search. Try another keyword or category.
        </div>
      ) : null}

      {!loading && filteredFacts.length > 0 ? (
        <section className="cards-grid" aria-live="polite">
          {filteredFacts.map((item) => (
            <HealthFactCard key={item.id || item.title} item={item} />
          ))}
        </section>
      ) : null}

      {!loading && usingFallback ? (
        <div className="helper-text" style={{ width: 'min(1120px, calc(100% - 32px))', margin: '18px auto 0' }}>
          This page is currently showing sample content for preview.
        </div>
      ) : null}
    </div>
  );
}
