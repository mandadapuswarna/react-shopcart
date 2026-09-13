import SearchBar from '../SearchBar';

export default function Header({ query, onSearchChange, cartCount, onClearSearch }) {
  return (
    <nav>
      <h2>ShopCart</h2>
      <div className="search-group">
        <SearchBar value={query} onChange={onSearchChange} />
        {query && (
          <button className="clear-search-button" onClick={onClearSearch}>
            Clear Search
          </button>
        )}
      </div>
      <b>Cart ({cartCount})</b>
    </nav>
  );
}
