import { APP_CONFIG } from './config/application';
import express, { Express } from 'express';
import { routerV1 } from './router/v1';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './database/models';

export class App {
  private readonly app: Express;

  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors({ origin: APP_CONFIG.ORIGIN }));

    this.app.use('/api/v1', routerV1);
  }

  async bootsrap() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      this.app.listen(APP_CONFIG.PORT, () => {
        console.log(`Example app listening on port ${APP_CONFIG.PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
