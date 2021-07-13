<template>
  <section id="last3articles" class="mx-4 md:mx-auto" v-scroll-reveal.reset>
    <div  class="lg:-mx-12">
      <h2 class="numbered-heading" v-text="$t('last-articles')">Last Articles</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
        <card-post v-for="post in last3Post" :key="post.id" :article="post"/>
      </div>
      <div class="flex justify-center items-center my-5">
        <g-link to="/blog/"  class="big-button" v-text="$t('view-all')">View All</g-link>
      </div>
    </div>
  </section>
</template>

<static-query>
# Write your query or mutation here
query {
  last3Post: allPost(sortBy: "date", order: DESC, filter:{draft:{ eq: false }}) {
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        path
        lang
        timeToRead
        summary
        tags{
          id
          title
        }
        categories{
          id
          title
        }
        author
        cover
        content
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import CardPost from "~/components/post/CardPost.vue";
import Article from '~/models/Article';
import {compareAsc} from 'date-fns';

@Component({components: {CardPost}})
export default class LastArticles extends Vue {
  get last3Post(): Article[] {
    return this.$static.last3Post.edges
      .filter(edge => edge.node.lang === this.$i18n.locale)
      .filter(edge => compareAsc(new Date(edge.node.date), new Date()) === -1)
      .slice(0,3).map(edge => Article.fromJson(edge.node));
  }
}
</script>

<style scoped>

</style>
