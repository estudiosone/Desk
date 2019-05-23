import Vue from "vue";
import Element from "element-ui";
// import InfiniteLoading from 'vue-infinite-loading';
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import locale from "element-ui/lib/locale/lang/es";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import desksuite from "../../../plugins/desksuite";

import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";

import { Register } from "./utilities/components";
import WidgetStoreAddBag from "./components/Widgets/StoreAddBag.vue";

Vue.config.productionTip = false;
Vue.use(Element, { locale });
// Vue.use(InfiniteLoading, { /* options */ });

const config = {
  apiKey: "AIzaSyBmHcyoT3Yrmz8g6IDlVK0ogPd89-M-lWQ",
  authDomain: "desk-uy.firebaseapp.com",
  databaseURL: "https://desk-uy.firebaseio.com",
  projectId: "desk-uy",
  storageBucket: "desk-uy.appspot.com",
  messagingSenderId: "456998131508"
};

const app = firebase.initializeApp(config);
const perf = firebase.performance();
const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
Vue.use(desksuite, { store });

Register();
Vue.component("widget-store-add-bag", WidgetStoreAddBag);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
