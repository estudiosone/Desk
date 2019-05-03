<template>
  <div class="desk-store">
    <div class="cover">
      <h1 class="title">Tienda</h1>
    </div>
    <div class="filters">
    </div>
    <div class="catalogue">
      <div class="item" v-for="item in catalogue" :key="item.Id">
        <div class="cover-media">
          <img :src="item.Photos[0]" alt="" class="media">
          <div class="action">
            <router-link class="goTo" :to="`/store/item/${ item.Id }`" tag="button">Detalles</router-link>
          </div>
        </div>
        <div class="info">
          <h2 class="name">{{ item.Name }}</h2>
          <h3 class="price">
            {{ item.Price | priceInUYU }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.desk-store {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 33vw 66vw;
  grid-template-rows: auto;
  justify-content: center;
  .cover {
    grid-area: 1 / 1 / 2 / 3;
    text-align: center;
  }
  .catalogue{
    display: grid;
    grid-template-columns: 22vw 22vw 22vw;
    grid-template-rows: 1fr;
    .item:hover {
      .cover-media {
        .action {
          background-color: rgba($color: #FFFFFF, $alpha: 0.5);
          .goTo {
            opacity: 1;
          }
        }
      }
    }
    .cover-media {
      display: grid;
      grid-template-areas: 'A';
      justify-content: center;
      align-items: center;
      
      .media {
        grid-area: A;
        width: 22vw;
        height: 22vw;
        opacity: 1;
      }
      .action {
        transition-duration: 500ms;
        grid-area: A;
        display: flex;
        width: 22vw;
        height: 22vw;
        background-color: rgba($color: #FFFFFF, $alpha: 0);
        .goTo {
          transition-duration: 500ms;
          opacity: 0;
          width: 160px;
          height: 45px;
          margin: auto;
          font-family: 'Dosis', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          border: solid 1px #A52518;
          background-color: #FFFFFF;
        }
      }
    }
    .info {
      .name {
        text-align: center;
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
      catalogue: [

      ],
    };
  },
  filters: {
    priceInUYU(value) {
      let val;
      if(value) {
        val = value 
      } else {
        val = 0
      }
      return Numeral(val).format('$ 0.0[,]00')
    }
  },
  async mounted() {
    const loading = this.$loading({
          lock: true,
          text: 'Buscando productos',
    });
    const app = firebase.firestore();
    const col = app.collection('Inventory-Items');
    const query = col.where('Business', '==', app.collection('Business').doc('hN4Z7KaHwWxniNgVHjTX'));
    const result = await query.get();
    result.forEach(async (item) => {
      const catalogueItem = {
        Id: item.id,
        Name: item.data().Name,
        Description: item.data().Description,
        Photos: [],
      };

      const photos = await item.ref.collection('Photos').orderBy('Index').get();

      photos.forEach((photo) => {
        catalogueItem.Photos.push(photo.data().Url);
      });

      this.catalogue.push(catalogueItem)
    })
    loading.close();
  }
})
</script>
