import ProductCard from '../ProductCard';

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
