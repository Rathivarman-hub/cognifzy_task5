import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';

/* ---- Icons ---- */
const ArrowLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, product, loading, error, deleteProduct } = useProducts();

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Delete "${product?.name}"? This cannot be undone.`)) {
      await deleteProduct(id);
      navigate('/products');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="skeleton" style={{ height: '36px', width: '140px', marginBottom: '1.5rem', borderRadius: '10px' }} />
        <div className="skeleton" style={{ height: '460px', borderRadius: '20px' }} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <div className="empty-state-icon"><AlertIcon /></div>
          <h5>Product Not Found</h5>
          <p>This product may have been deleted or doesn't exist.</p>
          <Link to="/products" className="btn btn-accent">
            <ArrowLeftIcon /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stockLevel = product.stock > 20 ? 'success' : product.stock > 5 ? 'warning' : 'danger';
  const stockText  = product.stock > 20 ? `${product.stock} in stock` : product.stock > 5 ? `${product.stock} remaining` : `Only ${product.stock} left!`;
  const added = new Date(product.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="container py-4">

      {/* Back */}
      <Link to="/products" className="back-btn">
        <ArrowLeftIcon /> Back to Products
      </Link>

      <div className="detail-card">
        <div className="row g-0">

          {/* Image */}
          <div className="col-lg-5">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=400&fit=crop'}
              alt={product.name}
              className="detail-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=400&fit=crop';
              }}
            />
          </div>

          {/* Content */}
          <div className="col-lg-7">
            <div className="detail-body">

              {/* Badges */}
              <div className="detail-meta">
                <span className="category-badge">{product.category}</span>
                <span className={`stock-dot ${stockLevel}`}>{stockText}</span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                margin: '0.85rem 0 0.75rem',
                letterSpacing: '-0.5px',
              }}>
                {product.name}
              </h1>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.925rem' }}>
                {product.description || 'No description provided.'}
              </p>

              <div className="divider" />

              {/* Price & date */}
              <div className="detail-price">₹{product.price.toFixed(2)}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarIcon /> Added on {added}
              </p>

              {/* Info grid */}
              <div className="detail-info-grid">
                <div className="detail-info-card">
                  <div className="detail-info-value">{product.stock}</div>
                  <div className="detail-info-label">Units Available</div>
                </div>
                <div className="detail-info-card">
                  <div className="detail-info-value">₹{(product.price * product.stock).toFixed(0)}</div>
                  <div className="detail-info-label">Total Value</div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex gap-3 flex-wrap mt-1">
                <Link to={`/products/edit/${product.id}`} className="btn btn-accent px-4">
                  <EditIcon /> Edit Product
                </Link>
                <button
                  className="btn"
                  style={{
                    border: '1.5px solid var(--danger)',
                    color: 'var(--danger)',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '0.55rem 1.25rem',
                    background: 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--danger-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                  onClick={handleDelete}
                >
                  <TrashIcon /> Delete Product
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
