<template>
  <div v-if="isOpen" @click.self="isOpen = false"
       @keyup.esc="isOpen = false"
       class="search-box-container">
    <div class="flex fixed top-24 p-5 right-3 z-50 cursor-pointer text-3xl" @click="isOpen = false">
      <font-awesome class="text-lightest-slate mx-2" :icon="['fa', 'times-circle']"/>
      <span class="mt-0.5">(ESC)</span>
    </div>
    <div class="search-box">
      <font-awesome class="text-lightest-slate m-2" :icon="['fa', 'search']"/>
      <input id="search-box"
          type="text"
             v-model="query"
             @keyup="performSearch()"
             @keyup.esc="$store.commit('updateSearchModels', false)"
             autofocus
             class="w-full border-none outline-none text-xl bg-transparent appearance-none">
    </div>
    <div class="search-wrapper" v-if="query && query !== null">
      <h3 class="text-3xl md:text-5xl border-b border-green-500 text-lightest-slate mb-10">
        {{ results.length > 0 ? `Search phrase match ${results.length} pages` : `Search Results` }}
      </h3>
       <div class="overflow-y-auto">
         <div v-if="results.length > 0" v-for="article in results" :key="article.id"
              class="flex flex-col mb-2">
           <article-summary class="w-3/4" :article="article"
           @click="$store.commit('updateSearchModels', false)"/>
         </div>
         <div v-if="query && results.length === 0" class="flex flex-col justify-center items-center">
             <font-awesome :icon="['fa', 'search']"  size="6x"/>
           <p class="text-light-slate text-2xl my-5">No values found</p>
         </div>
       </div>
    </div>
  </div>
</template>

<static-query>
query Search {
  allPost {
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        summary
        author
        path
        content
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import ArticleSummary from '~/components/ArticleSummary.vue';
import Article from '~/models/Article';
import Fuse from 'fuse.js';

@Component({components:{ArticleSummary}})
export default class SearchBox extends Vue {
  query = "";
  results: Article[] = [];
  fuse: Fuse<Article> | undefined;
  options = {
    includeScore: true,
    keys: ['title', 'summary', 'content']
  };

  @Watch('isOpen')
  resetSearch() {
    if (!this.isOpen) {
      this.query = '';
    }
  }

  mounted() {
    this.fuse = new Fuse<Article>(this.allArticles, this.options);
  }

  get isOpen(): boolean {
    return this.$store.state.searchModal;
  }

  set isOpen(val: boolean) {
    this.$store.commit('updateSearchModels', val);
  }

  get allArticles(): Article[] {
    // @ts-ignore
    return this.$static.allPost.edges.map(edge => Article.fromJson(edge.node));
  }

  performSearch() {
    const fuseResults = this.fuse?.search(this.query);
    this.results = fuseResults ? fuseResults.map(r => r.item) : [];
  }
}
</script>
<style lang="scss" scoped>

.search-box-container {
  z-index: 100;
  @apply inset-0 h-screen w-full min-h-screen min-w-full fixed flex items-center justify-center bg-navy bg-opacity-70;
}

.search-box {
  z-index: 200;
  @apply bg-navy bg-opacity-70 border-2 border-dark-navy rounded-md p-2
  absolute top-24 flex items-center justify-center shadow-xl w-1/2;
}

.search-wrapper {
  z-index: 200;
  @apply flex flex-col items-center justify-center shadow-xl w-3/4 h-3/4 border-2 border-dark-navy bg-opacity-70 p-10
  rounded-md bg-navy absolute top-44 bg-blend-soft-light overflow-y-auto;
}
</style>
