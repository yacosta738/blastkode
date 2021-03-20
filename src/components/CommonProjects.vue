<template>
  <div class="flex flex-col items-center"  v-scroll-reveal.reset="{ delay: 550 }">
    <div class="mt-10 mb-20 text-center">
      <h2 class="section-title">Other Noteworthy Projects</h2>
      <g-link to="/projects/" class="inline-link">view all projects</g-link>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="project in projectsToShow" class="style-project-card">
        <div class="project-top">
          <font-awesome :icon="['fa', 'folder']"/>
          <project-links :project="project" position="center"></project-links>
        </div>
        <div class="text-center text-3xl text-lightest-slate my-2.5 font-bold">{{ project.title }}</div>
        <div class="project-description">
          <p v-html="project.content"/>
        </div>
        <project-tech-list :project="project" position="start" :showIcon="false"/>
      </div>
    </div>
    <button class="big-button m-5" @click="showMore=!showMore">{{ (showMore) ? 'Show Less' : 'Show More' }}</button>
  </div>

</template>

<script lang="ts">
import 'reflect-metadata';
import {Component, Prop, Vue} from "vue-property-decorator";
import ProjectLinks from "@/components/ProjectLinks.vue";
import ProjectTechList from "@/components/ProjectTechList.vue";
import Project from '~/models/Project';
import {inlineLinks} from '~/util/utilities';

@Component({components: {ProjectLinks, ProjectTechList}})
export default class CommonProjects extends Vue {
  @Prop({required: true}) readonly projects: Project[] | undefined;
  showMore: boolean = false;

  get projectsToShow() {
    const GRID_LIMIT = 6;
    const firstSix: Project[] = (this.projects) ? this.projects.slice(0, GRID_LIMIT) : [];
    return this.showMore ? this.projects : firstSix;
  }

  mounted(): void {
    inlineLinks('project-description');
  }
}
</script>

<style scoped>
.style-project-card {
  @apply rounded overflow-hidden bg-light-navy w-full h-full px-6 py-2 transform hover:-translate-y-2;
}

.section-title {
  @apply text-center text-3xl text-lightest-slate;
}

.project-top {
  @apply flex justify-between mt-2;
}

.project-top svg {
  color: var(--green);
  width: 40px;
  height: 40px;
}

.project-description {
  @apply text-left;
}
</style>
