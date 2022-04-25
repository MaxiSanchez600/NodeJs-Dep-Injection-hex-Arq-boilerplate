import ServiceInterface from "../service/service.interface";

export default interface ControllerInterface {
  setService: (service: ServiceInterface) => void;
  isFeeder: (res, req, next) => void;
  getFeeders: (res, req, next) => void;
  updateFeederInformation: (res, req, next) => void;
  updateFeederReport: (res, req, next) => void;
  createFeeder: (res, req, next) => void;
  updateEmail: (res, req, next) => void;
}
