import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from 'sequelize';
import { TagModel } from './tag-model';
import { TaskModel } from './task-model';
export class TaskTagsModel extends Model<InferAttributes<TaskTagsModel>, InferCreationAttributes<TaskTagsModel>> {
  declare id: CreationOptional<number>;
  declare taskId: ForeignKey<TaskModel['id']>;
  declare tagId: ForeignKey<TagModel['id']>;
}

export const init = (sequelize: Sequelize) =>
  TaskTagsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'taskTags',
    },
  );
