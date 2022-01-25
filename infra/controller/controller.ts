import { Errors } from "../enums/errors";
import ServiceInterface from "../service/service.interface";
import { serviceCommonResponse } from "../types/response";

let serviceController: ServiceInterface;

const setService = (service: ServiceInterface) => {
  serviceController = service;
};

function getFeeders(req, res) {
  let serviceResponse: serviceCommonResponse;

  // Checking for Service dependency
  if (serviceController === null) {
    // Generate the Response
    serviceResponse = {
      data: {},
      error: Errors.INTERNAL_SERVICE_ERROR,
      status: 500,
    };
    res.status(serviceResponse.status).send(serviceResponse);
  }
  serviceResponse = serviceController.getFeeders(req);

  res.status(serviceResponse.status).send(serviceResponse);
}
export { getFeeders, setService };
