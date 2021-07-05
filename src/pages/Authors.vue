<template>
  <Layout aside>
    <div class="container-inner mx-auto pl-80 py-16" v-scroll-reveal.reset>
      <div v-for="author in $page.authors.edges" :key="author.node.id" class="post border-gray-400 border-b mb-20">
        <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider"><g-link :to="$tp(author.node.path)" class="inline-link">{{ author.node.name }}</g-link></h2>
        <ul class="flex flex-wrap relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
          <li class="my-2 whitespace-nowrap mx-1">
            <font-awesome :icon="['fa', 'newspaper']"/>
            <span class="mx-2">{{ articlesCountByUser(author.node.title) }} articles written</span>
          </li>
          <li class="my-2 whitespace-nowrap mx-1">
            <font-awesome :icon="['fa', 'address-card']"/>
            <span class="mx-2">{{ author.node.rol }}</span>
          </li>
        </ul>
        <div class="flex flex-col md:flex-row mb-16">
          <g-image :alt="author.node.name" v-if="author.node.image" class="object-cover md:w-1/3 border border-green-500 md:mr-5" :src="author.node.image" />
          <div class="text-center md:text-left mt-5 md:mt-0">
            {{ yearsExperience(author.node.summary) }}
            <g-link :to="$tp(author.node.path)" class="font-bold uppercase inline-link">More&nbsp;→</g-link>
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
query Authors ($page: Int) {
  authors: allAuthor (sortBy: "date", order: DESC, perPage: 5, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
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

@Component<Authors>({
  metaInfo() {
    return {
      title: 'Authors'
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
  articlesCountByUser(username:string): number{
    //@ts-ignore
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

