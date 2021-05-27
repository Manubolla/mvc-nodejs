const express = require("express")
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

require('./index.js')

//Middleware
server.use(morgan('dev'));

//Averiguar esto
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

//routes
server.use("/", require("../routes"));

module.exports = server;