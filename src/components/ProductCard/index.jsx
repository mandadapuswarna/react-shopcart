export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card">
      <img src={product.image} alt={product.title} />
      <span className="category">{product.category}</span>
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Add to cart</button>
    </article>
  );
}
