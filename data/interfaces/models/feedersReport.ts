import { Status } from "../../enums/status";

export default interface FeedersReport {
  id: string;
  description: string;
  status: Status;
  img: string;
}
