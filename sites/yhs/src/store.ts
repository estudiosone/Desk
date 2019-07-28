import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";

import { IState } from "../types/store";
/// Modulos

// Salon Booking
import Availability from "./types/modules/salonBooking/Availability";
import BeautySalon from "./types/modules/salonBooking/BeautySalon";
import BeautyService from "./types/modules/salonBooking/Service";

interface NavMenu {
  Index: number;
  Name: string;
  To: string;
}
interface Site {
  name: string;
  logoURL: string;
  navMenu: NavMenu[];
  bookingSalons: {
    beautySalons: BeautySalon[];
    beautyServices: BeautyService[];
  };
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
  SiteId: "6460b669-17ab-41eb-bf55-eafccad959b1",
  Site: {
    name: "",
    logoURL: "",
    navMenu: [],
    bookingSalons: {
      beautySalons: [],
      beautyServices: []
    }
  },
  businessId: "26083601-220d-43b0-9550-310634e07e1c",
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
    async initializeApp(context, rootContext) {
      const site = await axios.post(
        "https://ey1wdbg3mk.execute-api.us-east-1.amazonaws.com/production",
        {
          operation: "get site from id",
          param: {
            id: "6460b669-17ab-41eb-bf55-eafccad959b1"
          }
        }
      );
      const siteModules: {
        navMenu: any;
      } = {
        navMenu: undefined
      };
      siteModules.navMenu = await axios.post(
        "https://ey1wdbg3mk.execute-api.us-east-1.amazonaws.com/production",
        {
          operation: "get siteModules from site type",
          param: {
            site: "6460b669-17ab-41eb-bf55-eafccad959b1",
            type: "Nav Menu"
          }
        }
      );
      const siteData: Site = {
        name: site.data.Item.name,
        logoURL: site.data.Item.logoURL,
        navMenu: [],
        bookingSalons: site.data.Item.modules.bookingSalons
      };
      siteModules.navMenu.data.Items[0].data.items.forEach((item: any) =>
        siteData.navMenu.push(item as NavMenu)
      );

      // Iniciar modulo BookingSalon
      const beautySalons = new Array<BeautySalon>();
      site.data.Item.modules.bookingSalons.beautySalons.forEach(
        async (element: BeautySalon) => {
          const resultBeautySalons: BeautySalon = (await axios.post(
            "https://ey1wdbg3mk.execute-api.us-east-1.amazonaws.com/production",
            {
              operation: "get beautySalons from id",
              param: {
                id: element
              }
            }
          )).data.Item;
          beautySalons.push(resultBeautySalons);
        }
      );
      siteData.bookingSalons.beautySalons = beautySalons;

      const beautyServices = new Array<BeautyService>();
      site.data.Item.modules.bookingSalons.beautyServices.forEach(
        async (element: BeautyService) => {
          const resultBeautyServices: BeautySalon = (await axios.post(
            "https://ey1wdbg3mk.execute-api.us-east-1.amazonaws.com/production",
            {
              operation: "get beautyServices from id",
              param: {
                id: element
              }
            }
          )).data.Item;
          beautyServices.push(resultBeautyServices);
        }
      );
      siteData.bookingSalons.beautyServices = beautyServices;
      context.commit("set_site", siteData);
    }
  },
  modules: {
    salonBooking: {
      namespaced: true,
      state: {
        availability: Object,
        beautySalons: new Array<BeautySalon>(),
        services: new Array<BeautyService>()
      },
      mutations: {
        setAvailability(state, payload: Availability) {
          state.availability = payload;
        },
        setBeautySalons(state, payload: BeautySalon[]) {
          state.beautySalons = payload;
        },
        setServices(state, payload: BeautyService[]) {
          state.services = payload;
        }
      },
      actions: {
        async initialization(context) {
          // Obtener los servicios
          // const services = new Array<Service>();
          // const resultServices = await db
          //   .collection(`Sites/${siteId}/modules/salon-booking/services`)
          //   .get();
          // resultServices.forEach(
          //   (element: firebase.firestore.QueryDocumentSnapshot) => {
          //     services.push({
          //       id: element.id,
          //       name: element.data()!.name
          //     });
          //   }
          // );
          // services.sort((a, b) => {
          //   if (a.name > b.name) {
          //     return 1;
          //   }
          //   if (a.name < b.name) {
          //     return -1;
          //   }
          //   // a must be equal to b
          //   return 0;
          // });
          // Guardo los nuevos estados
          // context.commit("setServices", services);
        }
      }
    },
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
