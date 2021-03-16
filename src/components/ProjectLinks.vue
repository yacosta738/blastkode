<template>
  <div class="project-links" :class="classProjectLinks">
    <g-link v-if="project.github" :to="project.github" aria-label="GitHub Link" :class="classLinks">
      <font-awesome :icon="['fab', 'github' ]"/>
    </g-link>
    <g-link v-if="project.external" :to="project.external" aria-label="External Link" :class="classLinks">
      <font-awesome :icon="['fa', 'external-link-alt' ]"/>
    </g-link>
    <g-link v-if="project.ios" :to="project.ios" aria-label="AppStore Link" :class="classLinks">
      <app-store-icon :size="size" fill="currentColor" class="mb-1"/>
    </g-link>
    <g-link v-if="project.android" :to="project.android" aria-label="GooglePlay Link" :class="classLinks">
      <google-play-icon :size="size" fill="currentColor" class="mb-1"/>
    </g-link>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import {Component, Prop, Vue} from "vue-property-decorator";
import Project from '~/models/Project';
//@ts-ignore
import {AppStoreIcon, GooglePlayIcon} from "vue-simple-icons";

@Component({components:{AppStoreIcon, GooglePlayIcon}})
export default class ProjectLinks extends Vue {
  @Prop({default: 'end', type: String}) readonly position: string | undefined;

  @Prop({required: true}) readonly project: Project | undefined;

  get classProjectLinks() {
    return (this.position === 'end') ? 'justify-end' : (this.position === 'center') ? 'justify-center' : 'justify-start';
  }
  get classLinks() {
    return (this.position === 'end') ? 'mr-2' : (this.position === 'center') ? 'mx-1' : 'ml-2';
  }
  get size(){
    switch (this.$screen.breakpoint){
      case 'xs':return '1x';
      case 'sm':return '1.05x';
      case 'md':return '1.15x';
      case 'xl':return '1.1x';
    }
    return '1.2x';
  }
}
</script>

<style scoped>
.project-links {
  @apply flex flex-wrap relative p-0;
}
</style>
