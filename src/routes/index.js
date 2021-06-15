const {Router} = require('express');
const router = Router();
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const authRouter = require('./auth.js')

//Routes
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter)

module.exports = router;