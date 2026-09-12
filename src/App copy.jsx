import { useEffect, useMemo, useState } from 'react';
import './styles.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=12')
      .then(r => r.json())
      .then(d => setProducts(d))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, []);

  const visible = useMemo(() => {
    products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())), [products, query]
  });
  
  const add = p => setCart(c => [...c, p]);
  
  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <div>
      <nav>
        <h2>ShopCart</h2>
        <input
          placeholder="Search
										products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <b>
          Cart ({cart.length})
        </b>
      </nav>
      <main>
        <section className="hero" >
          <h1>Simple
            shopping. Beautiful experience.
          </h1>
          <p>A React demo with API data, search and cart state.</p>
        </section>
        {loading
          ? <p>Loading products...</p> : (
            <div
              className="grid">{visible?.map(p => <article
                className="card"
                key={p.id}><img
                  src={p.image}
                  alt={p.title} /><h3>{p.title}</h3><p
                    className="price">${p.price.toFixed(2)}</p><button
                      onClick={() => add(p)}>Add
                  to cart</button></article>)}</div>
          )}
        <section className="cart">
          <h2>Order summary</h2>
          <p>{cart.length} item(s) ·
            Total
            <b>${total.toFixed(2)}</b>
          </p>
        </section>
      </main>
    </div>
  )
}