<template>
  <side :show="show" orientation="right">
    <div class="email-side"><g-link :to="`mailto:${email}`">{{ email }}</g-link></div>
  </side>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {email} from '~/config/config';
const Side = () => import( './Side.vue');

@Component({components: {Side}})
export default class Email extends Vue {
  get show() {
    return this.$store.state.showSide;
  }

  get email() {
    return email;
  }
}
</script>

<style scoped>
.email-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.email-side:after {
  content: '';
  display: block;
  width: 1px;
  height: 90px;
  margin: 0 auto;
  background-color: var(--light-slate);
}

.email-side a {
  margin: 20px auto;
  padding: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
}

.email-side a:hover, .email-side a:focus {
  transform: translateY(-3px);
}

</style>
