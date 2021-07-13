<template>
  <section class="min-h-screen" v-scroll-reveal.reset>
    <div class="container mx-auto flex flex-col items-start h-full">
      <h1 class="text-base text-green-500 font-mono my-2 md:my-6 font-normal" v-text="$t('welcome')">Hi, my name is</h1>
      <h2 id="generalName" class="text-5xl md:text-8xl" v-text="$t('name')">Yuniel Acosta</h2>
      <h3 id="phrase" class="text-4xl md:text-7xl md:my-2 text-gray-500" v-text="$t('slogan')">
        If I cannot do great things, I can do small things in a great way
      </h3>
      <p class="my-4 max-w-none md:max-w-2xl" v-text="$t('my-self')">
        I’m a software engineer, technology and science enthusiast, specialized in building mobile and web applications.
      </p>
      <g-link :to="`mailto:${myEmail}`" class="big-button my-10" v-text="$t('get-in-touch')">Get In Touch</g-link>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {email} from '~/config/config';
import {typed} from '~/util/utilities';

@Component
export default class Hero extends Vue {

  mounted() {
    let startDelay: number = 500;
    typed('#generalName', {
      showCursor: false,
      strings: ['Yuniel Acosta'],
      disableBackTyping: true,
      startDelay: startDelay
    });
    typed('#phrase', {
      showCursor: false,
      strings: [this.$t('slogan') as string],
      disableBackTyping: true,
      startDelay: startDelay + 2000
    });
  }

  get myEmail(): string {
    return email;
  }
}
</script>

<style scoped>
</style>
