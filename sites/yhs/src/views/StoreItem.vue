<template lang="pug">
  .item
    .media
      .media-list
        el-card(v-for='photo in Item.Photos', :key='photo.Url', shadow='never')
          img(:src='photo.Url', alt='')
      el-card.media-presentation(shadow='never')
        img(:src='SelectedPhotoUrl', alt='')
    .info
      h1.name {{ Item.Name }}
      .brand-category
        .brand {{ Item.Brand }}
        .category {{ Item.Category }}
      p.description {{ Item.Description }}
      h3.presentation {{ presentation }}
      widget-store-add-bag(:item-id='Item.Id', :item-price='parseInt(Item.Price, 10)', :item-photo-u-r-l='SelectedPhotoUrl', :item-name='Item.Name')
</template>

<style lang="scss" scoped>
@import "../styles/storeItem.scss";
</style>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import Numeral from "numeral";

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
      text: "Buscando productos"
    });
    const app = firebase.firestore();
    const col = app.collection("Inventory-Items");
    const itemReference = col.doc(this.$route.params.id);
    const result = await itemReference.get();
    if (result.exists) {
      this.Item = result.data();
      this.Item.Id = result.id;
      this.Item.Photos = [];

      const inventoryItemsPhotos = await app
        .collection("Inventory-Items-Photos")
        .where("Item", "==", itemReference)
        .get();

      inventoryItemsPhotos.forEach(photo => {
        this.Item.Photos.push(photo.data());
        if (photo.data().IsCover) {
          this.SelectedPhotoUrl = photo.data().Url;
        }
      });
    }
    loading.close();
  }
});
</script>
