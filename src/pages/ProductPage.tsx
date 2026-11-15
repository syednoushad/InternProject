import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id = "" } = useParams();
  const product = getProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return (
      <main className="not-found">
        <p className="eyebrow">A little out of place</p>
        <h1>We can’t find that object.</h1>
        <Link className="button button-dark" to="/">Back to the collection</Link>
      </main>
    );
  }

  const handleAdd = () => {
    for (let index = 0; index < quantity; index += 1) addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <main className="product-page section-shell">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={15} /> Back to the collection
      </button>
      <div className="product-detail">
        <div className="detail-image">
          <img src={product.image.replace("w=900", "w=1400")} alt={product.name} />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category} / {product.color}</p>
          <h1>{product.name}</h1>
          <span className="detail-price">${product.price}</span>
          <p className="detail-description">{product.description}</p>
          <div className="detail-rule" />
          <p className="detail-label">Quantity</p>
          <div className="quantity-control">
            <button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={14} />
            </button>
            <span>{quantity}</span>
            <button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>
              <Plus size={14} />
            </button>
          </div>
          <button className="button button-dark add-to-bag" onClick={handleAdd}>
            {added ? "Added to your bag" : "Add to bag — $" + product.price * quantity}
            <ArrowRight size={16} />
          </button>
          <p className="shipping-note">Complimentary shipping on orders over $150.</p>
          <div className="detail-rule" />
          <details className="product-details">
            <summary>Details & care <span>+</span></summary>
            <p>Thoughtfully made in small batches. Wipe gently with a soft, dry cloth and keep away from harsh chemicals.</p>
          </details>
          <details className="product-details">
            <summary>Shipping & returns <span>+</span></summary>
            <p>We pack every order with care. Returns are accepted within 30 days of delivery for unused items in original condition.</p>
          </details>
        </div>
      </div>
    </main>
  );
}
