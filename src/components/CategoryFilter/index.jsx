export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      {categories.map(category => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            className={isActive ? 'category-button active' : 'category-button'}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
