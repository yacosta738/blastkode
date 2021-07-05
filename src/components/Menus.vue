<template>
  <ul
      class="uppercase tracking-wide font-bold overflow-y-auto origin-top-right w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
      :class="$store.state.drawer ? 'block': 'hidden'"
      data-cypress="menu"
  >
    <li class="mb-6 lg:mb-0">
      <div class="text-lightest-slate hover:text-gray-600 cursor-pointer">
        <font-awesome :icon="['fa', 'search']"
                      class="cursor-pointer mt-3" @click="openSearchBox()"/>
      </div>
    </li>
    <!--    <li>-->
    <!--      <theme-switcher/>-->
    <!--    </li>-->
    <li>
      <ol class="order-list lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0">
        <li v-for="(menu, i) in menus" :key="i">
          <g-link v-if="$route.path === '/'" :to="menu.url" v-scroll-to="menu.vScrollTo" class="close-menu-dummy"
                  data-cypress="projects">{{ menu.name }}
          </g-link>
          <g-link v-else :to="menu.url" class="close-menu-dummy">{{ menu.name }}</g-link>
        </li>
      </ol>
    </li>
    <li>
      <locale-switcher/>
    </li>
    <li>
      <g-link to="../../static/files/Yuniel.Acosta.CV.pdf"
              target="_blank" class="resume-button">Resume
      </g-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Menu, navMenus} from '~/config/config';
import {addEventToClassName} from '~/util/utilities';

const ThemeSwitcher = () => import('./ThemeSwitcher.vue');
const LocaleSwitcher = () => import('./shared/LocaleSwitcher.vue');

@Component({components: {ThemeSwitcher, LocaleSwitcher}})
export default class Menus extends Vue {
  get menus(): Menu[] {
    return navMenus;
  }

  private closeMenu(): void {
    this.$store.commit('updateDrawer', false);
    setTimeout(() => {
      this.$store.commit('updateShowNavbar', true);
    }, 2000);
  }

  mounted() {
    addEventToClassName('close-menu-dummy', this.closeMenu);
  }

  openSearchBox() {
    this.$store.commit('toggleSearchModal');
    this.$store.commit('updateDrawer', false);
    if (this.$store.state.searchModal) {
      const searchBox = document.getElementById('search-box');
      if (searchBox) {
        searchBox.autofocus = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
