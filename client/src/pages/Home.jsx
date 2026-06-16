import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import Footer from '../components/Footer.jsx';

/* ---- Icons ---- */
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const BoxIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
const TagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const ApiIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PagesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

/* ---- Stats ---- */
const STATS = [
  { label: 'Total Products', key: 'total', icon: <BoxIcon />, suffix: '' },
  { label: 'Categories',     value: '9',   icon: <TagIcon />, suffix: '+' },
  { label: 'API Endpoints',  value: '5',   icon: <ApiIcon />, suffix: '' },
  { label: 'Uptime',         value: '99.9',icon: <RocketIcon />, suffix: '%' },
];

/* ---- Features ---- */
const FEATURES = [
  { icon: <RefreshIcon />, title: 'Full CRUD Operations',  desc: 'Create, read, update, and delete products with real-time toast feedback and confirmation dialogs.' },
  { icon: <SearchIcon />,  title: 'Search & Filter',       desc: 'Instantly search by name or category, filter by product type, and sort by price, name, or date.' },
  { icon: <PagesIcon />,   title: 'Server-Side Pagination',desc: 'Smooth pagination with 6 items per page and smart page navigation controls.' },
  { icon: <MoonIcon />,    title: 'Dark / Light Mode',     desc: 'Elegant iOS-style theme toggle with localStorage persistence and smooth CSS transitions.' },
  { icon: <PhoneIcon />,   title: 'Fully Responsive',      desc: '1-column on mobile, 2-column on tablet, 3-column on desktop via Bootstrap grid system.' },
  { icon: <LayersIcon />,  title: 'MVC Architecture',      desc: 'Clean server-side structure with controllers, models, routes, and validation middleware.' },
];

/* ---- Tech Stack ---- */
const TECH = ['React 19', 'Vite', 'Bootstrap 5', 'Axios', 'Node.js', 'Express', 'ES Modules', 'Morgan', 'CORS', 'uuid'];

/* ============ Component ============ */
const Home = () => {
  const { fetchProducts, pagination, loading } = useProducts();

  useEffect(() => {
    fetchProducts({ limit: 3 });
  }, []);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="hero-section">
        {/* Animated orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center g-5">

            {/* Left — Copy */}
            <div className="col-lg-6 animate-fade-in-up">
              <div className="hero-eyebrow">
                <RocketIcon />
                Full-Stack MERN Application
              </div>
              <h1 className="hero-title">
                Manage Your<br />
                Products with<br />
                <span className="gradient-text">Confidence</span>
              </h1>
              <p className="hero-subtitle">
                A premium product management dashboard built with React, Node.js, and Express. Beautiful by design, powerful by nature.
              </p>
              <div className="hero-cta-group">
                <Link to="/products" className="btn btn-accent px-4 py-2" style={{ fontSize: '0.95rem' }}>
                  Browse Products <ArrowIcon />
                </Link>
                <Link to="/products/add" className="btn btn-outline-accent px-4 py-2" style={{ fontSize: '0.95rem' }}>
                  <PlusIcon /> Add Product
                </Link>
              </div>
            </div>

            {/* Right — Stats grid */}
            <div className="col-lg-6">
              <div className="row g-3">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="col-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="stat-card">
                      <div className="stat-icon">{stat.icon}</div>
                      <div className="stat-value">
                        {stat.key === 'total'
                          ? (loading ? '…' : pagination.total ?? '0')
                          : stat.value
                        }{stat.suffix}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-5" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-eyebrow">Platform Features</div>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">Built with modern best practices and a focus on developer experience</p>
          </div>
          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="col-12 col-sm-6 col-lg-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h6 className="feature-title">{f.title}</h6>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TECH STACK ==================== */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-eyebrow">Built With</div>
            <h2 className="section-title">Tech Stack</h2>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {TECH.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <Footer />
    </>
  );
};

export default Home;
