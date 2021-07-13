export interface ICategory {
  id?: string;
  title?: string;
  path?: string;
  lang?: string[];
  totalCountInArticles?: number;
}

export default class Category implements ICategory {
  static fromJson(node): Category {
    return node?.belongsTo?.totalCount
      ? new Category(node?.id, node?.title, node?.path, node?.lang,
        node?.lang.length > 1 ? node?.belongsTo?.totalCount - (node?.lang.length - 1) : node?.belongsTo?.totalCount)
      : new Category(node?.id, node?.title, node?.path, node?.lang);
  }
  constructor(
    public id?: string,
    public title?: string,
    public path?: string,
    public lang?: string[],
    public totalCountInArticles?: number
  ) {
    this.totalCountInArticles = this.totalCountInArticles || 0;
  }
}
