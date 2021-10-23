<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold mb-16" v-text="$t('error404')">Page Not Found (404)</h1>
      <g-image class="w-1/2" src="../../static/oops.png" alt="404 page not found"/>
      <p v-html="$t('message404')">Don't know how you ended up here, but the page doesn't exist. Or well, <em>this</em>
        page
        exists, but it's a <em>page not found</em> page...you get the point.</p>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component<ErrorPage>({
  metaInfo() {
    return {
      title: 'Page Not Found',
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  }
})
export default class ErrorPage extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
}
</script>

