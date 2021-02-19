<template>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { socialMedia } from '@/config';
@Component
export default class Social extends Vue {
}
</script>

<style scoped lang="scss">
display: flex;
flex-direction: column;
align-items: center;
margin: 0;
padding: 0;
list-style: none;

&:after {
  content: '';
  display: block;
  width: 1px;
  height: 90px;
  margin: 0 auto;
  background-color: var(--light-slate);
}

li {
  &:last-of-type {
    margin-bottom: 20px;
  }

  a {
    padding: 10px;

    &:hover,
    &:focus {
      transform: translateY(-3px);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
