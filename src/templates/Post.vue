<template>
  <Layout aside>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight tracking-wider">{{ $page.post.title }}</h1>
      <ul class="flex flex-wrap relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
        <li class="my-2 whitespace-nowrap mx-1">
          <font-awesome :icon="['fa', 'calendar-alt']"/>
          <span class="mx-2">{{ $page.post.date }}</span>
        </li>
        <li class="my-2 whitespace-nowrap mx-1">
          <span>Reading time &middot; {{ $page.post.timeToRead }} min</span>
        </li>
        <li class="my-2 whitespace-nowrap mx-1">
          <span>Author: {{ $page.post.author }}</span>
        </li>
      </ul>
      <div class="markdown-body mb-8" v-html="$page.post.content" />
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

@Component<Post>({
  metaInfo() {
    return {
      //@ts-ignore
      title: this.$page.post.title
    };
  }
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

<style src="../css/github-markdown.css" />

