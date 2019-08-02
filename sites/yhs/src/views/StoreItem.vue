<template lang="pug">
  .item
    .media
      .media-list
        el-card(v-for='photo in Item.Photos', :key='photo', shadow='never')
          img(:src='photo', alt='')
      el-card.media-presentation(shadow='never')
        img(:src='Item.photo', alt='')
    .info
      h1.name {{ Item.name }}
      .brand-category
        .brand {{ Item.brand }}
        .category {{ Item.category }}
      p.description {{ Item.description }}
      h3.presentation {{ presentation }}
      widget-store-add-bag(:item-id='Item.id', :item-price='parseInt(Item.price, 10)', :item-photo-u-r-l='SelectedPhotoUrl', :item-name='Item.Name')
</template>

<style lang="scss" scoped>
@import "../styles/storeItem.scss";
</style>

<script lang="ts">
import Vue from "vue";
import Numeral from "numeral";
import axios from "axios";

export default Vue.extend({
  filters: {
    priceInUYU(value: any) {
      const val = value ? value : 0;
      return Numeral(val).format("$ 0.00");
    }
  },
  data(): {
    Item: any;
    SelectedPhotoUrl: string;
  } {
    return {
      Item: {},
      SelectedPhotoUrl: ""
    };
  },
  computed: {
    presentation(): string {
      const p = this.Item.Presentation ? this.Item.Presentation : "";
      const pUnit = this.Item.PresentationUnit
        ? this.Item.PresentationUnit
        : "";
      return `${p} ${pUnit}`;
    }
  },
  async mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Buscando el producto"
    });
    const result = await axios.post(
      "https://pw9rw6xc2j.execute-api.us-east-1.amazonaws.com/production/items/id",
      {
        id: this.$route.params.id
      }
    );
    this.Item = result.data.Item;
    this.Item.Photos = [result.data.Item.photo || ""];
    loading.close();
  }
});
</script>
