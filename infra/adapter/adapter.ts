import { serviceCommonResponse } from "../types/response";
//const { Sequelize } = require("sequelize");
require("dotenv").config();
import { Sequelize } from "sequelize-typescript";

// let feedersAdapter: AdapterInterface;

// const setAdapter = (adapter: AdapterInterface) => {
//   feedersAdapter = adapter;
// };

let databaseClient: Sequelize;
// const connectDatabase = () => {
//   console.log("DB_USER ", process.env.DB_USER);
//   console.log("DB_PASS ", process.env.DB_PASS);
//   console.log("DB_HOST ", process.env.DB_HOST);
//   console.log("DB_NAME ", process.env.DB_NAME);
//   const sequelize = new Sequelize(
//     `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
//     {
//       logging: false, // set to console.log to see the raw SQL queries
//       native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     }
//   );
//   console.log("SEQUELIZE CLIENT: ", databaseClient);
//   databaseClient = sequelize;
// };

function getFeeders(): serviceCommonResponse {
  let response: serviceCommonResponse = {
    data: {
      adapter: "Llegue al adapter!",
    },
    status: 200,
    error: null,
  };
  return response;
}
export { getFeeders };
