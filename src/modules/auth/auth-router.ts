import { Router } from 'express';
import { validateUserData } from '../user/middleware/validate-user-data';
import { authController } from './auth-controller';

const authRouter = Router();

authRouter.post(
  '/refresh',
  // #swagger.tags = ['auth']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Tokens' }
    } */
  /* #swagger.responses[400] = {
        schema: { $ref: '#/definitions/ValidationError' }
} */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  (req, res) => authController.refreshToken(req, res),
);

authRouter.post(
  '/login',
  validateUserData(),
  // #swagger.tags = ['auth']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/UserWithTokens' }
    } */
  /* #swagger.responses[400] = {
        schema: { $ref: '#/definitions/ValidationError' }
} */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  (req, res) => authController.login(req, res),
);

export { authRouter };
