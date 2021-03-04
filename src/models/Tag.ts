export interface ITag {
    id?: string;
    title?: string;
    totalCountInArticles?: number;
}

export default class Tag implements ITag {
    constructor(public id?: string, public title?: string, public totalCountInArticles?: number) {
    }

    static fromJson(node): Tag {
        return (node.belongsTo?.totalCount) ? new Tag(node.id, node.title, node.belongsTo?.totalCount) : new Tag(node.id, node.title);
    }
}
