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
        @click="dialogVisible = true">
        Comprar
      </button>
      <div
        class="unavailable"
        v-if="unavailable">
        Temporalmente no disponible
      </div>
    </div>
    <el-dialog
      title="Agregar al carrito"
      width="360px"
      :visible.sync="dialogVisible">
      <el-form
        ref="form"
        label-width="120px"
        label-position="top">
        <el-form-item label="Producto">
          <el-input :readonly="true" v-model="itemName"></el-input>
        </el-form-item>
        <el-form-item label="Cantidad">
          <el-input-number v-model="quantity" :min="1" :max="10"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Agregar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Numeral from 'numeral';

export default Vue.extend({
  name: 'widget-store-add-bag',
  props: {
    itemId: String,
    itemName: String,
    itemPrice: Number ,
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
    }
  },
  methods: {
    add() {
      alert(this.itemId);
    }
  }
})
</script>
