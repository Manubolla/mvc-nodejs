const {Router} = require('express');
const ProductController = require('../controllers/productController.js')

const server = Router();

server.get('/', ProductController.GetAllProducts);
server.get('/active', ProductController.GetAllActiveProducts);
server.get('/inactive', ProductController.GetAllInactiveProducts);
server.post('/', ProductController.CreateNewProduct);
server.put('/:id', ProductController.UpdateProduct);
server.get('/:id', ProductController.GetProductById);
server.put('/delete/:id', ProductController.DeleteProduct);
server.put('/restore/:id', ProductController.RestoreProduct);

module.exports = server;