import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import locale from 'element-ui/lib/locale/lang/es'

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false;
Vue.use(Element, { locale });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
