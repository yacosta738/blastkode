<template>
  <section id="projects">
    <h2 class="numbered-heading">Some Things I’ve Built</h2>
    <div>
      <featured-projects v-for="(project, i) in featuredProjects" :key="project.id" :project="project" :layout="(i%2 ===0)?'left':'right'"/>
    </div>
  </section>
</template>
<static-query>
# Write your query or mutation here
query Project ($page: Int) {
projects: allProject (sortBy: "date", order: DESC, perPage: 3, page: $page) @paginate {
totalCount
pageInfo {
totalPages
currentPage
}
edges {
node {
id
title
date (format: "MMMM D, Y")
cover
github
external
tech
showInProjects
featured
content
}
}
}
}
</static-query>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import FeaturedProjects from "@/components/FeaturedProjects.vue"
import Project from '~/models/Project';

@Component({components:{FeaturedProjects}})
export default class Projects extends Vue {

  get allProjects(): Project[] {
    // @ts-ignore
    return this.$static.projects.edges.map(edge => Project.fromJson(edge.node));
  }

  get featuredProjects(): Project[] {
    console.log(this.allProjects)
    return this.allProjects.filter(project => project.featured);
  }
}
</script>

<style scoped>

</style>
