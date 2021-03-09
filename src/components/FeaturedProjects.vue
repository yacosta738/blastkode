<template>
  <div>
    <h2 class="numbered-heading">Some Things I’ve Built</h2>
    <div>
      <div v-for="(project, i) in projects" :key="project.id" class="styled-project">
        <div class="project-content">
          <p class="project-overline">Featured Project</p>
          <h3 class="project-title">{{ project.title }}</h3>
          <div class="project-description" v-html="project.content"></div>
          <ul class="project-tech-list">
            <li v-for="tech in project.tech" :key="tech.id">
              <font-awesome v-if="tech.icon"
                            :icon="[tech.icon.type, tech.icon.value ]"/>
              {{ tech.name }}
            </li>
          </ul>
          <div class="project-links">
            <g-link v-if="project.github" :to="project.github" aria-label="GitHub Link">
              <font-awesome :icon="['fab', 'github' ]"/>
            </g-link>
            <g-link v-if="project.external" :to="project.external" aria-label="External Link">
              <font-awesome :icon="['fa', 'external-link-alt' ]"/>
            </g-link>
          </div>
        </div>
        <div class="project-image">
          <g-link :to="project.external? project.external: project.github?project.github:'#'">
            <g-image v-if="project.cover" class="img" :src="project.cover" :alt="project.title"/>
          </g-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import {Component, Prop, Vue} from "vue-property-decorator";
import Project from '~/models/Project';
import {inlineLinks} from '~/util/utilities';

@Component
export default class FeaturedProjects extends Vue {
  @Prop({required: true}) readonly projects: Project[] | undefined;

  mounted(): void {
    inlineLinks('project-description');
  }
}
</script>

<style scoped lang="scss">
.styled-project {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }

    .project-tech-list {
      justify-content: flex-end;

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 0 5px 10px;
        }
      }
    }

    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }

    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }
}

.project-content {
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;

  @media (max-width: 1080px) {
    grid-column: 1 / 9;
  }

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  }

  @media (max-width: 480px) {
    padding: 30px 25px 20px;
  }
}

.project-overline {
  margin: 10px 0;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 400;
}

.project-title {
  color: var(--lightest-slate);
  font-size: clamp(24px, 5vw, 28px);

  @media (min-width: 768px) {
    margin: 0 0 20px;
  }

  @media (max-width: 768px) {
    color: var(--white);
  }
}

.project-description {
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  transition: var(--transition);

  &:hover,
  &:focus {
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  position: relative;
  z-index: 2;
  padding: 25px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  color: var(--light-slate);
  font-size: var(--fz-lg);

  @media (max-width: 768px) {
    padding: 20px 0;
    background-color: transparent;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }
}
.project-tech-list {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  margin: 25px 0 10px;
  padding: 0;
  list-style: none;

  li {
    margin: 0 20px 5px 0;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    margin: 10px 0;

    li {
      margin: 0 10px 5px 0;
      color: var(--lightest-slate);
    }
  }
}

.project-links {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: var(--lightest-slate);

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    &.external {
      svg {
        width: 22px;
        height: 22px;
        margin-top: -4px;
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
.project-image {
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  transition: var(--transition);

  &:hover,
  &:focus {
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    height: 100%;
    opacity: 0.25;
  }

  a {
    width: 100%;
    background-color: var(--green);
    border-radius: var(--border-radius);
    vertical-align: middle;

    &:hover,
    &:focus {
      background: transparent;

      &:before,
      .img {
        background: transparent;
        filter: none;
      }
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      transition: var(--transition);
      background-color: var(--navy);
      mix-blend-mode: screen;
    }
  }

  .img {
    border-radius: var(--border-radius);
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(1) brightness(90%);

    @media (max-width: 768px) {
      object-fit: cover;
      width: auto;
      height: 100%;
      filter: grayscale(100%) contrast(1) brightness(80%);
    }
  }
}
</style>
