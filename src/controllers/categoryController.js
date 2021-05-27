const { sequelize } = require("../config");
const { Category } = sequelize.models;

const CategoryControllerMethods = {
  GetAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ success: true, msg: "", result: categories });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  GetAllActiveCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        where: { status: "active" },
      });
      res.status(200).json({ success: true, msg: "", result: categories });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  GetAllInactiveCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        where: { status: "inactive" },
      });
      res.status(200).json({ success: true, msg: "", result: categories });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  CreateNewCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res
        .status(200)
        .json({
          success: true,
          msg: "The category was created",
          result: category,
        });
    } catch (error) {}
  },
  UpdateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const [wasUpdated, updatedCategory] = await Category.update(req.body, {
        where: { id, status: "active" },
        returning: true,
      });
      if (wasUpdated)
        res.json({
          success: true,
          msg: "The category was updated",
          result: updatedCategory,
        });
      else
        res.json({
          success: false,
          msg: "The category was not updated",
          result: updatedCategory,
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  GetCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      res.json({ success: true, msg: "", result: category });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  DeleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const [wasDeleted, deletedCategory] = await Category.update(
        { status: "inactive" },
        { where: { id, status: "active" }, returning: true }
      );

      if (wasDeleted)
        res.json({
          success: true,
          msg: "the category was deleted",
          result: deletedCategory,
        });
      else
        res.json({
          success: false,
          msg: "The category was not deleted",
          result: deletedCategory,
        });
    } catch (error) {
      res.stats(400).json({ error });
    }
  },
  RestoreCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const [wasRestored, restoredCategory] = await Category.update(
        { status: "active" },
        { where: { id, status: "inactive" }, returning: true }
      );

      if (wasRestored)
        res.json({
          success: true,
          msg: "the category was restored",
          result: restoredCategory,
        });
      else
        res.json({
          success: false,
          msg: "The category was not restored",
          result: restoredCategory,
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

module.exports = { ...CategoryControllerMethods };
