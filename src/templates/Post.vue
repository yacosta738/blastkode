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
        <div class="flex flex-col md:flex-row">
          <!--category-->
          <div class="mb-8 text-sm mx-1">
            <font-awesome :icon="['fa', 'folder-open']" class="mr-2"/>
            <g-link
                :to="$tp(category.path)"
                v-for="category in $page.post.categories"
                :key="category.id"
                class="inline-link mx-1">
              {{ category.title }}
            </g-link>
          </div>
          <!-- tags -->
          <div class="mb-8 text-sm mx-1">
            <font-awesome :icon="['fa', 'tags']" class="mr-2"/>
            <g-link
                :to="$tp(tag.path)"
                v-for="tag in $page.post.tags"
                :key="tag.id"
                class="inline-link mx-1">
              {{ tag.title }}
            </g-link>
          </div>
        </div>
        <cryptos :address="bitcoinAddress" />
        <div class='comments'>
          <Disqus :identifier="$page.post.path" />
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
    path
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
import PostHeader from '~/components/PostHeader.vue';
import Cryptos from '~/components/shared/Cryptos.vue'
import {inlineLinks} from '~/util/utilities';

@Component<Post>({
  metaInfo() {
    return {
      //@ts-ignore
      title: this.$page.post.title
    };
  }, components: {PostHeader, Cryptos}
})
export default class Post extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
  get bitcoinAddress(): string  {
    return process.env.GRIDSOME_BITCOIN_WALLET || 'bc1qpm2s4m6er9yj249wpwg8uq0ysqkr636clu9jka';
  }
  mounted() {
    //@ts-ignore
    this.$store.commit('changePostId', this.$page.post.id)

    inlineLinks('markdown-body');
  }
}
</script>

<style src="../assets/styles/github-markdown.css" />
