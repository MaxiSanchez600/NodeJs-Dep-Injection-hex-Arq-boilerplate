import newAppRouter from "../routers/router";
import * as Controller from "../controller/controller";
import * as Service from "../service/service";
import * as Adapter from "../adapter/adapter";
import * as http from "http";

export default function newRouterContainer(): http.Server {
  // Creating the Adapter with the BD Injected
  var newAdapter = Adapter;

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
