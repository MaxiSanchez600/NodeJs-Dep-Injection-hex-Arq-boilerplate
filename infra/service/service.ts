import AdapterInterface from "../adapter/adapter.interface";
import { Errors } from "../enums/errors";
import { serviceCommonResponse } from "../types/response";

let feedersAdapter: AdapterInterface;

const setAdapter = (adapter: AdapterInterface) => {
  feedersAdapter = adapter;
};

function getFeeders(req): serviceCommonResponse {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    let responseError: serviceCommonResponse = {
      data: {},
      error: Errors.INTERNAL_SERVICE_ERROR,
      status: 500,
    };
    return responseError;
  }
  return feedersAdapter.getFeeders();
}
export { getFeeders, setAdapter };
