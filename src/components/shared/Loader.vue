<template>
  <div class="loader-body" :class="{'opacity-0':!$store.state.loading, 'opacity-100':$store.state.loading}">
    <div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {isClient} from '~/util/utilities';
import {scroller} from 'vue-scrollto/src/scrollTo';

const scrollTo = scroller();

@Component
export default class Loader extends Vue {
  mounted() {
    const currentRoute = this.$router.currentRoute;
    if (isClient()) {
      sessionStorage.setItem('url-to-navigate', JSON.stringify({
        fullPath: currentRoute.fullPath,
        path: currentRoute.path,
        name: currentRoute.name,
        hash: currentRoute.hash,
        meta: currentRoute.meta
      }));
    }
    this.$store.commit('updateFirstTimeLoading', false);
  }

  beforeDestroy() {
    if (isClient() && sessionStorage.getItem('url-to-navigate')) {
      const url = sessionStorage.getItem('url-to-navigate');
      if (url) {
        const route = JSON.parse(url);
        if (route && route.hash) {
          setTimeout(() => {
            scrollTo(route.hash);
            this.$store.commit('updateShowNavbar', true);
          }, 1000);
        }
      }
      sessionStorage.removeItem('url-to-navigate');
    }
  }
}
</script>

<style scoped lang="scss">
.loader-body {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-image: radial-gradient(circle farthest-corner at center, #112240 0%, #0a192f 100%);
  z-index: 99;
  transition: var(--transition);
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
