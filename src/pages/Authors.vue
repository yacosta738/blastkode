<template>
  <Layout aside>
    <div class="container-inner mx-auto pl-80 py-16" v-scroll-reveal.reset>
      <div v-for="author in authors" :key="author.id" class="post border-gray-400 border-b mb-20">
        <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider"><g-link :to="$tp(author.path)" class="inline-link">{{ author.name }}</g-link></h2>
        <ul class="flex flex-wrap relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
          <li class="my-2 whitespace-nowrap mx-1">
            <font-awesome :icon="['fa', 'newspaper']"/>
            <span class="mx-2">{{ articlesCountByUser(author.name) }} articles written</span>
          </li>
          <li class="my-2 whitespace-nowrap mx-1">
            <font-awesome :icon="['fa', 'address-card']"/>
            <span class="mx-2">{{ author.rol }}</span>
          </li>
        </ul>
        <div class="flex flex-col md:flex-row mb-16">
          <g-image :alt="author.name" v-if="author.image" class="object-cover md:w-1/3 border border-green-500 md:mr-5" :src="author.image" />
          <div class="text-center md:text-left mt-5 md:mt-0">
            {{ yearsExperience(author.summary) }}
            <g-link :to="$tp(author.path)" class="font-bold uppercase inline-link">More&nbsp;→</g-link>
          </div>
        </div>
      </div> <!-- end post -->

      <pagination-posts
        v-if="$page.authors.pageInfo.totalPages > 1"
        base="/blog"
        :totalPages="$page.authors.pageInfo.totalPages"
        :currentPage="$page.authors.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Authors ($page: Int, $lang: String) {
  authors: allAuthor (sortBy: "date", filter:{ lang: {eq: $lang} } , order: DESC, perPage: 5, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        lang
        image
        path
        rol
        summary
        content
      }
    }
  }
  posts: allPost(
    sortBy: "date"
    order: DESC
    filter: {
      draft: { eq: false }
    }
  ) {
    edges {
      node {
        id
        title
        author
      }
    }
  }
}

</page-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PaginationPosts from '@/components/PaginationPosts.vue';
import "@/declarations/vue-meta";
import {yearsOfExperience} from '~/util/utilities';
import Author from '~/models/Author';

@Component<Authors>({
  metaInfo() {
    return {
      title: 'Authors',
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  },
  components: {
    PaginationPosts
  }
})
export default class Authors extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
  get authors(): Author[]{
    return this.$page.authors.edges
        .filter(edge => edge.node.lang === this.$i18n.locale)
        .map(edge => Author.fromJson(edge.node));
  }
  articlesCountByUser(username:string): number{
    return this.$page.posts.edges.filter(edge => edge.node.author === username).length;
  }

  yearsExperience(text: string): string {
    return yearsOfExperience(text);
  }
  mounted() {
    this.$store.commit('updateShowSide', false);
  }
}
</script>

