import { BaseController } from '@/core/base-controller';
import { Request, Response } from 'express';
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
}

const authController = new AuthController();

export { authController };
