import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, subtotal, removeItem, setQuantity } = useCart();

  return (
    <main className="cart-page section-shell">
      <p className="eyebrow">Your considered collection</p>
      <h1>Your bag<span> ({items.reduce((count, item) => count + item.quantity, 0)})</span></h1>
      {!items.length ? (
        <div className="empty-cart">
          <p>Nothing in your bag, just yet.</p>
          <span>Good things are waiting to be found.</span>
          <Link to="/#shop" className="button button-dark">Explore the collection <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link to={`/product/${product.id}`} className="cart-item-image">
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="cart-item-info">
                  <div>
                    <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
                    <p>{product.color}</p>
                    <span className="cart-item-price">${product.price}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control compact">
                      <button aria-label={`Decrease ${product.name} quantity`} onClick={() => setQuantity(product.id, quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span>{quantity}</span>
                      <button aria-label={`Increase ${product.name} quantity`} onClick={() => setQuantity(product.id, quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <button className="remove-item" onClick={() => removeItem(product.id)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                <span className="line-total">${product.price * quantity}</span>
              </article>
            ))}
            <Link to="/#shop" className="back-link cart-continue"><ArrowLeft size={15} /> Keep looking</Link>
          </div>
          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="summary-line"><span>Subtotal</span><span>${subtotal}</span></div>
            <div className="summary-line"><span>Shipping</span><span>{subtotal >= 150 ? "Complimentary" : "Calculated at checkout"}</span></div>
            {subtotal < 150 && <p className="shipping-progress">You’re ${150 - subtotal} away from complimentary shipping.</p>}
            <div className="summary-total"><span>Total</span><strong>${subtotal}</strong></div>
            <button className="button button-dark checkout-button" onClick={() => window.alert("Checkout is a demo. Connect a payment provider to accept orders.")}>
              Continue to checkout <ArrowRight size={16} />
            </button>
            <p className="checkout-note">Taxes calculated at checkout.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
