import { Sequelize } from "sequelize-typescript";

import * as DatbaseService from "../services/database/database";
export default function newDatabaseContainer(): Sequelize {
  let databaseClient = DatbaseService;
  databaseClient.connectDatabase();
  return databaseClient.getDatabase();
}
