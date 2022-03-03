// @ts-nocheck

import { serviceCommonResponse } from "../../data/types/response";
import {
  Feeders,
  FeedersWithReport,
} from "../../data/interfaces/models/feeders";
require("dotenv").config();
import { Sequelize, Model } from "sequelize-typescript";
import { Errors } from "../../data/enums/errors";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";
import FeedersReport from "../../data/interfaces/models/feedersReport";

let databaseClient: Sequelize;

const setDatabase = (db: Sequelize) => {
  databaseClient = db;
};

const isFeeder = async (id: string): Promise<FeedersWithReport> => {
  const { Feeders, FeederReport } = databaseClient.models;
  const response = await Feeders.findOne({
    where: { qrId: id },
    include: [
      {
        model: FeederReport,
        required: true,
      },
    ],
  });
  return response;
};

const getFeeders = async (): Promise<FeedersWithReport[]> => {
  const { Feeders, FeederReport } = databaseClient.models;
  const response = await Feeders.findAll({
    where: { isOn: true },
    include: [
      {
        model: FeederReport,
        required: true,
      },
    ],
  });
  return response;
};

const updateFeederInformation = async (
  info: UpdateFeedersInformation
): Promise<FeedersWithReport> => {
  // Update informacion del Feeder

  console.log("Pedido para agregar un nuevo bebedero con ID: ", info.qrId);
  console.log(
    "Nueva Desc: ",
    info.description,
    "Nueva Location",
    info.location,
    "Nueva Imagen: ",
    info.FeederReport.img
  );
  const { Feeders, FeederReport } = databaseClient.models;
  const feeder = await Feeders.findOne({
    where: { qrId: info.qrId },
    include: [
      {
        model: FeederReport,
        required: true,
      },
    ],
  });
  if (feeder) {
    feeder.location = info.location;
    feeder.latitude = info.latitude;
    feeder.longitude = info.longitude;
    feeder.isOn = true;
    feeder.description = info.description;
    await feeder.save();
  }

  // Actualizando el estado
  const feederReport = await FeederReport.findOne({
    where: { id: info.FeederReportId },
  });
  if (feederReport) {
    feederReport.img = info.FeederReport.img;
    feederReport.description = info.FeederReport.description;
    await feederReport.save();
  }

  return feederReport;
};

const updateFeederReport = async (
  info: FeedersReport
): Promise<FeedersReport> => {
  // Update informacion del Report

  //Logging
  console.log("Pedido para actualizar el estado del comedero: ", info.id);
  const { FeederReport } = databaseClient.models;
  const response = await FeederReport.findOne({ where: { id: info.id } });
  if (response) {
    console.log(
      "Estado anterior: ",
      info.status,
      "Estado reportado: ",
      response.status
    );
    console.log(
      "Descripcion anterior: ",
      info.description,
      "Descripcion nueva: ",
      response.description
    );
    console.log("Foto anterior: ", info.img, "Foto nueva: ", response.img);
    response.description = info.description;
    response.status = info.status;
    await response.save();
  }
  return response;
};
export {
  getFeeders,
  setDatabase,
  isFeeder,
  updateFeederInformation,
  updateFeederReport,
};
