<template>
  <section id="projects">
    <h2 class="numbered-heading">Some Things I’ve Built</h2>
    <div>
      <featured-projects v-for="(project, i) in featuredProjects" :key="project.id" :project="project" :layout="(i%2 ===0)?'left':'right'"/>
    </div>
    <common-projects :projects="commonProjects"/>
  </section>
</template>
<static-query>
# Write your query or mutation here
query {
  featuredProjects: allProject(sortBy: "date", order: DESC, filter: { featured: { eq: true }}) {
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
  commonProjects: allProject(sortBy: "date", order: DESC, filter: { showInProjects: { eq: true }, featured: {eq: false}}) {
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
import CommonProjects from "@/components/CommonProjects.vue"
import Project from '~/models/Project';

@Component({components:{FeaturedProjects, CommonProjects}})
export default class Projects extends Vue {

  get featuredProjects(): Project[] {
    // @ts-ignore
    return this.$static.featuredProjects.edges.map(edge => Project.fromJson(edge.node));
  }
  get commonProjects(): Project[] {
    // @ts-ignore
    return this.$static.commonProjects.edges.map(edge => Project.fromJson(edge.node));
  }
}
</script>

<style scoped>

</style>
