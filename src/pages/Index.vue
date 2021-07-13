<template>
  <Layout>
    <hero/>
    <about/>
    <jobs/>
    <projects/>
    <last-articles/>
    <contact/>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
const Hero = () => import("@/components/sections/Hero.vue");
const About = () => import("@/components/sections/About.vue");
const Jobs = () => import("@/components/sections/Jobs.vue");
const LastArticles = () => import("@/components/sections/LastArticles.vue");
const Projects = () => import("~/components/sections/project/Projects.vue");
const Contact = () => import("@/components/sections/Contact.vue");

@Component<Home>({
  components: {Hero, About, Jobs, Projects, LastArticles, Contact},
  metaInfo() {
    return {
      title: 'Home',
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  }
})
export default class Home extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }

  mounted() {
    this.$store.commit('updateShowSide', true);

    if( this.$store.state.firstTimeLoading ){
      this.$store.commit('loadingOn');

      setTimeout(() => {
        this.$store.commit('loadingOff');
      }, 2000);
    }
  }

  beforeDestroy() {
    this.$store.commit('updateShowSide', false);
  }
}
</script>

