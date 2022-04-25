import AdapterInterface from "../adapter/adapter.interface";
import { Errors } from "../../data/enums/errors";
import { serviceCommonResponse } from "../../data/types/response";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";
import { report } from "process";
import FeedersReport from "../../data/interfaces/models/feedersReport";
import { UpdateEmailBody } from "../../data/interfaces/requests/updateEmail";

// Old require not updated for ES6
const fs = require("fs");
const pdf = require("html-pdf");

// Get the HTML Base File
const html = fs.readFileSync("./base.html", "utf8");

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

async function createFeeder(
  next,
  email: string
): Promise<serviceCommonResponse> {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    next(Errors.INTERNAL_SERVICE_ERROR);
    return;
  }
  try {
    // Create the Feeder Report
    const feederReportResponse = await feedersAdapter.createFeederReport();

    // Create the new Feeder
    const feederResponse = await feedersAdapter.createFeeder(
      feederReportResponse
    );

    // Generate the new feeder QR with it the ID
    const generatedQR = await feedersAdapter.generateQR(feederResponse.qrId);

    // Create the PDF to send
    const response = await pdf
      .create(html)
      .toFile(`./porellosqr.pdf`, function (err, stream) {
        if (err) {
          next({
            err: Errors.INTERNAL_SERVICE_ERROR,
            dataErr: err,
          });
        } else {
          console.log("PDF CREADO CON EXITO");
        }
      });

    // Return if no errors
    return {
      data: feederResponse,
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

async function updateEmail(
  next,
  body: UpdateEmailBody
): Promise<serviceCommonResponse> {
  // Checking for Adapter dependency
  if (feedersAdapter === null) {
    next(Errors.INTERNAL_SERVICE_ERROR);
    return;
  }
  try {
    const reportResponse = await feedersAdapter.updateEmail(body);
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
  updateEmail,
  createFeeder,
};
