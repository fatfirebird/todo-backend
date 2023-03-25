import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from '../config';

class AuthModel extends Model<InferAttributes<AuthModel>, InferCreationAttributes<AuthModel>> {
  declare id: CreationOptional<number>;
  declare refresh: string;
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
