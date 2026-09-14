import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import useDebounce from './hooks/useDebounce';
import useLocalStorage from './hooks/useLocalStorage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import { getProducts } from './services/productService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useLocalStorage('shopcart', []);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toasts, setToasts] = useState([]);

  const debouncedQuery = useDebounce(query, 400);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch {
      setError(true);
      setProducts([]);
      showToast('Unable to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message, type = 'success') => {
    setToasts(currentToasts => {
      if (currentToasts.some(toast => toast.message === message && toast.type === type)) {
        return currentToasts;
      }

      return [...currentToasts, { id: Date.now(), message, type }];
    });
  };

  const dismissToast = toastId => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== toastId));
  };

  useEffect(() => {
    if (toasts.length === 0) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToasts(currentToasts => currentToasts.slice(1));
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [toasts]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['All Products', ...uniqueCategories];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    const filteredProducts = products.filter(product => {
      const matchesCategory =
        selectedCategory === 'All Products' || product.category === selectedCategory;

      const matchesSearch =
        !normalizedQuery || product.title.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filteredProducts;
    }
  }, [products, selectedCategory, debouncedQuery, sortBy]);

  const addToCart = product => {
    showToast('Product added to cart');
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);

      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, change) => {
    const item = cart.find(cartItem => cartItem.id === productId);

    if (item && change < 0 && item.quantity + change <= 0) {
      showToast('Product removed from cart', 'warning');
    }

    setCart(currentCart =>
      currentCart.flatMap(item => {
        if (item.id !== productId) {
          return [item];
        }

        const nextQuantity = item.quantity + change;
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
      })
    );
  };

  const removeFromCart = productId => {
    showToast('Product removed from cart', 'warning');
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage
              query={query}
              setQuery={setQuery}
              cartCount={cartCount}
              cartTotal={subtotal}
              loading={loading}
              error={error}
              fetchProducts={fetchProducts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              visibleProducts={visibleProducts}
              addToCart={addToCart}
              categories={categories}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalProducts={products.length}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductDetailsPage
              products={products}
              onAddToCart={addToCart}
              query={query}
              onSearchChange={event => setQuery(event.target.value)}
              cartCount={cartCount}
              onClearSearch={() => setQuery('')}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              cartCount={cartCount}
              subtotal={subtotal}
              onIncrease={productId => updateQuantity(productId, 1)}
              onDecrease={productId => updateQuantity(productId, -1)}
              onRemove={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              cartCount={cartCount}
              total={subtotal}
              onClearCart={() => {
                setCart([]);
                showToast('Order placed successfully');
              }}
            />
          }
        />
      </Routes>
      <div className="toast-container" aria-live="polite">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </BrowserRouter>
  );
}

