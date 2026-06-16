import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import ProductForm from '../components/ProductForm.jsx';

const ArrowLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const AddProduct = () => {
  const { createProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createProduct(data);
      navigate('/products');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <Link to="/products" className="back-btn">
        <ArrowLeftIcon /> Back to Products
      </Link>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="form-card">
            <div className="mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="d-flex align-items-center gap-3 mb-1">
                <div className="page-title-icon">
                  <PlusCircleIcon />
                </div>
                <div>
                  <h1 className="page-title mb-0" style={{ fontSize: '1.5rem' }}>Add New Product</h1>
                  <p className="page-subtitle">Fill in the details below to add a product to your catalog</p>
                </div>
              </div>
            </div>
            <ProductForm
              onSubmit={handleSubmit}
              loading={loading}
              submitLabel="Create Product"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
