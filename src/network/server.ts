import express from 'express'
import cors from 'cors'
import pino, { HttpLogger } from 'express-pino-logger'

import { applyRoutes } from './router'

const PORT = (process.env.PORT as string) || 1996

class Server {
  #app: express.Application
  #log: HttpLogger

  constructor() {
    this.#app = express()
    this.#log = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
    this.#config()
  }

  #config() {
    this.#app.use(cors())
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: false }))
    this.#app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        res.header('x-powered-by', 'Simba.js')
        next()
      }
    )
    applyRoutes(this.#app)
  }


  public start(): void {
    this.#app.listen(PORT, () => {
      this.#log.logger.info(`Server running at port ${PORT}`)
    })

    try {
        
    } catch (e) {
      this.#log.logger.error(e)
    }
  }
}

const server = new Server()

export { server as Server }
