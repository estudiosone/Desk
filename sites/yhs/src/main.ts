import Vue from 'vue';
import Element from 'element-ui';
import firebase from 'firebase';
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

// Vue.use(Desk);

const app = firebase.initializeApp(config);

const auth = app.auth();

let userCreated = false;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    alert(user.uid);
    console.log('user', user);
    // User is signed in.
  } else {
    if(!userCreated) {
      userCreated = true;
      console.log('create new user');
      auth.signInAnonymously();
      // No user is signed in.
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
