<template>
  <Layout>
    <div class="container mx-auto py-16" v-scroll-reveal.reset>
      <div>
        <h1 class="big-heading">All Projects</h1>
        <p class="subtitle">A big list of things I've worked on</p>
      </div>
      <div class="styled-table-container">
        <table>
          <thead>
          <tr>
            <th>Year</th>
            <th>Title</th>
            <th class="hide-on-mobile">Made at</th>
            <th class="hide-on-mobile">Built with</th>
            <th>Link</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="project in projects" :key="project.id" v-scroll-reveal.reset>
            <td class="overline year">
              {{
                (typeof project.date === 'string') ? new Date(project.date).getFullYear() : project.date.getFullYear()
              }}
            </td>
            <td class="title">{{ project.title }}</td>
            <td class="company hide-on-mobile">{{ (project.company) ? project.company : "Personal Project" }}</td>
            <td class="tech hide-on-mobile">
              <project-tech-list :project="project" position="start" :showIcon="true"/>
            </td>
            <td class="links">
              <project-links :project="project" position="start"></project-links>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Project {
projects: allProject (sortBy: "date", order: DESC, , filter: { draft: { eq: false } }) {
edges {
node {
id
path
title
date (format: "MMMM D, Y")
cover
github
external
ios
android
company
tech
showInProjects
featured
content
}
}
}
}
</page-query>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Project from '~/models/Project';
import {isAfter, isBefore} from 'date-fns';

import ProjectLinks from '~/components/ProjectLinks.vue';
import ProjectTechList from '~/components/ProjectTechList.vue';

@Component<Projects>({
  components: {ProjectTechList, ProjectLinks},
  metaInfo() {
    return {
      title: 'All Projects'
    };
  }
})
export default class Projects extends Vue {
  // ? $context has to be defined here. Otherwise TypeScript complains about not existing variable
  public $context: any;

  private get pageTitle() {
    return this.$context.title;
  }

  get projects(): Project[] {
    //@ts-ignore
    return this.$page.projects.edges.map(edge => Project.fromJson(edge.node)).sort((a, b) => {
     const dateA = typeof a?.date === 'string'? Date.parse(a.date) : a.date;
     const dateB = typeof b?.date === 'string'? Date.parse(b.date) : b.date;
      if (isBefore(dateA, dateB)) {
        return 1;
      }
      if (isAfter(dateA, dateB)) {
        return -1;
      }
      return 0;
    });
  }

  mounted() {
    this.$store.commit('updateShowSide', true);
  }

  beforeDestroy() {
    this.$store.commit('updateShowSide', false);
  }
}
</script>

<style lang="scss" scoped>
.styled-table-container {
  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }

      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }

      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;

        .separator {
          margin: 0 5px;
        }

        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 80px;

        div {
          display: flex;
          align-items: center;

          a {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.overline {
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  font-weight: 400;
}

.subtitle {
  color: var(--green);
  margin: 0 0 20px 0;
  font-size: var(--fz-md);
  font-family: var(--font-mono);
  font-weight: 400;
  line-height: 1.5;
  @media (max-width: 1080px) {
    font-size: var(--fz-sm);
  }
  @media (max-width: 768px) {
    font-size: var(--fz-xs);
  }

  a {
    line-height: 1.5;
  }
}
</style>
