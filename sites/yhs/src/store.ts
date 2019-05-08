import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

import { IState } from '../types/store';

Vue.use(Vuex);

const state = {
  businessId: 'hN4Z7KaHwWxniNgVHjTX',
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
  },
  order: {
    detail: [

    ],
  },
};

export default new Vuex.Store({
  state,
  mutations: {
    userId(state, UID) {
      state.userId = UID;
    },
    user(state, userData) {
      state.user = userData;
    },
  },
  actions: {
    // async addToBag(context, payload) {
    //   context.state.order.detail.push({
    //     productId: payload.productId,
    //     quantity: payload.quantity,
    //   })
    // },
  },
});
