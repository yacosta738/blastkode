import Tech, {ITech} from '~/models/Tech';
import {Image} from '~/models/Image';
import {urlize} from '~/util/utilities';

const allTech = require('@/data/tech.json');

export interface IProject {
    id?: string | undefined;
    title?: string | undefined;
    date?: string | Date | undefined;
    cover?: string | Image;
    github?: string | undefined;
    external?: string | undefined;
    tech?: ITech[];
    showInProjects?: boolean;
    featured?: boolean;
    content?: string | undefined;
}

export default class Project implements IProject {

    constructor(public id?: string, public title?: string, public date?: string | Date, public cover?: string | Image,
                public github?: string, public external?: string, public tech?: ITech[], public showInProjects?: boolean,
                public featured?: boolean, public content?: string) {
    }

    static fromJson(node): Project {
        const techId = node.tech.map(tech => urlize(tech));
        const tech = allTech.tech.filter(te => techId.includes(te.id)).map(t =>  new Tech(t.id, t.name, t.icon, t.url));
        return new Project(node.id, node.title, node.date, Image.fromJson(node.cover), node.github, node.external, tech,
            node.showInProjects, node.featured, node.content);
    }
}
