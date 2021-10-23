<template>
  <div v-if="show" class="w-10 fixed bottom-0 z-10 text-gray-500 hidden md:block"
       :class="orientation === 'left'? 'md:left-5 lg:left-10 right-auto' : 'md:right-5 lg:right-10 left-auto '"
       v-scroll-reveal.reset>
    <slot/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Side extends Vue {
  @Prop({required: true, type: Boolean}) readonly show: boolean | undefined;
  @Prop({required: true, type: String}) readonly orientation: string | undefined;
}
</script>

<style scoped>

</style>
