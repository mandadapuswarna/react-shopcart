export default function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label="Search products"
    />
  );
}
