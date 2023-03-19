import { BaseController } from '@/core/base-controller';
import { omit } from '@/core/omit';
import { Response, Request } from 'express';
import { User } from './user-entity';
import { UserNotFoundError } from './user-error';
import { UserRepository } from './user-repository';
import { UserService } from './user-service';

class UserController extends BaseController {
  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const user = await UserRepository.findUserById(id);

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

      const { user, error } = await UserService.createUser(userData);

      if (error) {
        this.badRequest(res, error);
      }

      const data = omit(user.toJSON(), ['passwordHash']);

      return this.ok(res, data);
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }
}

const userController = new UserController();

export { userController };
