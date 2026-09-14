import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';

export default function ProductDetailsPage({
  products,
  onAddToCart,
  query,
  onSearchChange,
  cartCount,
  onClearSearch,
}) {
  const { id } = useParams();
  const product = products.find(item => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Header
          query={query}
          onSearchChange={onSearchChange}
          cartCount={cartCount}
          onClearSearch={onClearSearch}
        />
        <main className="page-shell detail-page empty-layout">
          <p>Product not found.</p>
          <Link to="/" className="back-link">← Back to Products</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        query={query}
        onSearchChange={onSearchChange}
        cartCount={cartCount}
        onClearSearch={onClearSearch}
      />
      <main className="page-shell detail-page">
        <Link to="/" className="back-link">← Back to Products</Link>

        <div className="detail-layout">
          <img src={product.image} alt={product.title} className="detail-image" />

          <div className="detail-content">
            <span className="category">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="detail-price">${product.price.toFixed(2)}</p>
            <p className="detail-rating">
              Rating: {product.rating?.rate ?? 0} ⭐ ({product.rating?.count ?? 0} reviews)
            </p>
            <p className="detail-description">{product.description}</p>

            <button className="primary-button" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
