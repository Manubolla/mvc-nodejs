const {Router} = require('express');
const CategoryController = require('../controllers/CategoryController.js')

const server = Router();

server.get('/', CategoryController.GetAllCategories);
server.get('/active', CategoryController.GetAllActiveCategories);
server.get('/inactive', CategoryController.GetAllInactiveCategories);
server.post('/', CategoryController.CreateNewCategory);
server.put('/:id', CategoryController.UpdateCategory);
server.get('/:id', CategoryController.GetCategoryById);
server.put('/delete/:id', CategoryController.DeleteCategory);
server.put('/restore/:id', CategoryController.RestoreCategory);

module.exports = server;