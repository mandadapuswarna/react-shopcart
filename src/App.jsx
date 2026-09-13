import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import useDebounce from './hooks/useDebounce';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import { getProducts } from './services/productService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('default');
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
    setCart(currentCart => [...currentCart, product]);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage
              products={products}
              query={query}
              setQuery={setQuery}
              cartCount={cart.length}
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
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetailsPage products={products} onAddToCart={addToCart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

