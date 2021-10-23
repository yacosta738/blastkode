<template>
  <iconify-icon :icon="icon" :inline="true" />
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import IconifyIcon from '@iconify/vue';
import viteIcon from '@iconify-icons/simple-icons/vite';
IconifyIcon.addIcon('vite', viteIcon);
@Component({components:{IconifyIcon}})
export default class IconifyWrapper extends Vue {
  @Prop({required: true, type: String}) readonly icon: string | undefined;
}
</script>

<style scoped>

</style>
