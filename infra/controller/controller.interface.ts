import ServiceInterface from "../service/service.interface";

export default interface ControllerInterface {
  setService: (service: ServiceInterface) => void;
  getFeeders: (res, req) => void;
}
