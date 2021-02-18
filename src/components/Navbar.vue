<template>
  <header class="fixed z-10 w-full"
          :class="{ 'navbar--hidden': !showNavbar, 'navbar--show':scrollDirection === 'UP' && lastScrollPosition !== 0 }">
    <nav id="acosta-navbar" class="relative flex flex-wrap justify-between items-center py-4">
      <div>
        <g-link v-if="theme === 'theme-light'" to="/">
          <g-image src="../../static/logo.svg" class="w-40" alt="logo"/>
        </g-link>
        <g-link v-else to="/">
          <g-image src="../../static/logo_dark_mode.svg" class="w-40" alt="logo"/>
        </g-link>
      </div>
      <div class="block lg:hidden">
        <button @click="toggle"
                class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600"
                data-cypress="hamburger">
          <svg class="current-color h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="gray"/>
          </svg>
        </button>
      </div>
      <ul
          class="uppercase tracking-wide font-bold w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
          :class="isOpen ? 'block': 'hidden'"
          data-cypress="menu"
      >
        <li class="mb-6 lg:mb-0">
          <search-input/>
        </li>
        <li>
          <theme-switcher :theme="theme" @themeChanged="updateTheme"/>
        </li>
        <li>
          <ol class="order-list lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0">
            <li>
              <a v-if="$route.path === '/'" href="/#projects" v-scroll-to="'#projects'" class=""
                 data-cypress="projects">Projects</a>
              <g-link v-else to="/#projects" class="">Projects</g-link>
            </li>
            <li>
              <a v-if="$route.path === '/'" href="/#about" v-scroll-to="'#about'" class=""
                 data-cypress="about">About</a>
              <g-link v-else to="/#about" class="">About</g-link>
            </li>
            <li>
              <a v-if="$route.path === '/'" href="/#contact" v-scroll-to="'#contact'" class="" data-cypress="contact">Contact</a>
              <g-link v-else to="/#contact" class="">Contact</g-link>
            </li>
            <li>
              <g-link to="/docs" class="" data-cypress="docs">Docs</g-link>
            </li>
            <li>
              <g-link to="/blog" class="" data-cypress="blog">Blog</g-link>
            </li>
          </ol>
        </li>
        <li><a href="/" class="resume-button">Resume</a></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SearchInput from '@/components/SearchInput.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

@Component({components: {SearchInput, ThemeSwitcher}})
export default class Navbar extends Vue {
  isOpen: boolean = false;
  theme: string = '';
  showNavbar: boolean = true;
  scrollDirection: string = 'DOWN';
  lastScrollPosition: number = 0;

  mounted() {
    this.theme = localStorage.getItem('theme') || 'theme-light';
    window.addEventListener('scroll', this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public updateTheme(theme) {
    this.theme = theme;
  }

  public onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < 0) {
      return;
    }
    // const navbar = document.getElementById('acosta-navbar');
    // // Stop executing this function if the difference between
    // // current scroll position and last scroll position is less than some offset
    // if (Math.abs(currentScrollPosition - this.lastScrollPosition) < navbar.offsetHeight) {
    //   return
    // }
    this.showNavbar = currentScrollPosition < this.lastScrollPosition;
    this.scrollDirection = (currentScrollPosition < this.lastScrollPosition) ? 'UP' : 'DOWN';
    this.lastScrollPosition = currentScrollPosition;
  }
}
</script>

<style scoped>

</style>
