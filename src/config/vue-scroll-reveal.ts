import VueScrollReveal from "gridsome-scroll-reveal";

export default function initVueScrollReveal(Vue, isClient: boolean) {
  let duration = 800;
  let lastScrollPosition = 0;
  if (isClient) {
    window.addEventListener("scroll", () => {
      const currentScrollPosition = isClient
        ? window.pageYOffset || document.documentElement.scrollTop
        : 0;
      if (currentScrollPosition < 0) {
        return;
      }
      // currentScrollPosition < lastScrollPosition? 'UP' : 'DOWN
      duration = currentScrollPosition < lastScrollPosition ? 50 : 800;
      lastScrollPosition = currentScrollPosition;
    });
    // Using ScrollReveal's default configuration
    Vue.use(VueScrollReveal, {
      class: "v-scroll-reveal", // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
      duration,
      scale: 1,
      distance: "10px",
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      mobile: false,
      reset: true,
      cleanup: true,
    });
  }
}
