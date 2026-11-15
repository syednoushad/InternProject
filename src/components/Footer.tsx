import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <Link to="/" className="wordmark footer-wordmark">
            morrow<span>goods</span>
          </Link>
          <p>Thoughtful things for the everyday.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-heading">Explore</span>
            <Link to="/#shop">Shop all</Link>
            <Link to="/?category=Living#shop">Living</Link>
            <Link to="/?category=Dining#shop">Dining</Link>
          </div>
          <div>
            <span className="footer-heading">A little more</span>
            <a href="mailto:hello@morrowgoods.example">Get in touch</a>
            <a href="#newsletter">Our notes</a>
            <a href="#shipping">Shipping & returns</a>
          </div>
        </div>
        <a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          Follow along <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Morrow Goods</span>
        <span>Made for slower living, wherever you are.</span>
        <span>Privacy&nbsp;&nbsp;&nbsp; Terms</span>
      </div>
    </footer>
  );
}
