import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    user: {
      name: '',
      surname: '',
      email: '',
      photoUrl: '',
      phone: {
        area_code: '',
        number: '',
      },
      identification: {
        type: '',
        number: '',
      },
      address: {
        street_name: '',
        street_number: '',
        zip_code: '',
      },
      isAnonymous: false,
    }
  },
  mutations: {
    userId(state, UID) {
      state.userId = UID;
    },
    user(state, userData) {
      state.user = userData;
    }
  },
  actions: {
    addToBag(context, id) {

    },
  },
});
