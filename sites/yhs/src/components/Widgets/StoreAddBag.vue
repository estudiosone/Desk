<template lang="pug">
  .widget-store-add-bag
    .section-button
      .price(v-if='unavailable == false')
        | {{ priceFormated }}
      button.add(v-if='unavailable == false', @click='add')
        | Comprar
      .unavailable(v-if='unavailable')
        | Temporalmente no disponible  
</template>

<script lang="ts">
import Vue from "vue";
import Numeral from "numeral";

export default Vue.extend({
  name: "WidgetStoreAddBag",
  props: {
    itemId: {
      type: String,
      default: ""
    },
    itemName: {
      type: String,
      default: ""
    },
    itemPhotoURL: {
      type: String,
      default: ""
    },
    itemPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      quantity: 1
    };
  },
  computed: {
    priceFormated() {
      switch (this.itemPrice) {
        case 0: {
          return 0;
        }
        default: {
          return Numeral(this.itemPrice).format("$ 0.00");
        }
      }
    },
    unavailable() {
      if (this.itemPrice) {
        switch (this.itemPrice) {
          case undefined: {
            return true;
          }
          default: {
            return false;
          }
        }
      } else {
        return true;
      }
    }
  },
  methods: {
    add() {
      this.$store.commit("order_add_detail_line", {
        itemId: this.itemId,
        itemName: this.itemName,
        itemPhotoURL: this.itemPhotoURL,
        itemPrice:
          typeof this.itemPrice === "number"
            ? this.itemPrice
            : parseInt(this.itemPrice, 10),
        lineQuantity: 1,
        lineTotal: this.itemPrice
      });
    }
  }
});
</script>
