import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
