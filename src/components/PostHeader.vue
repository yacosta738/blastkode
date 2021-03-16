<template>
  <ul class="flex flex-wrap relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
    <li class="my-2 whitespace-nowrap mx-1">
      <font-awesome :icon="['fa', 'calendar-alt']"/>
      <span class="mx-2">{{ article.date }}</span>
    </li>
    <li class="my-2 whitespace-nowrap mx-1">
      <span>Reading time &middot; {{ article.timeToRead }} min</span>
    </li>
    <li class="my-2 whitespace-nowrap mx-1">
      <span>Author: <g-link :to="urlizeAuthorName(article.author)" class="inline-link">{{ article.author }}</g-link></span>
    </li>
  </ul>
</template>
<script lang="ts">
import "reflect-metadata"
import {Component, Prop, Vue} from 'vue-property-decorator';
import Article from '~/models/Article';
import {urlize} from '~/util/utilities';

@Component
export default class PostHeader extends Vue{
  @Prop({required: true}) readonly article: Article | undefined;
  urlizeAuthorName(term:string): string{
    return urlize(term);
  }
};
</script>
