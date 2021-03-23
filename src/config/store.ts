// Store
import Vuex from 'vuex';

export default function initStore(Vue, isClient: boolean) {
    Vue.use(Vuex);

    function getTheme() {
        if (isClient && !localStorage.getItem('theme')){
            localStorage.setItem('theme', 'theme-dark');
        }
        return (isClient) ? !localStorage.getItem('theme') || 'theme-dark' : 'theme-dark';
    }

    return new Vuex.Store({
        state: {
            theme: getTheme(),
            postId: -1,
            drawer: false,
            showNavbar: true,
            showSide: true,
            loading: false,
            firstTimeLoading: true
        },
        mutations: {
            toggleTheme(state) {
                const newTheme = state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
                if (isClient) {
                    localStorage.setItem('theme', newTheme);
                }
                state.theme = newTheme;
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
            }
        }
    });
}
