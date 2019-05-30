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
              "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-invierno-2019--1.jpg?alt=media&token=4f83f838-3a42-47c3-98e9-879e16411297",
            tags: ["Tendencias", "Invierno", "2019"],
            childrens: [
              {
                type: "img",
                data: [
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-invierno-2019--1.jpg?alt=media&token=4f83f838-3a42-47c3-98e9-879e16411297",
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-invierno-2019--2.jpg?alt=media&token=404d9d8a-96ca-40c3-9fd0-b7da5ec0f17d",
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-invierno-2019--3.jpg?alt=media&token=21302d6e-6dab-45c4-8ff3-ef0b2578f68a"
                ]
              },
              {
                type: "p",
                data:
                  "El corte de pelo Bob, la tendencia capilar que regresó este verano, sigue siendo una de las tendencias claras para este invierno. También conocido como ¾ porque representa tres cuartas partes de lo que se considera un peinado de cabello largo,empieza en la nuca y tiene una progresión lineal continua hacia delante."
              },
              {
                type: "p",
                data:
                  "Este corte de pelo te dejará una melena corta que te permitirá evitar el secador y las planchas. Y, al no abusar de los productos de peinado, este corte ayudará a tu pelo a recuperarse de los excesos de sol y sequedad del verano y el otoño."
              }
            ]
          },
          {
            id: "b2",
            title: "tendencias - color 2019",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-color-2019--1.jpg?alt=media&token=aea1a527-c1fb-4947-a7f6-888672d2a438",
            tags: ["Tendencias", "Color", "2019"],
            childrens: [
              {
                type: "img",
                data: [
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-color-2019--1.jpg?alt=media&token=aea1a527-c1fb-4947-a7f6-888672d2a438",
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-color-2019--2.jpg?alt=media&token=f5aea938-8d32-4235-b13a-66b5071ae0ae",
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-color-2019--3.jpg?alt=media&token=5344af52-d4a0-45df-b098-7b02c380ad21",
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-color-2019--4.jpg?alt=media&token=fe5d548e-f24b-4afa-b799-41bac58891c8",
                  "https://firebasestorage.googleapis.com/v0/b/desk-uy.appspot.com/o/yhs%2Fassets%2Fblog-tendencias-color-2019--5.jpg?alt=media&token=38030c9e-8c8a-41ba-8bd9-24a1d8073aa8"
                ]
              },
              {
                type: "p",
                data:
                  "Las mechas balayage, los rubios soda, los tonos bronde, castaños profundos, pelirrojos y rosas se convierten en los favoritos de la temporada."
              }
            ]
          }
        ]
      }
    }
  }
});
