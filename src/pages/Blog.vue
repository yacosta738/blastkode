<template>
  <Layout aside>
    <div class="container-inner mx-auto pl-80 py-16" v-scroll-reveal.reset>
      <div v-for="post in posts" :key="post.node.id" class="post border-gray-400 border-b mb-20">
       <article-summary :article="post.node" />
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
import ArticleSummary from '~/components/ArticleSummary.vue'
import {compareAsc} from 'date-fns';
@Component<Blog>({
  metaInfo() {
    return {
      title: 'Blog',
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  },
  components: {
    ArticleSummary,
    PaginationPosts
  }
})
export default class Blog extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
get posts(){
    //@ts-ignore
    return this.$page.posts.edges.filter(post => compareAsc(new Date(post.node.date), new Date()) === -1);
}
  mounted() {
    this.$store.commit('changePostId', -1);
    this.$store.commit('updateShowSide', false);
  }

}
</script>

