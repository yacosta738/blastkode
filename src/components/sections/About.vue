<template>
  <section id="about" class="">
    <h2 class="numbered-heading">About Me</h2>
    <div class="inner">
      <div class="styled-text">
        <div class="styled-text">
          <p>Hello! I'm Yuniel, a software engineer based in Ciego de Ávila, Cuba.</p>

          <p>
            I enjoy creating things that live on the internet, whether that be websites,
            applications, or anything in between. My goal is to always build products that provide
            pixel-perfect, performant experiences.
          </p>

          <p>
            Shortly after graduating from
            <a href="https://www.ccis.northeastern.edu" class="inline-link">Northeastern University</a>, I joined the
            engineering team at <a href="https://www.upstatement.com" class="inline-link">Upstatement</a> where I work
            on a wide variety of interesting and meaningful projects on a daily basis.
          </p>

          <p>Here are a few technologies I've been working with recently:</p>
        </div>
        <ul class="skills-list">
          <li v-for="(skill, i) in skills" :key="i">{{ skill }}</li>
        </ul>
      </div>
      <div class="styled-pic">
        <div class="wrapper">
          <g-image src="../../../static/avatar.jpg" alt="avatar" class="img"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class About extends Vue {
  skills = ['JavaScript (ES6+)', 'HTML & (S)CSS', 'React', 'Vue', 'Node.js', 'WordPress'];
}
</script>

<style scoped>
section {
  max-width: 900px;
}

section .inner {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 50px;
}

@media (max-width: 768px) {
  section .inner {
    display: block;
  }
}

.styled-text ul.skills-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  padding: 0;
  margin: 20px 0 0 0;
  overflow: hidden;
  list-style: none;
}

.styled-text ul.skills-list li {
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
}

.styled-text ul.skills-list li:before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--green);
  font-size: var(--fz-sm);
  line-height: 12px;
}

.styled-pic {
  position: relative;
  max-width: 300px;
}

@media (max-width: 768px) {
  .styled-pic {
    margin: 50px auto 0;
    width: 70%;
  }
}

.styled-pic .wrapper {
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  transition: var(--transition);
  display: block;
  position: relative;
  width: 100%;
  border-radius: 4px;
  background-color: var(--green);
  z-index: 1;
}

.styled-pic .wrapper:hover, .styled-pic .wrapper:focus {
  box-shadow: 0 20px 30px -15px var(--navy-shadow);
}

.styled-pic .wrapper:hover, .styled-pic .wrapper:focus {
  background: transparent;
  outline: 0;
}

.styled-pic .wrapper:hover:after, .styled-pic .wrapper:focus:after {
  top: 15px;
  left: 15px;
}

.styled-pic .wrapper:hover .img, .styled-pic .wrapper:focus .img {
  filter: none;
  mix-blend-mode: normal;
}

.styled-pic .wrapper .img {
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  transition: var(--transition);
}

.styled-pic .wrapper:before, .styled-pic .wrapper:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  transition: var(--transition);
}

.styled-pic .wrapper:before {
  top: 0;
  left: 0;
  background-color: var(--navy);
  mix-blend-mode: screen;
}

.styled-pic .wrapper:after {
  border: 2px solid var(--green);
  top: 20px;
  left: 20px;
  z-index: -1;
}

</style>
