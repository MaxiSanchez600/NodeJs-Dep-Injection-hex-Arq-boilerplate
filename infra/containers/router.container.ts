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
  var newAdapter = Adapter;
  newAdapter.setDatabase(databaseClient);

  // Creating the Service with the Adapter Injected
  var newService = Service;
  newService.setAdapter(Adapter);

  // Creating the Controller with the Service Injected
  var newController = Controller;
  newController.setService(newService);

  // Creating the Router with the Controller Injected
  var appRouter = newAppRouter(newController);
  return appRouter;
}
