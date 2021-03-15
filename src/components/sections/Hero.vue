<template>
  <section class="min-h-screen">
    <div class="container mx-auto flex flex-col items-start h-full">
      <h1 class="text-base text-green-500 font-mono my-2 md:my-6 font-normal">Hi, my name is</h1>
      <h2 class="text-5xl md:text-8xl">Yuniel Acosta.</h2>
      <h3 class="text-4xl md:text-7xl md:my-2 text-gray-500">I build things for the web.</h3>
      <p class="my-4 max-w-none md:max-w-3xl">
        I'm a software engineer based in Boston, MA specializing in building (and occasionally
        designing) exceptional websites, applications, and everything in between.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aut cum cupiditate debitis dolor doloremque, earum enim exercitationem impedit laudantium molestias necessitatibus quibusdam quos reprehenderit rerum sequi unde veritatis?
      </p>
      <g-link :to="`mailto:${myEmail}`" class="big-button my-10">Get In Touch</g-link>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {email} from '~/config/config';
@Component
export default class Hero extends Vue {
  get myEmail(): string {
    return email;
  }
}
</script>

<style scoped>
</style>
