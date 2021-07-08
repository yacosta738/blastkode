export interface IJob {
    id?: string;
    lang?: string;
    rol?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    company?: string;
    location?: string;
    url?: string;
    content?: string;
}

export default class Job implements IJob {

    static fromJson(node): Job {
        return new Job(node.id, node.lang, node.rol, new Date(node.start_date), new Date(node.end_date), node.company, node.location, node.url, node.content);
    }
    constructor(
        public id?: string,
        public lang?: string,
        public rol?: string,
        public startDate?: Date | string,
        public endDate?: Date | string,
        public company?: string,
        public location?: string,
        public url?: string,
        public content?: string,
    ) {
    }
}
