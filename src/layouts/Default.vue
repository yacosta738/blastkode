<template>
  <div
      class="content-wrapper bg-background-primary font-sans text-light-slate leading-normal flex flex-col min-h-screen"
      :class="theme">
    <search-box/>
    <loader v-if="$store.state.loading"/>
    <div id="page-wrapper" :class="{'filter blur':$store.state.searchModal}" v-else>
      <navbar/>
      <div class="flex flex-wrap flex-col md:flex-row justify-around">
        <transition name="fade" appear>
          <main ref="content" class="flex-grow mt-8 md:mt-20 lg:mt-15">
            <slot/>
            <scroll-top/>
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
import ConfigurationMixin from "~/mixins/configuration.mixin";
import LanguageMixin from "~/mixins/language.mixins";
import {isClient} from '~/util/utilities';

import Navbar from "@/components/Navbar.vue";
import Social from "@/components/Social.vue";
import Email from "@/components/Email.vue";
import FooterSection from "@/components/FooterSection.vue";
import TagCloudWidget from "@/components/shared/TagCloudWidget.vue";
import CategoryWidget from "@/components/shared/CategoryWidget.vue";
import RecentPostWidget from "~/components/shared/RecentPostWidget.vue";
import Loader from "~/components/shared/Loader.vue";
import SearchBox from '~/components/SearchBox.vue';
import ScrollTop from '~/components/ScrollTop.vue';

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
    SearchBox,
    ScrollTop
  }
})
export default class Default extends mixins(ConfigurationMixin, LanguageMixin) {
  @Prop({default: false, type: Boolean}) readonly aside: boolean | undefined;

  get theme(): string {
    return this.$store.state.theme;
  }

  created() {
    if (isClient()) {
      this.fetchBrowserLocale();
    }
  }

  fetchBrowserLocale() {
    const lang: string | null = localStorage?.getItem('lang');
    const fetchedLocale: string = lang ? lang : navigator.language.split('-')[0];
    this.loadLanguageAsync(fetchedLocale).catch(() => {
      console.log('Async language fetch failed');
    });
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
