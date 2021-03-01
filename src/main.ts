// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import VueScrollTo from 'vue-scrollto';
import VueFuse from 'vue-fuse';
import Vuex from 'vuex';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {config, library} from '@fortawesome/fontawesome-svg-core';
import {faCodepen, faGithub, faInstagram, faLinkedin, faTwitter, faVuejs} from '@fortawesome/free-brands-svg-icons';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt.js';
import {faFolder} from '@fortawesome/free-solid-svg-icons/faFolder.js';
import '@fortawesome/fontawesome-svg-core/styles.css';
import VueScreen from 'vue-screen';

config.autoAddCss = false;
library.add(faGithub, faTwitter, faInstagram, faLinkedin, faCodepen, faExternalLinkAlt, faFolder, faVuejs);

export default function(Vue, {router, head, isClient, appOptions}) {
    // Store
    Vue.use(Vuex);
    // Vue Screen
    Vue.use(VueScreen);
    appOptions.store = new Vuex.Store({
        state: {
            theme: localStorage.getItem('theme') || 'theme-dark'
        },
        mutations: {
            toggleTheme(state) {
                const newTheme = state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
                localStorage.setItem('theme', newTheme);
                state.theme = newTheme;
            }
        }
    });

    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    // Set font-awesome as a global component
    Vue.component('font-awesome', FontAwesomeIcon);

    Vue.use(VueScrollTo, {
        duration: 500,
        easing: "ease",
    });

    Vue.use(VueFuse);

    head.meta.push({
        name: 'keywords',
        content: 'Gridsome,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS, Portfolio, Yuniel Acosta'
    });

    head.meta.push({
        name: 'description',
        content: `Yuniel Acosta's blog and portfolio`
    });

    head.meta.push({
        name: 'author',
        content: 'Yuniel Acosta'
    });

    head.link.push({
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
    });
}


