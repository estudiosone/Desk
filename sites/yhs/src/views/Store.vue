<template lang="pug">
  .p-tienda
    .s-encabezado
      .s-titulo tienda
    .s-contenido
      .s-catalogo
        el-card.s-item(v-for='item in catalogue', :key='item.Id', shadow='hover', @click.native='$router.push(`/store/item/${item.Id}`)')
          img.s-foto(:src='item.Photo', alt='')
          .s-info
            .s-item-nombre {{ item.Name }}
            .s-item-precio(v-if='disponibilidad(item.Price)')
              .s-simbolo $
              .s-importe {{ item.Price | importe }}
            .s-item-no-disponible(v-else='') temporalmente no disponible
            //
              <widget-store-add-bag
              :itemId="item.Id"
              :itemPrice="item.Price"
              :itemName="item.Name"/>
      .s-catalogo-pie.s-acciones.s-acciones--centrado
        el-button(v-if='catalogueExpand', @click='loadMore') VER MAS
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
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import Numeral from "numeral";

// import WidgetStoreAddBag from '../components/Widgets/StoreAddBag.vue';

import ICatalogueItem from "../interfaces/ICatalogueItem";

export default Vue.extend({
  components: {
    // WidgetStoreAddBag,
  },
  filters: {
    importe(value: any) {
      if (value) {
        switch (value) {
          case undefined: {
            return false;
          }
          default: {
            return Numeral(value).format("0.00");
          }
        }
      } else {
        return false;
      }
    }
  },
  data(): {
    catalogue: ICatalogueItem[];
    catalogueExpand: boolean;
    data: Array<{
      label: string;
      children: Array<{
        label: string;
      }>;
    }>;
    defaultProps: {
      children: string;
      label: string;
    };
  } {
    return {
      catalogue: [],
      catalogueExpand: false,
      data: [
        {
          label: "Kérastase",
          children: [
            {
              label: "Aura Botanica"
            },
            {
              label: "Chronologiste"
            },
            {
              label: "Densifique"
            },
            {
              label: "Discipline"
            },
            {
              label: "Elixir Ultime"
            },
            {
              label: "Nutritive"
            },
            {
              label: "Oléo-Relax"
            },
            {
              label: "Reflection"
            },
            {
              label: "Résistance"
            },
            {
              label: "Soleil"
            },
            {
              label: "Spécifique"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  async mounted() {
    this.loadItems(true);
  },
  methods: {
    loadMore() {
      this.loadItems();
    },
    async loadItems(firstLoad: boolean = false) {
      const loading = this.$loading({
        lock: true,
        text: "Buscando productos"
      });
      const app = firebase.firestore();
      const col = app.collection("Inventory-Items");
      let query: firebase.firestore.Query;
      if (firstLoad) {
        query = col
          .where(
            "Business",
            "==",
            app.collection("Business").doc("hN4Z7KaHwWxniNgVHjTX")
          )
          .orderBy("Name")
          .limit(12);
      } else {
        query = col
          .where(
            "Business",
            "==",
            app.collection("Business").doc("hN4Z7KaHwWxniNgVHjTX")
          )
          .orderBy("Name")
          .startAfter(this.catalogue[this.catalogue.length - 1].Name)
          .limit(12);
      }
      const result = await query.get();
      let i = 12;
      result.forEach(async item => {
        i -= i;
        const catalogueItem: ICatalogueItem = {
          Id: item.id,
          Name: item.data().Name,
          Description: item.data().Description,
          Price: parseFloat(item.data().Price),
          Photo: ""
        };

        const inventoryItemsPhotos = await app
          .collection("Inventory-Items-Photos")
          .where("Item", "==", item.ref)
          .get();

        inventoryItemsPhotos.forEach(photo => {
          if (photo.data().IsCover) {
            catalogueItem.Photo = photo.data().Url;
          }
        });

        this.catalogue.push(catalogueItem);
      });
      this.catalogueExpand = i === 0 ? true : false;
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
    }
  }
});
</script>
