import AdapterInterface from "../adapter/adapter.interface";
import { Errors } from "../../data/enums/errors";
import { serviceCommonResponse } from "../../data/types/response";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";
import { report } from "process";
import FeedersReport from "../../data/interfaces/models/feedersReport";

let feedersAdapter: AdapterInterface;

const setAdapter = (adapter: AdapterInterface) => {
  feedersAdapter = adapter;
};

async function isFeeder(next, id: string) {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    next(Errors.INTERNAL_SERVICE_ERROR);
    return;
  }

  try {
    const response = await feedersAdapter.isFeeder(id);
    return {
      data: response,
      status: 200,
      error: null,
    };
  } catch (e) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: e,
    });
    return;
  }
}

async function getFeeders(next): Promise<serviceCommonResponse> {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    next(Errors.INTERNAL_SERVICE_ERROR);
    return;
  }
  try {
    const response = await feedersAdapter.getFeeders();
    return {
      data: response,
      status: 200,
      error: null,
    };
  } catch (e) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: e,
    });
    return;
  }
}

async function updateFeederInformation(
  next,
  body: UpdateFeedersInformation
): Promise<serviceCommonResponse> {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    next(Errors.INTERNAL_SERVICE_ERROR);
    return;
  }
  try {
    const feedersResponse = await feedersAdapter.updateFeederInformation(body);
    await feedersAdapter.updateFeederReport(body.FeederReport);
    return {
      data: feedersResponse,
      status: 200,
      error: null,
    };
  } catch (e) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: e,
    });
    return;
  }
}

async function updateFeederReport(
  next,
  body: FeedersReport
): Promise<serviceCommonResponse> {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    next(Errors.INTERNAL_SERVICE_ERROR);
    return;
  }
  try {
    const reportResponse = await feedersAdapter.updateFeederReport(body);
    return {
      data: reportResponse,
      status: 200,
      error: null,
    };
  } catch (e) {
    next({
      err: Errors.INTERNAL_SERVICE_ERROR,
      dataErr: e,
    });
    return;
  }
}
export {
  getFeeders,
  setAdapter,
  isFeeder,
  updateFeederInformation,
  updateFeederReport,
};
