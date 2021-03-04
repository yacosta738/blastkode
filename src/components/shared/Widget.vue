<template>
  <div class="mb-5">
    <div class="bg-light-navy">
      <h3 class="font-bold text-lightest-slate font-mono text-3xl text-center md:text-left uppercase p-1 m-1">{{ title }}</h3>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Widget extends Vue {
  @Prop({required: true, type: String}) readonly title: string | undefined;
}
</script>

<style scoped>

</style>
