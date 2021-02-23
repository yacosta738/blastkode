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

export const KEY_CODES = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_LEFT_IE11: 'Left',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_RIGHT_IE11: 'Right',
    ESCAPE: 'Escape',
    ESCAPE_IE11: 'Esc',
    TAB: 'Tab',
    SPACE: ' ',
    SPACE_IE11: 'Spacebar',
    ENTER: 'Enter',
};

export default {email, socialMedia, navMenus, navDelay, loaderDelay, KEY_CODES};
