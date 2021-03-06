<template>
  <div class="w-full" v-scroll-reveal.reset>
    <h3 class="text-4xl ml-12 font-bold"> {{ experience.title }} </h3>
    <div class="relative m-8">
      <div class="border-r-4 border-light-navy absolute h-full top-0" style="left: 18px"></div>
      <ul class="list-none m-0 p-0 w-full">
        <li v-for="item in experience.items" class="mb-2">
          <div>
            <div class="flex items-center mb-1">
              <div class="flex items-center justify-center bg-light-navy rounded-full h-10 w-10 z-10">
                <i class="flex items-center justify-center h-8 w-8 text-lightest-slate">
                  <font-awesome v-if="item.icon" :icon="[item.icon.type, item.icon.value]"/>
                  <font-awesome v-else :icon="['fa', 'globe']"/>
                </i>
              </div>
              <h4 class="flex-1 ml-4 uppercase font-bold tracking-wider">{{ item.name }} </h4>
            </div>
            <h5 class="ml-12 my-2 p-1 rounded inline-block bg-green-200 text-gray-600 text-base">
              {{ `${formatDate(item.start_date)} - ${item.end_date ? formatDate(item.end_date) : $t('present')}` }}
            </h5>
            <div class="flex items-center">
              <div class="bg-light-navy rounded-full h-4 w-4 ml-3 absolute"></div>
              <p class="pl-5 font-mono italic font-thin text-sm mx-5">{{ item.location }}</p>
            </div>
            <div class="ml-12">
              <div class="flex items-center -ml-9">
                <div class="flex justify-around my-4 relative">
                  <div class="bg-light-navy rounded-full h-4 w-4 absolute left-1 -ml-1"></div>
                  <div class="ml-10 styled-list-arrow" v-html="markdownfy(item.main_activities)"></div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import {Component, Prop, Vue} from 'vue-property-decorator';
import {formatDate, markdownfy} from "~/util/utilities";

@Component
export default class ResumeTimeline extends Vue {
  @Prop({required: true}) readonly experience: any;

  formatDate(date: string, dateFormat = 'MMMM, yyyy'): string {
    return formatDate(date, dateFormat, this.$i18n.locale);
  }
  markdownfy(str: string): string {
    return markdownfy(str);
  }
}
</script>

<style lang="scss">

.styled-list-arrow {
  ul{
    display: grid;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
}
</style>
