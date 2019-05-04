<template>
  <div class="item">
    <div class="media">
      <div class="media-list">
        <img v-for="photo in Item.Photos" :key="photo.Index" :src="photo.Url" alt="">
      </div>
      <div class="media-presentation">
        <img :src="SelectedPhotoUrl" alt="">
      </div>
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
      <div class="price-buy">
        <h3 class="price">
          {{ Item.Price | priceInUYU }}
        </h3>
        <button class="buy">
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../styles/storeItem.scss';
</style>


<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import Numeral from 'numeral';

export default Vue.extend({
  data() {
    return {
      Item: {},
      SelectedPhotoUrl: '',
    };
  },
  computed: {
    presentation() {
      const p = this.Item.Presentation ? this.Item.Presentation : '';
      const pUnit = this.Item.PresentationUnit ? this.Item.PresentationUnit : '';
      return `${p} ${pUnit}`;
    },
  },
  filters: {
    priceInUYU(value: any) {
      let val;
      if (value) {
        val = value;
      } else {
        val = 0;
      }
      return Numeral(val).format('$ 0.00');
    },
  },
  async mounted() {
    const loading = this.$loading({
      lock: true,
      text: 'Buscando productos',
    });
    const app = firebase.firestore();
    const col = app.collection('Inventory-Items');
    const doc = col.doc(this.$route.params.id);
    const result = await doc.get();
    if (result.exists) {
      this.Item = result.data();
      this.Item.Id = result.id;
      this.Item.Photos = [];

      const photos = await result.ref.collection('Photos').orderBy('Index').get();

      photos.forEach((photo) => {
        this.Item.Photos.push(photo.data());
      });

      this.SelectedPhotoUrl = this.Item.Photos[0].Url;
    }
    loading.close();
  },
});
</script>
