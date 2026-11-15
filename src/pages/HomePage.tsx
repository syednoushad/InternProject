import { ArrowDown, ArrowRight, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = ["All objects", "Living", "Dining", "Lighting", "Textiles"];

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const selectedCategory = searchParams.get("category") ?? "All objects";
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All objects" || product.category === selectedCategory;
      const matchesQuery =
        !query ||
        `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [query, selectedCategory, sort]);

  const chooseCategory = (category: string) => {
    if (category === "All objects") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <main>
      <section className="hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=88"
          alt="Sunlit, thoughtfully layered living room"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Objects for the everyday</p>
          <h1>Make room<br />for better.</h1>
          <p className="hero-copy">
            Considered pieces for a home that feels like you.
            <br />Made slowly. Kept for a long time.
          </p>
          <a className="button button-light" href="#shop">
            Explore the collection <ArrowRight size={16} />
          </a>
        </div>
        <a className="hero-scroll" href="#shop">
          Scroll to explore <ArrowDown size={14} />
        </a>
        <span className="hero-index">01 — 03</span>
      </section>

      <section className="intro-strip">
        <span className="eyebrow">Less, but more meaningful</span>
        <p>
          We believe the things we live with should earn their place.
          <br />So we find the makers, materials, and little details worth keeping.
        </p>
        <span className="intro-stamp">Good things,<br />made to stay.</span>
      </section>

      <section className="collection section-shell" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A slower kind of shopping</p>
            <h2>Considered for living.</h2>
          </div>
          <p className="section-note">
            Objects with a point of view.<br />And room for yours.
          </p>
        </div>
        <div className="catalog-controls">
          <div className="category-tabs" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? "active" : ""}`}
                onClick={() => chooseCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="sort-control">
            <SlidersHorizontal size={15} />
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
        {query && (
          <div className="results-note">
            Showing results for “{searchParams.get("q")}”
            <button onClick={() => { searchParams.delete("q"); setSearchParams(searchParams); }}>
              Clear
            </button>
          </div>
        )}
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <p>Nothing found just yet.</p>
            <span>Try another search or explore all of our considered objects.</span>
            <button className="text-link" onClick={() => { setSearchParams({}); }}>
              View all objects <ArrowRight size={15} />
            </button>
          </div>
        )}
        <div className="collection-end">
          <span>{visibleProducts.length} considered objects</span>
          <Link to="/#shop">Explore all <ArrowUpRight size={14} /></Link>
        </div>
      </section>

      <section className="story-banner">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=84"
            alt="Natural textures and warm materials in a quiet interior"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">The Morrow point of view</p>
          <h2>Good design<br />feels like<br /><em>coming home.</em></h2>
          <p>We work with independent makers who care about the way things are made, and the way they make you feel.</p>
          <a className="text-link" href="#newsletter">A little about us <ArrowRight size={15} /></a>
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <p className="eyebrow">A note from Morrow</p>
        <h2>Good things, occasionally.</h2>
        <p>New finds, thoughtful living, and the odd thing worth sharing.</p>
        <NewsletterForm />
      </section>
    </main>
  );
}

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <p className="newsletter-success" role="status">You’re on the list. Talk soon.</p>
  ) : (
    <form
      className="newsletter-form"
      onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}
    >
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" placeholder="Your email address" required />
      <button type="submit" aria-label="Subscribe"><ArrowRight size={17} /></button>
    </form>
  );
}
