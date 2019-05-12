export const Registrar = (store: any) => {
  store.registerModule('Utilidades', {
    namespaced: true,
    state: {
      UI: {
        BP: {
          xs: false,
          xsUp: false,
          smDown: false,
          sm: false,
          smUp: false,
          mdDown: false,
          md: false,
          mdUp: false,
          lgDown: false,
          lg: false,
          lgUp: false,
          xlDown: false,
          xl: false,
        },
      },
      Modales: {
        Autenticacion: false,
      },
    },
    mutations: {
      Modal_Autenticacion(state: any, payload: boolean = !state.Modales.Autenticacion) {
        state.Modales.Autenticacion = payload;
      },
      UI_BP(state: any, payload: number) {
        const sm = 768;
        const md = 997;
        const lg = 1200;
        const xl = 1920;

        const BP = {
          xs: true,
          xsUp: false,
          smDown: false,
          sm: false,
          smUp: false,
          mdDown: false,
          md: false,
          mdUp: false,
          lgDown: false,
          lg: false,
          lgUp: false,
          xlDown: false,
          xl: false,
        };

        if (payload < sm) {
          BP.xs = true;
          BP.smDown = true;
          BP.mdDown = true;
          BP.lgDown = true;
          BP.xlDown = true;
          BP.xsUp = true;
        } else if (payload >= sm && payload < md) {
          BP.sm = true;
          BP.smDown = true;
          BP.smDown = true;
          BP.mdDown = true;
          BP.lgDown = true;
          BP.xlDown = true;
          BP.xsUp = true;
          BP.smUp = true;
        } else if (payload >= md && payload < lg) {
          BP.md = true;
          BP.mdDown = true;
          BP.lgDown = true;
          BP.xlDown = true;
          BP.xsUp = true;
          BP.smUp = true;
          BP.mdUp = true;
        } else if (payload >= lg && payload < xl) {
          BP.lg = true;
          BP.lgDown = true;
          BP.xlDown = true;
          BP.xsUp = true;
          BP.smUp = true;
          BP.mdUp = true;
          BP.lgUp = true;
        } else if (payload >= xl) {
          BP.xl = true;
          BP.xlDown = true;
          BP.xsUp = true;
          BP.smUp = true;
          BP.mdUp = true;
          BP.lgUp = true;
        }
        state.UI.BP = BP;
      },
    },
  });
  store.registerModule('DatosEstaticos', {
    namespaced: true,
    state: {
      Telefono: {
        Areas: [
          {
            Pais: 'Argentina',
            Codigo: '+54',
          },
          {
            Pais: 'Uruguay',
            Codigo: '+598',
          },
        ],
      },
      Identidad: {
        TipoDeDocumento: [
          'CI',
          'DNI',
        ],
      },
    },
  });
};

export default {
  Registrar,
};
