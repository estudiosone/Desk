import _Firebase from 'firebase';

export default class Core {
  DataBase: DataBase.DataBaseHelper;

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
    const firebase = _Firebase.initializeApp(config);
    this.DataBase = new DataBase.DataBaseHelper(firebase);
  }


}

namespace DataBase {
  export class DataBaseHelper {
    constructor(Firebase: _Firebase.app.App) {
      this.Firestore = Firebase.firestore();
    }
    private Firestore: _Firebase.firestore.Firestore;
    test() {
      this.Firestore.collection('test').doc('test').get()
        .then((value: _Firebase.firestore.DocumentSnapshot) => {
          var a = value.data();
          a.Data;
        })
    }

  }

  namespace Sales {
    export class SalesHelper {
      static Current: SalesHelper;

    }

    class ItemHelper {
      private Firestore: _Firebase.firestore.Firestore;

      Get(Id: String) {

      }
    }

    class Item {
      id: String
      name: String;
      nameTag: String;
      description: String;
      business: _Firebase.firestore.DocumentReference;
    }

    interface I_Items {
      name: String,
      nameTag: String,
      description: String
    }
  }
}
