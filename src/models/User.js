const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt');

module.exports =  (sequelize) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "You must use a valid mail."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    });
    User.prototype.compare = function(passUser) {
        return bcrypt.compareSync(passUser, this.password)
      }
    return User;
}