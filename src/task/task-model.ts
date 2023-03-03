import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/config';
import { TaskStatus } from './task-entity';

class TaskModel extends Model<InferAttributes<TaskModel>, InferCreationAttributes<TaskModel>> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare status: CreationOptional<TaskStatus>;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: TaskStatus.todo,
      values: [TaskStatus.todo, TaskStatus.inProgress, TaskStatus.done],
    },
  },
  {
    sequelize,
    paranoid: true,
  },
);

TaskModel.sync({ alter: true });

export { TaskModel };
