import newRouterContainer from "./router.container";
import * as http from "http";

export default function newAppContainer(): http.Server {
  let appRouter = newRouterContainer();
  return appRouter;
}
