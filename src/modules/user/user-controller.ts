import { BaseController } from '@/core/base-controller';
import { ForbiddenResource } from '@/core/errors';
import { omit } from '@/core/omit';
import { Response, Request } from 'express';
import { User } from './user-entity';
import { UserNotFoundError } from './user-error';
import { userRepository } from './user-repository';
import { UserService } from './user-service';

class UserController extends BaseController {
  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = res.locals.userId;

      if (Number(id) !== Number(userId)) {
        return this.forbidden(res, new ForbiddenResource());
      }

      const user = await userRepository.findUserById(id);

      if (!user) {
        return this.notFound(res, new UserNotFoundError(id));
      }

      return this.ok(res, user);
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const userData = new User({ login: req.body.login, password: req.body.password });

      const { user, error, accessToken, refreshToken } = await UserService.createUser(userData);

      if (error) {
        return this.badRequest(res, error);
      }

      return this.ok(res, {
        user: omit(user.toJSON(), ['passwordHash']),
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }
}

const userController = new UserController();

export { userController };
