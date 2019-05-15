<template>
  <div class="p-mi-compra">
    <div class="s-encabezado">
      <div class="s-titulo">
        mi compra
      </div>
    </div>
    <div class="s-contenido">
      <el-table
        :data="order.detail">
        <el-table-column
          label="Productos"
          prop="itemPhotoURL">
          <template slot-scope="scope">
            <div style="display: flex;">
              <img
                style="width: 64px; height: 64px; object-fit: contain; object-position: center;"
                :src="scope.row.itemPhotoURL">
              <div
                style="display: flex; flex-direction: column; height: 64px; padding: 8px;">
                <span
                  style="text-transform: uppercase; font-weight: 600;">
                  {{ scope.row.itemName}}
                </span>
                <span>
                  {{ `$ ${scope.row.itemPrice}` }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="150px">
          <template slot-scope="scope">
            <el-input-number
              @change="(() => {scope.row.lineTotal = scope.row.itemPrice * scope.row.lineQuantity})"
              v-model="scope.row.lineQuantity"
              size="mini"
              :min="1"
              :max="10"></el-input-number>
          </template>
        </el-table-column>
        <template slot="append">
          <div>
            <span>total</span>
            <span>{{ orderTotal }}</span>
          </div>
          <el-button @click.native="buy"></el-button>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Order, OrderLine } from '../store';
import mercadopago from 'mercadopago';

export default Vue.extend({
  name: 'p-mi-compra',
  computed: {
    order() {
      const order: Order = this.$store.state.order;
      return order;
    },
    orderTotal() {
      const order: Order = this.$store.state.order;
      let total: number = 0;
      order.detail.forEach((line) => {
        total += line.lineTotal;
      });
      return total;
    }
  },
  methods: {
    log(value: any) {
      console.log(value);
    },
    getSummaries(param: any) {
      console.log(param);
      return [];
    },
    buy() {
      mercadopago.configure({
        sandbox: true,
        access_token: 'TEST-2231678987876568-102116-78ac94e6f5932170a82610b10f317156-214493848'
      });
      mercadopago.payment.create({
        description: 'Buying a PS4',
        transaction_amount: 10500,
        payer: {
          email: 'tecnica@eldescubrimiento.com',
        }
      }).then(function (mpResponse: any) {
        console.log(mpResponse);
      }).catch(function (mpError: any) {
        console.log(mpError);
      });
    }
  },
});
</script>
