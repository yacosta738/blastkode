export interface ICategory {
    id?: string;
    title?: string;
    totalCountInArticles?: number;
}

export default class Category implements ICategory {
    constructor(public id?: string, public title?: string, public totalCountInArticles?: number) {
    }

    static fromJson(node): Category {
        return (node.belongsTo?.totalCount) ? new Category(node.id, node.title, node.belongsTo?.totalCount) : new Category(node.id, node.title);
    }
}

