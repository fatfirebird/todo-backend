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
  ForeignKey,
  Sequelize,
} from 'sequelize';
import { TaskStatus } from '@/modules/task/task-entity';
import { TagModel } from './tag-model';
import { UserModel } from './user-model';

export class TaskModel extends Model<
  InferAttributes<TaskModel, { omit: 'tags' }>,
  InferCreationAttributes<TaskModel, { omit: 'tags' }>
> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare status: CreationOptional<TaskStatus>;
  declare userId: ForeignKey<UserModel['id']>;

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

export const init = (sequelize: Sequelize) => {
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

  return TaskModel;
};
