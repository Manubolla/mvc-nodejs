const {Router} = require('express');
const router = Router();
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');

//Routes
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

module.exports = router;