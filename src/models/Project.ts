import Tech, { ITech } from '~/models/Tech';
import { Image } from '~/models/Image';
import { urlize } from '~/util/utilities';

const allTech = require('@/data/tech.json');

export interface IProject {
  id?: string | undefined;
  title?: string | undefined;
  lang?: string | undefined;
  date?: string | Date | undefined;
  cover?: string | Image | undefined;
  github?: string | undefined;
  external?: string | undefined;
  ios?: string | undefined;
  android?: string | undefined;
  company?: string | undefined;
  tech?: ITech[];
  showInProjects?: boolean;
  featured?: boolean;
  content?: string | undefined;
}

export default class Project implements IProject {
  static fromJson(node): Project {
    // tslint:disable-next-line:no-shadowed-variable
    const techId = node?.tech?.map(tech => urlize(tech));
    const tech = allTech?.tech
      ?.filter(te => techId?.includes(te.id))
      ?.map(t => new Tech(t.id, t.name, t.icon, t.url));
    return new Project(
      node?.id,
      node?.title,
      node?.lang,
      node?.date,
      node?.cover !== null ? Image.fromJson(node?.cover) : undefined,
      node?.github,
      node?.external,
      node?.ios,
      node?.android,
      node?.company,
      tech,
      node?.showInProjects,
      node?.featured,
      node?.content
    );
  }
  constructor(
    public id?: string,
    public title?: string,
    public lang?: string,
    public date?: string | Date,
    public cover?: string | Image,
    public github?: string,
    public external?: string,
    public ios?: string,
    public android?: string,
    public company?: string,
    public tech?: ITech[],
    public showInProjects?: boolean,
    public featured?: boolean,
    public content?: string
  ) {}
}
