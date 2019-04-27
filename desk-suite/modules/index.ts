import Firebase from 'firebase';
import Authorization from './authorization';
import Inventory from './inventory';

namespace Core {
  export class Modules {
    Authorization: Authorization;
    Inventory: Inventory;

    constructor(
      dataBase: Firebase.firestore.Firestore) {
        this.Authorization = new Authorization();
        this.Inventory = new Inventory(dataBase);
    }
  }
}

export default Core.Modules;
