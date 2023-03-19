import { HttpError } from '@/core/error';
import { User } from './user-entity';
import { UserRepository } from './user-repository';

export class UserService {
  static async createUser(userData: User) {
    const error: HttpError | null = null;

    const user = await UserRepository.createUser({ login: userData.login, passwordHash: 'fdsfdsfd' });

    return { user, error };
  }
}
