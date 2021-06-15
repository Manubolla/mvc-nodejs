const { sequelize } = require("../config");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = sequelize.models;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false);
      if (!user.dataValues) {
        return done(null, false);
      }
      if (!user.compare(password)) {
        return done(null, false);
      }
      return done(null, user.dataValues);
    }
  )
);

module.exports = passport;
