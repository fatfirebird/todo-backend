import { User } from './user-entity';
import { UserRepository } from './user-repository';
import bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth-service';
import { InvalidUserLogin } from './user-error';
export class UserService {
  static async createUser(userData: User) {
    try {
      const hash = await bcrypt.hash(userData.password, 10);
      const user = await UserRepository.createUser({ login: userData.login, passwordHash: hash });

      const { data, error } = await AuthService.createToken(user.id);

      if (error) {
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
          error,
        };
      }

      return { user, error, ...data };
    } catch (error) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: new InvalidUserLogin(userData.login),
      };
    }
  }
}
