import Firebase from 'firebase';

namespace Inventory {
  export class DataBase {
    InventoryItems: Firebase.firestore.CollectionReference;

    constructor(dataBase: Firebase.firestore.Firestore) {
      this.InventoryItems = dataBase.collection('Inventory-Items');
    }
  }

  export class Item {
    Id: String | undefined;

    Name: String | undefined;

    NameTag: String | undefined;

    Description: String | undefined;

    Business: Firebase.firestore.DocumentReference | undefined;
  }

  export class Default {
    DataBase: Inventory.DataBase;

    constructor(dataBase: Firebase.firestore.Firestore) {
      this.DataBase = new DataBase(dataBase);
    }

    async ItemGet(Id: string): Promise<Inventory.Item | undefined> {
      const doc = await this.DataBase.InventoryItems.doc(Id).get();
      let result: Item | undefined;
      if (doc.exists) {
        result = {
          ...doc.data() as Item,
          Id: doc.id,
        };
      }
      return result;
    }
  }
}

export default Inventory.Default;
