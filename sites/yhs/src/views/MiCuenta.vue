<template>
  <div class="p-mi-cuenta">
    <div class="s-encabezado">
      <div class="s-titulo">
        mi cuenta
      </div>
      <div class="s-acciones s-acciones--centrado">
        <el-button id="btn-salir" type="text" @click.native="salirDeLaCuenta">
          SALIR DE LA CUENTA
        </el-button>
      </div>
    </div>
    <div class="s-contenido">
      <el-menu
        class="s-menu"
        :default-active="'/mi-cuenta/' + seccion"
        :router="true"
        :mode="this.$store.state.Utilidades.UI.BP.smUp ? 'vertical' : 'horizontal'"
      >
        <el-menu-item index="/mi-cuenta/datos">Mis Datos</el-menu-item>
        <el-menu-item index="/mi-cuenta/direcciones">Mis Direcciones</el-menu-item>
        <el-menu-item index="/mi-cuenta/historial">Mi Historial</el-menu-item>
      </el-menu>
      <CDatosPersonales v-if="seccion == 'datos'" />
      <CDirecciones v-if="seccion == 'direcciones'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
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
