import { NextFunction, Router } from "express";
import { response } from "network/response";
import { PrenotificationService } from "services/prenotification";
import { idSchema} from "schemas";
import { validatorCompiler } from "./utils";


const Prenotification = Router();

export {Prenotification}