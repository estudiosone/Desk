import Vue from 'vue';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';
import Desk from '../../../desk-suite';
import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false;
Vue.use(Element, { locale });

const config = {
  apiKey: 'AIzaSyBmHcyoT3Yrmz8g6IDlVK0ogPd89-M-lWQ',
  authDomain: 'desk-uy.firebaseapp.com',
  databaseURL: 'https://desk-uy.firebaseio.com',
  projectId: 'desk-uy',
  storageBucket: 'desk-uy.appspot.com',
  messagingSenderId: '456998131508',
};

Vue.use(Desk);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
