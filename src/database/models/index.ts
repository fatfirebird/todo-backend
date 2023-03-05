import { sequelize } from '../config';
import { TagModel } from './tag-model';
import { TaskModel } from './task-model';

TaskModel.belongsToMany(TagModel, { through: 'taskTags' });
TagModel.belongsToMany(TaskModel, { through: 'taskTags' });

sequelize.sync({ alter: true });

export { TagModel, TaskModel };
