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
import Vue from 'vue'
import Numeral from 'numeral';

export default Vue.extend({
  name: 'widget-store-add-bag',
  props: [
    'itemId',
    'price',
  ],
  computed: {
    priceFormated() {
      switch (this.price) {
        case 0: {
          return 0;
        }
        case undefined: {
          return 0;
        }
        default: {
          return Numeral(this.price).format('$ 0.00');
        }
      }
    },
    unavailable() {
      switch (this.price) {
        case 0: {
          return true;
        }
        case undefined: {
          return true;
        }
        default: {
          return false;
        }
      }
    }
  },
  methods: {
    add() {
      alert(this.itemId);
    }
  }
})
</script>
