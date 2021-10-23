<template>
  <header class="fixed z-50 w-full"
          :class="{ 'navbar--hidden': !showNavbar, 'navbar--show':scrollDirection === 'UP' && lastScrollPosition !== 0 }">
    <nav id="acosta-navbar" class="relative flex flex-wrap w-full justify-between items-center py-2 md:py-4">
      <g-link :to="$tp('/')" class="py-0 my-0 border-none">
        <g-image src="../../../static/logo.svg" class="w-12  py-0 my-0" alt="logo"/>
      </g-link>
      <div class="z-50 block lg:hidden">
        <svg @click="$store.commit('toggle')" class="ham hamRotate ham7" :class="{'active-menu': isOpen}"
             viewBox="0 0 100 100"
             width="60" ref="menu-svg">
          <path
              class="line top"
              d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"/>
          <path
              class="line middle"
              d="m 70,50 h -40"/>
          <path
              class="line bottom"
              d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"/>
        </svg>
      </div>
      <menus class="hidden lg:block"></menus>
      <div v-if="isOpen" :class="{ 'navbar-menu-open':isOpen, 'navbar-menu-close':!isOpen}"
           class="navbar-menu z-40 w-64 absolute bg-light-navy top-0 right-0 h-screen flex-grow px-4 py-8 md:pb-0 overflow-y-hidden -mx-14"
           v-closable="{ exclude:['menu-svg'], handler: 'onClose'  }">
        <menus/>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {isClient} from '~/util/utilities';

const Menus = () => import("./Menus.vue");

@Component({components: {Menus}})
export default class Navbar extends Vue {
  scrollDirection: string = 'DOWN';
  lastScrollPosition: number = 0;

  get breakpoint(): string {
    return this.$screen?.breakpoint ? this.$screen?.breakpoint : '';
  }

  @Watch('breakpoint')
  changedBreakpoint() {
    if (this.isOpen && (this.$screen.breakpoint === 'md' || this.$screen.breakpoint === 'xl')) {
      this.$store.commit('toggle');
    }
  }

  get showNavbar(): boolean {
    return this.$store.state.showNavbar;
  }

  set showNavbar(show: boolean) {
    this.$store.commit('updateShowNavbar', show);
  }

  get isOpen(): boolean {
    return this.$store.state.drawer;
  }

  onClose() {
    this.$store.commit('updateDrawer', false);
  }

  get theme(): string {
    return this.$store.state.theme;
  }

  mounted() {
    if (isClient()) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  beforeDestroy() {
    if (isClient()) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  public onScroll() {
    const currentScrollPosition = (isClient()) ? window.pageYOffset || document.documentElement.scrollTop : 0;
    if (currentScrollPosition < 0 || this.isOpen) {
      return;
    }
    // const navbar = document.getElementById('acosta-navbar');
    // // Stop executing this function if the difference between
    // // current scroll position and last scroll position is less than some offset
    // if (Math.abs(currentScrollPosition - this.lastScrollPosition) < navbar.offsetHeight) {
    //   return
    // }
    this.showNavbar = currentScrollPosition < this.lastScrollPosition;
    this.scrollDirection = (currentScrollPosition < this.lastScrollPosition) ? 'UP' : 'DOWN';
    this.lastScrollPosition = currentScrollPosition;
  }
}
</script>

<style scoped lang="scss">
.navbar-menu {
  transition: all 530ms ease-out;
}

.navbar-menu-open {
  transform: translateX(0%);
}

.navbar-menu-close {
  transform: translateX(100%);
}

.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.hamRotate.active-menu {
  transform: rotate(45deg);
}

.hamRotate180.active-menu {
  transform: rotate(180deg);
}

.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #64ffda;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham7 {
  .top {
    stroke-dasharray: 40 82;
  }

  .middle {
    stroke-dasharray: 30 111;
  }

  .bottom {
    stroke-dasharray: 20 161;
  }
}

.ham7.active-menu {
  .top {
    stroke-dasharray: 40 82;
    stroke-dashoffset: -62px;
  }

  .middle {
    stroke-dasharray: 40 60;
    stroke-dashoffset: 23px;
  }

  .bottom {
    stroke-dasharray: 40 82;
    stroke-dashoffset: -82px;
  }
}

</style>
