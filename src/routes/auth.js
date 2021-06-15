const { Router } = require("express");
const AuthController = require("../controllers/AuthController.js");
const passport = require("../middlewares/passport.js");
const server = Router();

server.post("/signin", AuthController.SignIn);
server.post("/signup", AuthController.SignUp);

module.exports = server;
