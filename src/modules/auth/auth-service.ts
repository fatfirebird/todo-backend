import { APP_CONFIG } from '@/config/application';
import { AuthModel } from '@/database/models/auth-model';
import { sign, verify } from 'jsonwebtoken';
import { CreationTokenError, InvalidRefreshToken } from './auth-error';

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

      return { accessToken, refreshToken };
    } catch (error) {
      return { error: new CreationTokenError() };
    }
  }

  static async refreshToken(refresh: string) {
    try {
      const decoded = verify(refresh, APP_CONFIG.SECRET);

      if (typeof decoded === 'string') {
        return { refreshToken: null, accessToken: null, error: new InvalidRefreshToken() };
      }

      const oldToken = await AuthModel.findOne({
        where: {
          userId: decoded.userId,
          refresh: refresh,
        },
      });

      if (!oldToken) {
        return { refreshToken: null, accessToken: null, error: new InvalidRefreshToken() };
      }

      await oldToken.destroy();

      return await this.createToken(decoded.userId);
    } catch (error) {
      return { refreshToken: null, accessToken: null, error: new InvalidRefreshToken() };
    }
  }
}
