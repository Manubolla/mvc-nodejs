const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
	sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "PLACEHOLDER URL"
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        }
    });
};

