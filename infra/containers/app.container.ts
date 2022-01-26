import newRouterContainer from "./router.container";
import * as http from "http";
import newDatabaseContainer from "./database.container";

export default function newAppContainer(): http.Server {
  let databaseContainer = newDatabaseContainer();
  let appRouter = newRouterContainer(databaseContainer);
  return appRouter;
}
