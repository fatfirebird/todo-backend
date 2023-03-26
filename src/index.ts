import { config } from 'dotenv';
config();

import { App } from './app';

const app = new App();
app.bootsrap();
