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
            content:
              "<div class='entry-content'><p><img class='alignnone size-medium wp-image-440' src='http://yhairstylist.com/wp-content/uploads/2019/05/06_guetzli-10-300x300.jpg' alt='' width='300' height='300' srcset='http://yhairstylist.com/wp-content/uploads/2019/05/06_guetzli-10-300x300.jpg 300w, http://yhairstylist.com/wp-content/uploads/2019/05/06_guetzli-10-150x150.jpg 150w, http://yhairstylist.com/wp-content/uploads/2019/05/06_guetzli-10.jpg 500w' sizes='(max-width: 300px) 100vw, 300px'><img class='alignnone size-medium wp-image-441' src='http://yhairstylist.com/wp-content/uploads/2019/05/cortesestilobobcortepuntas-225x300.jpg' alt='' width='225' height='300' srcset='http://yhairstylist.com/wp-content/uploads/2019/05/cortesestilobobcortepuntas-225x300.jpg 225w, http://yhairstylist.com/wp-content/uploads/2019/05/cortesestilobobcortepuntas.jpg 550w' sizes='(max-width: 225px) 100vw, 225px'><img class='alignnone size-medium wp-image-442' src='http://yhairstylist.com/wp-content/uploads/2019/05/f13e956ed68ccf50ff430eb8f826cf5b-199x300.jpg' alt='' width='199' height='300' srcset='http://yhairstylist.com/wp-content/uploads/2019/05/f13e956ed68ccf50ff430eb8f826cf5b-199x300.jpg 199w, http://yhairstylist.com/wp-content/uploads/2019/05/f13e956ed68ccf50ff430eb8f826cf5b.jpg 345w' sizes='(max-width: 199px) 100vw, 199px'></p><div class='txt'><p><a href='https://www.instyle.es/belleza/pelo/corte-de-pelo-bob-verano_39799' target='_blank' rel='noopener noreferrer'><strong>El corte de pelo Bob, la tendencia capilar que regresó este verano</strong></a>,&nbsp;sigue siendo una de las tendencias claras para&nbsp;este invierno. También conocido como ¾ porque representa tres cuartas partes de lo que se considera un peinado de cabello largo,<strong>empieza en la nuca y tiene una progresión lineal continua hacia delante</strong>.</p><p>Este corte de pelo te dejará una melena corta que <strong>te permitirá evitar el secador y las&nbsp;planchas.</strong> Y, al no abusar de los productos de peinado, este corte ayudará a tu pelo a recuperarse de los excesos de sol y sequedad del verano y el otoño.</p></div></div>"
          },
          {
            id: "b2",
            title: "tendencias - color 2019",
            mediaURL:
              "http://yhairstylist.com/wp-content/uploads/2019/05/25dbc8c9aae8cf215667c221ea4df570-238x300.jpg",
            tags: ["Tendencias", "Color", "2019"],
            content:
              "<div><article><p><img class='alignnone size-medium wp-image-446'src='http://yhairstylist.com/wp-content/uploads/2019/05/25dbc8c9aae8cf215667c221ea4df570-238x300.jpg' alt=''width='238' height='300'srcset='http://yhairstylist.com/wp-content/uploads/2019/05/25dbc8c9aae8cf215667c221ea4df570-238x300.jpg 238w, http://yhairstylist.com/wp-content/uploads/2019/05/25dbc8c9aae8cf215667c221ea4df570.jpg 474w'sizes='(max-width: 238px) 100vw, 238px'><img class='alignnone size-medium wp-image-447'src='http://yhairstylist.com/wp-content/uploads/2019/05/57ff37414776ace0dd76522df6f31f1a-240x300.jpg' alt=''width='240' height='300'srcset='http://yhairstylist.com/wp-content/uploads/2019/05/57ff37414776ace0dd76522df6f31f1a-240x300.jpg 240w, http://yhairstylist.com/wp-content/uploads/2019/05/57ff37414776ace0dd76522df6f31f1a.jpg 256w'sizes='(max-width: 240px) 100vw, 240px'><img class='alignnone size-medium wp-image-448'src='http://yhairstylist.com/wp-content/uploads/2019/05/f8b017c542c3f51f5de45e8e33c5ba3d-182x300.jpg' alt=''width='182' height='300'srcset='http://yhairstylist.com/wp-content/uploads/2019/05/f8b017c542c3f51f5de45e8e33c5ba3d-182x300.jpg 182w, http://yhairstylist.com/wp-content/uploads/2019/05/f8b017c542c3f51f5de45e8e33c5ba3d.jpg 383w'sizes='(max-width: 182px) 100vw, 182px'><img class='alignnone size-medium wp-image-449'src='http://yhairstylist.com/wp-content/uploads/2019/05/6b8038d591dae0ca6483a9391657cf78-218x300.jpg' alt=''width='218' height='300'srcset='http://yhairstylist.com/wp-content/uploads/2019/05/6b8038d591dae0ca6483a9391657cf78-218x300.jpg 218w, http://yhairstylist.com/wp-content/uploads/2019/05/6b8038d591dae0ca6483a9391657cf78.jpg 481w'sizes='(max-width: 218px) 100vw, 218px'><img class='alignnone size-medium wp-image-450'src='http://yhairstylist.com/wp-content/uploads/2019/05/trucos_para_reinventar_un_long_bob_841193398_562x908-186x300.jpg'alt='' width='186' height='300'srcset='http://yhairstylist.com/wp-content/uploads/2019/05/trucos_para_reinventar_un_long_bob_841193398_562x908-186x300.jpg 186w, http://yhairstylist.com/wp-content/uploads/2019/05/trucos_para_reinventar_un_long_bob_841193398_562x908.jpg 562w'sizes='(max-width: 186px) 100vw, 186px'></p><p>Las mechas balayage, los rubios soda, los tonos bronde, castaños profundos, pelirrojos y rosas se convierten enlos favoritos de la temporada</p></article></div>"
          }
        ]
      }
    }
  }
});
