<template lang="pug">
  .s-historial
    .s-order-data(v-if="$route.params.id !== undefined")
      el-form(label-width='120px', label-position='left', :model="order")
        el-divider Orden
        el-form-item(label="Id")
          el-input(v-model="order.id",disabled)
        el-form-item(label="Fecha")
          el-input(v-model="order.generated",disabled)
        el-divider Detalle
        el-table.s-lista-de-compra(:data='order.detail')
          el-table-column(label='Productos', prop='Picture_url')
            template(slot-scope='scope')
              .s-producto
                img.s-producto--imagen(:src='scope.row.Picture_url')
                .s-producto--info
                  span.s-producto--info-nombre
                    | {{ scope.row.Title }}
                  .s-producto--info-datos
                    span.s-producto-moneda
                      | {{ `$ ${scope.row.Unit_price}` }}
                    span {{ scope.row.Quantity }}
                    span.s-producto-moneda
                      | {{ `$ ${scope.row.Unit_price * scope.row.Quantity}` }}
    .s-approved(v-if="$route.params.action === 'confirmada'")
      .s-sub-title Estado: Confirmada
      img(src="../assets/icons8-approval.svg")
    .s-pending(v-if="$route.params.action === 'pendiente'")
      .s-sub-title Estado: Pendiente
      img(src="../assets/icons8-payment-history.svg")
    .s-failed(v-if="$route.params.action === 'pago-erroneo'")
      .s-sub-title Estado: Pago no aprobado
      img(src="../assets/icons8-box-important.svg")
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

export default Vue.extend({
  name: "sec-historial",
  data() {
    return {
      order: {
        id: "",
        generated: "",
        detail: [
          {
            Picture_url: "",
            Quantity: 1,
            Title: "",
            Unit_price: 0
          }
        ]
      },
      orderList: []
    };
  },
  async mounted() {
    if (this.$route.params.id !== undefined) {
      const db = firebase.firestore();
      const docRef = db.collection("Sales").doc(this.$route.params.id);
      const doc = await docRef.get();
      if (doc.exists) {
        this.order.id = doc.id;
        this.order.generated = moment()
          .set(doc.data()!.Generated.toDate())
          .format("DD/MM/YYYY - HH:mm:SS");
        const detailResult = await docRef.collection("Detail").get();
        const detail: {
          Picture_url: string;
          Quantity: number;
          Title: string;
          Unit_price: number;
        }[] = [];
        for (const det of detailResult.docs) {
          detail.push({
            Picture_url: det.data()!.Picture_url,
            Quantity: det.data()!.Quantity,
            Title: det.data()!.Title,
            Unit_price: det.data()!.Unit_price
          });
        }
        this.order.detail = detail;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../styles/_bp.scss";
.s-lista-de-compra {
  width: calc(100vw - 40px);

  @include md {
    width: calc(50vw -20px -10px);
  }

  .s-producto {
    display: flex;

    .s-producto--imagen {
      width: 64px;
      height: 64px;
      object-fit: contain;
      object-position: center;
    }

    .s-producto--info {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 8px;

      .s-producto--info-nombre {
        text-transform: uppercase;
        font-weight: 600;
        padding-bottom: 8px;
      }

      .s-producto--info-datos {
        display: grid;
        grid-template-columns: 1fr 80px 80px 60px;
        grid-gap: 20px;

        .s-producto-moneda {
          font-size: 16px;
          text-align: center;
        }

        .el-input-number.el-input-number--mini.is-controls-right {
          width: 80px;
        }
      }
    }
  }

  .s-total {
    display: flex;
    justify-content: flex-end;

    .s-etiqueta {
      padding-right: 20px;
      font-size: 24px;
      text-transform: uppercase;
    }

    .s-valor {
      font-size: 24px;
    }
  }
}
</style>
