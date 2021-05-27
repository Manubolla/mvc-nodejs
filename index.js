const { sequelize } = require("./src/config");
const server = require("./src/config/app.js");
const PORT = process.env.PORT || 5000;

const dataBaseConnection = async () => {
  console.log(`Checking database connection`);
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established![OK]");
    await syncModels();
  } catch (error) {
    console.log(`Unable to connect to the database! [ERROR]`);
    console.log(error.message);
    process.exit(1);
  }
};
const syncModels = async () => {
  try {
    console.log(`Synchronizing models...`);
    await sequelize.sync({ force: false });
    console.log("Models synchronized [OK]");
  } catch (error) {
    console.log(`Unable to synchronize models [ERROR]`);
    console.log(error.message);
    process.exit(1);
  }
};
const initConnection = async () => {
  await dataBaseConnection();
  console.log(`Starting server...`);
  server.listen(PORT, () =>
    console.log(`Server started on port ${PORT}! [OK]`)
  );
};

initConnection();
