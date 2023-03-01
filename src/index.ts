import express from 'express';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize('sqlite::memory:');

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (e, res) => {
  res.send('docker test');
});

const bootstrap = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(port, () => {
      console.log('Example app listening on port ' + port);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

bootstrap();
