<template>
  <div class="flex flex-col">
    <h2 class="text-3xl md:text-4xl text-center md:text-left font-bold tracking-wider">
      <g-link :to="$tp(article.path)" class="inline-link">{{ article.title }}</g-link></h2>
    <post-header v-if="!hidePostHeaderInSmallScreen" :article="article"/>
    <div class="flex flex-col md:flex-row mb-16">
      <g-image alt="Cover image" v-if="article.cover" class="object-cover md:w-1/3 border border-green-500 md:mr-5"
               :src="article.cover" />
      <div class="text-center md:text-left mt-5 md:mt-0">
        {{ article.summary }}
        <g-link :to="$tp(article.path)" class="font-bold uppercase inline-link" v-text="$t('read')">Read&nbsp;→</g-link>
      </div>
    </div>
  </div> <!-- end post -->
</template>

<script lang="ts">
import "reflect-metadata"
import {Component, Prop, Vue} from 'vue-property-decorator';
import  PostHeader from '~/components/post/PostHeader.vue'
import Article from '../../models/Article';
@Component({components:{PostHeader}})
export default class ArticleSummary extends Vue{
  @Prop({required: true}) readonly article: Article | undefined;
  @Prop({default: false}) readonly hidePostHeaderInSmallScreen: boolean | undefined;
}
</script>

<style scoped>

</style>
