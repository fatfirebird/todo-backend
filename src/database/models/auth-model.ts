import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from 'sequelize';
export class AuthModel extends Model<InferAttributes<AuthModel>, InferCreationAttributes<AuthModel>> {
  declare id: CreationOptional<number>;
  declare refresh: string;
}

export const init = (sequelize: Sequelize) =>
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
