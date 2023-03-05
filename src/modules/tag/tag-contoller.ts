import { Response, Request } from 'express';
import { BaseController } from '@/core/base-controller';
import { Meta } from '@/core/meta';
import { Tag } from './tag-entity';
import { TagNotFoundError } from './tag-error';
import { TagRepository } from './tag-repository';
import { GetTagListQueryParams } from './tag.types';

class TagController extends BaseController {
  constructor() {
    super();
  }

  async getTagList(req: Request<unknown, unknown, unknown, GetTagListQueryParams>, res: Response) {
    try {
      const meta = new Meta({ offset: req.query.offset, limit: req.query.limit });

      const tags = await TagRepository.findAll(meta);

      return this.ok(res, { tags: tags.rows, meta: { ...meta, count: tags.count } });
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async getTag(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const tag = await TagRepository.findTagByID(id);

      if (!tag) {
        return this.notFound(res, new TagNotFoundError(id));
      }

      return this.ok(res, tag.toJSON());
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async createTag(req: Request, res: Response) {
    try {
      const tagData = new Tag(req.body);
      const tag = await TagRepository.createTag(tagData);

      return this.ok(res, tag.toJSON());
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async deleteTag(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deletedTags = await TagRepository.deleteTag(id);

      if (!deletedTags) {
        return this.notFound(res, new TagNotFoundError(id));
      }

      return this.ok(res);
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }

  async updateTag(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const tagData = new Tag(req.body);
      const tag = await TagRepository.updateTag(tagData, id);

      if (!tag) {
        return this.notFound(res, new TagNotFoundError(id));
      }

      return this.ok(res, tag.toJSON());
    } catch (error) {
      return this.handleCatchError(res, error);
    }
  }
}

const tagController = new TagController();

export { tagController };
