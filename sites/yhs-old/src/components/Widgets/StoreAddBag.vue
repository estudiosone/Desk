<template>
  <div class="widget-store-add-bag">
    <div class="section-button">
      <div v-if="unavailable == false" class="price">
        {{ priceFormated }}
      </div>
      <button v-if="unavailable == false" class="add" @click="add">
        Comprar
      </button>
      <div v-if="unavailable" class="unavailable">
        Temporalmente no disponible
      </div>
    </div>
  </div>
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
          typeof this.itemPrice === "number" ? this.itemPrice : parseInt(this.itemPrice, 10),
        lineQuantity: 1,
        lineTotal: this.itemPrice
      });
    }
  }
});
</script>
