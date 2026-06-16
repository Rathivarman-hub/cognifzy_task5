import { Link } from 'react-router-dom';

const BagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" color="white">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand column */}
          <div className="col-12 col-md-4">
            <Link to="/" className="footer-brand">
              <div className="brand-icon" style={{ width: 32, height: 32 }}>
                <BagIcon />
              </div>
              <span className="footer-brand-text">Shop<span>Nest</span></span>
            </Link>
            <p className="footer-tagline">
              A modern full-stack product management dashboard built with MERN. Fast, responsive, and beautifully designed.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-6 col-md-2 offset-md-2">
            <div className="footer-heading">Navigation</div>
            <ul className="footer-links">
              <li><Link to="/"><ArrowIcon /> Home</Link></li>
              <li><Link to="/products"><ArrowIcon /> Products</Link></li>
              <li><Link to="/products/add"><ArrowIcon /> Add Product</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="col-6 col-md-2">
            <div className="footer-heading">Tech Stack</div>
            <ul className="footer-links">
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer"><ArrowIcon /> React 19</a></li>
              <li><a href="https://expressjs.com" target="_blank" rel="noopener noreferrer"><ArrowIcon /> Express.js</a></li>
              <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer"><ArrowIcon /> Vite</a></li>
            </ul>
          </div>

          {/* API */}
          <div className="col-6 col-md-2">
            <div className="footer-heading">API</div>
            <ul className="footer-links">
              <li><span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>GET /api/products</span></li>
              <li><span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>POST /api/products</span></li>
              <li><span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>PUT /api/products/:id</span></li>
              <li><span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>DELETE /api/products/:id</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} ShopNest. Built with React &amp; Node.js · MERN Stack
          </p>
          <div className="footer-status">
            <span className="status-dot" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
