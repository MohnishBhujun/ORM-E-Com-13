// Importing the Express Router module
const router = require('express').Router();

// Importing route modules for category, products, and tags.
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Importing route handlers for categories, products, and tags endpoints.
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;