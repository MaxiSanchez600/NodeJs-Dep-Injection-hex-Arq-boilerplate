import { Model } from "sequelize-typescript";
import FeedersReport from "./feedersReport";

export interface FeederInstance extends Model<Feeders> {
  [x: string]: any;
}

export interface Feeders {
  location: string;
  latitude: string;
  longitude: string;
  qrId?: string;
  isOn: boolean;
  description: string;
  FeederReportId: number;
}

export interface FeedersWithReport {
  id: number;
  qrId: string;
  location: string;
  latitude: string;
  longitude: string;
  isOn: boolean;
  description: string;
  FeederReportId: number;
  FeederReport: FeedersReport;
}

export const baseFeeder: Feeders = {
  location: "loc",
  latitude: "lat",
  longitude: "long",
  isOn: false,
  description: "desc",
  FeederReportId: 1,
  qrId: "1",
};
