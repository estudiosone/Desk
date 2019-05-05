<template>
  <div class="desk-store">
    <div class="cover">
      <h1 class="title">Tienda</h1>
    </div>
    <div class="filters">
      <el-tree
        show-checkbox
        :data="data"
        :props="defaultProps"/>
    </div>
    <div class="catalogue">
      <div class="item" v-for="item in catalogue" :key="item.Id">
        <div class="cover-media">
          <img :src="item.Photos[0]" alt="" class="media">
          <div class="action">
            <router-link
              class="goTo"
              :to="`/store/item/${ item.Id }`"
              tag="button">
              Detalles
            </router-link>
          </div>
        </div>
        <div class="info">
          <div class="name">{{ item.Name }}</div>
          <div class="price-buy">
            <div class="price">
              {{ item.Price | priceInUYU }}
            </div>
            <button class="buy">
              Comprar
            </button>
          </div>
        </div>
      </div>
      <div>
        <button @click="loadMore">
          VER MÁS
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/store.scss';

.desk-store {
  .cover {
    grid-area: 1 / 1 / span 1 / span 2;
    text-align: center;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import Numeral from 'numeral';

import ICatalogueItem from '../interfaces/ICatalogueItem';

export default Vue.extend({

  data(): {
    catalogue: ICatalogueItem[];
    data: {
      label: string;
      children: {
          label: string;
      }[];
    }[];
    defaultProps: {
      children: string;
      label: string;
    }
    } {
    return {
      catalogue: [

      ],
      data: [
        {
          label: 'Kérastase',
          children: [
            {
              label: 'Aura Botanica',
            },
            {
              label: 'Chronologiste',
            },
            {
              label: 'Densifique',
            },
            {
              label: 'Discipline',
            },
            {
              label: 'Elixir Ultime',
            },
            {
              label: 'Nutritive',
            },
            {
              label: 'Oléo-Relax',
            },
            {
              label: 'Reflection',
            },
            {
              label: 'Résistance',
            },
            {
              label: 'Soleil',
            },
            {
              label: 'Spécifique',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
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
  methods: {
    loadMore() {
      this.loadItems();
    },
    async loadItems(firstLoad: boolean = false) {
      const loading = this.$loading({
        lock: true,
        text: 'Buscando productos',
      });
      const app = firebase.firestore();
      const col = app.collection('Inventory-Items');
      let query: firebase.firestore.Query;
      if (firstLoad) {
        query = col.where('Business', '==', app.collection('Business').doc('hN4Z7KaHwWxniNgVHjTX'))
          .orderBy('Name')
          .limit(12);
      } else {
        query = col.where('Business', '==', app.collection('Business').doc('hN4Z7KaHwWxniNgVHjTX'))
          .orderBy('Name')
          .startAfter(this.catalogue[this.catalogue.length - 1].Name)
          .limit(12);
      }
      const result = await query.get();
      result.forEach(async (item) => {
        const catalogueItem: {
          Id: string;
          Name: string;
          Description: string;
          Photos: string[];
        } = {
          Id: item.id,
          Name: item.data().Name,
          Description: item.data().Description,
          Photos: [],
        };

        const photos = await item.ref.collection('Photos').orderBy('Index').get();

        photos.forEach((photo) => {
          catalogueItem.Photos.push(photo.data().Url);
        });

        this.catalogue.push(catalogueItem);
      });
      loading.close();
    }
  },
  async mounted() {
    this.loadItems(true);
  },
});
</script>
