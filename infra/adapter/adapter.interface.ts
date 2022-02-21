import { Errors } from "../../data/enums/errors";
import {
  FeedersWithReport,
  Feeders,
} from "../../data/interfaces/models/feeders";
import FeedersReport from "../../data/interfaces/models/feedersReport";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";

export default interface AdapterInterface {
  isFeeder: (id) => Promise<FeedersWithReport>;
  getFeeders: () => Promise<FeedersWithReport[]>;
  updateFeederInformation: (
    info: UpdateFeedersInformation
  ) => Promise<FeedersWithReport>;
  updateFeederReport: (info: FeedersReport) => Promise<FeedersReport>;
}
