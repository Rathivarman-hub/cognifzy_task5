import * as ProductModel from '../models/productModel.js';

// @desc  Get all products
// @route GET /api/products
export const getAllProducts = (req, res) => {
  try {
    let products = ProductModel.findAll();

    // Search
    if (req.query.search) {
      const query = req.query.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (req.query.category && req.query.category !== 'All') {
      products = products.filter((p) => p.category === req.query.category);
    }

    // Sort
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'name_asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'date_desc':
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'date_asc':
          products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default:
          break;
      }
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      categories: ProductModel.getCategories(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single product
// @route GET /api/products/:id
export const getProductById = (req, res) => {
  try {
    const product = ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create product
// @route POST /api/products
export const createProduct = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }
    const product = ProductModel.create(req.body);
    res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update product
// @route PUT /api/products/:id
export const updateProduct = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }
    const product = ProductModel.update(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete product
// @route DELETE /api/products/:id
export const deleteProduct = (req, res) => {
  try {
    const deleted = ProductModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
