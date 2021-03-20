<template>
  <ul
      class="uppercase tracking-wide font-bold overflow-y-auto origin-top-right w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
      :class="$store.state.drawer ? 'block': 'hidden'"
      data-cypress="menu"
  >
    <!--        <li class="mb-6 lg:mb-0">-->
    <!--          <search-input/>-->
    <!--        </li>-->
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
      <g-link to="../../static/files/Yuniel.Acosta.CV.pdf"
              target="_blank" class="resume-button">Resume
      </g-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Menu, navMenus} from '~/config/config';
import ThemeSwitcher from './ThemeSwitcher.vue';
import {addEventToClassName} from '~/util/utilities';

@Component({components: {ThemeSwitcher}})
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
}
</script>

<style scoped>

</style>
