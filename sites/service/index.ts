import Firebase from 'firebase';
import Vue from 'vue';
import { Auth } from './auth';

export class Service {
  // Propiedades
  App: Firebase.app.App;
  Vue: Vue;
  Data: {
    Auth: {
      CurrentUser: {
        Uid: String;
      };
    };
  };
  Auth: Auth;

  // Constructor
  constructor(App: Firebase.app.App, Vue: Vue) {
    this.App = App;
    this.Vue = Vue;
    this.Auth = new Auth(this);
    this.Data = {
      Auth: {
        CurrentUser: {
          Uid: ''
        }
      }
    };
  };
};

const install = function(Vue: any) {
  const config = {
    apiKey: "AIzaSyBmHcyoT3Yrmz8g6IDlVK0ogPd89-M-lWQ",
    authDomain: "desk-uy.firebaseapp.com",
    databaseURL: "https://desk-uy.firebaseio.com",
    projectId: "desk-uy",
    storageBucket: "desk-uy.appspot.com",
    messagingSenderId: "456998131508"
  };
  const App = Firebase.initializeApp(config);
  
  Vue.prototype.$desk = new Service(App, Vue);
};

export default {
  install,
}
