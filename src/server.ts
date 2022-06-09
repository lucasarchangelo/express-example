import express, { Request, Response } from 'express';

import pool from './config/db-configuration';
import { UserController } from './controller/user.controller';



class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
    this.dbConnect();
  }


  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public async routes() {
    const userController = new UserController();

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello world!');
    });

    this.app.use(`/api/user/`, userController.router);
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err.message);
      console.log('Connected');
    });
  }
}

const server = new Server();
server.start();
