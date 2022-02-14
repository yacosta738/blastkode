import { register } from "register-service-worker";

register(`${process.env.GRIDSOME_BASE_URL}service-worker.js`, {
  ready() {
    console.log(
      "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
    );
  },
  registered() {
    // context.appOptions.store.commit("swUpdate", "registered");
    console.log("Service worker has been registered.");
  },
  cached() {
    // context.appOptions.store.commit("swUpdate", "cached");
    if (window.caches) {
      caches.open("yap-cache-v1.1").then((cache) => {
        cache.addAll(["/index.html", "/assets/js/app.js"]);
      });
    }
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    // context.appOptions.store.commit("swUpdate", "updateFound");
    console.log("New content is downloading.");
  },
  updated() {
    // context.appOptions.store.commit("swUpdate", "updated");
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log("OFFLINE MODE");
    // context.appOptions.store.commit("swUpdate", "offline");
    self.addEventListener("fetch", (event) => {
      console.log(event);
    });
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    // context.appOptions.store.commit("swUpdate", "error");
    console.error("Error during service worker registration:", error);
  },
});
