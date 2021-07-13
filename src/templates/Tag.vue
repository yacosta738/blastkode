<template>
  <Layout aside>
    <div class="container-inner mx-auto my-16">
      <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider mb-10 uppercase"
          v-text="$t('tag-title', {tag: $page.tag.title})">Tag: Java</h2>

      <div v-for="post in posts" :key="post.id" class="post border-gray-400 border-b mb-12">
        <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider">
          <g-link :to="$tp(post.path)" class="inline-link">{{ post.title }}</g-link>
        </h2>
        <post-header :article="post"/>
        <div class="flex flex-col md:flex-row mb-16">
          <g-image alt="Cover image" v-if="post.cover" class="object-cover md:w-1/3 border border-green-500 md:mr-5"
                   :src="post.cover"/>
          <div class="text-center md:text-left mt-5 md:mt-0">
            {{ post.summary }}
            <g-link :to="$tp(post.path)" class="font-bold uppercase inline-link" v-text="$t('read')">Read&nbsp;→
            </g-link>
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
            lang
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
import PostHeader from '~/components/post/PostHeader.vue';
import Article from '~/models/Article';

const PaginationPosts = () => import('~/components/post/PaginationPosts.vue');

@Component<Tag>({
  metaInfo() {
    return {
      //@ts-ignore
      title: 'Tag: ' + this.$page.tag.title
    };
  },
  components: {
    PaginationPosts,  PostHeader
  }
})
export default class Tag extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }
  get posts(): Article[]{
    return this.$page.tag.belongsTo.edges
      .filter(edge => edge.node.lang === this.$i18n.locale)
      .map(edge => Article.fromJson(edge.node));
  }
  mounted() {
    this.$store.commit('changePostId', 0)
  }
}
</script>
