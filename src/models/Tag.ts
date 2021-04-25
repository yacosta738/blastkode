export interface ITag {
  id?: string;
  title?: string;
  path?: string;
  totalCountInArticles?: number;
}

export default class Tag implements ITag {
  constructor(
    public id?: string,
    public title?: string,
    public path?: string,
    public totalCountInArticles?: number
  ) {
    this.totalCountInArticles = this.totalCountInArticles || 0;
  }

  static fromJson(node): Tag {
    return node.belongsTo?.totalCount
      ? new Tag(node.id, node.title, node.path, node.belongsTo?.totalCount)
      : new Tag(node.id, node.title);
  }
}
