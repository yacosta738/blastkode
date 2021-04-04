<template>
  <widget title="Categories" v-if="totalCount > 0">
    <ul class="flex flex-col relative list-none p-0 my-4">
      <li v-for="category in allCategories" :key="category.id"
          class="my-2 flex flex-row text-light-slate font-mono text-base whitespace-nowrap">
        <g-link :to="category.path" class="inline-link">
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
  categories: allCategory {
    totalCount
    edges {
      node {
        id
        title
        path
        belongsTo {
          totalCount
        }
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
const Widget = () => import( '~/components/shared/Widget.vue');
import Category from '~/models/Category';

@Component({components:{Widget}})
export default class CategoryWidget extends Vue {
  get totalCount():number{
    // @ts-ignore
    return this.$static.categories.totalCount;
  }
  get allCategories(): Category[]{
    // @ts-ignore
    return this.$static.categories.edges.map(edge => Category.fromJson(edge.node)).sort((c1: Category, c2: Category) => c1.totalCountInArticles < c2.totalCountInArticles ? 1 : c1.totalCountInArticles > c2.totalCountInArticles ? -1 : 0);
  }
}
</script>

<style scoped>

</style>
