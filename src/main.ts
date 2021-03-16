// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import VueScrollTo from 'vue-scrollto';
import VueFuse from 'vue-fuse';
import Vuex from 'vuex';
import VueScreen from 'vue-screen';
import {isClient} from '~/util/utilities';
import initFontawesome from '~/config/fontawesome';

const init = (appOptions) => {
    if (isClient()) {
        document.addEventListener('DOMContentLoaded', function() {
            appOptions.store.commit('updateShowNavbar', true);
            try {
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                if (!isSafari) {
                    const imageUrl = window.location.origin + '/images/you-are-the-best.png';
                    const css = `padding:200px 0 0 0;text-align:bottom;font-size: 1.5rem;background:url(${imageUrl}) no-repeat left top;background-size:200px`;
                    console.log("%c So, you're reading the console messages - how geeky! 🤓", css);
                }
            } catch (error) {
            }
        });
    }
};

export default function(Vue, {router, head, isClient, appOptions}) {
    init(appOptions);
    // Store
    Vue.use(Vuex);
    // Vue Screen
    Vue.use(VueScreen);
    appOptions.store = new Vuex.Store({
        state: {
            theme: (isClient) ? !localStorage.getItem('theme') || 'theme-dark' : 'theme-dark',
            postId: -1,
            drawer: false,
            showNavbar: true,
            showSide: true,
            loading: false,
            firstTimeLoading: true
        },
        mutations: {
            toggleTheme(state) {
                const newTheme = state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
                if (isClient) {
                    localStorage.setItem('theme', newTheme);
                }
                state.theme = newTheme;
            },
            changePostId(state, id) {
                state.postId = id;
            },
            toggle(state) {
                state.drawer = !state.drawer;
            },
            updateDrawer(state, drawer) {
                state.drawer = drawer;
            },
            updateShowNavbar(state, showNavbar) {
                state.showNavbar = showNavbar;
            },
            updateShowSide(state, showSide) {
                state.showSide = showSide;
            },
            updateFirstTimeLoading(state, firstTimeLoading) {
                state.firstTimeLoading = firstTimeLoading;
            },
            loadingOn(state) {
                state.loading = !state.loading;
            },
            loadingOff(state) {
                state.loading = !state.loading;
            }
        }
    });

    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    initFontawesome(Vue);

    Vue.use(VueScrollTo, {
        duration: 500,
        easing: "ease",
    });

    Vue.use(VueFuse);

    head.meta.push({
        name: 'keywords',
        content: 'Gridsome,Vue,Tailwind,Tailwind CSS,JavaScript, Typescript,HTML,CSS,Vue.js,VueJS, Blog, Portfolio, Yuniel Acosta'
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


