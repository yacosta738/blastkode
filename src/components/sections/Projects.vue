<template>
  <section id="projects" class="mx-4 md:mx-auto" v-scroll-reveal.reset>
    <featured-projects v-if="featuredProjects.length > 0"  :projects="featuredProjects" />
    <common-projects v-if="commonProjects.length > 0" :projects="commonProjects"/>
  </section>
</template>
<static-query>
# Write your query or mutation here
query {
  featuredProjects: allProject(sortBy: "date", order: DESC, filter: { draft: { eq: false }, featured: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        cover
        github
        external
        ios
        android
        company
        tech
        showInProjects
        featured
        content
      }
    }
  }
  commonProjects: allProject(sortBy: "date", order: DESC, filter: { draft: { eq: false }, showInProjects: { eq: true }, featured: {eq: false}}) {
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        cover
        github
        external
        ios
        android
        company
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
