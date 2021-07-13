<template>
  <ul class="flex flex-col md:flex-row relative list-none p-0 mb-4 text-light-slate font-mono text-sm">
    <li v-if="article.date" class="my-2 whitespace-nowrap mx-1">
      <font-awesome :icon="['fa', 'calendar-alt']"/>
      <span class="mx-2">{{ formatDate(article.date.toString()) }}</span>
    </li>
    <li v-if="article.timeToRead" class="my-2 whitespace-nowrap mx-1">
      <span v-text="$t('time-to-read', { timeToRead: article.timeToRead })">Reading time &middot; 12 min</span>
    </li>
    <li v-if="article.path" class="my-2 whitespace-nowrap mx-1">
      <g-link :to="$tp(article.path)" class="flex text-green-500">
        <svg fill="none" viewBox="0 0 24 24" class="w-6 h-6" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <DisqusCount shortname='blastkode' :identifier="article.path" class="mx-1" />
      </g-link>
    </li>
    <li v-if="article.author" class="my-2 whitespace-nowrap mx-1">
      <span class="mr-3" v-text="$t('author')">Author:</span>
      <g-link :to="$tp(urlizeAuthorName(article.author))" class="inline-link">{{ article.author }}</g-link>
    </li>
  </ul>
</template>
<script lang="ts">
import "reflect-metadata"
import {Component, Prop, Vue} from 'vue-property-decorator';
import Article from '~/models/Article';
import {formatDate, urlize} from '~/util/utilities';

@Component
export default class PostHeader extends Vue{
  @Prop({required: true}) readonly article: Article | undefined;
  urlizeAuthorName(term:string): string{
    return urlize(term);
  }
  formatDate(date: string, dateFormat = 'MMMM dd, yyyy'): string {
    return formatDate(date, dateFormat, this.$i18n.locale);
  }
};
</script>
