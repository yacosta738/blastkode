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

export const email = 'yunielacosta738@gmail.com';

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
import Vue from 'vue';

export const navMenus: Menu[] = [
  {
    name: 'about',
    url: '/#about',
    dataCypress: 'about',
    vScrollTo: '#about',
  },
  {
    name: 'experience',
    url: '/#jobs',
    dataCypress: 'jobs',
    vScrollTo: '#jobs',
  },
  {
    name: 'work',
    url: '/#projects',
    dataCypress: 'projects',
    vScrollTo: '#projects',
  },
  {
    name: 'last-articles',
    url: '/#last3articles',
    dataCypress: 'last3articles',
    vScrollTo: '#plast3articles',
  },
  {
    name: 'contact',
    url: '/#contact',
    dataCypress: 'contact',
    vScrollTo: '#contact',
  },
  {
    name: 'blog',
    url: '/blog/',
    dataCypress: 'blog',
  },
];
export const navDelay = 1000;
export const loaderDelay = 2000;

export default { email, socialMedia, navMenus, navDelay, loaderDelay };
