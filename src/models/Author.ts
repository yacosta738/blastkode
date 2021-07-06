import { Image } from '~/models/Image';

export interface IAuthor {
  id?: string;
  name?: string;
  lang?: string;
  path?: string;
  rol?: string;
  summary?: any;
  image?: Image | string;
  content?: string;
}

export default class Author implements IAuthor {
  static fromJson(node): Author {
    return new Author(
      node?.id,
      node?.name,
      node?.lang,
      node?.path,
      node?.rol,
      node?.summary,
      node?.image && Image.fromJson(node?.image),
      node?.content
    );
  }
  constructor(
    public id?: string,
    public name?: string,
    public lang?: string,
    public path?: string,
    public rol?: string,
    public summary?: any,
    public image?: Image | string,
    public content?: string
  ) {}
}
