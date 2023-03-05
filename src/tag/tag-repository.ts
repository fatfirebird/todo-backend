import { Op } from 'sequelize';
import { Meta } from '../core/meta';
import { TagModel } from '../database/models';
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

  static async findAll(meta: Meta) {
    return await TagModel.findAndCountAll({
      offset: meta.offset,
      limit: meta.limit,
    });
  }

  static async findTagByID(id: string) {
    return await TagModel.findOne({
      where: {
        id,
      },
    });
  }

  static async createTag({ data }: Tag) {
    return await TagModel.create(data);
  }

  static async deleteTag(id: string) {
    return await TagModel.destroy({
      where: {
        id,
      },
    });
  }

  static async updateTag(tagData: Partial<Tag>, id: string) {
    const tag = await this.findTagByID(id);

    if (!tag) {
      return null;
    }

    await tag.update({ color: tagData.color, name: tagData.name });

    return tag;
  }
}

export { TagRepository };
