import Vuex from "./store";

export const install = (Vue: any, options: any) => {
  Vuex.Registrar(options.store);
};

export default {
  install
};
