import { HttpError } from '@/core/error';
import { User } from './user-entity';
import { UserRepository } from './user-repository';
import bcrypt from 'bcrypt';
export class UserService {
  static async createUser(userData: User) {
    const error: HttpError | null = null;

    const hash = await bcrypt.hash(userData.password, 10);

    const user = await UserRepository.createUser({ login: userData.login, passwordHash: hash });

    return { user, error };
  }
}
