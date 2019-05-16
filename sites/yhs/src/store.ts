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
export type OrderLine = {
  itemId: string,
  itemName: string,
  itemPhotoURL: string,
  itemPrice: number,
  lineQuantity: number,
  lineTotal: number,
}
export type Order = {
  detail: OrderLine[],
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
      {
        itemId: 'jvfanpcb12vn1e6in9y',
        itemName: 'Bain Chromatique',
        itemPhotoURL: 'https://www.kerastase.uy/-/media/project/loreal/brand-sites/kerastase/americas/latam/products/reflection/packshots/bain-chromatique-reflection-250ml-01-kerastase.png?w=500&hash=F7B70C39B35D8893F5FEF32E1D4BF9280FB811D0',
        itemPrice: 1295,
        lineQuantity: 1,
        lineTotal: 1295,
      },
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
    order_add_detail_line(state, payload: OrderLine) {
      state.order.detail.push(payload);
    },
    order_remove_detail_line(state, payload: OrderLine) {
      const i = state.order.detail.indexOf(payload);
      state.order.detail.splice(i, 1);
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
