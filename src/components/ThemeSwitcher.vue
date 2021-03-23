<template>
  <div class="text-lightest-slate hover:text-gray-600 cursor-pointer" @click.prevent="$store.commit('toggleTheme')"
       data-cypress="switchTheme">
    <svg v-if="theme === 'theme-light'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         class="feather feather-moon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun">
      <circle cx="12" cy="12" r="5"/>
      <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {isClient} from '~/util/utilities';

@Component
export default class ThemeSwitcher extends Vue {
  get theme(): string {
    return this.$store.state.theme;
  }
  created(){
    if (isClient() && !localStorage.getItem('theme') ){
      localStorage.setItem('theme', 'theme-dark');
    }
  }
}
</script>

