import ControllerInterface from "../controller/controller.interface";
import * as http from "http";
import { errorHandler } from "../middlewares/errorHandler";

const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

var corsOptions = [
  {
    origin: "http://porellosbackend.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
];

export default function newAppRouter(
  Controller: ControllerInterface
): http.Server {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(function (req, res, next) {
    next();
  });
  app.get("/api/beta/v1/feeders", Controller.getFeeders);
  app.get("/api/beta/v1/feederbyid", Controller.isFeeder);
  app.post("/api/beta/v1/update/feeder", Controller.updateFeederInformation);
  app.post("/api/beta/v1/update/report", Controller.updateFeederReport);
  app.use(errorHandler);
  return app;
}
