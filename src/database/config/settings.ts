import { APP_CONFIG } from '@/config/application';
import { Options } from 'sequelize';

const params: Record<string, Options> = {
  development: {
    database: 'main',
    dialect: 'sqlite',
    username: 'root',
    password: 'root',
    storage: 'data.sqlite3',
  },
  test: {
    database: 'main',
    dialect: 'sqlite',
    username: 'root',
    password: 'root',
    storage: 'data.sqlite3',
  },
  production: {
    database: 'main',
    dialect: 'sqlite',
    username: 'root',
    password: 'root',
    storage: 'data.sqlite3',
  },
};

export default params[APP_CONFIG.NODE_ENV];
