import { Response, Request } from 'express';
import { BaseController } from '../core/base-controller';
import { Tag } from './tag-entity';
import { TagNotFoundError } from './tag-error';
import { TagRepository } from './tag-repository';

class TagController extends BaseController {
  constructor() {
    super();
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
