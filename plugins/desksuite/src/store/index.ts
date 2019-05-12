enum BP {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export const Registrar = (store: any) => {
  store.registerModule('Utilidades', {
    namespaced: true,
    state: {
      Modales: {
        Autenticacion: false
      }
    },
    mutations: {
      Modal_Autenticacion(state: any) {
        state.Modales.Autenticacion = !state.Modales.Autenticacion;
      }
    }
})
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
        ]
      },
      Identidad: {
        TipoDeDocumento: [
          'CI',
          'DNI',
        ]
      }
    }
  });
}

export default {
  Registrar,
  BP,
}
