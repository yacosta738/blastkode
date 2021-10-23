export interface IJob {
  id?: string;
  lang?: string;
  role?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  company?: string;
  location?: string;
  url?: string;
  content?: string;
}

export default class Job implements IJob {
  static fromJson(node): Job {
    return new Job(
      node.id,
      node.lang,
      node.role,
      node.start_date,
      node.end_date,
      node.company,
      node.location,
      node.url,
      node.content
    );
  }

  constructor(
    public id?: string,
    public lang?: string,
    public role?: string,
    public startDate?: Date | string,
    public endDate?: Date | string,
    public company?: string,
    public location?: string,
    public url?: string,
    public content?: string
  ) {}
}
