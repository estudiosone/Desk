<template>
  <el-form
    class="s-datos"
    :model="datos"
    label-width="140px"
    :label-position="this.$store.state.Utilidades.UI.BP.smUp ? 'left' : 'top'"
  >
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
      <el-input
        v-model="datos.identification.number"
        placeholder="Ejemplo: 12345678, sin puntos ni guiones"
      >
        <el-select
          slot="prepend"
          v-model="datos.identification.type"
          placeholder="Tipo"
          style="width: 120px;"
        >
          <el-option
            v-for="identificacion in this.$store.state.DatosEstaticos.Identidad.TipoDeDocumento"
            :key="identificacion"
            :label="identificacion"
            :value="identificacion"
          />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="Teléfono">
      <el-input
        v-model="datos.phone.number"
        placeholder="Sin el primer 0"
        @input="input_phone_change"
      >
        <el-select
          slot="prepend"
          v-model="datos.phone.area_code"
          placeholder="Area"
          style="width: 120px;"
        >
          <el-option
            v-for="area in this.$store.state.DatosEstaticos.Telefono.Areas"
            :key="area.Codigo"
            :label="area.Pais"
            :value="area.Codigo"
          />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item class="s-acciones s-acciones--centrado">
      <el-button type="primary" @click="guardarDatos">Guardar</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { User, Address } from "../store";
import EventBus from "../eventBus";

export default Vue.extend({
  name: "CDatosPersonales",
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
  data(): {
    datos: User;
    window: {
      width: number;
      height: number;
    };
    direccion: Address;
  } {
    return {
      datos: {
        name: "",
        surname: "",
        email: "",
        photoUrl: "",
        phone: {
          area_code: "",
          number: ""
        },
        identification: {
          type: "",
          number: ""
        },
        address: []
      },
      //* *BP */
      window: {
        width: 0,
        height: 0
      },
      direccion: {
        name: "",
        street_name: "",
        street_number: "",
        apartament: "",
        zip_code: "",
        state: "",
        city: "",
        mainAddress: true
      }
    };
  },
  created() {
    EventBus.$on("eventAuthActualizada", () => this.ActualizarDatosDelComponente());
    this.ActualizarDatosDelComponente();
  },
  methods: {
    input_phone_change(value: any) {
      if (this.datos.phone) {
        if (this.datos.phone.number) {
          this.datos.phone.number = value.replace(/^0+/, "");
        }
      }
    },
    async guardarDatos() {
      //* *Datos de usuarios */
      const loading = this.$loading({
        lock: true,
        text: "Guardando... espera un instante!"
      });
      await firebase
        .firestore()
        .collection("Auth-Users")
        .doc(this.$store.state.userId)
        .update({
          name: this.datos.name,
          surname: this.datos.surname,
          email: this.datos.email,
          identification: this.datos.identification,
          phone: this.datos.phone
        });
      loading.close();
    },
    ActualizarDatosDelComponente() {
      this.datos.name = this.$store.state.user.name;
      this.datos.surname = this.$store.state.user.surname;
      this.datos.email = this.$store.state.user.email;
      this.datos.photoUrl = this.$store.state.user.photoUrl;
      if (this.$store.state.user.identification) {
        if (this.$store.state.user.identification.type) {
          this.datos.identification.type = this.$store.state.user.identification.type;
        }
        if (this.$store.state.user.identification.number) {
          this.datos.identification.number = this.$store.state.user.identification.number;
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
      if (this.$store.state.user.address) {
        this.datos.address = this.$store.state.user.address;
      } else {
        this.datos.address = [];
      }
    }
  }
});
</script>
