import utilities from './utilities/index';
import datosEstaticos from './datos-estaticos';

/* eslint-disable no-param-reassign */
export const Registrar = (store: any) => {
  store.registerModule('Utilidades', utilities);
  store.registerModule('DatosEstaticos', datosEstaticos);
};

export default {
  Registrar,
};
