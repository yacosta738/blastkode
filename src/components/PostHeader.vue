<template>
  <ul class="flex flex-col md:flex-row relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
    <li v-if="article.date" class="my-2 whitespace-nowrap mx-1">
      <font-awesome :icon="['fa', 'calendar-alt']"/>
      <span class="mx-2">{{ article.date }}</span>
    </li>
    <li v-if="article.timeToRead" class="my-2 whitespace-nowrap mx-1">
      <span>Reading time &middot; {{ article.timeToRead }} min</span>
    </li>
    <li v-if="article.path" class="my-2 whitespace-nowrap mx-1">
      <g-link :to="article.path" class="flex text-green-500">
        <svg fill="none" viewBox="0 0 24 24" class="w-6 h-6" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <DisqusCount shortname='blastkode' :identifier="article.path" class="mx-1" />
      </g-link>
    </li>
    <li v-if="article.author" class="my-2 whitespace-nowrap mx-1">
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
