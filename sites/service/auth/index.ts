import Firebase from 'firebase';
import Vue from 'vue';
import { Service } from '../index';

export class Auth {
  constructor(Service: Service) {
    const user = Service.App.auth().currentUser;
    if (user) {
      Service.Data.Auth.CurrentUser.Uid = user.uid;
    } else {
      Service.App.auth().signInAnonymously()
        .then((result: Firebase.auth.UserCredential) => {
          const user = result.user
          if(user) {
            Service.Data.Auth.CurrentUser.Uid = user.uid
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
    }
  }
}