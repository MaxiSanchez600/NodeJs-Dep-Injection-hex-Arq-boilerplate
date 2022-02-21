import { Sequelize } from "sequelize-typescript";
import * as Models from "./models";
require("dotenv").config();

let databaseClient: Sequelize;
function getDatabase(): Sequelize {
  return databaseClient;
}
function connectDatabase() {
  console.log("DB_USER ", process.env.DB_USER);
  console.log("DB_PASS ", process.env.DB_PASS);
  console.log("DB_HOST ", process.env.DB_HOST);
  console.log("DB_NAME ", process.env.DB_NAME);
  console.log("DATABASE_URL", process.env.DATABASE_URL);

  // Creating the DB Address
  const dbaddress = process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

  const sequelize = new Sequelize(dbaddress, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  });
  // Loading the models to the DB
  Models.default(sequelize);

  // Setting the relations between models
  const { Feeders, FeederReport } = sequelize.models;

  // Feeders and reports One to One
  FeederReport.hasOne(Feeders);
  Feeders.belongsTo(FeederReport);

  databaseClient = sequelize;
  databaseClient.sync({ force: false });
}

export { getDatabase, connectDatabase };
