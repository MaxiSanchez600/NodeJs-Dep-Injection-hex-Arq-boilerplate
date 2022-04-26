import { Errors } from "../../data/enums/errors";
import { serviceCommonResponse } from "../../data/types/response";

type middlewareErr = {
  err: Errors;
  dataErr: string;
};

export function errorHandler(err: middlewareErr, req, res, next) {
  console.log(
    "Hay un error en el el ultimo endpoint que se llamo: ",
    err.dataErr
  );
  let response: serviceCommonResponse;
  switch (err.err) {
    case Errors.INTERNAL_SERVICE_ERROR:
      response = {
        data: err.dataErr.toString(),
        error: err.err,
        status: 500,
      };
      break;
    case Errors.BODY_ERROR:
      response = {
        data: err.dataErr.toString(),
        error: err.err,
        status: 400,
      };
      break;
    case Errors.MISSING_PARAM:
      response = {
        data: err.dataErr.toString(),
        error: err.err,
        status: 400,
      };
      break;
    case Errors.AUTH_ERROR:
      response = {
        data: err.dataErr.toString(),
        error: err.err,
        status: 401,
      };
      break;
  }
  res.status(response.status).send(response).end();
}
