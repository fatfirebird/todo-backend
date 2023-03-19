import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from '../config';
import { UserModel } from './user-model';

class AuthModel extends Model<InferAttributes<AuthModel>, InferCreationAttributes<AuthModel>> {
  declare id: CreationOptional<number>;
  declare refresh: string;
  declare userId: ForeignKey<UserModel['id']>;
}

AuthModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    refresh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'auth',
  },
);

export { AuthModel };
