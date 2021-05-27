const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
    }
  });
};
