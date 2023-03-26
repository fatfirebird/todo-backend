import { db, Models } from '@/database/models';

class AuthRepository {
  models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  async findOne(refresh: string) {
    return this.models.auth.findOne({
      where: {
        refresh,
      },
    });
  }

  async create(refresh: string) {
    return this.models.auth.create({
      refresh,
    });
  }
}

const authRepository = new AuthRepository(db);

export { authRepository };
