import { User } from './user-entity';
import { userRepository } from './user-repository';
import bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth-service';
import { UserLoginUsed, InvalidPasswordOrLogin } from './user-error';
export class UserService {
  static async createUser(userData: User) {
    try {
      const hash = await bcrypt.hash(userData.password, 10);
      const user = await userRepository.createUser({ login: userData.login, passwordHash: hash });

      const { error, ...data } = await AuthService.createToken(user.id);

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
        error: new UserLoginUsed(userData.login),
      };
    }
  }

  static async verifyPassword(userData: User) {
    const user = await userRepository.findUserByLogin(userData.login);

    if (!user) {
      return {
        error: new InvalidPasswordOrLogin(),
        user,
      };
    }

    const match = await bcrypt.compare(userData.password, user.passwordHash);

    if (!match) {
      return {
        error: new InvalidPasswordOrLogin(),
        user,
      };
    }

    return { user, error: null };
  }
}
