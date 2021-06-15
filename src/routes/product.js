const {Router} = require('express');
const ProductController = require('../controllers/ProductController.js');

const server = Router();

/* Recibe addInactives y includeRelationships en el body. */
server.get('/', ProductController.GetAllProducts);
server.post('/', ProductController.CreateNewProduct);
server.put('/:id', ProductController.UpdateProduct);
server.get('/:id', ProductController.GetProductById);
server.put('/delete/:id', ProductController.DeleteProduct);
server.put('/restore/:id', ProductController.RestoreProduct);

module.exports = server;