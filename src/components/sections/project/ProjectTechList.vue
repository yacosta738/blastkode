<template>
  <ul class="project-tech-list" :class="classProjectList">
    <li v-for="tech in project.tech" :key="tech.id"
        class="my-2 text-light-slate font-mono text-xs whitespace-nowrap" :class="classLinks">
      <g-link v-if="tech.url" class="flex" :to="tech.url">
        <font-awesome v-if="tech.icon && showIcon && tech.icon.type === 'font-awesome'"
                      :icon="(typeof tech.icon === 'string')?['fab', tech.icon]:[tech.icon.type, tech.icon.value ]"/>
        <simple-icon-wrapper v-if="tech.icon && showIcon && tech.icon.type === 'simple-icon'"
                             :icon-component="tech.icon.value"/>
        <iconify-wrapper v-if="tech.icon && showIcon && tech.icon.type === 'iconify'"
                         :icon="tech.icon.value"/>
        <span class="mx-1">{{ tech.name }}</span>
      </g-link>
      <span v-else>{{ tech.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import 'reflect-metadata';
import {Component, Prop, Vue} from "vue-property-decorator";
import Project from '~/models/Project';

const SimpleIconWrapper = () => import("~/components/icons/SimpleIconWrapper.vue");
const IconifyWrapper = () => import("~/components/icons/IconifyWrapper.vue");

@Component({components: {SimpleIconWrapper, IconifyWrapper}})
export default class ProjectTechList extends Vue {
  @Prop({default: 'end', type: String}) readonly position: string | undefined;
  @Prop({default: true, type: Boolean}) readonly showIcon: boolean | undefined;

  @Prop({required: true}) readonly project: Project | undefined;

  get classProjectList() {
    return (this.position === 'end') ? 'justify-end' : (this.position === 'center') ? 'justify-center' : 'justify-start';
  }

  get classLinks() {
    return (this.position === 'end') ? 'ml-3' : (this.position === 'center') ? 'mx-2' : 'mr-3';
  }
}
</script>

<style scoped>
.project-tech-list {
  z-index: 2;
  @apply flex flex-wrap relative list-none p-0 my-4;
}
</style>
