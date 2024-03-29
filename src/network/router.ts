import { Application, Response, Request, Router, NextFunction } from "express";
import httpErrors from "http-errors";

import { response } from "./response";
import { Home, Prenotification } from "./routes";

const routers = [Home, Prenotification];

const applyRoutes = (app: Application): void => {
  app.use("/", Home);
  routers.forEach((router: Router): Application => app.use("/api", router));

  // Handling 404 error
  app.use((req, res, next) => {
    next(new httpErrors.NotFound("This route does not exists"));
  });
  app.use(
    (
      error: httpErrors.HttpError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      response({
        error: true,
        message: error.message,
        res,
        status: error.status,
      });
      next();
    }
  );
};
export { applyRoutes };
