import FeedersReport from "../../data/interfaces/models/feedersReport";
import { UpdateEmailBody } from "../../data/interfaces/requests/updateEmail";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";

export function isUpdateFeedersInformation(
  arg: any
): arg is UpdateFeedersInformation {
  return (
    arg &&
    arg.qrId &&
    typeof arg.qrId == "string" &&
    arg.location &&
    typeof arg.location == "string" &&
    arg.latitude &&
    typeof arg.latitude == "string" &&
    arg.longitude &&
    typeof arg.longitude == "string" &&
    arg.FeederReportId &&
    typeof arg.description == "string" &&
    arg.description &&
    typeof arg.FeederReportId == "number" &&
    arg.FeederReport.description &&
    typeof arg.FeederReport.description == "string" &&
    arg.FeederReport.status &&
    typeof arg.FeederReport.status == "string" &&
    arg.FeederReport.img &&
    typeof arg.FeederReport.img == "string" &&
    arg.FeederReport.id &&
    typeof arg.FeederReport.id == "number"
  );
}

export function isUpdateReport(arg: any): arg is FeedersReport {
  return (
    arg &&
    arg.description &&
    typeof arg.description == "string" &&
    arg.status &&
    typeof arg.status == "string" &&
    arg.id &&
    typeof arg.id == "number"
  );
}

export function isUpdateEmail(arg: any): arg is UpdateEmailBody {
  console.log(arg);
  return (
    arg &&
    arg.email &&
    typeof arg.email == "string" &&
    arg.ids &&
    Array.isArray(arg.ids)
  );
}

export function isCreateFeeder(arg: any): arg is { email } {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return arg && typeof arg.email == "string" && emailRegex.test(arg.email);
}
