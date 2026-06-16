import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { validateProduct } from '../middleware/validateProduct.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(upload.single('image'), validateProduct, createProduct);
router.route('/:id').get(getProductById).put(upload.single('image'), validateProduct, updateProduct).delete(deleteProduct);

export default router;
