import { TOKENS_CONFIG } from '@/config/tokens';
import { sign, verify } from 'jsonwebtoken';
import { CreationTokenError, InvalidRefreshToken } from './auth-error';
import { authRepository } from './auth-repository';

export class AuthService {
  static async createToken(userId: number) {
    try {
      const accessToken = sign({ userId }, TOKENS_CONFIG.SECRET, {
        expiresIn: TOKENS_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
      });

      const refreshToken = sign({ userId }, TOKENS_CONFIG.SECRET, {
        expiresIn: TOKENS_CONFIG.REFRES_TOKEN_EXPIRES_IN,
      });

      await authRepository.create(refreshToken);

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

      const oldToken = await authRepository.findOne(refresh);

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
