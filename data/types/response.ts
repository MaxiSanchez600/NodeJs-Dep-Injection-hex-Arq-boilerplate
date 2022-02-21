import { Errors } from "../enums/errors";
export type serviceCommonResponse = {
  data: any | null;
  error: Errors | null;
  status: number;
};
