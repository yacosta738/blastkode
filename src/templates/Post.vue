<template>
  <Layout aside>
    <div class="container-inner mx-auto my-16">
      <article>
        <h1 class="text-3xl md:text-4xl font-bold leading-tight tracking-wider">{{ $page.post.title }}</h1>
        <post-header :article="$page.post"/>
        <div class="markdown-body mb-8" v-html="$page.post.content"/>
        <div class="mb-8">
          <g-link to="/blog" class="font-bold uppercase">Back to Blog</g-link>
        </div>
        <div class="flex">
          <!--category-->
          <div class="flex mb-8 text-sm mx-1">
            <font-awesome :icon="['fa', 'folder-open']" class="mr-2"/>
            <g-link
                :to="category.path"
                v-for="category in $page.post.categories"
                :key="category.id"
                class="inline-link mx-1">
              {{ category.title }}
            </g-link>
          </div>
          <!-- tags -->
          <div class="flex mb-8 text-sm mx-1">
            <font-awesome :icon="['fa', 'tags']" class="mr-2"/>
            <g-link
                :to="tag.path"
                v-for="tag in $page.post.tags"
                :key="tag.id"
                class="inline-link mx-1">
              {{ tag.title }}
            </g-link>
          </div>
        </div>
      </article>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    id
    title
    date (format: "MMMM D, Y")
    timeToRead
    author
    content
    tags {
      title
      path
    }
    categories{
      title
      path
    }
  }
}
</page-query>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PostHeader from '~/pages/PostHeader.vue';

@Component<Post>({
  metaInfo() {
    return {
      //@ts-ignore
      title: this.$page.post.title
    };
  }, components: {PostHeader}
})
export default class Post extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
  mounted() {
    //@ts-ignore
    this.$store.commit('changePostId', this.$page.post.id)
  }
}
</script>

<style src="../assets/styles/github-markdown.css" />
