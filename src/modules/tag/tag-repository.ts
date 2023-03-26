import { Op } from 'sequelize';
import { Meta } from '@/core/meta';
import { Tag } from './tag-entity';
import { db, Models } from '@/database/models';

class TagRepository {
  models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  async findAllByIds(ids: number[], userId: number) {
    return await this.models.tag.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
        userId,
      },
    });
  }

  async findAll(meta: Meta, userId: number) {
    return await this.models.tag.findAndCountAll({
      offset: meta.offset,
      limit: meta.limit,
      where: {
        userId,
      },
    });
  }

  async findTagByID(id: string) {
    return await this.models.tag.findOne({
      where: {
        id,
      },
    });
  }

  async createTag({ data }: Tag, userId: number) {
    return await this.models.tag.create({ ...data, userId });
  }

  async deleteTag(id: string) {
    return await this.models.tag.destroy({
      where: {
        id,
      },
    });
  }
}

const tagRepository = new TagRepository(db);

export { tagRepository };
