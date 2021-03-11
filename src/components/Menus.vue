<template>
  <ul
      class="uppercase tracking-wide font-bold overflow-y-auto origin-top-right w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
      :class="$store.state.drawer ? 'block': 'hidden'"
      data-cypress="menu"
  >
    <!--        <li class="mb-6 lg:mb-0">-->
    <!--          <search-input/>-->
    <!--        </li>-->
    <li>
      <theme-switcher/>
    </li>
    <li>
      <ol class="order-list lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0">
        <li v-for="(menu, i) in menus" :key="i">
          <g-link v-if="$route.path === '/'" :to="menu.url" v-scroll-to="menu.vScrollTo" class=""
                  @click="$store.commit('updateDrawer',false)"
                  data-cypress="projects">{{ menu.name }}
          </g-link>
          <g-link @click="$store.commit('updateDrawer',false)" v-else :to="menu.url" class="">{{ menu.name }}</g-link>
        </li>
      </ol>
    </li>
    <li>
      <g-link to="/" @click="$store.commit('updateDrawer',false)" class="resume-button">Resume</g-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Menu, navMenus} from '~/config';
import ThemeSwitcher from './ThemeSwitcher.vue';

@Component({components: {ThemeSwitcher}})
export default class Menus extends Vue {
  get menus(): Menu[] {
    return navMenus;
  }
}
</script>

<style scoped>

</style>
