export default function SortSelect({ value, onChange }) {
  return (
    <label className="sort-control">
      <span>Sort By</span>
      <select value={value} onChange={onChange}>
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </label>
  );
}
