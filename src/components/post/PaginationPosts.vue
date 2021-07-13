<template>
  <div class="flex justify-between text-xl items-center">
    <g-link :to="$tp(previousPage)" :class="{ 'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showPreviousPage, 'small-button':showPreviousPage }"
            data-cypress="prev" v-text="$t('prev')">&larr; Prev
    </g-link>
    <div class="text-base" v-text="$t('page-of', {currentPage: currentPage,  totalPages: totalPages})">Page 1 of 2</div>
    <g-link :to="$tp(nextPage)" :class="{ 'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showNextPage, 'small-button':showNextPage }"
            data-cypress="next" v-text="$t('next')">Next &rarr;
    </g-link>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class PaginationPosts extends Vue {
  @Prop({type: String, required: true}) readonly base: string | undefined;
  @Prop({type: Number, required: true}) readonly totalPages: number | undefined;
  @Prop({type: Number, required: true}) readonly currentPage: number | undefined;

  get showPreviousPage() {
    return this.currentPage !== 1;
  }

  get previousPage() {
    if (this.currentPage) {
      return [0, 1].includes(this.currentPage - 1)
          ? this.base
          : `${this.base}/${this.currentPage - 1}`;
    } else {
      return 0;
    }
  }

  get showNextPage() {
    return this.currentPage !== this.totalPages;
  }

  get nextPage() {
    if (this.currentPage && this.totalPages) {
      return this.totalPages > this.currentPage
          ? `${this.base}/${this.currentPage + 1}`
          : `${this.base}/${this.currentPage}`;
    } else {
      return 0;
    }
  }
}
</script>
