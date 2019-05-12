export const Registrar = (store: any) => {
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
}
