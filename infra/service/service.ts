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
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");

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
    console.log("Pedido para generar PDF para el email: ", email);

    // Create the Feeder Report
    const feederReportResponse = await feedersAdapter.createFeederReport();
    console.log("FeederReport creado");

    // Create the new Feeder
    const feederResponse = await feedersAdapter.createFeeder(
      feederReportResponse
    );
    console.log("Feeder creado");

    // Generate the new feeder QR with it the ID
    const generatedQR = await feedersAdapter.generateQR(feederResponse.qrId);
    console.log("QR creado");

    // Edit HTML file
    const html = fs.readFileSync(__dirname + "/base.html", "utf8");
    const $ = await cheerio.load(html);
    $(".image_container").each(function () {
      var new_src = generatedQR;
      $(this).attr("src", new_src);
    });
    console.log("HTML editado");

    // Create the PDF to send
    const pdfCreate = new Promise((res, rej) => {
      pdf
        .create($.html(), { format: "A3" })
        .toFile(__dirname + `/porellosqr.pdf`, function (err, stream) {
          if (err) {
            rej(err);
          } else {
            res(stream);
          }
        });
    });

    await pdfCreate;
    console.log("PDF creado");

    // Send email with PDF
    const user = process.env.EMAIL_USER;
    const password = process.env.EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: password,
      },
    });

    const mailOptions = {
      from: "porelloscomederos@gmail.com",
      to: email,
      subject: "Te enviamos tu QR de Por Ellos Comederos",
      text: "Hola! Muchas gracias por poner un comedero de Por Ellos. En este PDF, te enviamos las instrucciones que van pegadas en el comedero junto con su QR para integrarlo a la plataforma. Recorda seguir las instrucciones de la web y el video, y si tenes alguna duda, no dudes en contactarte con nosotros a traves de este email o WhatsApp.",
      attachments: [
        {
          filename: "porellosqr.pdf",
          path: __dirname + `/porellosqr.pdf`,
          contentType: "application/pdf",
        },
      ],
    };

    const emailSend = new Promise((res, rej) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          rej(error);
        } else {
          res(feederResponse);
        }
      });
    });

    await emailSend;
    console.log("Email enviado");

    const removePDFAfterSend = new Promise((res, rej) => {
      fs.unlink(__dirname + `/porellosqr.pdf`, function (err) {
        if (err) {
          rej(err);
        } else {
          res(true);
        }
      });
    });

    await removePDFAfterSend;
    console.log("PDF borrado");

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
