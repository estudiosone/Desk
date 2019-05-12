import firebase from 'firebase';
import { Store } from 'vuex/types/index';

export class Auth {
  constructor(store: Store<any>) {
    store.registerModule('Auth', {
      
    });
  };
};

export default Auth;
