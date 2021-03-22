<template>
  <footer v-scroll-reveal.reset>
    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center m-5">
      <div class="flex flex-col items-center">
        <ul class="flex flex-wrap relative list-none p-0 md:hidden">
          <li class="my-2 text-light-slate font-mono text-3xl whitespace-nowrap mx-1" v-for="social in socialMedia">
            <g-link :href="social.url"><font-awesome :icon="['fab', social.name.toLowerCase() ]"/></g-link>
          </li>
        </ul>
        <p class="text-sm text-lightest-slate font-mono">Built by Yuniel Acosta</p>
        <p class="text-xs text-light-slate font-mono my-2">Design based on Brittany Chiang portfolio
        </p>
        <ul class="flex flex-wrap relative list-none p-0">
          <li class="my-2 text-light-slate font-mono text-xs whitespace-nowrap mx-1">
            <font-awesome :icon="['fab', 'vuejs']"/>
          </li>
          <li class="my-2 text-light-slate font-mono text-xs whitespace-nowrap mx-1">
            <graph-ql-icon :size="size" fill="currentColor"/>
          </li>
          <li class="my-2 text-light-slate font-mono text-xs whitespace-nowrap mx-1">
            <netlify-icon :size="size" fill="currentColor"/>
          </li>
          <li class="my-2 text-light-slate font-mono text-xs whitespace-nowrap mx-1">
            <gridsome-icon :size="size" fill="currentColor"/>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
//@ts-ignore
import {GraphQlIcon, GridsomeIcon, NetlifyIcon} from "vue-simple-icons";
import {socialMedia, SocialMedia} from '~/config/config';

@Component({components: {GraphQlIcon, NetlifyIcon, GridsomeIcon}})
export default class FooterSection extends Vue {

  get socialMedia(): SocialMedia[] {
    return socialMedia;
  }

  get size(){
    switch (this.$screen.breakpoint){
      case 'xs':return '1x';
      case 'sm':return '1.1x';
      case 'md':return '1.2x';
      case 'xl':return '1.2x';
    }
    return '1.2x';
  }
}
</script>

<style scoped>

</style>
