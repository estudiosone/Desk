<template lang="pug">
.p-mi-cuenta
  .s-encabezado
    .s-titlemi cuenta
    .s-acciones.s-acciones--centrado
      el-button#btn-salir(type='text', @click.native='salirDeLaCuenta') SALIR DE LA CUENTA
  .s-contenido
    el-menu.s-menu(:default-active="'/mi-cuenta/' + seccion", :router='true', :mode="this.$store.state.Utilidades.UI.BP.smUp ? 'vertical' : 'horizontal'")
      el-menu-item(index='/mi-cuenta/datos') Mis Datos
      el-menu-item(index='/mi-cuenta/direcciones') Mis Direcciones
      el-menu-item(index='/mi-cuenta/historial') Mi Historial
    c-datos-personales(v-if="seccion == 'datos'")
    c-direcciones(v-if="seccion == 'direcciones'")
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import CDatosPersonales from "../components/CDatosPersonales.vue";
import CDirecciones from "../components/CDirecciones.vue";

export default Vue.extend({
  components: {
    CDatosPersonales,
    CDirecciones
  },
  props: {
    seccion: {
      type: String,
      default: "datos"
    },
    accion: {
      type: String,
      default: "listar"
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
