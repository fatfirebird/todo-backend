import { UserModel } from '@/database/models/user-model';

class UserRepository {
  static async findUserById(id: string) {
    return await UserModel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['passwordHash'],
      },
    });
  }

  static async findUserByLogin(login: string) {
    return await UserModel.findOne({
      where: {
        login,
      },
    });
  }

  static async createUser({ login, passwordHash }: { login: string; passwordHash: string }) {
    return await UserModel.create({
      login: login,
      passwordHash,
    });
  }
}

export { UserRepository };
