<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div v-for="post in $page.posts.edges" :key="post.node.id" class="post border-gray-400 border-b mb-12">
        <g-image alt="Cover image" v-if="post.node.cover" class="post-card__image" :src="post.node.cover" />
        <h2 class="text-3xl font-bold"><g-link :to="post.node.path" class="text-copy-primary">{{ post.node.title }}</g-link></h2>
        <div class="text-copy-secondary mb-4">
          <span>{{ post.node.date }}</span>
          <span> &middot; {{ post.node.timeToRead }} min read</span>
        </div>

        <div class="text-lg mb-4">
          {{ post.node.summary }}
        </div>

        <div class="mb-8">
          <g-link :to="post.node.path" class="font-bold uppercase">Read More</g-link>
        </div>
      </div> <!-- end post -->

      <pagination-posts
        v-if="$page.posts.pageInfo.totalPages > 1"
        base="/blog"
        :totalPages="$page.posts.pageInfo.totalPages"
        :currentPage="$page.posts.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 3, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        summary
        timeToRead
        cover
        path
      }
    }
  }
}
</page-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PaginationPosts from '@/components/PaginationPosts.vue';
import "@/declarations/vue-meta";

@Component<Blog>({
  metaInfo() {
    return {
      title: 'Blog'
    };
  },
  components: {
    PaginationPosts
  }
})
export default class Blog extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existin variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
}
</script>

