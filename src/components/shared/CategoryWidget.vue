<template>
  <widget title="Categories" v-if="totalCount > 0">
    <ul class="flex flex-col relative list-none p-0 my-4">
      <li v-for="category in allCategories" :key="category.id"
          class="my-2 flex flex-row text-light-slate font-mono text-base whitespace-nowrap">
        <a href="#" class="inline-link">
          <div class="flex flex-row">
            <font-awesome :icon="['fa', 'chevron-right']"/>
            <p class="pl-2"> {{ category.id }} </p>
          </div>
        </a>
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
import Widget from '~/components/shared/Widget.vue';
import Category from '~/models/Category';

@Component({components:{Widget}})
export default class CategoryWidget extends Vue {
  get totalCount():number{
    // @ts-ignore
    return this.$static.categories.totalCount;
  }
  get allCategories(): Category[]{
    // @ts-ignore
    return this.$static.categories.edges.map(edge => Category.fromJson(edge.node));
  }
}
</script>

<style scoped>

</style>
