import Vuex from './store';

export const install = function (Vue: any, options: any) {
  Vuex.Registrar(options.store);
}

export default {
  install,
}
