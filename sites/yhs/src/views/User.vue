<template>
  <div class="p-mi-cuenta">
    <div class="titulo">
      mi cuenta
    </div>
    <el-menu
      class="s-menu"
      :default-active="'/mi-cuenta/' + accion"
      mode="horizontal">
      <el-menu-item index="/mi-cuenta/datos">Mis Datos</el-menu-item>
      <el-menu-item index="/mi-cuenta/direcciones">Mis Direcciones</el-menu-item>
      <el-menu-item index="/mi-cuenta/historial">Mi Historial</el-menu-item>
    </el-menu>
    <el-form
      class="s-datos"
      :model="datos"
      label-width="120px"
      label-position="top">
      <el-form-item label="Nombre">
        <el-input v-model="datos.name"></el-input>
      </el-form-item>
      <el-form-item label="Apellido">
        <el-input v-model="datos.surname"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    accion: {
      type: String,
      default: 'datos'
    }
  },
  data() {
    return {
      datos: {
        name: '',
        surname: '',
        email: '',
        photoUrl: '',
        phone: {
          area_code: '',
          number: '',
        },
        identification: {
          type: '',
          number: '',
        },
      }
    }
  },
  methods: {
    guardarDatos() {

    },
  },
  mounted() {
    this.datos = this.$store.state.user;
  }
})
</script>
