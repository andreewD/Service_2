import httpErrors from "http-errors";
import { Prenotification } from "schemas";
import { errorHandling, GE } from "./utils";
import { storePrenotification } from "storage";

type Process = {
  type: "store";
};

type Arguments = {
  id?: string;
  prenotification?: Prenotification;
};

class PrenotificationService {
  #args: Arguments;
  constructor(args: Arguments = {}) {
    this.#args = args;
  }

  public process({ type }: Process): Promise<Prenotification> {
    switch (type) {
      case "store":
        return this.#store();
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR);
    }
  }

  async #store(): Promise<Prenotification> {
    try {
      if (!this.#args.prenotification)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR);
      const result = await storePrenotification({
        ...this.#args.prenotification,
      });
      return result;
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }
}

export { PrenotificationService };
