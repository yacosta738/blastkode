<template>
  <widget v-if="$store.state.postId !== -1" title="Recent Post">
    <ul class="flex flex-col relative list-none p-0 my-4">
      <li v-for="post in recentPosts" :key="post.id"
          class="my-2 flex flex-row text-light-slate font-mono text-base">
        <g-link :to="post.path" class="inline-link">
          <div class="flex flex-row">
            <font-awesome :icon="['fa', 'chevron-right']"/>
            <p class="pl-2"> {{ post.title }} </p>
          </div>
        </g-link>
      </li>
    </ul>
  </widget>
</template>

<static-query>
query {
  recentPost: allPost( sortBy: "date" order: DESC perPage: 5 filter: { draft: { eq: false }}) {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Widget from '~/components/shared/Widget.vue';
import IArticle from '~/models/Article';

@Component({components:{Widget}})
export default class RecentPostWidget extends Vue {
  get recentPosts(): IArticle[]{
    // @ts-ignore
    return this.$static.recentPost.edges.filter(rp=>rp.node.id!==this.$store.state.postId).map(edge => {
      return {id: edge.node.id,title: edge.node.title, path: edge.node.path}
    });
  }
}
</script>

<style scoped>

</style>
