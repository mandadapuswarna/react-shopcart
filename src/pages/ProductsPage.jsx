import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import SortSelect from '../components/SortSelect';
import Loader from '../components/Loader';

export default function ProductsPage({
  products,
  query,
  setQuery,
  cartCount,
  loading,
  error,
  fetchProducts,
  selectedCategory,
  setSelectedCategory,
  visibleProducts,
  addToCart,
  categories,
  sortBy,
  setSortBy,
}) {
  const shouldShowNoResults = !loading && !error && visibleProducts.length === 0 && query.trim().length > 0;

  return (
    <>
      <Header
        query={query}
        onSearchChange={event => setQuery(event.target.value)}
        cartCount={cartCount}
        onClearSearch={() => setQuery('')}
      />

      <main>
        <section className="hero">
          <h1>Simple shopping. Beautiful experience.</h1>
          <p>A React demo with API data, search and cart state.</p>
        </section>

        {!loading && !error && (
          <div className="toolbar">
            <div className="toolbar-row">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              <SortSelect
                value={sortBy}
                onChange={event => setSortBy(event.target.value)}
              />
            </div>

            {query && (
              <p className="search-summary">
                Search results: {visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'}
              </p>
            )}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="status-box error-state">
            <p>
              Unable to load products.
              <br />
              <br />
              Please try again.
            </p>
            <button className="retry-button" onClick={fetchProducts}>
              Retry
            </button>
          </div>
        ) : shouldShowNoResults ? (
          <div className="status-box empty-state">
            <p>
              No products found for:
              <br />
              <strong>"{query.trim()}"</strong>
            </p>
          </div>
        ) : (
          <ProductGrid
            products={visibleProducts}
            onAddToCart={addToCart}
          />
        )}

        <section className="cart">
          <h2>Order summary</h2>
          <p>
            {cartCount} item(s) · Total <b>${products.reduce((sum, product) => sum + product.price, 0).toFixed(2)}</b>
          </p>
        </section>
      </main>
    </>
  );
}
