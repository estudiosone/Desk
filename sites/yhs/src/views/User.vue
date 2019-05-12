<template>
  <div class="p-mi-cuenta">
    <div class="titulo">
      mi cuenta
    </div>
    <div class="s-acciones s-acciones--centrado">
      <el-button
        id="btn-salir"
        type="text"
        @click.native="salirDeLaCuenta">
        SALIR DE LA CUENTA
      </el-button>
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
      <el-form-item label="Correo Electrónico">
        <el-input v-model="datos.email"></el-input>
      </el-form-item>
      <el-form-item label="Identificación">
        <el-input v-model="datos.identification.number">
          <el-select v-model="datos.identification.type" slot="prepend" placeholder="Tipo" style="width: 120px;">
            <el-option
              v-for="identificacion in this.$store.state.DatosEstaticos.Identidad.TipoDeDocumento"
              :label="identificacion"
              :key="identificacion"
              :value="identificacion" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="Teléfono">
        <el-input v-model="datos.phone.number">
          <el-select v-model="datos.phone.area_code" slot="prepend" placeholder="Area" style="width: 120px;">
            <el-option
              v-for="area in this.$store.state.DatosEstaticos.Telefono.Areas"
              :label="area.Pais"
              :key="area.Codigo"
              :value="area.Codigo" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item class="s-acciones s-acciones--centrado">
        <el-button type="primary" @click="guardarDatos">Guardar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore, auth } from 'firebase';

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
    async salirDeLaCuenta() {
      await firebase.auth().signOut();
      this.$router.push('/');
    }
  },
  async mounted() {
    this.datos.name = this.$store.state.user.name;
    this.datos.surname = this.$store.state.user.surname;
    this.datos.email = this.$store.state.user.email;
    this.datos.photoUrl = this.$store.state.user.photoUrl;
    if (this.$store.state.user.identification) {
      if (this.$store.state.user.identification.type) {
        this.datos.identification.type = this.$store.state.user.identification.type;
      }
      if (this.$store.state.user.identification.number) {
        this.datos.identification.number = this.$store.state.user.identification.type;
      }
    }
    if (this.$store.state.user.phone) {
      if (this.$store.state.user.phone.area_code) {
        this.datos.phone.area_code = this.$store.state.user.phone.area_code;
      }
      if (this.$store.state.user.phone.number) {
        this.datos.phone.number = this.$store.state.user.phone.number;
      }
    }
  }
})
</script>
