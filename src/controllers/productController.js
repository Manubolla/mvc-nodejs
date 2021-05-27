const { sequelize } = require("../config");
const { Product } = sequelize.models;

const ProductControllerMethods = {
  GetAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({success: true, msg: "", result: products});
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  GetAllActiveProducts: async (req, res) => {
    try {
      const products = await Product.findAll({where: {status: "active"}});
      res.status(200).json({success: true, msg: "", result: products});
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  GetAllInactiveProducts: async (req, res) => {
    try {
      const products = await Product.findAll({where: {status: "inactive"}});
      res.status(200).json({success: true, msg: "", result: products});
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  CreateNewProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json({success: true, msg: "The product was created", result: product});
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  UpdateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const [wasUpdated, updatedProduct] = await Product.update(req.body, {
        where: { id, status: "active" },
        returning: true,
      });
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

      res.json({success: true, msg: "", result: product});
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
