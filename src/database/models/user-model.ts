import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from 'sequelize';

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare login: string;
  declare passwordHash: string;
}

export const init = (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'user',
    },
  );

  return UserModel;
};
