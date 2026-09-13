import { Link } from 'react-router-dom';

export default function CartPage({ cart, cartCount, subtotal, onIncrease, onDecrease, onRemove }) {
  const shipping = 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="page-shell cart-page">
        <div className="empty-cart-state">
          <div className="empty-cart-icon">🛒</div>
          <h1>Your cart is empty.</h1>
          <Link to="/" className="primary-button-link">
            <button className="primary-button">Continue Shopping</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell cart-page">
      <Link to="/" className="back-link">← Continue Shopping</Link>

      <div className="cart-layout">
        <section className="cart-items-panel">
          <h1>Your Cart</h1>

          {cart.map(item => (
            <article key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />

              <div className="cart-item-details">
                <h2>{item.title}</h2>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>

                <div className="quantity-control">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => onDecrease(item.id)}
                    aria-label={`Decrease quantity for ${item.title}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => onIncrease(item.id)}
                    aria-label={`Increase quantity for ${item.title}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary-panel">
          <h2>Cart Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <strong>{cartCount}</strong>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <Link to="/checkout" className="checkout-link">
            <button className="primary-button">Proceed to Checkout</button>
          </Link>
        </aside>
      </div>
    </main>
  );
}
