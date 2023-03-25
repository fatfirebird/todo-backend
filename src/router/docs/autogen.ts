import 'module-alias/register';
import { HttpError } from '../../core/errors';
import createSwaggerAutogen from 'swagger-autogen';
import { Meta } from '../../core/meta';
import { TaskStatus } from '@/modules/task/task-entity';
import { TagModel, TaskModel } from '@/database/models';
import { GetTaskListQueryParams } from '@/modules/task/task-types';
import { GetTagListQueryParams } from '@/modules/tag/tag.types';
import { UserModel } from '@/database/models/user-model';
import { omit } from '@/core/omit';

const swaggerAutogen = createSwaggerAutogen({
  autoQuery: true,
  autoHeaders: true,
  autoBody: true,
  openapi: '3.0.0',
});

const error = new HttpError({
  message: 'Error message',
  field: 'field',
  value: 'value',
});

const meta = { ...new Meta({ limit: 10, offset: 0 }), count: 20 };
const tag = TagModel.build({ id: 1, color: 'red', name: 'important' }).toJSON();
const task = TaskModel.build(
  { id: 1, text: 'very important task', status: TaskStatus.todo },
  { include: TagModel },
).toJSON();
const user = omit(UserModel.build({ id: 1, login: 'login', passwordHash: 'hash' }).toJSON(), ['passwordHash']);

const getTaskListQueryParams: GetTaskListQueryParams = {
  limit: 10,
  offset: 0,
  status: TaskStatus.todo,
  order: {
    id: 'asc',
  },
};

const getTagListQueryParams: GetTagListQueryParams = {
  limit: 10,
  offset: 0,
};

const token = 'jwt.token.example';

const tokens = {
  accessToken: token,
  refreshToken: token,
};

const doc = {
  info: {
    title: 'Task api',
    version: '1.0.0',
    description: 'Simple task manager app',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  tags: [
    {
      name: 'task',
      description: 'task tracking',
    },
    {
      name: 'tag',
      description: 'tags for task marking',
    },
    {
      name: 'auth',
      description: 'authorization tokens',
    },
    {
      name: 'user',
      description: 'user profile',
    },
  ],
  definitions: {
    TaskList: {
      data: {
        tasks: [task, task],
        meta,
      },
    },
    Task: {
      data: task,
    },
    TagList: {
      data: {
        tags: [tag, tag],
        meta,
      },
    },
    Tag: {
      data: tag,
    },
    Meta: {
      meta,
    },
    Error: {
      error,
    },
    ValidationError: {
      error: {
        fieldName: error,
      },
    },
    Tokens: tokens,
    User: user,
    UserWithTokens: { user, ...tokens },
    GetTaskListQueryParams: getTaskListQueryParams,
    GetTagListQueryParams: getTagListQueryParams,
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['../../app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
