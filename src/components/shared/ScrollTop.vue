<template>
  <button v-if="show && showScrollToTop" class="scroll-top" @click="backToTop()">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
    </svg>
    {{ $t('top') }}
  </button>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {isClient} from '~/util/utilities';

@Component
export default class ScrollTop extends Vue {
  showScrollToTop = false;

  get show() {
    return !this.$store.state.showSide;
  }

  backToTop() {
    window.scrollTo({top: 0});
  }

  mounted() {
    if (isClient()) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  beforeDestroy() {
    if (isClient()) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  public onScroll() {
    const currentScrollPosition = (isClient()) ? window.pageYOffset || document.documentElement.scrollTop : 0;
    if (currentScrollPosition < 0) {
      return;
    }
    this.showScrollToTop = currentScrollPosition > 30;
  }
}
</script>

<style scoped>
.scroll-top {
  position: fixed;
  right: 30px;
  bottom: 30px;
  height: 50px;
  width: 50px;
  box-shadow: 0 4px 8px #64ffda;
  border-radius: 50%;
  line-height: 1;
  font-size: 13px;
  transition: background-color .2s ease;
  @apply flex flex-col justify-center items-center text-center bg-light-navy text-green-500 cursor-pointer z-50;
}
</style>
