import { sequelize } from '../config';
import { AuthModel } from './auth-model';
import { TagModel } from './tag-model';
import { TaskModel } from './task-model';
import { UserModel } from './user-model';

UserModel.hasMany(TaskModel);
TaskModel.belongsTo(UserModel);
UserModel.hasMany(TagModel);
TagModel.belongsTo(TagModel);
TaskModel.belongsToMany(TagModel, { through: 'taskTags' });
TagModel.belongsToMany(TaskModel, { through: 'taskTags' });

sequelize.sync({ alter: true, force: true });

export { TagModel, TaskModel, AuthModel, UserModel };
