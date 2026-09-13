import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

export default function Header({ query, onSearchChange, cartCount, onClearSearch }) {
  return (
    <nav>
      <Link to="/" className="brand-link">
        <h2>ShopCart</h2>
      </Link>
      <div className="search-group">
        <SearchBar value={query} onChange={onSearchChange} />
        {query && (
          <button className="clear-search-button" onClick={onClearSearch}>
            Clear Search
          </button>
        )}
      </div>
      <Link to="/cart" className="cart-link">
        <b>Cart ({cartCount})</b>
      </Link>
    </nav>
  );
}
