import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Pagination from '../components/Pagination.jsx';
import Loader from '../components/Loader.jsx';

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const BoxEmptyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const Products = () => {
  const { fetchProducts, products, loading, error, pagination, categories } = useProducts();

  const [params, setParams] = useState({
    search: '',
    category: 'All',
    sort: '',
    page: 1,
    limit: 6,
  });

  const loadProducts = useCallback(() => {
    const query = { ...params };
    if (query.category === 'All') delete query.category;
    if (!query.search) delete query.search;
    if (!query.sort) delete query.sort;
    fetchProducts(query);
  }, [params, fetchProducts]);

  useEffect(() => {
    loadProducts();
  }, [params]);

  const handleSearch   = (val) => setParams((p) => ({ ...p, search: val, page: 1 }));
  const handleSort     = (val) => setParams((p) => ({ ...p, sort: val,   page: 1 }));
  const handleCategory = (val) => setParams((p) => ({ ...p, category: val, page: 1 }));
  const handlePage     = (p)   => setParams((prev) => ({ ...prev, page: p }));

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-3">
            <div className="page-title-icon">
              <BoxEmptyIcon />
            </div>
            <div>
              <h1 className="page-title mb-0" style={{ fontSize: '1.6rem' }}>Products</h1>
              <p className="page-subtitle">
                {loading ? 'Loading products…' : `${pagination.total ?? 0} products found`}
              </p>
            </div>
          </div>
        </div>
        <Link to="/products/add" className="btn btn-accent">
          <PlusIcon /> Add Product
        </Link>
      </div>

      {/* Search & Filter */}
      <SearchBar
        onSearch={handleSearch}
        onSort={handleSort}
        onCategory={handleCategory}
        categories={categories.length ? categories : ['All']}
        currentCategory={params.category}
        currentSort={params.sort}
      />

      {/* Error */}
      {error && (
        <div
          className="d-flex align-items-center gap-2 mb-4"
          style={{
            background: 'var(--danger-subtle)',
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            borderRadius: '12px',
            padding: '0.85rem 1.1rem',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          <AlertCircleIcon /> {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <Loader count={6} />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <BoxEmptyIcon />
          </div>
          <h5>No products found</h5>
          <p>Try a different search term or filter, or add your first product.</p>
          <Link to="/products/add" className="btn btn-accent">
            <PlusIcon /> Add First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-4 animate-fade-in-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePage}
          />
          <p className="text-center mt-3" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Showing {products.length} of {pagination.total} products · Page {pagination.page} of {pagination.totalPages}
          </p>
        </>
      )}
    </div>
  );
};

export default Products;
