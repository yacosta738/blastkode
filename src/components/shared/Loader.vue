<template>
  <div class="loader-body">
    <div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Loader extends Vue {

}
</script>

<style scoped lang="scss">
.loader-body {
  height:100vh;
  background-image: radial-gradient(circle farthest-corner at center, #112240 0%, #0a192f 100%);
}

.loader {
  position: absolute;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.inner.one {
  left: 0;
  top: 0;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #64ffda;
}

.inner.two {
  right: 0;
  top: 0;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #64ffda;
}

.inner.three {
  right: 0;
  bottom: 0;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #64ffda;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>