import Vue from "vue";
import Element from "element-ui";
// import InfiniteLoading from 'vue-infinite-loading';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/performance";
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
  authDomain: "yhairstylist.firebaseapp.com",
  databaseURL: "https://desk-uy.firebaseio.com",
  projectId: "desk-uy",
  storageBucket: "desk-uy.appspot.com",
  messagingSenderId: "456998131508",
  appId: "1:456998131508:web:9771938dd1cc84e2"
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
