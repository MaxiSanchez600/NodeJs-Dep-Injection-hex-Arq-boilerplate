import { Status } from "../../data/enums/status";

export const getStatus = (status: Status) => {
  switch (status) {
    case Status.OK:
      return "El comedero se encuentra con comida";
    case Status.NO_OK:
      return "El comedero se encuentra con algun fallo";
    case Status.FOOD_MISSING:
      return "El comedero se encuentra sin comida";
  }
};

export const getMessage = (status: Status) => {
  switch (status) {
    case Status.OK:
      return "se encuentra con comida";
    case Status.NO_OK:
      return "se encuentra con algun fallo";
    case Status.FOOD_MISSING:
      return "se encuentra sin comida";
  }
};
