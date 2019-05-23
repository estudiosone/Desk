import DireccionesEstados from "./_direcciones-estados";
import DireccionesCiudades from "./_direcciones-ciudades";

export default {
  namespaced: true,
  state: {
    DireccionesEstados,
    DireccionesCiudades,
    Telefono: {
      Areas: [
        {
          Pais: "Argentina",
          Codigo: "+54"
        },
        {
          Pais: "Uruguay",
          Codigo: "+598"
        }
      ]
    },
    Identidad: {
      TipoDeDocumento: ["CI", "DNI"]
    }
  }
};
