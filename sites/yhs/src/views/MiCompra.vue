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
        <template slot="append">
          <div class="s-total">
            <span class="s-etiqueta">total</span>
            <span class="s-valor">{{ `$ ${orderTotal}` }}</span>
          </div>
        </template>
      </el-table>
      <div>
      <el-steps :active="etapa" finish-status="success" simple style="margin-top: 20px">
        <el-step title="Datos" ></el-step>
        <el-step title="Envío" ></el-step>
        <el-step title="Pago" ></el-step>
      </el-steps>
      <c-datos-personales v-if="etapa === 0" />
      <div v-if="etapa === 1">
        <el-form
          class="s-datos"
          :model="order"
          label-width="140px"
          :label-position="this.$store.state.Utilidades.UI.BP.smUp ? 'left' : 'top'">
          <el-form-item label="Dirección">
            <el-select v-model="order.sendAddress" placeholder="Seleccione una dirección">
              <el-option v-for="address in user.address" :key="address.street_name" :label="address.street_name" :value="address"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="etapa === 2">
        <el-button @click="pay">PAGAR</el-button>
      </div>
      <div style="display: flex">
        <el-button :disabled="etapa === 0" @click="etapa -= 1">Volver</el-button>
        <el-button :disabled="etapa === 2" @click="etapa += 1">Continuar</el-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import axios from 'axios';
import { Order, OrderLine, User } from '../store';
import CDatosPersonales from '../components/CDatosPersonales.vue';

interface IItem {
  title: string,
  quantity: number,
  currency_id: string,
  unit_price: number,
}


export default Vue.extend({
  name: 'p-mi-compra',
  components: {
    CDatosPersonales,
  },
  data() {
    return {
      etapa: 0,
    };
  },
  computed: {
    order(): Order {
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
    user(): User {
      return this.$store.state.user;
    },
  },
  methods: {
    getSummaries(param: any) {
      return [];
    },
    async pay() {
      const mPreference: {
        items: IItem[],
        payer: any,
      } = {
        items: [],
        payer: {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          phone: this.user.phone,
          identification: this.user.identification,
        },
      };
      this.order.detail.forEach((linea) => {
        mPreference.items.push({
          title: linea.itemName,
          quantity: linea.lineQuantity,
          currency_id: 'UYU',
          unit_price: linea.itemPrice,
        });
      })
      const result = await axios.post('https://api.mercadopago.com/checkout/preferences?access_token=TEST-2231678987876568-102116-78ac94e6f5932170a82610b10f317156-214493848', mPreference);
      console.info(result);
      window.open(result.data.sandbox_init_point);
    },
  },
});
</script>
