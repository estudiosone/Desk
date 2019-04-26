import _Firebase from 'firebase';

export default class Core {

}

class DataBase {
  constructor(Firebase: typeof _Firebase) {
    this.Firestore = Firebase.firestore();
  }

  private Firestore: _Firebase.firestore.Firestore;

}
namespace DataBase {
  class Helper {
    constructor(Firebase: typeof _Firebase) {
      this.Firestore = Firebase.firestore();
    }
    private Firestore: _Firebase.firestore.Firestore;
  }
}
