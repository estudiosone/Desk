<template>
  <div class="p-mi-cuenta">
    <div class="s-encabezado">
      <div class="s-titulo">
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
    </div>
    <div class="s-contenido">
      <el-menu
        class="s-menu"
        :default-active="'/mi-cuenta/' + seccion"
        :router="true"
        :mode="this.$store.state.Utilidades.UI.BP.smUp ? 'vertical' : 'horizontal'">
        <el-menu-item index="/mi-cuenta/datos">Mis Datos</el-menu-item>
        <el-menu-item index="/mi-cuenta/direcciones">Mis Direcciones</el-menu-item>
        <el-menu-item index="/mi-cuenta/historial">Mi Historial</el-menu-item>
      </el-menu>
      <el-form
        v-if="seccion == 'datos'"
        class="s-datos"
        :model="datos"
        label-width="140px"
        :label-position="smAndUp ? 'left' : 'top'">
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
          <el-input v-model="datos.identification.number" placeholder="Ejemplo: 12345678, sin puntos ni guiones">
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
          <el-input v-model="datos.phone.number" @input="input_phone_change" placeholder="Sin el primer 0">
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
      <el-table
        v-if="seccion == 'direcciones'"
        class="s-direcciones"
        :data=direcciones>
        <el-table-column
        prop="addressString"
          label="Mis direcciones">
        </el-table-column>
        <el-table-column width="200px" prop="index">
          <template slot="header">
            <el-button @click.native="$router.push('/mi-cuenta/direcciones/nueva')">
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
              @click.native="editarDireccion(scope)">
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
        :fullscreen="window.width < 997">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore, auth } from 'firebase';
import { User, Address } from '../store';
import EventBus from '../eventBus';

interface IDireccionesCiudad {
  Nombre: string,
  Estado: string,
}

function dynamicSort(property: any) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a: any, b: any) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

export default Vue.extend({
  props: {
    seccion: {
      type: String,
      default: 'datos',
    },
    accion: {
      type: String,
      default: 'listar',
    },
    id: {
      type: Number,
      default: 0,
    }
  },
  data(): {
    datos: User,
    window: {
      width: number,
      height: number,
    },
    direccion: Address,
  } {
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
        address: [],
      },
      //* *BP */
      window: {
        width: 0,
        height: 0,
      },
      direccion: {
        name: '',
        street_name: '',
        street_number: '',
        apartament: '',
        zip_code: '',
        state: '',
        city: '',
        mainAddress: true,
      }
    };
  },
  computed: {
    smAndUp() {
      if (this.window.width >= 768) {
        return true;
      }
    },
    direccionesCiudades(): IDireccionesCiudad[] {
      const result: IDireccionesCiudad[] = this.$store.state.DatosEstaticos.DireccionesCiudades.sort(dynamicSort('Nombre'));
      const queryResult = result.filter(x => x.Estado === this.direccion.state);
      return queryResult;
    },
    direcciones() {
      const result: any = []
      this.datos.address.forEach((item) => {
        result.push({
          index: this.datos.address.indexOf(item),
          addressString: `${item.street_name} ${item.street_number}, ${item.state}, ${item.city}`
        });
      });
      return result;
    }
  },
  methods: {
    input_phone_change(value: any) {
      if (this.datos.phone) {
        if (this.datos.phone.number) {
          this.datos.phone.number = value.replace(/^0+/, '');
        }
      }
    },
    async guardarDatos() {
      //* *Datos de usuarios */
      const loading = this.$loading({
        lock: true,
        text: 'Guardando... espera un instante!',
      });
      await firebase.firestore().collection('Auth-Users').doc(this.$store.state.userId).update({
        name: this.datos.name,
        surname: this.datos.surname,
        email: this.datos.email,
        identification: this.datos.identification,
        phone: this.datos.phone,
      });
      loading.close();
    },
    async agregarDirecciones() {
      //* *Datos de usuarios */
      const loading = this.$loading({
        lock: true,
        text: 'Guardando... espera un instante!',
      });
      this.datos.address.push(this.direccion);
      this.$store.commit('userAddress', this.datos.address);
      await firebase.firestore().collection('Auth-Users').doc(this.$store.state.userId).update({
        address: this.datos.address,
      });
      loading.close();
      this.cancelarDirecciones();
    },
    editarDireccion(scope: any) {
      this.direccion = this.datos.address[scope.$index];
      this.$router.push('/mi-cuenta/direcciones/editar/' + scope.$index);
    },
    async actualizarDireccion() {
      const loading = this.$loading({
        lock: true,
        text: 'Guardando... espera un instante!',
      });
      this.datos.address[this.id] = this.direccion;
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
      this.$router.push('/mi-cuenta/direcciones');
    },
    async salirDeLaCuenta() {
      await firebase.auth().signOut();
      this.$router.push('/');
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
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
  },
  created() {
    EventBus.$on('eventAuthActualizada', () => this.ActualizarDatosDelComponente());
    window.addEventListener('resize', this.handleResize);
    this.ActualizarDatosDelComponente();
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
});
</script>
