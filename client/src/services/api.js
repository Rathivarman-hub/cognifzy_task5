import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getProducts = (params) => axiosInstance.get('/products', { params });
export const getProductById = (id) => axiosInstance.get(`/products/${id}`);
export const createProduct = (data) => axiosInstance.post('/products', data, {
  headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
});
export const updateProduct = (id, data) => axiosInstance.put(`/products/${id}`, data, {
  headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
});
export const deleteProduct = (id) => axiosInstance.delete(`/products/${id}`);
