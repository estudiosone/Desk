<template lang="pug">
  .p-mi-compra
    .s-encabezado
      .s-title
        | mi compra
    .s-contenido(v-if="order.detail.length < 1")
      .bag-empty
        img(src="../assets/Bag.svg")
        .s-sub-title
          | aún no tienes nada aquí
    .s-contenido(v-else)
      el-table.s-lista-de-compra(:data='order.detail')
        el-table-column(label='Productos', prop='itemPhotoURL')
          template(slot-scope='scope')
            .s-producto
              img.s-producto--imagen(:src='scope.row.itemPhotoURL')
              .s-producto--info
                span.s-producto--info-nombre
                  | {{ scope.row.itemName }}
                .s-producto--info-datos
                  span.s-producto-moneda
                    | {{ `$ ${scope.row.itemPrice}` }}
                  el-input-number(v-model='scope.row.lineQuantity', size='mini', controls-position='right', :min='1', :max='10', style='width: 80px', @change='updateLineTotal(scope)')
                  span.s-producto-moneda
                    | {{ `$ ${scope.row.lineTotal}` }}
                  el-button(@click="deleteLine(scope.$index)",type="danger",icon="el-icon-delete",round,size="mini")
        template(slot='append')
          .s-total
            span.s-etiqueta total
            span.s-valor {{ `$ ${orderTotal}` }}
      div
        c-datos-personales
        div
          el-form.s-datos(:model='order', label-width='140px', :label-position="this.$store.state.Utilidades.UI.BP.smUp ? 'left' : 'top'")
            el-form-item(label='Dirección')
              el-select(v-model='order.sendAddress', placeholder='Seleccione una dirección')
                el-option(v-for='address in user.address', :key='address.street_name', :label='address.street_name', :value='address')
        div
          el-button(@click='pay',:disabled="order.detail.length < 1") PAGAR
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
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
    deleteLine(index: any) {
      this.$store.commit("order_remove_detail_line", this.order.detail[index]);
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
          success: `${location.origin}/mi-cuenta/historial/${ref.id}/confirmada`,
          pending: `${location.origin}/mi-cuenta/historial/${ref.id}/pendiente`,
          failure: `${location.origin}/mi-cuenta/historial/${ref.id}/pago-erroneo`
        },
        notification_url:
          "https://us-central1-one-sig-uy.cloudfunctions.net/mercado_pago_webhooks",
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
        "https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-1192694136518499-030614-53c699f1a31490382ff6acaea1af8c07-247390463",
        mPreference
      );
      location.href = result.data.init_point;
      this.$store.commit("order", {
        user: undefined,
        sendAddress: undefined,
        detail: []
      });
      loading.close();
    }
  }
});
</script>
