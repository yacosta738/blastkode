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
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons/faFolderOpen.js';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt.js';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight.js';
import {faTags} from '@fortawesome/free-solid-svg-icons/faTags.js';
import '@fortawesome/fontawesome-svg-core/styles.css';
import VueScreen from 'vue-screen';

config.autoAddCss = false;
library.add(faGithub, faTwitter, faInstagram, faLinkedin, faCodepen, faExternalLinkAlt, faFolder, faVuejs, faCalendarAlt, faChevronRight, faTags,
    faFolderOpen);
const init = () => {
    //@ts-ignore
    if (process.isClient){
        document.addEventListener('DOMContentLoaded', function () {
            try {
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                if (!isSafari) {
                    const imageUrl = window.location.origin + '/images/you-are-the-best.png'
                    const css = `padding:200px 0 0 0;text-align:bottom;font-size: 1.5rem;background:url(${imageUrl}) no-repeat left top;background-size:200px`
                    console.log("%c So, you're reading the console messages - how geeky! 🤓", css)
                }
            } catch (error) {
            }
        })
    }
}

export default function(Vue, {router, head, isClient, appOptions}) {
    init();
    // Store
    Vue.use(Vuex);
    // Vue Screen
    Vue.use(VueScreen);
    appOptions.store = new Vuex.Store({
        state: {
            //@ts-ignore
            theme: (process.isClient) ? !localStorage.getItem('theme') || 'theme-dark' : 'theme-dark',
            postId: -1,
            drawer: false
        },
        mutations: {
            toggleTheme(state) {
                const newTheme = state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
                //@ts-ignore
                if (process.isClient) {
                    localStorage.setItem('theme', newTheme);
                }
                state.theme = newTheme;
            },
            changePostId(state, id){
                state.postId = id;
            },
            toggle(state){
                state.drawer = !state.drawer;
            },
            updateDrawer(state, drawer){
                console.log(`update the drawer state old ${state.drawer} new ${drawer}`);
                state.drawer = drawer;
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


