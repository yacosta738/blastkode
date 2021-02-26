<template>
  <div class="flex flex-col md:flex-row items-center my-28">
    <div v-if="layout === 'left'" class="w-3/5 text-center md:text-left">
      <div class="flex items-center justify-center md:text-left project-image">
        <a :href="(project.external)?project. external : project.github ? project.github : '#'">
          <g-image v-if="project.cover" class="object-cover img" :src="project.cover" :alt="project.title"/>
        </a>
      </div>
    </div>
    <div v-if="layout === 'left'" class="mt-8 lg:mt-0 w-2/5 relative z-10">
      <div class="text-center md:text-right -ml-28 transform -translate-x-2">
        <p class="text-green-500 font-mono text-sm font-normal py-2.5 pr-0">Featured Project</p>
        <h3 class="text-lightest-slate text-3xl">{{ project.title }}</h3>
        <div
            class="project-description relative rounded p-6 text-light-slate my-4 text-center md:text-right bg-light-navy text-xl">
          <p v-html="project.content" class="">
          </p>
        </div>
        <project-tech-list :project="project" position="end"/>

        <project-links :project="project" position="end"/>
      </div>
    </div>
    <div v-if="layout === 'right'" class="w-2/5 mt-8 lg:mt-0 relative z-10">
      <div class="text-center md:text-left -ml-28 transform translate-x-28">
        <p class="text-green-500 font-mono text-sm font-normal py-2.5 pl-0">Featured Project</p>
        <h3 class="text-lightest-slate text-3xl">{{ project.title }}</h3>
        <div
            class="project-description relative rounded p-6 text-light-slate my-4 text-center md:text-left bg-light-navy text-xl">
          <p v-html="project.content" class="">
          </p>
        </div>

        <project-tech-list :project="project" position="start"/>

        <project-links :project="project" position="start"/>
      </div>
    </div>
    <div v-if="layout === 'right'" class="w-3/5 text-center md:text-right">
      <div class="flex items-center justify-center md:text-right project-image">
        <a :href="(project.external)?project. external : project.github ? project.github : '#'">
          <g-image v-if="project.cover" class="object-cover img" :src="project.cover" :alt="project.title"/>
        </a>
      </div>
    </div>
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
export default class FeaturedProjects extends Vue {
  @Prop({required: true, type: String}) readonly layout: string | undefined;
  @Prop({required: true}) readonly project: Project | undefined;

  mounted(): void {
    inlineLinks('project-description');
  }
}
</script>

<style scoped>
.project-description {
  z-index: 2;
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  transition: var(--transition);
}

.project-description :hover {
  box-shadow: 0 20px 30px -15px var(--navy-shadow);
}

.project-image {
  z-index: 1;
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  transition: var(--transition);
}

.project-image:hover {
  box-shadow: 0 20px 30px -15px var(--navy-shadow);
}

.project-image a {
  width: 100%;
  background-color: var(--green);
  border-radius: 4px;
  vertical-align: middle;
}

.project-image a:hover, .project-image a:focus {
  background: transparent;
}

.project-image a {
  width: 100%;
  background-color: var(--green);
  vertical-align: middle;
}

.project-image a:hover, .project-image a:focus {
  background: transparent;
}

.project-image a:hover:before, .project-image a:focus:before, .project-image a:hover .img, .project-image a:focus .img {
  background: transparent;
  filter: none;
}

.project-image a:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  transition: var(--transition);
  background-color: var(--navy);
  mix-blend-mode: screen;
}

.project-image .img {
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);
}
</style>
