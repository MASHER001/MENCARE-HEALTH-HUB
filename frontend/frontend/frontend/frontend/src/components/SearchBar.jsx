export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-wrap">
      <label htmlFor="global-search" className="visually-hidden">
        Search
      </label>
      <input
        id="global-search"
        className="search-field"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search content"
      />
    </div>
  );
}
