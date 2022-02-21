import AdapterInterface from "../adapter/adapter.interface";
import { serviceCommonResponse } from "../../data/types/response";
import { UpdateFeedersInformation } from "../../data/interfaces/requests/updateFeederInformation";
import FeedersReport from "../../data/interfaces/models/feedersReport";

export default interface ServiceInterface {
  setAdapter: (adapter: AdapterInterface) => void;
  getFeeders: (next) => Promise<serviceCommonResponse>;
  isFeeder: (next, id: string) => Promise<serviceCommonResponse>;
  updateFeederInformation: (
    next,
    body: UpdateFeedersInformation
  ) => Promise<serviceCommonResponse>;
  updateFeederReport: (
    next,
    body: FeedersReport
  ) => Promise<serviceCommonResponse>;
}
