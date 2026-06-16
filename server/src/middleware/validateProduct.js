export const validateProduct = (req, res, next) => {
  const { name, price, category, stock } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (price === undefined || isNaN(price) || Number(price) < 0) {
    errors.push('Price must be a non-negative number');
  }
  if (!category || category.trim().length < 2) {
    errors.push('Category is required');
  }
  if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
    errors.push('Stock must be a non-negative integer');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  // Sanitize
  req.body.name = name.trim();
  req.body.price = parseFloat(price);
  req.body.category = category.trim();
  req.body.stock = parseInt(stock);
  if (req.body.description) req.body.description = req.body.description.trim();

  next();
};
