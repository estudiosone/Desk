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
        <h2 class="brand">
          {{ Item.Brand }}
        </h2>
        <h2 class="category">
          {{ Item.Category }}
        </h2>
      </div>
      <p class="description">
        {{ Item.Description }}
      </p>
      <h3 class="presentation">
        {{ `${ Item.Presentation ? Item.Presentation : '' } ${ Item.PresentationUnit ? Item.PresentationUnit : '' }` }}
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
.item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .media {
    display: flex;
    width: 50%;
    max-width: 600px;

    .media-list {
      display: flex;
      flex-direction: column;
      width: 15vw;
      max-width: 180px;

      img {
        width: 15vw;
        max-width: 180px;
        height: 15vw;
        max-height: 180px;
        padding: 16px;
        box-sizing: border-box;
      }
    }

    .media-presentation {
      width: 35vw;
      max-width: 420px;

      img {
        width: 35vw;
        max-width: 420px;
        height: 35vw;
        max-height: 420px;
        padding: 16px;
        box-sizing: border-box;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    width: 25%;
    max-width: 300px;

    .name {
      font-size: 2.5em;
    }

    .brand-category {
      display: flex;

      .brand {
        border-left: 4px solid #A52518;
        padding: 0 8px;
      }

      .category {
        border-left: 4px solid #A52518;
        padding: 0 8px;
      }
    }

    .price-buy {
      display: flex;
      justify-content: space-between;
      .buy {
        width: 160px;
        height: 45px;
        font-family: 'Dosis', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        border: solid 1px #A52518;
        background-color: #FFFFFF;
      }
    }
  }
}
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
  filters: {
    priceInUYU(value) {
      let val;
      if (value) {
        val = value;
      } else {
        val = 0;
      }
      return Numeral(val).format('$ 0.0[,]00');
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
