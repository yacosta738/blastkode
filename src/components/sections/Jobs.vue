<template>
  <section id="jobs" class="container styled-jobs-section" v-scroll-reveal.reset>
    <h2 class="numbered-heading" v-text="$t('where-worked')">Where I've Worked</h2>
    <div class="inner">
      <ul class="styled-tab-list" role="tablist" aria-label="Job tabs">
        <li v-for="(job, i) in jobs" :key="job.id">
          <button class="styled-tab-button"
                  :class="{'text-green-500':activeTabId === i}"
                  :id="`tab-${i}`"
                  role="tab"
                  :aria-selected="activeTabId === i ? 'true' : 'false'"
                  :aria-controls="`panel-${i}`"
                  :tabIndex="activeTabId === i ? '0' : '-1'"
                  @click="activeTabId = i"
                  @keyup.up.prevent.stop="(activeTabId - 1 >= 0 )?activeTabId -= 1:activeTabId = jobs.length - 1"
                  @keyup.down.prevent.stop="(activeTabId + 1 >= jobs.length)?activeTabId = 0:activeTabId+=1"
          >
            <span>{{ job.company }}</span>
          </button>
        </li>
        <div class="styled-high-light"
             :style="(isSmallScreen)?`transform: translateX(calc(${activeTabId} * 120px));`:`transform: translateY(calc(${activeTabId} * 42px));`"></div>
      </ul>
      <transition name="fade" mode="out-in">
        <div>
          <div v-for="(job, i) in jobs" :id="`panel-${i}`" :key="job.id"
               class="styled-tab-content" role="tabpanel" :tabIndex="(activeTabId === i)? 0 : -1"
               :aria-labelledby="`tab-${i}`"
               :aria-hidden="activeTabId !== i" :hidden="activeTabId !== i">
            <h3>
              <span>{{ job.role }}</span>
              <span class="company">
                &nbsp;@&nbsp;
                <g-link :to="$tp(job.url)" class="inline-link">
                  {{ job.company }}
                </g-link>
              </span>
            </h3>
            <p class="range">{{ range(job) }}</p>
            <div v-html="job.content"></div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<static-query>
query Jobs ($page: Int) {
  jobs: allJob (sortBy: "start_date", order: DESC, perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        lang
        role
        start_date
        end_date
        company
        location
        url
        content
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {formatDate, inlineLinks} from '~/util/utilities';
import Job from '~/models/Job';

@Component
export default class Jobs extends Vue {
  activeTabId: number = 0;

  get jobs(): Job[] {
    return this.$static.jobs.edges
        .filter(edge => edge.node.lang === this.$i18n.locale)
        .map(edge => Job.fromJson(edge.node));
  }

  get isSmallScreen() {
    return this.$screen.breakpoint === 'xs' || this.$screen.breakpoint === 'sm';
  }

  range(job, dateFormat = 'MMMM, yyyy', locale = this.$i18n.locale): string {
    return `${formatDate(job.startDate, dateFormat, locale)} - ${job.endDate ? formatDate(job.endDate, dateFormat, locale) : this.$t('present')}`;
  }

  mounted(): void {
    inlineLinks('styled-tab-content');
  }
}
</script>

<style lang="scss" scoped>
.styled-jobs-section{
  max-width: 700px;
  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
      max-width: 320px;
    }
  }
}
.styled-tab-list{
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none inside none;
  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    margin-left: -25px;
    ::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
}
.styled-tab-button{
  display: inline-block;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  color: inherit;
  position: relative;
  transition: var(--transition);
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    color: var(--green);
    outline: 0;
  }
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
}

.styled-high-light {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
}
</style>
<style lang="scss">
.styled-tab-content{
  width: 100%;
  height: auto;
  padding-top: 10px;
  padding-left: 30px;

  @media (max-width: 768px) {
    padding-left: 20px;
  }
  @media (max-width: 600px) {
    padding-left: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }

  h3 {
    margin-bottom: 5px;
    font-size: var(--fz-xxl);
    font-weight: 500;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 30px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
}
</style>
