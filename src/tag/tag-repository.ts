import { TagModel } from '../database/models';
import { Tag } from './tag-entity';

class TagRepository {
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
