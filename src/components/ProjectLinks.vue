<template>
  <div class="project-links" :class="classProjectLinks">
    <a v-if="project.github" :href="project.github" aria-label="GitHub Link" :class="classLinks">
      <font-awesome :icon="['fab', 'github' ]"/>
    </a>
    <a v-if="project.external" :href="project.external" aria-label="External Link" :class="classLinks">
      <font-awesome :icon="['fa', 'external-link-alt' ]"/>
    </a>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import {Component, Prop, Vue} from "vue-property-decorator";
import Project from '~/models/Project';

@Component
export default class ProjectLinks extends Vue {
  @Prop({default: 'end', type: String}) readonly position: string | undefined;

  @Prop({required: true}) readonly project: Project | undefined;

  get classProjectLinks() {
    return (this.position === 'end') ? 'justify-end' : (this.position === 'center') ? 'justify-center' : 'justify-start';
  }
  get classLinks() {
    return (this.position === 'end') ? 'mr-2' : (this.position === 'center') ? 'mx-1' : 'ml-2';
  }
}
</script>

<style scoped>
.project-links {
  @apply flex flex-wrap relative p-0 text-lightest-slate;
}
</style>
