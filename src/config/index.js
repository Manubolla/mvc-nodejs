const { Sequelize } = require("sequelize");
const { applyTableRelations } = require("./tableRelations");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const {DB_USER, DB_PASSWORD, DB_URL, DB_NAME} = process.env;


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`,
  {
    logging: false,
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];
//Leemos todos los archivos de la carpeta models para luego agregarlos a sequelize automaticamente.
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });
  //Agregamos a sequelize todos los modelos.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
//Agregamos las relaciones
applyTableRelations(sequelize);

module.exports = {sequelize};

