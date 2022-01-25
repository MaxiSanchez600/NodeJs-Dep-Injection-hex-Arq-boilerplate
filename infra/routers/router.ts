import ControllerInterface from "../controller/controller.interface";
import * as http from "http";

const express = require("express");
var bodyParser = require("body-parser");

const app = express();

export default function newAppRouter(
  Controller: ControllerInterface
): http.Server {
  app.use(bodyParser.json());
  app.get("/api/beta/v1/feeders", Controller.getFeeders);
  return app;
}
