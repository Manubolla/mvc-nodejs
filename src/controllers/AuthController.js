const { sequelize } = require("../config");
const { User } = sequelize.models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const AuthControllerMethods = {
  SignIn: async (req, res, next) => {
    try {
      passport.authenticate("local", { session: false }, function (err, user) {
        if (err) return next(err);
        else if (!user)
          return res
            .status(401)
            .json({ success: false, msg: "Unauthorized", result: [] });
        else
          return res.json({
            success: true,
            message: "Login succesfully",
            result: {
              user: {
                id: user.id,
                email: user.email,
              },
              token: jwt.sign({ user }, "secret", { expiresIn: "7d" }),
            },
          });
      })(req, res, next);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
  SignUp: async (req, res) => {
    try {
      const { email, password } = req.body;

      const encryptedPassword = bcrypt.hashSync(password, 10);

      const result = await User.create({
        email,
        password: encryptedPassword,
      });

      let token = jwt.sign({ user: result }, "secret", { expiresIn: "7d" });

      res.json({
        success: true,
        msg: "The user has been created",
        result: { user: result, token },
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
module.exports = { ...AuthControllerMethods };
