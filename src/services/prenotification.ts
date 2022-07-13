import httpErrors from "http-errors";
import {} from 'schemas'
import { errorHandling,GE } from "./utils";

type Process = {
    type: "store"
}

type Arguments = {
    id?:string
}

class PrenotificationService { 
    #args: Arguments;
    constructor(args: Arguments = {}) {
        this.#args = args;
} 

public process({ type }: Process): Promise<string> {
    switch (type) {
      case "store":
        return this.#store();
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR);
    }
  }

  async #store(): Promise<string> {
    try {
         
        return 'OK'
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }

}

export {PrenotificationService}
