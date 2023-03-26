import { Response, Request } from 'express';
import { BaseController } from '@/core/base-controller';
import { Meta } from '@/core/meta';
import { Tag } from './tag-entity';
import { TagNotFoundError } from './tag-error';
import { tagRepository } from './tag-repository';
import { GetTagListQueryParams } from './tag.types';
import { ForbiddenResource } from '@/core/errors';

class TagController extends BaseController {
  constructor() {
    super();
  }

  async getTagList(req: Request<unknown, unknown, unknown, GetTagListQueryParams>, res: Response) {
    try {
      const meta = new Meta({ offset: req.query.offset, limit: req.query.limit });
      const userId = Number(res.locals.userId);

      const tags = await tagRepository.findAll(meta, userId);

      return this.ok(res, { tags: tags.rows, meta: { ...meta, count: tags.count } });
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async getTag(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = Number(res.locals.userId);

      const tag = await tagRepository.findTagByID(id);

      if (!tag) {
        return this.notFound(res, new TagNotFoundError(id));
      }

      if (tag?.userId !== userId) {
        return this.forbidden(res, new ForbiddenResource());
      }

      return this.ok(res, tag.toJSON());
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async createTag(req: Request, res: Response) {
    try {
      const { name, color } = req.body;
      const userId = Number(res.locals.userId);

      const tagData = new Tag({ name, color });
      const tag = await tagRepository.createTag(tagData, userId);

      return this.ok(res, tag.toJSON());
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async deleteTag(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userId = Number(res.locals.userId);

      const tag = await tagRepository.findTagByID(id);

      if (!tag) {
        return this.notFound(res, new TagNotFoundError(id));
      }

      if (tag.userId !== userId) {
        return this.forbidden(res, new ForbiddenResource());
      }

      await tag.destroy();

      return this.ok(res);
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async updateTag(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { name, color } = req.body;
      const userId = Number(res.locals.userId);

      const tagData = new Tag({ name, color });
      const tag = await tagRepository.findTagByID(id);

      if (!tag) {
        return this.notFound(res, new TagNotFoundError(id));
      }

      if (tag.userId !== userId) {
        return this.forbidden(res, new ForbiddenResource());
      }

      await tag.update({ color: tagData.color, name: tagData.name });

      return this.ok(res, tag.toJSON());
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }
}

const tagController = new TagController();

export { tagController };
