// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import VueScrollTo from 'vue-scrollto';
import VueFuse from 'vue-fuse';
import VueScreen from 'vue-screen';
import {isClient} from '~/util/utilities';
import initFontawesome from '~/config/fontawesome';
import initStore from '~/config/store';
import initVueScrollReveal from '~/config/vue-scroll-reveal';
import VueDisqus from 'vue-disqus';

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
    if (isClient && process.env.NODE_ENV === 'production') {
        require('./registerServiceWorker')
    }
    if (isClient) {
        // Vue Scroll Reveal
        initVueScrollReveal(Vue, isClient);
        
    }
    // Fontawesome
        initFontawesome(Vue);
    // Vue Disqus
    Vue.use(VueDisqus, {shortname: 'blastkode'});
    // Vue Screen
    Vue.use(VueScreen);
    // Store
    appOptions.store = initStore(Vue, isClient);

    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);

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


