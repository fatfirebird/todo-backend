import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  Sequelize,
} from 'sequelize';
import { UserModel } from './user-model';

export class TagModel extends Model<InferAttributes<TagModel>, InferCreationAttributes<TagModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare color: string;
  declare userId: ForeignKey<UserModel['id']>;
}

export const init = (sequelize: Sequelize) => {
  TagModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'tag',
    },
  );

  return TagModel;
};
