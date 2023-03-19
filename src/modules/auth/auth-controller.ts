import { BaseController } from '@/core/base-controller';
import { omit } from '@/core/omit';
import { Request, Response } from 'express';
import { User } from '../user/user-entity';
import { UserService } from '../user/user-service';
import { CreationTokenError, InvalidRefreshToken } from './auth-error';
import { AuthService } from './auth-service';

class AuthController extends BaseController {
  async refreshToken(req: Request, res: Response) {
    try {
      const refresh = req.body.refreshToken;

      if (!refresh) {
        return this.badRequest(res, new InvalidRefreshToken());
      }

      const { refreshToken, accessToken, error } = await AuthService.refreshToken(refresh);

      if (error) {
        if (error instanceof CreationTokenError) {
          return this.internalError(res, error);
        }

        return this.badRequest(res, error);
      }

      return this.ok(res, { refreshToken, accessToken });
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const login = req.body.login;
      const password = req.body.password;
      const userData = new User({ login, password });

      const { error: userError, user } = await UserService.verifyPassword(userData);

      if (userError) {
        return this.badRequest(res, userError);
      }

      const { accessToken, error: authError, refreshToken } = await AuthService.createToken(user.toJSON().id);

      if (authError) {
        if (authError instanceof CreationTokenError) {
          return this.internalError(res, authError);
        }

        return this.badRequest(res, authError);
      }

      return this.ok(res, {
        accessToken,
        refreshToken,
        user: omit(user.toJSON(), ['passwordHash']),
      });
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }
}

const authController = new AuthController();

export { authController };
