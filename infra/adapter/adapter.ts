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
  const { Feeders, FeederReport } = databaseClient.models;
  const response = await Feeders.findOne({
    where: { qrId: info.qrId },
    include: [
      {
        model: FeederReport,
        required: true,
      },
    ],
  });
  if (response) {
    response.location = info.location;
    response.latitude = info.latitude;
    response.longitude = info.longitude;
    response.isOn = true;
    response.description = info.description;
    await response.save();
  }
  return response;
};

const updateFeederReport = async (
  info: FeedersReport
): Promise<FeedersReport> => {
  // Update informacion del Report
  const { FeederReport } = databaseClient.models;
  const response = await FeederReport.findOne({ where: { id: info.id } });
  if (response) {
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
