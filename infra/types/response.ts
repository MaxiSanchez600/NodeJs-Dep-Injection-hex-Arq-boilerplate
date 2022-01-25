import { Errors } from "../enums/errors";
export type serviceCommonResponse = {
  data: {};
  error: Errors | null;
  status: number;
};
