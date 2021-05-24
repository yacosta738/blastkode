import Tag, { ITag } from '~/models/Tag';
import Category, { ICategory } from '~/models/Category';
import { Image } from '~/models/Image';

export interface IArticle {
  id?: string;
  title?: string;
  date?: Date | string;
  path?: string;
  timeToRead?: number;
  summary?: string;
  tags?: ITag[];
  categories?: ICategory[];
  author?: string;
  cover?: Image | string;
  content?: string;
}

export default class Article implements IArticle {
  static fromJson(node): Article {
    return new Article(
      node?.id,
      node?.title,
      node?.date,
      node?.path,
      node?.timeToRead,
      node?.summary,
      node?.tags?.map(tag => Tag.fromJson(tag)),
      node?.categories?.map(category => Category.fromJson(category)),
      node?.author,
      node?.cover && Image.fromJson(node?.cover),
      node?.content
    );
  }
  constructor(
    public id?: string,
    public title?: string,
    public date?: Date | string,
    public path?: string,
    public timeToRead?: number,
    public summary?: string,
    public tags?: ITag[],
    public categories?: ICategory[],
    public author?: string,
    public cover?: Image | string,
    public content?: string
  ) {}
}
