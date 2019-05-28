import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";

import { IState } from "../types/store";

interface NavMenu {
  Index: number;
  Name: string;
  To: string;
}
interface Site {
  Name: string;
  LogoURL: string;
  NavMenu: NavMenu[];
}
export interface Phone {
  area_code: any;
  number: any;
}
export interface Identification {
  type: any;
  number: any;
}
export interface Address {
  name: string;
  street_name: any;
  street_number: any;
  apartament: any;
  zip_code: any;
  state: any;
  city: any;
  mainAddress: boolean;
}
export interface User {
  name: any;
  surname: any;
  email: any;
  photoUrl: any;
  phone: Phone;
  identification: Identification;
  address: Address[];
}
export interface OrderLine {
  itemId: string;
  itemName: string;
  itemPhotoURL: string;
  itemPrice: number;
  lineQuantity: number;
  lineTotal: number;
}
export interface Order {
  user: User | undefined;
  sendAddress: Address | undefined;
  detail: OrderLine[];
}
interface State {
  SiteId: string;
  Site: Site;
  businessId: any;
  userId: any;
  user: User;
  order: Order;
}

Vue.use(Vuex);

const stateConst: State = {
  SiteId: "8DgciBZUYfrLfnKonpml",
  Site: {
    Name: "",
    LogoURL: "",
    NavMenu: []
  },
  businessId: "hN4Z7KaHwWxniNgVHjTX",
  userId: undefined,
  user: {
    name: "",
    surname: "",
    email: "",
    photoUrl: "",
    phone: {
      area_code: "",
      number: ""
    },
    identification: {
      type: "",
      number: ""
    },
    address: []
  },
  order: {
    user: undefined,
    sendAddress: undefined,
    detail: []
  }
};

export default new Vuex.Store({
  state: stateConst,
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
    }
  },
  actions: {
    async initializeApp(context) {
      const db = firebase.firestore();
      const siteRef = db.collection("Sites").doc(context.state.SiteId);
      const site = await siteRef.get();
      const siteData: Site = site.data() as Site;
      siteData.NavMenu = [];
      const navMenu = await siteRef
        .collection("NavMenu")
        .orderBy("Index")
        .get();
      navMenu.forEach(item => siteData.NavMenu.push(item.data() as NavMenu));
      context.commit("set_site", siteData);
    }
  },
  modules: {
    blog: {
      namespaced: true,
      state: {
        entries: [
          {
            id: "b1",
            title: "tendencias - invierno 2019",
            mediaURL:
              "http://yhairstylist.com/wp-content/uploads/2019/05/06_guetzli-10-300x300.jpg",
            tags: ["Tendencias", "Invierno", "2019"],
            childrens: [
              {
                type: 'img',
                data: [
                  'http://yhairstylist.com/wp-content/uploads/2019/05/06_guetzli-10-300x300.jpg',
                  'http://yhairstylist.com/wp-content/uploads/2019/05/cortesestilobobcortepuntas-225x300.jpg',
                  'http://yhairstylist.com/wp-content/uploads/2019/05/f13e956ed68ccf50ff430eb8f826cf5b-199x300.jpg'
                ]
              },
              {
                type: 'p',
                data: 'El corte de pelo Bob, la tendencia capilar que regresó este verano, sigue siendo una de las tendencias claras para este invierno. También conocido como ¾ porque representa tres cuartas partes de lo que se considera un peinado de cabello largo,empieza en la nuca y tiene una progresión lineal continua hacia delante.'
              },
              {
                type: 'p',
                data: 'Este corte de pelo te dejará una melena corta que te permitirá evitar el secador y las planchas. Y, al no abusar de los productos de peinado, este corte ayudará a tu pelo a recuperarse de los excesos de sol y sequedad del verano y el otoño.'
              }
            ]
          },
          {
            id: "b2",
            title: "tendencias - color 2019",
            mediaURL:
              "http://yhairstylist.com/wp-content/uploads/2019/05/25dbc8c9aae8cf215667c221ea4df570-238x300.jpg",
            tags: ["Tendencias", "Color", "2019"],
            childrens: [
              {
                type: 'img',
                data: [
                  'http://yhairstylist.com/wp-content/uploads/2019/05/25dbc8c9aae8cf215667c221ea4df570-238x300.jpg',
                  'http://yhairstylist.com/wp-content/uploads/2019/05/57ff37414776ace0dd76522df6f31f1a-240x300.jpg',
                  'http://yhairstylist.com/wp-content/uploads/2019/05/f8b017c542c3f51f5de45e8e33c5ba3d-182x300.jpg',
                  'http://yhairstylist.com/wp-content/uploads/2019/05/6b8038d591dae0ca6483a9391657cf78-218x300.jpg',
                  'http://yhairstylist.com/wp-content/uploads/2019/05/trucos_para_reinventar_un_long_bob_841193398_562x908-186x300.jpg'
                ]
              },
              {
                type: 'p',
                data: 'Las mechas balayage, los rubios soda, los tonos bronde, castaños profundos, pelirrojos y rosas se convierten en los favoritos de la temporada.'
              },
            ]
          }
        ]
      }
    }
  }
});
