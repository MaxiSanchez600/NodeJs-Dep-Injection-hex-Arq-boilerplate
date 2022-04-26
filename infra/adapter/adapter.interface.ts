import { Errors } from "../../data/enums/errors";
import {
  FeedersWithReport,
  Feeders,
} from "../../data/interfaces/models/feeders";
import FeedersReport from "../../data/interfaces/models/feedersReport";
import { UpdateEmailBody } from "../../data/interfaces/requests/updateEmail";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";

export default interface AdapterInterface {
  isFeeder: (id) => Promise<FeedersWithReport>;
  getFeeders: () => Promise<FeedersWithReport[]>;
  updateFeederInformation: (
    info: UpdateFeedersInformation
  ) => Promise<FeedersWithReport>;
  updateFeederReport: (info: FeedersReport) => Promise<FeedersReport>;
  updateEmail: (info: UpdateEmailBody) => Promise<any>;
  createFeeder: (info: FeedersReport) => Promise<FeedersWithReport>;
  createFeederReport: () => Promise<FeedersReport>;
  generateQR: (id: string) => Promise<string>;
}
