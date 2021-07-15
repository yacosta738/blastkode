import VueRouter, { Route } from "vue-router";
import VueI18n from "vue-i18n";
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $i18n: VueI18n;
    $tp: (pathToResolve, targetLocale, forceChange) => string;
    $page: any;
    $static: any;
  }
}
