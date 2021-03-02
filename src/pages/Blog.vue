<template>
  <Layout aside>
    <div class="container-inner mx-auto pl-80 py-16">
      <div v-for="post in $page.posts.edges" :key="post.node.id" class="post border-gray-400 border-b mb-20">
        <h2 class="text-3xl font-bold"><g-link :to="post.node.path" class="text-lightest-slate">{{ post.node.title }}</g-link></h2>
        <ul class="flex flex-wrap relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
          <li class="my-2 whitespace-nowrap mx-1">
            <font-awesome :icon="['fa', 'calendar-alt']"/>
            <span class="mx-2">{{ post.node.date }}</span>
          </li>
          <li class="my-2 whitespace-nowrap mx-1">
            <span>Reading time &middot; {{ post.node.timeToRead }} min</span>
          </li>
          <li class="my-2 whitespace-nowrap mx-1">
            <span>Author: {{ post.node.author }}</span>
          </li>
        </ul>
        <div class="flex flex-col md:flex-row mb-16">
          <g-image alt="Cover image" v-if="post.node.cover" class="object-cover md:w-1/3 border border-green-500 md:mr-5" :src="post.node.cover" />
          <div class="text-center md:text-left mt-5 md:mt-0">
            {{ post.node.summary }}
            <g-link :to="post.node.path" class="font-bold uppercase inline-link">Read&nbsp;→</g-link>
          </div>
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
  posts: allPost (sortBy: "date", order: DESC, perPage: 5, page: $page) @paginate {
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
        author
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

