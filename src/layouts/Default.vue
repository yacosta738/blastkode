<template>
  <div
      class="content-wrapper bg-background-primary font-sans text-light-slate leading-normal flex flex-col min-h-screen"
      :class="theme">
    <search-box/>
    <loader v-if="$store.state.loading"/>
    <div id="page-wrapper" :class="{'filter blur':$store.state.searchModal}" v-else>
      <navbar/>
      <div class="flex flex-wrap flex-col md:flex-row justify-between">
        <transition name="fade" appear>
          <main ref="content" class="flex-grow mt-8 md:mt-20 lg:mt-15">
            <slot/>
          </main>
        </transition>
        <transition v-if="aside" name="fade" mode="out-in" appear>
          <aside id="sidebar" class="w-auto md:w-80 mt-2 md:mr-80 md:mt-20 lg:mt-15">
            <div class="my-2 md:my-16">
              <recent-post-widget/>
              <tag-cloud-widget/>
              <category-widget/>
            </div>
          </aside>
        </transition>
      </div>
      <social/>
      <email/>
      <footer-section/>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script lang="ts">
import {Component, Prop} from "vue-property-decorator";
import {mixins} from 'vue-class-component';
import ConfigurationMixin from "@/util/configuration.mixin";

const Navbar = () => import("@/components/Navbar.vue");
const Social = () => import("@/components/Social.vue");
const Email = () => import("@/components/Email.vue");
const FooterSection = () => import("@/components/FooterSection.vue");
const TagCloudWidget = () => import("@/components/shared/TagCloudWidget.vue");
const CategoryWidget = () => import("@/components/shared/CategoryWidget.vue");
const RecentPostWidget = () => import( "~/components/shared/RecentPostWidget.vue");
const Loader = () => import( "~/components/shared/Loader.vue");
const SearchBox = () => import('~/components/SearchBox.vue');

@Component({
  components: {
    Navbar,
    Social,
    Email,
    FooterSection,
    TagCloudWidget,
    CategoryWidget,
    RecentPostWidget,
    Loader,
    SearchBox
  }
})
export default class Default extends mixins(ConfigurationMixin) {
  @Prop({default: false, type: Boolean}) readonly aside: boolean | undefined;

  get theme(): string {
    return this.$store.state.theme;
  }
}
</script>

<style src="../assets/styles/main.css"/>
<style>

/* Fade down */
.fadedown-enter {
  opacity: 0.01;
  transform: translateY(-20px);
  transition: opacity 1.5s var(--easing), transform 1.5s var(--easing);
}

.fadedown-enter-active {
  opacity: 1;
  transform: translateY(0px);
  transition: opacity 1.5s var(--easing), transform 1.5s var(--easing);
}

/* Fade */
.fade-enter-active {
  transition: opacity 1.5s var(--easing);
}

.fade-enter {
  opacity: 0;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 1.5s var(--easing);
}
</style>
