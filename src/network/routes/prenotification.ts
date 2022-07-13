import { NextFunction, Router } from "express";
import { response } from "network/response";
import { PrenotificationService } from "services/prenotification";
import { idSchema,storePrenotification} from "schemas";
import { validatorCompiler } from "./utils";


const Prenotification = Router();

Prenotification.route('/prenotification')
    .post(validatorCompiler(storePrenotification,"body"),
    async(
        req:CustomRequest,
        res:CustomResponse,
        next:NextFunction
    ):Promise<void>=>{
        try {
            const {
                body: { args },
              } = req;
              const pn=new PrenotificationService({prenotification:args})
              const result = await pn.process({type:'store'})
              response({error:false,message:result,res,status:201})
        } catch (error) {
            next(error);
        }
    })


export {Prenotification}