import { TOKENS_CONFIG } from '@/config/tokens';
import { AuthModel } from '@/database/models';
import { sign, verify } from 'jsonwebtoken';
import { CreationTokenError, InvalidRefreshToken } from './auth-error';

export class AuthService {
  static async createToken(userId: number) {
    try {
      const accessToken = sign({ userId }, TOKENS_CONFIG.SECRET, {
        expiresIn: TOKENS_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
      });

      const refreshToken = sign({ userId }, TOKENS_CONFIG.SECRET, {
        expiresIn: TOKENS_CONFIG.REFRES_TOKEN_EXPIRES_IN,
      });

      await AuthModel.create({ refresh: refreshToken });

      return { accessToken, refreshToken };
    } catch (error) {
      return { error: new CreationTokenError() };
    }
  }

  static async refreshToken(refresh: string) {
    try {
      const decoded = verify(refresh, TOKENS_CONFIG.SECRET);

      if (typeof decoded === 'string') {
        return { refreshToken: null, accessToken: null, error: new InvalidRefreshToken() };
      }

      const oldToken = await AuthModel.findOne({
        where: {
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
