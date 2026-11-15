import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width="900"
          height="1100"
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="quick-view" aria-hidden="true">
          View details <ArrowUpRight size={15} />
        </span>
      </Link>
      <div className="product-meta">
        <div>
          <Link to={`/product/${product.id}`} className="product-name">
            {product.name}
          </Link>
          <p>{product.color}</p>
        </div>
        <span className="product-price">${product.price}</span>
      </div>
    </article>
  );
}
