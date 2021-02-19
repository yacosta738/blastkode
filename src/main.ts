// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
import Vuex from 'vuex'

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex)
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
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  })

  Vue.use(VueFuse)

  head.meta.push({
    name: 'keywords',
    content: 'Gridsome,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS, Portfolio, Yuniel Acosta'
  })

  head.meta.push({
    name: 'description',
    content: `Yuniel Acosta's blog and portfolio`
  })

  head.meta.push({
    name: 'author',
    content: 'Yuniel Acosta'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
  })
}


