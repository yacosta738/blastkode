<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class SearchFocus extends Vue {
  handler: any = null;
  mounted() {
    this.handler = event => {
      this.$emit('keyup', event)
    }
    //@ts-ignore
    if (process.isClient)
    window.addEventListener('keyup', this.handler)
  }
  beforeDestroy() {
    //@ts-ignore
    if (process.isClient)
    window.removeEventListener('keyup', this.handler)
  }
}
</script>

<style scoped>
  div {
    display: none;
  }
</style>
