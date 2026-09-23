export default function CategoryFilter({ options, activeCategory, onSelect }) {
  return (
    <div className="category-filter" aria-label="Category filters">
      <button
        type="button"
        className={`filter-chip ${activeCategory === 'All' ? 'active' : ''}`}
        onClick={() => onSelect('All')}
      >
        All
      </button>

      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter-chip ${activeCategory === option ? 'active' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
