// Store
import Vuex from "vuex";

const DARK = "dark";
const LIGHT = "light";

export default function initStore(Vue, isClient: boolean) {
  Vue.use(Vuex);

  function getTheme() {
    if (isClient && !localStorage.getItem("theme")) {
      localStorage.setItem("theme", DARK);
    }
    return isClient ? !localStorage.getItem("theme") || DARK : DARK;
  }

  return new Vuex.Store({
    state: {
      theme: getTheme(),
      postId: -1,
      drawer: false,
      showNavbar: true,
      showSide: true,
      loading: false,
      firstTimeLoading: true,
      swStatus: "pending",
      searchModal: false,
    },
    getters: {
      themeClass: (state) => (state.theme === DARK ? "dark" : "light"),
    },
    mutations: {
      toggleTheme(state) {
        const isDark = state.theme === DARK;
        const message = isDark
          ? "🌙 Setting dark mode"
          : "🌞 Setting light mode";
        console.log(message);
        const newTheme = isDark ? LIGHT : DARK;

        if (isClient) {
          localStorage.setItem("theme", newTheme);
        }

        state.theme = newTheme;
        const classToAdd = newTheme;
        const classToRemove = isDark ? LIGHT : DARK;
        document.body.classList.add(classToAdd);
        document.body.classList.remove(classToRemove);
      },
      changePostId(state, id) {
        state.postId = id;
      },
      toggle(state) {
        state.drawer = !state.drawer;
      },
      updateDrawer(state, drawer) {
        state.drawer = drawer;
      },
      updateShowNavbar(state, showNavbar) {
        state.showNavbar = showNavbar;
      },
      updateShowSide(state, showSide) {
        state.showSide = showSide;
      },
      updateFirstTimeLoading(state, firstTimeLoading) {
        state.firstTimeLoading = firstTimeLoading;
      },
      loadingOn(state) {
        state.loading = !state.loading;
      },
      loadingOff(state) {
        state.loading = !state.loading;
      },
      swUpdate(state, status) {
        state.swStatus = status;
      },
      toggleSearchModal(state) {
        state.searchModal = !state.searchModal;
      },
      updateSearchModels(state, searchModal) {
        state.searchModal = searchModal;
      },
    },
  });
}
