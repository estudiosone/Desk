<template>
  <div class="p-tienda">
    <div class="s-encabezado">
      <div class="s-titulo">
        tienda
      </div>
    </div>
    <div class="s-contenido">
      <div class="s-catalogo">
        <el-card
          class="s-item"
          v-for="item in catalogue"
          :key="item.Id"
          shadow="hover"
          @click.native="$router.push(`/store/item/${ item.Id }`)">
          <img :src="item.Photo" alt="" class="s-foto">
          <div class="s-info">
            <div class="s-item-nombre">
              {{ item.Name }}
            </div>
            <div class="s-item-precio" v-if="disponibilidad(item.Price)">
              <div class="s-simbolo">
                $
              </div>
              <div class="s-importe">
                {{ item.Price | importe}}
              </div>
            </div>
            <div class="s-item-no-disponible" v-else>
              temporalmente no disponible
            </div>
            <!-- <widget-store-add-bag
              :itemId="item.Id"
              :itemPrice="item.Price"
              :itemName="item.Name"/> -->
          </div>
        </el-card>
      </div>
      <div class="s-catalogo-pie s-acciones s-acciones--centrado">
        <el-button @click="loadMore" v-if="catalogueExpand">
          VER MAS
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

// import WidgetStoreAddBag from '../components/Widgets/StoreAddBag.vue';

import ICatalogueItem from '../interfaces/ICatalogueItem';

export default Vue.extend({
  components: {
    // WidgetStoreAddBag,
  },
  data(): {
    catalogue: ICatalogueItem[];
    catalogueExpand: boolean;
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
      catalogueExpand: false,
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
    importe(value: any) {
      if (value) {
        switch (value) {
          case undefined: {
            return false;
          }
          default: {
            return Numeral(value).format('0.00');
          }
        }
      } else {
        return false;
      }
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
      let i = 12;
      result.forEach(async (item) => {
        i -= i;
        const catalogueItem: ICatalogueItem = {
          Id: item.id,
          Name: item.data().Name,
          Description: item.data().Description,
          Price: parseFloat(item.data().Price),
          Photo: '',
        };

        const inventoryItemsPhotos = await app
          .collection('Inventory-Items-Photos')
          .where('Item', '==', item.ref)
          .get();

        inventoryItemsPhotos.forEach((photo) => {
          if (photo.data().IsCover) {
            catalogueItem.Photo = photo.data().Url;
          }
        });

        this.catalogue.push(catalogueItem);
      });
      if (i === 0) {
        this.catalogueExpand = true;
      } else {
        this.catalogueExpand = false;
      }
      loading.close();
    },
    disponibilidad(value: any) {
      if (value) {
        switch (value) {
          case undefined: {
            return false;
          }
          default: {
            return true;
          }
        }
      } else {
        return false;
      }
    },
  },
  async mounted() {
    this.loadItems(true);
  },
});
</script>
