<template>
  <section id="jobs" class="container max-w-2xl">
    <h2 class="numbered-heading">Where I've Worked</h2>
    <div class="inner">
      <ul class="styled-tab-list" role="tablist" aria-label="Job tabs">
        <li v-for="(job, i) in $static.jobs.edges" :key="job.node.id">
          <button class="styled-tab-button min-w-40 sm:min-w-max"
                  :class="{'text-green-500':activeTabId === i}"
                  @click="activeTabId = i">
            {{ job.node.company }}
          </button>
        </li>
        <div class="styled-high-light"
             :style="(isSmallScreen)?`transform: translateX(calc(${activeTabId} * 120px));`:`transform: translateY(calc(${activeTabId} * 42px));`"></div>
      </ul>
      <transition name="fade" mode="out-in" appear>
        <div>
          <div v-for="(job, i) in $static.jobs.edges" :id="`panel-${i}`" :key="job.node.id"
               class="styled-tab-content" role="tabpanel" :tabIndex="(activeTabId === i)? 0 : -1"
               :aria-labelledby="`tab-${i}`"
               :aria-hidden="activeTabId !== i" :hidden="activeTabId !== i">
            <h3 class="mb-1.5 text-2xl font-medium">
              <span>{{ job.node.title }}</span>
              <span class="text-green-500">
                &nbsp;@&nbsp;
                <a :href="job.node.url" class="inline-link">
                  {{ job.node.company }}
                </a>
              </span>
            </h3>
            <p class="mb-7 text-gray-400 font-mono text-sm">{{ job.node.range }}</p>
            <div v-html="job.node.content"></div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<static-query>
query Jobs ($page: Int) {
  jobs: allJob (sortBy: "date", order: DESC, perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        company
        location
        url
        range
        content
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {inlineLinks} from '~/util/utilities';

// // Focus on tabs when using up & down arrow keys
// const onKeyDown = e => {
//   if (e.key === KEY_CODES.ARROW_UP || e.key === KEY_CODES.ARROW_DOWN) {
//     e.preventDefault();
//     // Move up
//     if (e.key === KEY_CODES.ARROW_UP) {
//       setTabFocus(tabFocus - 1);
//     }
//     // Move down
//     if (e.key === KEY_CODES.ARROW_DOWN) {
//       setTabFocus(tabFocus + 1);
//     }
//   }
// };
@Component
export default class Jobs extends Vue {
  activeTabId: number = 0;

  get isSmallScreen(){
    return this.$screen.breakpoint === 'xs' || this.$screen.breakpoint === 'sm';
  }
  mounted():void {
    inlineLinks('styled-tab-content');
  }
}
</script>

<style scoped>

    section .inner {
      display: flex;
    }

    .styled-tab-list {
      position: relative;
      z-index: 3;
      width: max-content;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .styled-tab-button {
      display: inline-block;
      text-decoration: none;
      text-decoration-skip-ink: auto;
      color: inherit;
      position: relative;
      transition: var(--transition);
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 20px 2px;
      border-left: 2px solid var(--lightest-navy);
      background-color: transparent;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      text-align: left;
      white-space: nowrap;
    }
    .styled-tab-button:hover, .styled-tab-button:active, .styled-tab-button:focus {
      color: var(--green);
      outline: 0;
    }
    .styled-tab-button:hover, .styled-tab-button:focus {
      background-color: var(--light-navy);
    }
    .styled-high-light {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 2px;
      height: 42px;
      border-radius: 4px;
      background: var(--green);
      transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition-delay: 0.1s;
    }

    .styled-tab-content {
      width: 100%;
      height: auto;
      padding-top: 10px;
      padding-left: 30px;
    }

    @media (max-width: 768px) {
      section .inner {
        display: block;
      }

      .styled-tab-list {
        display: flex;
        overflow-x: auto;
        width: calc(100% + 100px);
        margin-left: -50px;
        margin-bottom: 30px;
      }

      .styled-tab-list li:first-of-type {
        margin-left: 50px;
      }

      .styled-tab-list li:last-of-type {
        padding-right: 50px;
      }
      .styled-tab-button {
        padding: 0 15px 2px;
      }
      .styled-high-light{
        top: auto;
        bottom: 0;
        width: 100%;
        max-width:120px;
        height: 2px;
        margin-left: 50px;
      }
      .styled-tab-content {
        padding-left: 20px;
      }
    }
    @media (max-width: 640px) {
      .styled-tab-list {
        width: calc(100% + 50px);
        margin-left: -25px;
      }

      .styled-tab-list li:first-of-type {
        margin-left: 25px;
      }

      .styled-tab-list li:last-of-type {
        padding-right: 25px;
      }
      .styled-high-light{
        margin-left: 25px;
      }
      .styled-tab-content {
        padding-left: 0;
      }
      .styled-tab-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 120px;
        padding: 0 15px;
        border-left: 0;
        border-bottom: 2px solid var(--lightest-navy);
        text-align: center;
      }
    }
</style>
<style>
.styled-tab-content ul {
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: var(--fz-lg);
}
.styled-tab-content ul li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 10px;
}
.styled-tab-content ul li:before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--green);
  font-size: 20px;
}
</style>
