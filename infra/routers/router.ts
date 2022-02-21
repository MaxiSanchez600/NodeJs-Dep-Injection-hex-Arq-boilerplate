import ControllerInterface from "../controller/controller.interface";
import * as http from "http";
import { errorHandler } from "../middlewares/errorHandler";

const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

export default function newAppRouter(
  Controller: ControllerInterface
): http.Server {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.setHeader("Acces-Control-Allow-Origin", "*");
    res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader(
      "Acces-Contorl-Allow-Methods",
      "Content-Type",
      "Authorization"
    );
    next();
  });
  app.get("/api/beta/v1/feeders", Controller.getFeeders);
  app.get("/api/beta/v1/feederbyid", Controller.isFeeder);
  app.post("/api/beta/v1/update/feeder", Controller.updateFeederInformation);
  app.post("/api/beta/v1/update/report", Controller.updateFeederReport);
  app.use(errorHandler);
  return app;
}
