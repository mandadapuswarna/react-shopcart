import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.image} alt={product.title} />
      </Link>
      <span className="category">{product.category}</span>
      <Link to={`/products/${product.id}`} className="product-title-link">
        <h3>{product.title}</h3>
      </Link>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>{added ? '✓ Added' : 'Add to cart'}</button>
    </article>
  );
}
