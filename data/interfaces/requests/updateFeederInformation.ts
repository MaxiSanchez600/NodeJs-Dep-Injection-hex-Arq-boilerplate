import FeedersReport from "../models/feedersReport";

export interface UpdateFeedersInformation {
  qrId: string;
  location: string;
  latitude: string;
  longitude: string;
  description: string;
  FeederReportId: string;
  FeederReport: FeedersReport;
}
