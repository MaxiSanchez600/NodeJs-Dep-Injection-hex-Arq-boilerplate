import newAppRouter from "../routers/router";
import * as Controller from "../controller/controller";
import * as Service from "../service/service";
import * as Adapter from "../adapter/adapter";
import * as http from "http";
import { Sequelize } from "sequelize-typescript";

export default function newRouterContainer(
  databaseClient: Sequelize
): http.Server {
  // Creating the Adapter with the BD Injected
  let newAdapter = Adapter;
  newAdapter.setDatabase(databaseClient);

  // Creating the Service with the Adapter Injected
  let newService = Service;
  newService.setAdapter(newAdapter);

  // Creating the Controller with the Service Injected
  let newController = Controller;
  newController.setService(newService);

  // Creating the Router with the Controller Injected
  let appRouter = newAppRouter(newController);
  return appRouter;
}
