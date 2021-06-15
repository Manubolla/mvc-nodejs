const { sequelize } = require("../config");
const { Product, Category, ProductCategory } = sequelize.models;
const { Op } = require("sequelize");

const ProductControllerMethods = {
  GetAllProducts: async (req, res) => {
    const { includeRelationship, addInactive } = req.body;
    try {
      const products = await Product.findAll({
        where: addInactive
          ? { [Op.or]: [{ status: "active" }, { status: "inactive" }] }
          : { status: "active" },
        include: includeRelationship ? [{ model: Category }] : null,
      });
      res.status(200).json({ success: true, msg: "", result: products });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  CreateNewProduct: async (req, res) => {
    try {
      const { CategoriesId } = req.body;
      const product = await Product.create(req.body);

      for (categoryID of CategoriesId) {
        let category = await Category.findByPk(categoryID);
        product.addCategory(category);
      }
      res.status(200).json({
        success: true,
        msg: "The product was created",
        result: product,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  UpdateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { CategoriesIds } = req.body;
      const [wasUpdated, updatedProduct] = await Product.update(req.body, {
        where: { id, status: "active" },
        returning: true,
      });
      //Buscar otra manera
      if (CategoriesIds) {
        await ProductCategory.destroy({ where: { ProductId: id } });
        for (CategoryId of CategoriesIds) {
          await ProductCategory.create({
            ProductId: id,
            CategoryId,
          });
        }
      }
      if (wasUpdated)
        res.json({
          success: true,
          msg: "The product was updated",
          result: updatedProduct,
        });
      else
        res.json({
          success: false,
          msg: "The product was not updated",
          result: updatedProduct,
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  GetProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      res.json({ success: true, msg: "", result: product });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  DeleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const [wasDeleted, deletedProduct] = await Product.update(
        { status: "inactive" },
        { where: { id, status: "active" }, returning: true }
      );

      if (wasDeleted)
        res.json({
          success: true,
          msg: "the product was deleted",
          result: deletedProduct,
        });
      else
        res.json({
          success: false,
          msg: "The product was not deleted",
          result: deletedProduct,
        });
    } catch (error) {
      res.stats(400).json({ error });
    }
  },
  RestoreProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const [wasRestored, restoredProduct] = await Product.update(
        { status: "active" },
        { where: { id, status: "inactive" }, returning: true }
      );

      if (wasRestored)
        res.json({
          success: true,
          msg: "the product was restored",
          result: restoredProduct,
        });
      else
        res.json({
          success: false,
          msg: "The product was not restored",
          result: restoredProduct,
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

module.exports = { ...ProductControllerMethods };
