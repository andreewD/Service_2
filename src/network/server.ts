import express from "express";
import cors from "cors";
import pino, { HttpLogger } from "express-pino-logger";
import { CronJob } from "cron";
import { applyRoutes } from "./router";
import { notificationData } from "storage";
import { transporter } from "./connections";

const PORT = (process.env.PORT as string) || 1996;

class Server {
  #app: express.Application;
  #log: HttpLogger;

  constructor() {
    this.#app = express();
    this.#log = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    });
    this.#config();
  }

  #config() {
    this.#app.use(cors());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: false }));
    this.#app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Authorization, Content-Type"
        );
        res.header("x-powered-by", "Simba.js");
        next();
      }
    );
    applyRoutes(this.#app);
  }

  #timeChecker() {
    let dateNow = Date.now();

    notificationData.map(async (item, i, array) => {
      // now-15 sec < timestamp <= now
      if (item.timestamp > dateNow - 1000 * 15 && item.timestamp <= dateNow) {
        let message = item.message.map((item) => {
          return `- ${item}\n`;
        });

        transporter.sendMail({
          from: "<ayrton20082009@gmail.com>",
          to: item.email,
          text: message.toString(),
        });
        array = array.splice(i, 1);
      }
    });
  }

  public start(): void {
    this.#app.listen(PORT, () => {
      this.#log.logger.info(`Server running at port ${PORT}`);
      // cronjob every 15 seconds
      new CronJob(
        "*/15 * * * * *",
        () => {
          this.#timeChecker();
        },
        null,
        true,
        "America/Los_Angeles"
      );
    });

    try {
    } catch (e) {
      this.#log.logger.error(e);
    }
  }
}

const server = new Server();

export { server as Server };
