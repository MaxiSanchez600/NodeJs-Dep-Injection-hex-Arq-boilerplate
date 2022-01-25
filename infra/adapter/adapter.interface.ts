import { serviceCommonResponse } from "../types/response";

export default interface AdapterInterface {
  getFeeders: () => serviceCommonResponse;
}
