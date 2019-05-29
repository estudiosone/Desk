<template lang="pug">
.p-mi-cuenta
  .s-encabezado
    .s-title mi cuenta
    .s-acciones.s-acciones--centrado
      el-button#btn-salir(type='text', @click.native='salirDeLaCuenta') SALIR DE LA CUENTA
  .s-contenido
    el-menu.s-menu(:default-active="'/mi-cuenta/' + seccion", :router='true', :mode="this.$store.state.Utilidades.UI.BP.smUp ? 'vertical' : 'horizontal'")
      el-menu-item(index='/mi-cuenta/datos') Mis Datos
      el-menu-item(index='/mi-cuenta/direcciones') Mis Direcciones
      el-menu-item(index='/mi-cuenta/historial') Mi Historial
    c-datos-personales(v-if="seccion == 'datos'")
    c-direcciones(v-if="seccion == 'direcciones'")
    c-historial(v-if="seccion == 'historial'",:id="id",:action="action")
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import CDatosPersonales from "../components/CDatosPersonales.vue";
import CDirecciones from "../components/CDirecciones.vue";
import CHistorial from "../components/CHistorial.vue";

export default Vue.extend({
  components: {
    CDatosPersonales,
    CDirecciones,
    CHistorial
  },
  props: {
    seccion: {
      type: String,
      default: "datos"
    },
    id: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: ""
    },
    index: {
      type: String,
      default: "0"
    }
  },
  methods: {
    async salirDeLaCuenta() {
      await firebase.auth().signOut();
      this.$router.push("/");
    }
  }
});
</script>
