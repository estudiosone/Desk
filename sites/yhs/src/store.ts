import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

import { IState } from '../types/store';

type NavMenu = {
  Index: number,
  Name: string,
  To: string,
}
type Site = {
  Name: string,
  LogoURL: string,
  NavMenu: NavMenu[],
}
export type Phone = {
  area_code: any,
  number: any,
}
export type Identification = {
  type: any,
  number: any,
}
export type Address = {
  name: string,
  street_name: any,
  street_number: any,
  apartament: any,
  zip_code: any,
  state: any,
  city: any,
  mainAddress: boolean,
}
export type User = {
  name: any,
  surname: any,
  email: any,
  photoUrl: any,
  phone: Phone,
  identification: Identification,
  address: Address[],
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
  SiteId: string,
  Site: Site,
  businessId: any,
  userId: any,
  user: User,
  order: Order,
}

Vue.use(Vuex);

const state: State = {
  SiteId: '8DgciBZUYfrLfnKonpml',
  Site: {
    Name: '',
    LogoURL: '',
    NavMenu: [],
  },
  businessId: 'hN4Z7KaHwWxniNgVHjTX',
  userId: undefined,
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
    address: [],
  },
  order: {
    detail: [

    ],
  },
};

export default new Vuex.Store({
  state,
  mutations: {
    set_site(state, payload) {
      state.Site = payload;
    },
    userId(state, UID) {
      state.userId = UID;
    },
    user(state, userData) {
      state.user = userData;
    },
    userAddress(state, payload: Address[]) {
      state.user.address = payload;
    },
    order(state, payload: Order) {
      state.order = payload;
    },
    order_add_detail_line(state, payload: OrderDetail) {
      state.order.detail.push(payload);
    },
  },
  actions: {
    async initializeApp(context) {
      const db = firebase.firestore();
      const siteRef = db.collection('Sites').doc(context.state.SiteId);
      const site = await siteRef.get();
      const siteData: Site = site.data() as Site;
      siteData.NavMenu = [];
      const navMenu = await siteRef.collection('NavMenu').orderBy('Index').get();
      navMenu.forEach(item => siteData.NavMenu.push(item.data() as NavMenu));
      context.commit('set_site', siteData);
    },
  },
});
