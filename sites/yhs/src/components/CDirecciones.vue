<template>
  <div>
    <el-table
      class="s-direcciones"
      :data=direcciones>
      <el-table-column
      prop="addressString"
        label="Mis direcciones">
      </el-table-column>
      <el-table-column width="200px" prop="index">
        <template slot="header">
          <el-button @click="accion = 'nueva'">
            <span style="display: flex; align-items: center;">
              <img
                src="../styles/utilities/desksuite-icons/svg/icons8-add-20.svg"
                style="margin-right: 8px">
              Agregar
            </span>
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editarDireccion(scope)">
            Editar
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="true"
            >Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="d-direcciones"
      width="560px"
      :title="accion == 'nueva' ? 'Agregar nueva dirección' : 'Modificar dirección'"
      :show-close="false"
      :visible="accion == 'nueva' || accion == 'editar'"
      :fullscreen="this.$store.state.Utilidades.UI.BP.xs">
      <el-form
        :model="direccion"
        label-width="120px"
        label-position="left">
        <el-form-item label="Departamento">
          <el-select v-model="direccion.state" placeholder="Seleccione un departamento">
            <el-option
              v-for="estado in this.$store.state.DatosEstaticos.DireccionesEstados"
              :label="estado.Nombre"
              :key="estado.Nombre"
              :value="estado.Nombre" />
          </el-select>
        </el-form-item>
        <el-form-item label="Ciudad">
          <el-select v-model="direccion.city" placeholder="Seleccione una ciudad">
            <el-option
              v-for="ciudad in direccionesCiudades"
              :label="ciudad.Nombre"
              :key="`${ciudad.Estado}-${ciudad.Nombre}`"
              :value="ciudad.Nombre" />
          </el-select>
        </el-form-item>
        <el-form-item label="Calle">
          <el-input v-model="direccion.street_name"></el-input>
        </el-form-item>
        <el-form-item label="Nro de puerta ">
          <el-input v-model="direccion.street_number"></el-input>
        </el-form-item>
        <el-form-item label="Apartamento">
          <el-input v-model="direccion.apartament"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelarDirecciones">Cancelar</el-button>
        <el-button v-if="accion === 'editar'" type="primary" @click="actualizarDireccion">Actualizar</el-button>
        <el-button v-if="accion === 'nueva'" type="primary" @click="agregarDirecciones">Agregar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { User, Address } from '../store';
import EventBus from '../eventBus';

interface IDireccionesCiudad {
  Nombre: string,
  Estado: string,
}

function dynamicSort(property: any) {
  let sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    // eslint-disable-next-line no-param-reassign
    property = property.substr(1);
  }

  return (a: any, b: any) => {
    let result: any;
    if (sortOrder === -1) {
      result = b[property].localeCompare(a[property]);
    } else {
      result = a[property].localeCompare(b[property]);
    }

    return result;
  };
}

export default Vue.extend({
  name: 'c-direcciones',
  data(): {
    direccion: Address,
    accion: string,
    index: number | undefined,
    } {
    return {
      direccion: {
        name: '',
        street_name: '',
        street_number: '',
        apartament: '',
        zip_code: '',
        state: '',
        city: '',
        mainAddress: true,
      },
      accion: '',
      index: undefined,
    };
  },
  computed: {
    datos() {
      const result: User = this.$store.state.user;
      return result;
    },
    direccionesCiudades(): IDireccionesCiudad[] {
      const result: IDireccionesCiudad[] = this.$store.state.DatosEstaticos.DireccionesCiudades.sort(dynamicSort('Nombre'));
      const queryResult = result.filter(x => x.Estado === this.direccion.state);
      return queryResult;
    },
    direcciones() {
      const result: any = [];
      if(this.datos.address) {
        this.datos.address.forEach((item) => {
          result.push({
            index: this.datos.address.indexOf(item),
            addressString: `${item.street_name} ${item.street_number}, ${item.state}, ${item.city}`,
          });
        });
      }
      return result;
    },
  },
  methods: {
    async agregarDirecciones() {
      //* *Datos de usuarios */
      const loading = this.$loading({
        lock: true,
        text: 'Guardando... espera un instante!',
      });
      this.direcciones.push(this.direccion);
      this.$store.commit('userAddress', this.direcciones);
      await firebase.firestore().collection('Auth-Users').doc(this.$store.state.userId).update({
        address: this.direcciones,
      });
      loading.close();
      this.cancelarDirecciones();
    },
    editarDireccion(scope: any) {
      this.direccion = this.datos.address[scope.$index];
      this.accion = 'editar';
      this.index = scope.$index;
    },
    async actualizarDireccion() {
      const loading = this.$loading({
        lock: true,
        text: 'Guardando... espera un instante!',
      });
      const i: number = this.index as number;
      this.datos.address[i] = this.direccion;
      this.$store.commit('userAddress', this.datos.address);
      await firebase.firestore().collection('Auth-Users').doc(this.$store.state.userId).update({
        address: this.datos.address,
      });
      loading.close();
      this.cancelarDirecciones();
    },
    cancelarDirecciones() {
      this.direccion = {
        name: '',
        street_name: '',
        street_number: '',
        apartament: '',
        zip_code: '',
        state: '',
        city: '',
        mainAddress: true,
      };
      this.accion = '';
      this.index = undefined;
    },
    async salirDeLaCuenta() {
      await firebase.auth().signOut();
      this.$router.push('/');
    },
  },
})
</script>
