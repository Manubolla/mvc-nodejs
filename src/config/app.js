const express = require("express")
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
/* const middlewares = require("../middlewares/index.js"); */
const passport = require("../middlewares/passport.js");

require('./index.js')

server.use(morgan('dev'));
//Averiguar esto
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(passport.initialize());


//routes
server.use("/", require("../routes"));

module.exports = server;