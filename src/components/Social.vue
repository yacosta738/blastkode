<template>
  <side :is-home="isHome" orientation="left">
    <ul class="social-links">
      <li v-for="social in socialMedia">
        <a :href="social.url">
          <font-awesome :icon="['fab', social.name.toLowerCase() ]"/>
        </a>
      </li>
    </ul>
  </side>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {socialMedia, SocialMedia} from '~/config';
import Side from './Side.vue';

@Component({components: {Side}})
export default class Social extends Vue {
  get isHome() {
    return window.location.pathname === '/';
  }

  get socialMedia(): SocialMedia[] {
    return socialMedia;
  }
}
</script>

<style scoped>
.social-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.social-links:after {
  content: '';
  display: block;
  width: 1px;
  height: 90px;
  margin: 0 auto;
  background-color: var(--light-slate);
}

.social-links li:last-of-type {
  margin-bottom: 20px;
}

.social-links li a {
  padding: 10px;
}

.social-links li a:hover, .social-links li a:focus {
  transform: translateY(-3px);
}

.social-links li a svg {
  width: 20px;
  height: 20px;
}

</style>
