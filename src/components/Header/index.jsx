import SearchBar from '../SearchBar';

export default function Header({ query, onSearchChange, cartCount }) {
  return (
    <nav>
      <h2>ShopCart</h2>
      <SearchBar value={query} onChange={onSearchChange} />
      <b>Cart ({cartCount})</b>
    </nav>
  );
}
