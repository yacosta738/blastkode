export interface SocialMedia {
    name?: string;
    url?: string;
}

export interface Menu {
    name?: string;
    url?: string;
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
    },
    {
        name: 'Experience',
        url: '/#jobs',
    },
    {
        name: 'Work',
        url: '/#projects',
    },
    {
        name: 'Contact',
        url: '/#contact',
    },
];

export default {email, socialMedia, navMenus};
