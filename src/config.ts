export interface SocialMedia {
    name?: string;
    url?: string;
}

export interface Menu {
    name?: string;
    url?: string;
    dataCypress?: string;
    vScrollTo?: string;
}

export const email: string = 'yunielacosta738@gmail.com';

export const socialMedia: SocialMedia[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/yacosta738',
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/yacosta738',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/yacosta738',
    },
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/yacosta738',
    },
    {
        name: 'Codepen',
        url: 'https://codepen.io/yacosta738',
    },
];

export const navMenus: Menu[] = [
    {
        name: 'About',
        url: '/#about',
        dataCypress: 'about',
        vScrollTo: '#about'
    },
    {
        name: 'Experience',
        url: '/#jobs',
        dataCypress: 'jobs',
        vScrollTo: '#jobs'
    },
    {
        name: 'Work',
        url: '/#projects',
        dataCypress: 'projects',
        vScrollTo: '#projects'
    },
    {
        name: 'Last Articles',
        url: '/#last3articles',
        dataCypress: 'last3articles',
        vScrollTo: '#plast3articles'
    },
    {
        name: 'Contact',
        url: '/#contact',
        dataCypress: 'contact',
        vScrollTo: '#contact'
    },
    {
        name: 'Blog',
        url: '/blog',
        dataCypress: 'blog'
    },
];
export const navDelay = 1000;
export const loaderDelay = 2000;

export default {email, socialMedia, navMenus, navDelay, loaderDelay};
