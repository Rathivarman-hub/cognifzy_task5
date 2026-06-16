import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import { useState } from 'react';

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product.id);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  const stockLevel = product.stock > 20 ? 'success' : product.stock > 5 ? 'warning' : 'danger';
  const stockText = product.stock > 20 ? `${product.stock} in stock` : product.stock > 5 ? `${product.stock} left` : `${product.stock} left!`;

  return (
    <>
      <div className="product-card">
        {/* Image */}
        <div className="product-card-img-wrapper">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop'}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop';
            }}
          />
          <div className="product-card-img-overlay">
            <span className="quick-view-badge">Quick View</span>
          </div>
        </div>

        {/* Body */}
        <div className="product-card-body">
          <div className="product-card-meta">
            <span className="category-badge">{product.category}</span>
            <span className={`stock-dot ${stockLevel}`}>{stockText}</span>
          </div>
          <h6 className="product-card-title">{product.name}</h6>
          <p className="product-card-desc">{product.description}</p>
        </div>

        {/* Footer */}
        <div className="product-card-footer">
          <span className="price-tag">₹{product.price.toFixed(2)}</span>
          <div className="d-flex gap-2 align-items-center">
            <Link
              to={`/products/${product.id}`}
              className="btn btn-sm btn-outline-accent"
              style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
            >
              <EyeIcon /> View
            </Link>
            <Link
              to={`/products/edit/${product.id}`}
              className="btn btn-sm btn-accent"
              style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
            >
              <EditIcon /> Edit
            </Link>
            <button
              className="btn-icon danger"
              onClick={() => setShowModal(true)}
              title="Delete product"
              aria-label="Delete product"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          tabIndex="-1"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span style={{ color: 'var(--danger)' }}><WarningIcon /></span>
                  Confirm Delete
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Are you sure you want to permanently delete{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>"{product.name}"</strong>?
                  This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-accent"
                  onClick={() => setShowModal(false)}
                  style={{ fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, var(--danger), #fb7185)',
                    color: 'white',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '0.55rem 1.25rem',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" style={{ width: '14px', height: '14px' }} />
                      Deleting…
                    </>
                  ) : (
                    <><TrashIcon /> Delete</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
