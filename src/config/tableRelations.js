const applyTableRelations = (sequelize) => {
    const {Product, Category} = sequelize.models
    Product.belongsToMany(Category, { through: "ProductCategory" });
    Category.belongsToMany(Product, { through: "ProductCategory" });
}

module.exports = {applyTableRelations};