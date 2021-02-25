export interface ITech {
    id?: string;
    name?: string;
    icon?: string;
    url?: string;
}

export default class Tech implements ITech {
    constructor(public id?: string, public name?: string, public icon?: string, public url?: string) {
    }
}
