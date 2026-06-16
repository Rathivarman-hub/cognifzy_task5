import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import ProductForm from '../components/ProductForm.jsx';

const ArrowLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const EditCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, product, loading: fetching, updateProduct } = useProducts();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await updateProduct(id, data);
      navigate(`/products/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="container py-5">
        <div className="skeleton" style={{ height: '36px', width: '140px', marginBottom: '1.5rem', borderRadius: '10px' }} />
        <div className="skeleton" style={{ height: '520px', borderRadius: '20px' }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <div className="empty-state-icon"><AlertIcon /></div>
          <h5>Product Not Found</h5>
          <p>This product may have been deleted or doesn't exist.</p>
          <Link to="/products" className="btn btn-accent mt-2">
            <ArrowLeftIcon /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to={`/products/${id}`} className="back-btn">
        <ArrowLeftIcon /> Back to Product
      </Link>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="form-card">
            <div className="mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="d-flex align-items-center gap-3 mb-1">
                <div className="page-title-icon">
                  <EditCircleIcon />
                </div>
                <div>
                  <h1 className="page-title mb-0" style={{ fontSize: '1.5rem' }}>Edit Product</h1>
                  <p className="page-subtitle">
                    Updating:{' '}
                    <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>
                      {product.name}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <ProductForm
              initialData={product}
              onSubmit={handleSubmit}
              loading={saving}
              submitLabel="Update Product"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
