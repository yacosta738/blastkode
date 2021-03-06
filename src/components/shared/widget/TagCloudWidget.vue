<template>
  <widget :title="$t('tags')" v-if="totalCount > 0">
    <div class="tag-cloud-tags">
    <g-link v-for="tag in allTags" :key="tag.id" :to="$tp(tag.path)"
       :aria-label="`${tag.title} (${tag.totalCountInArticles} posts)`"
       :class="textSize(tag)" class="inline-link">{{ tag.title }}</g-link>
    </div>
  </widget>
</template>

<static-query>
query {
  tags: allTag {
    totalCount
    edges {
      node {
        id
        title
        path
        lang
        belongsTo {
          totalCount
        }
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Tag from '~/models/Tag';

const Widget = () => import( '~/components/shared/widget/Widget.vue');

@Component({components: {Widget}})
export default class TagCloudWidget extends Vue {
  get allTags(): Tag[] {
    return this.$static.tags.edges
      .filter(edge => edge.node.lang.includes(this.$i18n.locale))
      .map(edge => Tag.fromJson(edge.node))
      .sort((tag1, tag2) => tag1?.title < tag2?.title ? -1 : tag1?.title > tag2?.title ? 1 : 0);
  }

  get totalCount(): number {
    return this.$static.tags.totalCount;
  }

  textSize(tag: Tag): string {
    const totalCountInPost: number = (tag.totalCountInArticles && tag.totalCountInArticles > 0) ? tag.totalCountInArticles : 1;
    const percent = (totalCountInPost / this.totalCount) * 100;
    if (percent <= 12.5) {
      return 'text-base';
    } else if (percent > 12.5 && percent <= 25) {
      return 'text-lg';
    } else if (percent > 25 && percent <= 37.5) {
      return 'text-xl';
    } else if (percent > 37.5 && percent <= 50) {
      return 'text-2xl';
    } else if (percent > 50 && percent <= 62.5) {
      return 'text-3xl';
    } else if (percent > 62.5 && percent <= 75) {
      return 'text-4xl';
    } else if (percent > 75 && percent <= 87.5) {
      return 'text-5xl';
    } else {
      return 'text-6xl';
    }
  }
}
</script>

<style scoped lang="scss">
.tag-cloud-tags {
  display: block;
  margin: 0;
  list-style-type: none;
  a {
    display: inline-block;
    padding: 0.3rem;
    line-height: 1em;
    word-break: break-word;
    white-space: normal;
  }
  a:nth-child(5n + 1) {
    transform: rotate(-2deg);
  }
  a:nth-child(3n + 3) {
    transform: rotate(1deg);
  }
  a:nth-child(3n + 4) {
    transform: rotate(-3deg);
  }
  a:nth-child(5n + 5) {
    transform: rotate(3deg);
  }
}
</style>
