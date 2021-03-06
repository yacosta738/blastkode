<template>
  <Layout aside>
    <div class="container-inner mx-auto my-16">
      <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider mb-10 uppercase">Tag: {{ $page.tag.title }}</h2>

      <div v-for="post in $page.tag.belongsTo.edges" :key="post.node.id" class="post border-gray-400 border-b mb-12">
        <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider"><g-link :to="post.node.path" class="inline-link">{{ post.node.title }}</g-link></h2>
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
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
        :base="`/tag/${$page.tag.title}`"
        :totalPages="$page.tag.belongsTo.pageInfo.totalPages"
        :currentPage="$page.tag.belongsTo.pageInfo.currentPage"
      />

    </div>
  </Layout>
</template>

<page-query>
query Tag ($id: ID!, $page: Int) {
  tag: tag (id: $id) {
    title
    belongsTo (page: $page, perPage: 3) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ...on Post {
            title
            timeToRead
    	      date (format: "MMMM D, YYYY")
            path
            summary
            cover
            author
            tags {
              title
            }
          }
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PaginationPosts from '@/components/PaginationPosts.vue';

@Component<Tag>({
  metaInfo() {
    return {
      //@ts-ignore
      title: 'Tag: ' + this.$page.tag.title
    };
  },
  components: {
    PaginationPosts
  }
})
export default class Tag extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
  mounted() {
    //@ts-ignore
    this.$store.commit('changePostId', 0)
  }
}
</script>
