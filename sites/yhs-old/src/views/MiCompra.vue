<template>
  <div class="p-mi-compra">
    <div class="s-encabezado">
      <div class="s-titulo">
        mi compra
      </div>
    </div>
    <div class="s-contenido">
      <el-table class="s-lista-de-compra" :data="order.detail">
        <el-table-column label="Productos" prop="itemPhotoURL">
          <template slot-scope="scope">
            <div class="s-producto">
              <img class="s-producto--imagen" :src="scope.row.itemPhotoURL" />
              <div class="s-producto--info">
                <span class="s-producto--info-nombre">
                  {{ scope.row.itemName }}
                </span>
                <div class="s-producto--info-datos">
                  <span class="s-producto-moneda">
                    {{ `$ ${scope.row.itemPrice}` }}
                  </span>
                  <el-input-number
                    v-model="scope.row.lineQuantity"
                    size="mini"
                    controls-position="right"
                    :min="1"
                    :max="10"
                    style="width: 80px"
                    @change="updateLineTotal(scope)"
                  ></el-input-number>
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
        <CDatosPersonales />
        <div>
          <el-form
            class="s-datos"
            :model="order"
            label-width="140px"
            :label-position="this.$store.state.Utilidades.UI.BP.smUp ? 'left' : 'top'"
          >
            <el-form-item label="Dirección">
              <el-select v-model="order.sendAddress" placeholder="Seleccione una dirección">
                <el-option
                  v-for="address in user.address"
                  :key="address.street_name"
                  :label="address.street_name"
                  :value="address"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button @click="pay">PAGAR</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import axios from "axios";
import { Loading } from "element-ui";
import { Order, User } from "../store";
import CDatosPersonales from "../components/CDatosPersonales.vue";

interface IItem {
  title: string;
  picture_url: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}

export default Vue.extend({
  name: "PMiCompra",
  components: {
    CDatosPersonales
  },
  data() {
    return {
      etapa: 0,
      componentes: {
        loading: {
          lock: true,
          text: "Generando orden..."
        }
      }
    };
  },
  computed: {
    order(): Order {
      const { order } = this.$store.state;
      return order;
    },
    orderTotal(): number {
      const { order } = this.$store.state;
      let total: number = 0;
      order.detail.forEach((line: any) => {
        total += line.lineTotal;
      });
      return total;
    },
    user(): User {
      return this.$store.state.user;
    }
  },
  methods: {
    getSummaries() {
      return [];
    },
    updateLineTotal(scope: any) {
      scope.row.lineTotal = scope.row.itemPrice * scope.row.lineQuantity;
    },
    async pay() {
      const loading = Loading.service(this.componentes.loading);
      let totalAmount = 0;
      this.order.detail.forEach(linea => {
        totalAmount += linea.lineQuantity * linea.itemPrice;
      });
      const salesRef = firebase.firestore().collection("Sales");
      const ref = await salesRef.add({
        Type: "Order",
        Customer: firebase
          .firestore()
          .collection("Customers")
          .doc(this.$store.state.userId),
        Business: firebase
          .firestore()
          .collection("Business")
          .doc(this.$store.state.businessId),
        Generated: firebase.firestore.Timestamp.now(),
        GeneratedBy: firebase
          .firestore()
          .collection("Customers")
          .doc(this.$store.state.userId),
        Payment: {
          TotalAmount: totalAmount,
          State: "Pending"
        },
        ShippingAddress: this.order.sendAddress
      });
      const mPreference: {
        items: IItem[];
        payer: any;
        back_urls: {
          success: string;
          pending: string;
          failure: string;
        };
        notification_url: string;
        auto_return: string;
        external_reference: string;
      } = {
        items: [],
        payer: {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          phone: this.user.phone,
          identification: this.user.identification
        },
        back_urls: {
          success: `${location.origin}/mi-compra/historial/${ref.id}/confirmada`,
          pending: `${location.origin}/mi-compra/historial/${ref.id}/pendiente`,
          failure: `${location.origin}/mi-compra/historial/${ref.id}/pago-erroneo`
        },
        notification_url: "https://us-central1-one-sig-uy.cloudfunctions.net/mercado_pago_webhooks",
        auto_return: "all",
        external_reference: ref.id
      };

      const detailRef = ref.collection("Detail");

      this.order.detail.forEach(linea => {
        detailRef.add({
          Id: firebase
            .firestore()
            .collection("Inventory-Items")
            .doc(linea.itemId),
          Title: linea.itemName,
          Picture_url: linea.itemPhotoURL,
          Quantity: linea.lineQuantity,
          Currency_id: "UYU",
          Unit_price: linea.itemPrice
        });
        mPreference.items.push({
          title: linea.itemName,
          picture_url: linea.itemPhotoURL,
          quantity: linea.lineQuantity,
          currency_id: "UYU",
          unit_price: linea.itemPrice
        });
      });
      this.componentes.loading.text = "Tranfiriendo a Mercado Pago...";
      const result = await axios.post(
        "https://api.mercadopago.com/checkout/preferences?access_token=TEST-2231678987876568-102116-78ac94e6f5932170a82610b10f317156-214493848",
        mPreference
      );
      location.href = result.data.sandbox_init_point;
      loading.close();
    }
  }
});
</script>
