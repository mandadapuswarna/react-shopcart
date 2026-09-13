import { Link } from 'react-router-dom';
import { useState } from 'react';

const initialForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
};

export default function CheckoutPage({ cart, cartCount, total, onClearCart }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(currentForm => ({ ...currentForm, [name]: value }));
    setErrors(currentErrors => ({ ...currentErrors, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.entries(form).forEach(([field, value]) => {
      if (!value.trim()) {
        nextErrors[field] = 'This field is required.';
      }
    });

    if (form.email.trim() && !emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    return nextErrors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onClearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="page-shell checkout-page">
        <div className="success-state">
          <h1>Order placed successfully!</h1>
          <p>Thank you for your order.</p>
          <Link to="/" className="primary-button-link">
            <button className="primary-button">Continue Shopping</button>
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="page-shell checkout-page">
        <div className="empty-cart-state">
          <h1>Your cart is empty.</h1>
          <Link to="/" className="primary-button-link">
            <button className="primary-button">Continue Shopping</button>
          </Link>
        </div>
      </main>
    );
  }

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'address', label: 'Address', type: 'text', autoComplete: 'street-address' },
    { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
    { name: 'postalCode', label: 'Postal Code', type: 'text', autoComplete: 'postal-code' },
  ];

  return (
    <main className="page-shell checkout-page">
      <Link to="/cart" className="back-link">← Back to Cart</Link>

      <div className="checkout-layout">
        <section className="checkout-form-panel">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit} noValidate>
            {fields.map(field => (
              <div className="form-field" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  autoComplete={field.autoComplete}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                />
                {errors[field.name] && (
                  <p className="field-error" id={`${field.name}-error`}>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <button type="submit" className="primary-button checkout-button">
              Place Order
            </button>
          </form>
        </section>

        <aside className="checkout-summary-panel">
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div className="checkout-summary-item" key={item.id}>
              <span>{item.title} × {item.quantity}</span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
          <div className="summary-row total-row">
            <span>Total ({cartCount} items)</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
