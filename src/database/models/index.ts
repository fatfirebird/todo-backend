import fs from 'fs';
import path from 'path';
import { ModelStatic, Sequelize } from 'sequelize';
import { UserModel } from './user-model';
import { TaskModel } from './task-model';
import { AuthModel } from './auth-model';
import { TagModel } from './tag-model';
import settings from '../config/settings';
import { TaskTagsModel } from './task-tags-model';

const { database, username, password, ...options } = settings;

export type Models = {
  auth: ModelStatic<AuthModel>;
  user: ModelStatic<UserModel>;
  task: ModelStatic<TaskModel>;
  tag: ModelStatic<TagModel>;
  taskTags: ModelStatic<TaskTagsModel>;
};

const db = {} as Models;
let created = false;

const sequelize = new Sequelize(database as string, username as string, password, {
  dialect: options.dialect ?? 'sqlite',
  storage: options.storage,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const createModels = async () => {
  if (!created) {
    await fs
      .readdirSync(path.resolve(__dirname, './'))
      .filter((t) => (~t.indexOf('.ts') || ~t.indexOf('.js')) && !~t.indexOf('index') && !~t.indexOf('.map'))
      .forEach(async (file) => {
        const module = await import(path.resolve(__dirname, file));
        const model = module?.init(sequelize);

        db[model.name as keyof Models] = model;
      });

    created = true;
    return db;
  }

  return db;
};

const createAssociations = () => {
  db.user.hasMany(db.task);
  db.task.belongsTo(db.user);
  db.user.hasMany(db.tag);
  db.tag.belongsTo(db.user);
  db.task.belongsToMany(db.tag, { through: db.taskTags });
  db.tag.belongsToMany(db.task, { through: db.taskTags });

  sequelize.sync({});
};

createModels().then(createAssociations);

export { db, sequelize, Sequelize };
