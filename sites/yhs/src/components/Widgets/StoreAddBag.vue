<template>
  <div class="widget-store-add-bag">
    <div class="section-button">
      <div
        class="price"
        v-if="unavailable == false">
        {{ priceFormated }}
      </div>
      <button
        class="add"
        v-if="unavailable == false"
        @click="add">
        Comprar
      </button>
      <div
        class="unavailable"
        v-if="unavailable">
        Temporalmente no disponible
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Numeral from 'numeral';

export default Vue.extend({
  name: 'widget-store-add-bag',
  props: {
    itemId: String,
    itemName: String,
    itemPhotoURL: String,
    itemPrice: Number,
  },
  data() {
    return {
      dialogVisible: false,
      quantity: 1,
    };
  },
  computed: {
    priceFormated() {
      switch (this.itemPrice) {
        case 0: {
          return 0;
        }
        default: {
          return Numeral(this.itemPrice).format('$ 0.00');
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
    },
  },
  methods: {
    add() {
      this.$store.commit('order_add_detail_line', {
        itemId: this.itemId,
        itemName: this.itemName,
        itemPhotoURL: this.itemPhotoURL,
        itemPrice: parseInt(this.itemPrice, 10),
        lineQuantity: 1,
        lineTotal: this.itemPrice,
      })
    },
  },
});
</script>
