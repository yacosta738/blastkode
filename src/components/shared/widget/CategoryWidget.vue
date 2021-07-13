<template>
  <widget :title="$t('categories')" v-if="totalCount > 0">
    <ul class="flex flex-col relative list-none p-0 my-4">
      <li v-for="category in allCategories" :key="category.id"
          class="my-2 flex flex-row text-light-slate font-mono text-base whitespace-nowrap">
        <g-link :to="$tp(category.path)" class="inline-link">
          <div class="flex flex-row">
            <font-awesome :icon="['fa', 'chevron-right']"/>
            <p class="pl-2"> {{ category.title }} </p>
          </div>
        </g-link>
        <p>({{ category.totalCountInArticles }})</p>
      </li>
    </ul>
  </widget>
</template>

<static-query>
query {
  categories: allCategory  {
    totalCount
    edges {
      node {
        id
        title
        lang
        path
        belongsTo {
          totalCount
          pageInfo {
            totalPages
          }
          edges{
            node{
              __typename
              ... on Post{
                id
                path
                lang
              }
            }
          }
        }
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Category from '~/models/Category';

const Widget = () => import( '~/components/shared/widget/Widget.vue');

@Component({components: {Widget}})
export default class CategoryWidget extends Vue {
  get totalCount(): number {
    return this.$static.categories.totalCount;
  }

  get allCategories(): Category[] {
    return this.$static.categories.edges
      .filter(edge => edge.node.lang.includes(this.$i18n.locale))
      .map(edge => Category.fromJson(edge.node))
      .sort((c1, c2) => c1?.totalCountInArticles < c2?.totalCountInArticles ? 1 : c1?.totalCountInArticles > c2?.totalCountInArticles ? -1 : 0);
  }
}
</script>

<style scoped>

</style>
