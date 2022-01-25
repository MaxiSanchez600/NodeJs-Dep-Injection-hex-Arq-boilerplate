import AdapterInterface from "../adapter/adapter.interface";
import { serviceCommonResponse } from "../types/response";

export default interface ServiceInterface {
  setAdapter: (adapter: AdapterInterface) => void;
  getFeeders: (req) => serviceCommonResponse;
}
