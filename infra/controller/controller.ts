import { Errors } from "../../data/enums/errors";
import ServiceInterface from "../service/service.interface";
import { serviceCommonResponse } from "../../data/types/response";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";
import FeedersReport from "../../data/interfaces/models/feedersReport";
import {
  isCreateFeeder,
  isUpdateEmail,
  isUpdateFeedersInformation,
  isUpdateReport,
} from "../helpers/interfaceCheckers";
import { UpdateEmailBody } from "../../data/interfaces/requests/updateEmail";

let serviceController: ServiceInterface;

const setService = (service: ServiceInterface) => {
  serviceController = service;
};

async function isFeeder(req, res, next) {
  let serviceResponse: serviceCommonResponse;
  let { id } = req.query;

  // Checking for Service dependency
  if (serviceController === null) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: "Service dependency missing, try again later.",
    });
    return;
  }

  // Checking for correct req params
  if (!id) {
    next({
      err: Errors.MISSING_PARAM,
      dataErr: "Param ID is missing in the request",
    });
    return;
  }

  serviceResponse = await serviceController.isFeeder(next, id);

  // Checking for Response
  serviceResponse && res.status(serviceResponse.status).send(serviceResponse);
}

async function getFeeders(req, res, next) {
  let serviceResponse: serviceCommonResponse;

  // Checking for Service dependency
  if (serviceController === null) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: "Service dependency missing, try again later.",
    });
    return;
  }

  serviceResponse = await serviceController.getFeeders(next);

  // Checking for Response
  serviceResponse && res.status(serviceResponse.status).send(serviceResponse);
}

async function updateFeederInformation(req, res, next) {
  let serviceResponse: serviceCommonResponse;
  let bodyRequest: UpdateFeedersInformation;

  bodyRequest = req.body.data;

  // Checking for Service dependency
  if (serviceController === null) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: "Service dependency missing, try again later.",
    });
    return;
  }

  // Checking for correct req body
  if (!isUpdateFeedersInformation(bodyRequest)) {
    next({
      err: Errors.BODY_ERROR,
      dataErr: "Body is missing or bad formatted in the request",
    });
    return;
  }

  serviceResponse = await serviceController.updateFeederInformation(
    next,
    bodyRequest
  );

  // Checking for Response
  serviceResponse && res.status(serviceResponse.status).send(serviceResponse);
}

async function updateFeederReport(req, res, next) {
  let serviceResponse: serviceCommonResponse;
  let bodyRequest: FeedersReport;

  bodyRequest = req.body.data;

  // Checking for Service dependency
  if (serviceController === null) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: "Service dependency missing, try again later.",
    });
    return;
  }

  // Checking for correct req body
  if (!isUpdateReport(bodyRequest)) {
    next({
      err: Errors.BODY_ERROR,
      dataErr: "Body is missing or bad formatted in the request",
    });
    return;
  }

  serviceResponse = await serviceController.updateFeederReport(
    next,
    bodyRequest
  );

  // Checking for Response
  serviceResponse && res.status(serviceResponse.status).send(serviceResponse);
}

async function createFeeder(req, res, next) {
  let serviceResponse: serviceCommonResponse;
  let bodyRequest: string;

  bodyRequest = req.body.data;

  // Checking for Service dependency
  if (serviceController === null) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: "Service dependency missing, try again later.",
    });
    return;
  }

  // Checking for correct req body
  if (!isCreateFeeder(bodyRequest)) {
    next({
      err: Errors.BODY_ERROR,
      dataErr: "Body is missing or bad formatted in the request",
    });
    return;
  }

  serviceResponse = await serviceController.createFeeder(
    next,
    bodyRequest.email
  );

  // Checking for Response
  serviceResponse && res.status(serviceResponse.status).send(serviceResponse);
}
async function updateEmail(req, res, next) {
  let serviceResponse: serviceCommonResponse;
  let bodyRequest: UpdateEmailBody;

  bodyRequest = req.body.data;

  // Checking for Service dependency
  if (serviceController === null) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: "Service dependency missing, try again later.",
    });
    return;
  }

  // Checking for correct req body
  if (!isUpdateEmail(bodyRequest)) {
    next({
      err: Errors.BODY_ERROR,
      dataErr: "Body is missing or bad formatted in the request",
    });
    return;
  }

  serviceResponse = await serviceController.updateEmail(next, bodyRequest);

  // Checking for Response
  serviceResponse && res.status(serviceResponse.status).send(serviceResponse);
}

export {
  getFeeders,
  setService,
  isFeeder,
  updateFeederInformation,
  updateFeederReport,
  updateEmail,
  createFeeder,
};
