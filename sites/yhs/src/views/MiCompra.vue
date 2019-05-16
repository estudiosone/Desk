<template>
  <div class="p-mi-compra">
    <div class="s-encabezado">
      <div class="s-titulo">
        mi compra
      </div>
    </div>
    <div class="s-contenido">
      <el-table
        class="s-lista-de-compra"
        :data="order.detail">
        <el-table-column
          label="Productos"
          prop="itemPhotoURL">
          <template slot-scope="scope">
            <div class="s-producto">
              <img
                class="s-producto--imagen"
                :src="scope.row.itemPhotoURL">
              <div
                class="s-producto--info">
                <span
                  class="s-producto--info-nombre">
                  {{ scope.row.itemName}}
                </span>
                <div
                  class="s-producto--info-datos">
                  <span class="s-producto-moneda">
                    {{ `$ ${scope.row.itemPrice}` }}
                  </span>
                  <el-input-number
                    @change="(() => {scope.row.lineTotal = scope.row.itemPrice * scope.row.lineQuantity})"
                    v-model="scope.row.lineQuantity"
                    size="mini"
                    controls-position="right"
                    :min="1"
                    :max="10"
                    style="width: 80px"></el-input-number>
                  <span class="s-producto-moneda">
                    {{ `$ ${scope.row.lineTotal}` }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="Cantidad"
          width="100px">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          label="Total"
          prop="lineTotal">
          <template slot-scope="scope">
          </template>
        </el-table-column> -->
        <template slot="append">
          <div class="s-total">
            <span class="s-etiqueta">total</span>
            <span class="s-valor">{{ `$ ${orderTotal}` }}</span>
          </div>
        </template>
      </el-table>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="Datos personales" name="1">
          <el-form
            class="s-datos"
            :model="datos"
            label-width="140px"
            :label-position="this.$store.state.Utilidades.UI.BP.smUp ? 'left' : 'top'">
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
        </el-collapse-item>
        <el-collapse-item title="Envío" name="2">
          <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
          <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
        </el-collapse-item>
        <el-collapse-item title="Confirmar compra" name="3">
          <div>Simplify the process: keep operating process simple and intuitive;</div>
          <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
          <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { Order, OrderLine } from '../store';

export default Vue.extend({
  name: 'p-mi-compra',
    data() {
      return {
        activeName: '1',
      };
    },
    computed: {
    order() {
      const { order } = this.$store.state;
      return order;
    },
    orderTotal() {
      const { order } = this.$store.state;
      let total: number = 0;
      order.detail.forEach((line: any) => {
        total += line.lineTotal;
      });
      return total;
    },
    datos() {
      return this.$store.state.user;
    }
  },
  methods: {
    getSummaries(param: any) {
      return [];
    },
    input_phone_change(value: any) {
      if (this.datos().phone) {
        if (this.datos().phone.number) {
          this.datos().phone.number = value.replace(/^0+/, '');
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
    },    buy() {
    },
  },
});
</script>
