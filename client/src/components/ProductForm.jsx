import { useState, useEffect } from 'react';

const CATEGORIES = ['Electronics', 'Wearables', 'Accessories', 'Furniture', 'Smart Home', 'Clothing', 'Books', 'Sports', 'Other'];

/* ---- SVG Icons ---- */
const TagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const RupeeIcon = () => (
  <span style={{ fontWeight: 700, fontSize: '1.05rem', fontStyle: 'normal', lineHeight: 1 }}>₹</span>
);

const BoxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const AlignIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="10" x2="3" y2="10"/>
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="21" y1="14" x2="3" y2="14"/>
    <line x1="21" y1="18" x2="3" y2="18"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

/* ---- Component ---- */
const ProductForm = ({ initialData = {}, onSubmit, loading, submitLabel = 'Save Product' }) => {
  const [form, setForm] = useState({
    name:        initialData.name        || '',
    description: initialData.description || '',
    price:       initialData.price       || '',
    category:    initialData.category    || 'Electronics',
    stock:       initialData.stock ?? '',
  });
  const [imagePreview, setImagePreview] = useState(initialData.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      // Cleanup object URL to avoid memory leaks
      if (imageFile && imagePreview && !imagePreview.startsWith('http')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imageFile, imagePreview]);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) e.price = 'Price must be a non-negative number';
    if (!form.category) e.category = 'Category is required';
    if (form.stock === '' || isNaN(form.stock) || Number(form.stock) < 0) e.stock = 'Stock must be a non-negative number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', parseFloat(form.price));
    formData.append('category', form.category);
    formData.append('stock', parseInt(form.stock));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-4">

        {/* Product Name */}
        <div className="col-12">
          <label className="form-label"><TagIcon /> Product Name</label>
          <div className="input-icon-wrapper">
            <span className="input-icon"><TagIcon /></span>
            <input
              id="field-name"
              type="text"
              name="name"
              className={`form-control has-icon ${errors.name ? 'is-invalid' : ''}`}
              placeholder="e.g. Wireless Noise-Cancelling Headphones"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <div className="field-error"><AlertIcon /> {errors.name}</div>}
        </div>

        {/* Price + Stock */}
        <div className="col-12 col-md-6">
          <label className="form-label"><RupeeIcon /> Price (₹)</label>
          <div className="input-icon-wrapper">
            <span className="input-icon"><RupeeIcon /></span>
            <input
              id="field-price"
              type="number"
              name="price"
              className={`form-control has-icon ${errors.price ? 'is-invalid' : ''}`}
              placeholder="0.00"
              value={form.price}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>
          {errors.price && <div className="field-error"><AlertIcon /> {errors.price}</div>}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label"><BoxIcon /> Stock Quantity</label>
          <div className="input-icon-wrapper">
            <span className="input-icon"><BoxIcon /></span>
            <input
              id="field-stock"
              type="number"
              name="stock"
              className={`form-control has-icon ${errors.stock ? 'is-invalid' : ''}`}
              placeholder="0"
              value={form.stock}
              onChange={handleChange}
              min="0"
            />
          </div>
          {errors.stock && <div className="field-error"><AlertIcon /> {errors.stock}</div>}
        </div>

        {/* Category */}
        <div className="col-12 col-md-6">
          <label className="form-label"><GridIcon /> Category</label>
          <div className="input-icon-wrapper">
            <span className="input-icon"><GridIcon /></span>
            <select
              id="field-category"
              name="category"
              className={`form-select has-icon ${errors.category ? 'is-invalid' : ''}`}
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {errors.category && <div className="field-error"><AlertIcon /> {errors.category}</div>}
        </div>

        {/* Image Upload */}
        <div className="col-12 col-md-6">
          <label className="form-label"><ImageIcon /> Product Image</label>
          <div className="input-icon-wrapper">
            <span className="input-icon"><ImageIcon /></span>
            <input
              id="field-image"
              type="file"
              name="image"
              accept="image/*"
              className="form-control has-icon"
              onChange={handleFileChange}
              style={{ padding: '0.45rem 1rem 0.45rem 2.5rem' }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-12">
          <label className="form-label"><AlignIcon /> Description</label>
          <div className="input-icon-wrapper">
            <span className="textarea-icon"><AlignIcon /></span>
            <textarea
              id="field-description"
              name="description"
              className="form-control has-icon"
              style={{ paddingLeft: '2.5rem' }}
              rows={4}
              placeholder="Describe the product in detail..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="col-12">
            <div className="image-preview-wrapper">
              <span className="image-preview-label">Preview</span>
              <img
                src={imagePreview}
                alt="Preview"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="col-12">
          <button
            id="form-submit-btn"
            type="submit"
            className="btn btn-accent px-5 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" style={{ width: '15px', height: '15px' }} role="status" />
                Saving…
              </>
            ) : (
              <><SaveIcon /> {submitLabel}</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
