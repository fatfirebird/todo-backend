import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { UserModel } from './user-model';

class TagModel extends Model<InferAttributes<TagModel>, InferCreationAttributes<TagModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare color: string;
  declare userId: ForeignKey<UserModel['id']>;
}

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

export { TagModel };
