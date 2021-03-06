export interface ICategory {
    id?: string;
    title?: string;
    path?: string;
    totalCountInArticles?: number;
}

export default class Category implements ICategory {
    constructor(public id?: string, public title?: string, public path?: string, public totalCountInArticles?: number) {
        this.totalCountInArticles = this.totalCountInArticles || 0;
    }

    static fromJson(node): Category {
        return (node.belongsTo?.totalCount) ? new Category(node.id, node.title, node.path, node.belongsTo?.totalCount) : new Category(node.id, node.title);
    }
}

