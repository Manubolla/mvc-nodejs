const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
	sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 30],
                    msg: "The name must have between 6 and 30 characters"
                }
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "The name must have between 0 and 100 characters"
                }
            }
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

