import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManySetAssociationsMixin,
  NonAttribute,
  Association,
  DataTypes,
} from 'sequelize';
import { TaskStatus } from '../../task/task-entity';
import { sequelize } from '../config';
import { TagModel } from './tag-model';

class TaskModel extends Model<
  InferAttributes<TaskModel, { omit: 'tags' }>,
  InferCreationAttributes<TaskModel, { omit: 'tags' }>
> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare status: CreationOptional<TaskStatus>;

  declare getTags: BelongsToManyGetAssociationsMixin<TagModel>;
  declare addTag: BelongsToManyAddAssociationMixin<TagModel, number>;
  declare addTags: BelongsToManyAddAssociationsMixin<TagModel, number>;
  declare removeTag: BelongsToManyRemoveAssociationMixin<TagModel, number>;
  declare removeTags: BelongsToManyRemoveAssociationsMixin<TagModel, number>;
  declare hasTag: BelongsToManyHasAssociationMixin<TagModel, number>;
  declare hasTags: BelongsToManyHasAssociationsMixin<TagModel, number>;
  declare countTags: BelongsToManyCountAssociationsMixin;
  declare createTag: BelongsToManyCreateAssociationMixin<TagModel>;
  declare setTags: BelongsToManySetAssociationsMixin<TagModel, number>;

  declare tags: NonAttribute<TagModel[]>;

  declare static associations: {
    tags: Association<TaskModel, TagModel>;
  };
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
    modelName: 'task',
  },
);

export { TaskModel };
