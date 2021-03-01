export interface ICategory {
    id?: string;
    title?: string;
}

export default class Category implements ICategory {
    constructor(public id?: string, public title?: string) {
    }

    static fromJson(node): Category {
        return new Category(node.id, node.title);
    }
}

