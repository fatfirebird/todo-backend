import { Router } from 'express';

const routerV1 = Router();

routerV1.get('/', (e, res) => {
  res.json('Hello world!');
});

export { routerV1 };
