<template>
  <Layout>
    <div class="container-inner mx-auto py-16" v-scroll-reveal.reset>
      <div v-for="doc in $page.docs.edges" :key="doc.node.id" class="post border-gray-400 border-b mb-12">
        <h2 class="text-3xl font-bold"><g-link :to="$tp(doc.node.path)" class="text-copy-primary">{{ doc.node.title }}</g-link></h2>

        <div class="text-lg mb-4">
          {{ doc.node.excerpt }}
        </div>

        <div class="mb-8">
          <g-link :to="$tp(doc.node.path)" class="font-bold uppercase">Read More</g-link>
        </div>
      </div> <!-- end post -->

    </div>
  </Layout>
</template>

<page-query>
query Documentation {
  docs: allDocumentation (sortBy: "date", order: DESC) {
    edges {
      node {
        id
        path
        title
        excerpt
      }
    }
  }
}
</page-query>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component<Docs>({
  metaInfo() {
    return {
      title: 'Docs',
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  }
})
export default class Docs extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
}
</script>
