<template>
  <section id="about" class="container mx-auto" v-scroll-reveal.reset>
    <h2 class="numbered-heading" v-text="$t('about')">About Me</h2>
    <div class="inner">
      <div class="styled-text">
        <div class="styled-text">
          <p v-html="markdownfy(yacosta.content)" class="mb-2">
            I'm a software engineer based in Ciego de Ávila, Cuba specializing in building (and occasionally designing)
            exceptional websites, applications, and everything in between.
          </p>

          <p v-text="$t('about-tech')">Here are a few technologies I've been working with recently:</p>
        </div>
        <ul class="skills-list">
          <li v-for="(skill, i) in skills" :key="i">{{ skill }}</li>
        </ul>
      </div>
      <div class="styled-pic">
        <div class="wrapper">
          <g-image :src="yacosta.image? yacosta.image : '../../../static/me.png'" alt="Yuniel Acosta" class="img"/>
        </div>
      </div>
    </div>
  </section>
</template>

<static-query>
query Author {
  author: allAuthor(filter: {path:{in: ["/en/yuniel-acosta", "/es/yuniel-acosta"]}}) {
    edges{
      node{
        id
        name
        image
        lang
        role
        content
      }
    }
  }
}
</static-query>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {inlineLinks, markdownfy} from "~/util/utilities";

@Component
export default class About extends Vue {
  skills = ['TypeScript', 'HTML & (S)CSS', 'Angular', 'Vue', 'Node.js', 'Spring Boot'];

  @Watch('$i18n.locale')
  private setInlineLink() {
    setTimeout(() => {
      inlineLinks('styled-text');
    }, 2000);
  }

  mounted(): void {
    this.setInlineLink();
  }

  get yacosta() {
    return this.$static.author.edges.filter(edge => edge.node.lang === this.$i18n.locale)[0].node;
  }

  markdownfy(str: string): string {
    return markdownfy(str);
  }
}
</script>

<style scoped lang="scss">
section {
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
  }
}

.styled-text {
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
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

.styled-pic {
  position: relative;
  max-width: 300px;

  .wrapper {
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);
    display: block;
    position: relative;
    width: 100%;
    border-radius: 4px;
    background-color: var(--green);
    z-index: 1;

    &:hover {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    &:focus {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      overflow: hidden;
      position: relative;
      border-radius: 4px;
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      transition: var(--transition);
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      transition: var(--transition);
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
}

@media (max-width: 768px) {
  section {
    .inner {
      display: block;
    }
  }
  .styled-pic {
    margin: 50px auto 0;
    width: 70%;
  }
}

</style>
