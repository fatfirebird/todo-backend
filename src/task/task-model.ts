import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config';

class TaskModel extends Model {}

TaskModel.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  },
);

TaskModel.sync({ alter: true });

export { TaskModel };
