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
import Hero from "@/components/sections/Hero.vue";
import About from "@/components/sections/About.vue";
import Jobs from "@/components/sections/Jobs.vue";
import LastArticles from "~/components/sections/LastArticles.vue";
import Projects from "@/components/sections/Projects.vue";
import Contact from "@/components/sections/Contact.vue";

@Component<Home>({
  components: {Hero, About, Jobs, Projects, LastArticles, Contact},
  metaInfo() {
    return {
      title: 'Home'
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

