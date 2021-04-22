import { register } from 'register-service-worker'

register(`${process.env.GRIDSOME_BASE_URL}service-worker.js`, {
  ready () {
    console.log(
      'App is being served from cache by a service worker.\n' +
      'For more details, visit https://goo.gl/AFskqB'
    )
  },
  registered () {
    this.$store.commit('swUpdate', 'registered')
    console.log('Service worker has been registered.')
  },
  cached () {
    this.$store.commit('swUpdate', 'cached')
    console.log('Content has been cached for offline use.')
  },
  updatefound () {
    this.$store.commit('swUpdate', 'updateFound')
    console.log('New content is downloading.')
  },
  updated () {
    this.$store.commit('swUpdate', 'updated')
    console.log('New content is available; please refresh.')
  },
  offline () {
    this.$store.commit('swUpdate', 'offline')
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    this.$store.commit('swUpdate', 'error')
    console.error('Error during service worker registration:', error)
  }
})
