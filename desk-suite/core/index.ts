import Firebase from 'firebase';
import firebaseui from 'firebaseui';
import Modules from '../modules';

namespace Core {
  export class Default {
    App: Firebase.app.App;
    AuthUi: any;
    DataBase: Firebase.firestore.Firestore;

    Modules: Modules;

    constructor() {
      // Configuración de Firebase
      const config = {
        apiKey: 'AIzaSyBmHcyoT3Yrmz8g6IDlVK0ogPd89-M-lWQ',
        authDomain: 'desk-uy.firebaseapp.com',
        databaseURL: 'https://desk-uy.firebaseio.com',
        projectId: 'desk-uy',
        storageBucket: 'desk-uy.appspot.com',
        messagingSenderId: '456998131508',
      };

      // Inicializar Firebase
      const firebase = Firebase.initializeApp(config);
      this.App = firebase;
      this.AuthUi = new firebaseui.auth.AuthUI(this.App.auth())
      this.DataBase = firebase.firestore();
      this.Modules = new Modules(this.DataBase);

      this.Modules.Authorization.LoginAnonymus();
    }
  }
}

export default Core.Default;
