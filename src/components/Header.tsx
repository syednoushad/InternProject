import { ArrowUpRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const navigate = useNavigate();

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/?q=${encodeURIComponent(query.trim())}#shop`);
    setSearchOpen(false);
  };

  return (
    <>
      <div className="announcement">
        A little more considered. Free shipping on orders over $150.
        <ArrowUpRight size={13} strokeWidth={1.7} />
      </div>
      <header className="site-header">
        <button
          className="icon-button mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          <NavLink to="/#shop" onClick={() => setMenuOpen(false)}>
            Shop all
          </NavLink>
          <NavLink to="/?category=Living#shop" onClick={() => setMenuOpen(false)}>
            Living
          </NavLink>
          <NavLink to="/?category=Dining#shop" onClick={() => setMenuOpen(false)}>
            Dining
          </NavLink>
          <NavLink to="/?category=Textiles#shop" onClick={() => setMenuOpen(false)}>
            Textiles
          </NavLink>
        </nav>
        <Link to="/" className="wordmark" aria-label="Morrow Goods home">
          morrow<span>goods</span>
        </Link>
        <div className="header-actions">
          <button
            className="icon-button search-toggle"
            aria-label="Search products"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={19} strokeWidth={1.6} />
            <span className="header-label">Search</span>
          </button>
          <Link className="icon-button cart-link" to="/cart" aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={19} strokeWidth={1.6} />
            <span className="header-label">Bag</span>
            <span className="cart-count">{count}</span>
          </Link>
        </div>
      </header>
      {searchOpen && (
        <form className="search-panel" onSubmit={submitSearch}>
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search considered things..."
            aria-label="Search products"
          />
          <button type="submit">Search</button>
        </form>
      )}
    </>
  );
}
