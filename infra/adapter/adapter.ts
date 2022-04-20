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
import { UpdateEmailBody } from "../../data/interfaces/requests/updateEmail";
import { getMessage, getStatus } from "../helpers/createEmail";
const nodemailer = require("nodemailer");

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
  console.log("Se scaneo el QR: ", id, " Ubicado en ", response.location);
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
      response.status,
      "Estado reportado: ",
      info.status
    );
    console.log(
      "Descripcion anterior: ",
      response.description,
      "Descripcion nueva: ",
      info.description
    );
    response.description = info.description;
    response.status = info.status;
    await response.save();
  }

  // Send Emails for Feeder update
  // Should be using Repos (Repo for Feeder, Repo for Emails, and call all of them from Service) and not Adapter Metodology
  // NodeMailer should be injected

  sendEmails(info.id, response);

  return response;
};

const updateEmail = async (info: UpdateEmailBody): Promise<any> => {
  // Update informacion del Email

  //Logging
  console.log(
    "Pedido para agregar ids al email: ",
    info.email,
    ", el siguiente listado de IDS: ",
    info.ids
  );
  const { EmailFeeder, Email } = databaseClient.models;

  const [email, created] = await Email.findOrCreate({
    where: { email: info.email },
    raw: true,
  });

  if (email) {
    await info.ids.map(async (id) => {
      await EmailFeeder.findOrCreate({
        where: { FeederId: id, EmailId: email.id },
      });
    });
    console.log("IDS Agregados con exito");
  }

  return email;
};

const sendEmails = async (id: string, report: any) => {
  const { Email, Feeders } = databaseClient.models;

  const Feeder = await Feeders.findOne({
    where: { FeederReportId: id },
    raw: true,
  });

  const message = `¡Hola! Te enviamos el nuevo estado de este comedero, ya que te suscribiste a sus actualizaciones.\nUbicacion: ${
    Feeder.location
  }\nDescription: ${Feeder.description}\nEstado actual: ${getStatus(
    report.status
  )}\n\n¡Si esta vacio, o tiene algun problema, podes acercarte a solucionarlo o rellenarlo, pero no te olvides de actualizar el estado!\n\nGracias,\nPor Ellos`;

  const emailFeedersData = await Email.findAll({
    include: [
      {
        model: Feeders,
        required: true,
        where: { id: Feeder.id },
        through: { attributes: [] },
      },
    ],
    raw: true,
  });

  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: password,
    },
  });

  emailFeedersData.map((emailFeederData) => {
    const mailOptions = {
      from: "porelloscomederos@gmail.com",
      to: emailFeederData.email,
      subject: `El comedero ubicado en: ${Feeder.location}${
        " " + getMessage(report.status)
      }`,
      text: message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error enviando email: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};
export {
  getFeeders,
  setDatabase,
  isFeeder,
  updateFeederInformation,
  updateFeederReport,
  updateEmail,
};
