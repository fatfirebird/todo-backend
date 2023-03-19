import { APP_CONFIG } from '@/config/application';
import { HttpError } from '@/core/error';
import { AuthModel } from '@/database/models/auth-model';
import { sign } from 'jsonwebtoken';

export class AuthService {
  static async createToken(userId: number) {
    try {
      const accessToken = sign({ userId }, APP_CONFIG.SECRET, {
        expiresIn: '1h',
      });

      const refreshToken = sign({ userId }, APP_CONFIG.SECRET, {
        expiresIn: '24h',
      });

      await AuthModel.create({ refresh: refreshToken, userId });

      return { data: { accessToken, refreshToken } };
    } catch (error) {
      if (error instanceof Error) {
        return { error: new HttpError({ message: error.message }) };
      } else {
        return { error: new HttpError({ message: "Can't create token" }) };
      }
    }
  }
}
