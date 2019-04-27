import Firebase from 'firebase';

namespace Authorization {
  export class Default {
    constructor() {

    }

    LoginAnonymus() {
      Firebase.auth().signInAnonymously().then((value: Firebase.auth.UserCredential) => {
        console.log(value.user);
      });
    }
  }
}

export default Authorization.Default;
