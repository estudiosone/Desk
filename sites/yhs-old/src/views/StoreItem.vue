<template>
  <div class="item">
    <div class="media">
      <div class="media-list">
        <el-card v-for="photo in Item.Photos" :key="photo.Url" shadow="never">
          <img :src="photo.Url" alt="" />
        </el-card>
      </div>
      <el-card class="media-presentation" shadow="never">
        <img :src="SelectedPhotoUrl" alt="" />
      </el-card>
    </div>
    <div class="info">
      <h1 class="name">
        {{ Item.Name }}
      </h1>
      <div class="brand-category">
        <div class="brand">
          {{ Item.Brand }}
        </div>
        <div class="category">
          {{ Item.Category }}
        </div>
      </div>
      <p class="description">
        {{ Item.Description }}
      </p>
      <h3 class="presentation">
        {{ presentation }}
      </h3>
      <widget-store-add-bag
        :item-id="Item.Id"
        :item-price="parseInt(Item.Price, 10)"
        :item-photo-u-r-l="SelectedPhotoUrl"
        :item-name="Item.Name"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/storeItem.scss";
</style>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import Numeral from "numeral";

export default Vue.extend({
  filters: {
    priceInUYU(value: any) {
      let val;
      if (value) {
        val = value;
      } else {
        val = 0;
      }
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
      const pUnit = this.Item.PresentationUnit ? this.Item.PresentationUnit : "";
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
