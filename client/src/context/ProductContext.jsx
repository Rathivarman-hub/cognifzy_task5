import { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../services/api.js';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [categories, setCategories] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProducts(params);
      setProducts(res.data.data);
      setPagination(res.data.pagination);
      setCategories(['All', ...res.data.categories]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProductById(id);
      setProduct(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (data) => {
    const res = await api.createProduct(data);
    addToast('Product created successfully! 🎉', 'success');
    return res.data;
  };

  const updateProduct = async (id, data) => {
    const res = await api.updateProduct(id, data);
    addToast('Product updated successfully! ✅', 'success');
    return res.data;
  };

  const deleteProduct = async (id) => {
    await api.deleteProduct(id);
    addToast('Product deleted successfully! 🗑️', 'danger');
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        loading,
        error,
        pagination,
        categories,
        toasts,
        removeToast,
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        addToast,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
