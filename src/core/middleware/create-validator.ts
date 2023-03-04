import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorMapper } from '../mappers/error-mapper';

export const createValidator =
  (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const errors = await validation.run(req);

      if (!errors.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req).formatWith(errorMapper);

    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ error: errors.mapped() });
  };
