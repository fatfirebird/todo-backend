import { sequelize } from '../config';
import { AuthModel } from './auth-model';
import { TagModel } from './tag-model';
import { TaskModel } from './task-model';
import { UserModel } from './user-model';

UserModel.hasOne(AuthModel);
AuthModel.belongsTo(UserModel);
UserModel.hasMany(TaskModel);
TaskModel.belongsTo(UserModel);
UserModel.hasMany(TagModel);
TagModel.belongsTo(TagModel);
TaskModel.belongsToMany(TagModel, { through: 'taskTags' });
TagModel.belongsToMany(TaskModel, { through: 'taskTags' });

sequelize.sync({ alter: true });

export { TagModel, TaskModel };
