<template>
  <Layout>
    <hero/>
    <about/>
    <jobs/>
    <projects/>
    <blog/>
    <contact/>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Hero from "@/components/sections/Hero.vue";
import About from "@/components/sections/About.vue";
import Jobs from "@/components/sections/Jobs.vue";
import Blog from "@/components/sections/Blog.vue";
import Projects from "@/components/sections/Projects.vue";
import Contact from "@/components/sections/Contact.vue";

@Component({components: {Hero, About, Jobs, Projects, Blog, Contact}})
export default class Home extends Vue {
  // metaInfo = {
  //   title: 'Home'
  // }
  title: string = 'Home';
}
</script>

