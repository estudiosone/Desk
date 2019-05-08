import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

import { IState } from '../types/store';
type Phone = {
  area_code: any,
  number: any,
}
type Identification = {
  type: any,
  number: any,
}
type Address = {
  street_name: any,
  street_number: any,
  zip_code: any,
}
type User = {
  name: any,
  surname: any,
  email: any,
  photoUrl: any,
  phone: Phone,
  identification: Identification,
  address: Address,
}
type OrderDetail = {
  item: any,
  quantity: any,
  price: any,
}
type Order = {
  detail: OrderDetail[],
}
type State = {
  businessId: any,
  userId: any,
  user: User,
  order: Order,
}

Vue.use(Vuex);

const state: State = {
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
    order(state, payload: Order) {
      state.order = payload;
    },
    order_add_detail_line(state, payload: OrderDetail) {
      state.order.detail.push(payload);
    }
  },
  actions: {
  },
});
