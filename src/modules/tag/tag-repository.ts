import { Op } from 'sequelize';
import { Meta } from '@/core/meta';
import { TagModel } from '@/database/models';
import { Tag } from './tag-entity';

class TagRepository {
  static async findAllByIds(ids: number[]) {
    return await TagModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  static async findAll(meta: Meta, userId: number) {
    return await TagModel.findAndCountAll({
      offset: meta.offset,
      limit: meta.limit,
      where: {
        userId,
      },
    });
  }

  static async findTagByID(id: string) {
    return await TagModel.findOne({
      where: {
        id,
      },
    });
  }

  static async createTag({ data }: Tag, userId: number) {
    return await TagModel.create({ ...data, userId });
  }

  static async deleteTag(id: string) {
    return await TagModel.destroy({
      where: {
        id,
      },
    });
  }
}

export { TagRepository };
