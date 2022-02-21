import { Errors } from "../../data/enums/errors";
import ServiceInterface from "../service/service.interface";
import { serviceCommonResponse } from "../../data/types/response";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";
import FeedersReport from "../../data/interfaces/models/feedersReport";
import {
  isUpdateFeedersInformation,
  isUpdateReport,
} from "../helpers/interfaceCheckers";

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

  bodyRequest = req.body;

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

  console.log("LA BODY ES: ", bodyRequest);

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

export {
  getFeeders,
  setService,
  isFeeder,
  updateFeederInformation,
  updateFeederReport,
};
