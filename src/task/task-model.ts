import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/config';

class TaskModel extends Model<InferAttributes<TaskModel>, InferCreationAttributes<TaskModel>> {
  declare id: CreationOptional<number>;
  declare text: string;
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
  },
  {
    sequelize,
    paranoid: true,
  },
);

TaskModel.sync({ alter: true });

export { TaskModel };
