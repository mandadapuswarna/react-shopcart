import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import CategoryFilter from './components/CategoryFilter';
import Header from './components/Header';
import Loader from './components/Loader';
import ProductGrid from './components/ProductGrid';
import useDebounce from './hooks/useDebounce';
import { getProducts } from './services/productService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (fetchError) {
      setError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['All Products', ...uniqueCategories];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory =
        selectedCategory === 'All Products' || product.category === selectedCategory;

      const matchesSearch =
        !normalizedQuery || product.title.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, debouncedQuery]);

  const addToCart = product => {
    setCart(currentCart => [...currentCart, product]);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const shouldShowNoResults = !loading && !error && visibleProducts.length === 0 && debouncedQuery.trim().length > 0;

  return (
    <div>
      <Header
        query={query}
        onSearchChange={event => setQuery(event.target.value)}
        cartCount={cart.length}
        onClearSearch={() => setQuery('')}
      />

      <main>
        <section className="hero">
          <h1>Simple shopping. Beautiful experience.</h1>
          <p>A React demo with API data, search and cart state.</p>
        </section>

        {!loading && !error && (
          <div className="toolbar">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

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
              <strong>"{debouncedQuery}"</strong>
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
            {cart.length} item(s) · Total <b>${total.toFixed(2)}</b>
          </p>
        </section>
      </main>
    </div>
  );
}
