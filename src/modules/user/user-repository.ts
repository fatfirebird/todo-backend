import { db, Models } from '@/database/models';

class UserRepository {
  models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  async findUserById(id: string) {
    return await this.models.user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['passwordHash'],
      },
    });
  }

  async findUserByLogin(login: string) {
    return await this.models.user.findOne({
      where: {
        login,
      },
    });
  }

  async createUser({ login, passwordHash }: { login: string; passwordHash: string }) {
    return await this.models.user.create({
      login: login,
      passwordHash,
    });
  }
}

const userRepository = new UserRepository(db);

export { userRepository };
