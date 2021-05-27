const {Router} = require('express');
const router = Router();
const productRouter = require('./product.js');

//Routes
router.use('/products', productRouter);

module.exports = router;