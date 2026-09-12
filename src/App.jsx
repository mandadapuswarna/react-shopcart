import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import Loader from './components/Loader';
import ProductGrid from './components/ProductGrid';
import { getProducts } from './services/productService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter(product =>
      product.title.toLowerCase().includes(normalizedQuery)
    );
  }, [products, query]);

  const addToCart = product => {
    setCart(currentCart => [...currentCart, product]);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      <Header
        query={query}
        onSearchChange={event => setQuery(event.target.value)}
        cartCount={cart.length}
      />

      <main>
        <section className="hero">
          <h1>Simple shopping. Beautiful experience.</h1>
          <p>A React demo with API data, search and cart state.</p>
        </section>

        {loading ? (
          <Loader />
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
