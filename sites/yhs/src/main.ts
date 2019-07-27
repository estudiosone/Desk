import Vue from "vue";
import Element from "element-ui";
// import InfiniteLoading from 'vue-infinite-loading';
import locale from "element-ui/lib/locale/lang/es";
import moment from "moment";
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

moment.locale("es");
Vue.use(desksuite, { store });

Register();
Vue.component("widget-store-add-bag", WidgetStoreAddBag);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
