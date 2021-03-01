export interface ITag {
    id?: string;
    title?: string;
}

export default class Tag implements ITag {
    constructor(public id?: string, public title?: string) {
    }
    static fromJson(node): Tag {
        return new Tag(node.id, node.title);
    }
}
