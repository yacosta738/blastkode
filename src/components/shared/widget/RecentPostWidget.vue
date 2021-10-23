<template>
  <widget v-if="$store.state.postId !== -1" :title="$t('recent-post')">
    <ul class="flex flex-col relative list-none p-0 my-4">
      <li v-for="post in recentPosts" :key="post.id" @click="$store.commit('changePostId', post.id)"
          class="my-2 flex flex-row text-light-slate font-mono text-base">
        <g-link :to="$tp(post.path)" class="inline-link">
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
  recentPost: allPost( sortBy: "date" order: DESC filter: { draft: { eq: false }}) {
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        lang
        path
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import IArticle from '~/models/Article';
import {compareAsc} from 'date-fns';

const Widget = () => import( '~/components/shared/widget/Widget.vue');

@Component({components: {Widget}})
export default class RecentPostWidget extends Vue {

  get recentPosts(): IArticle[] {
    return this.$static.recentPost.edges
      .filter(edge => edge.node.lang === this.$i18n.locale)
      .filter(post => compareAsc(new Date(post.node.date), new Date()) === -1)
      .slice(0, 5)
      .filter(rp => rp.node.id !== this.$store.state.postId).map(edge => {
        return {id: edge.node.id, title: edge.node.title, path: edge.node.path};
      });
  }

}
</script>

<style scoped>

</style>
