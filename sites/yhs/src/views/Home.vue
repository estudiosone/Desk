<template lang="pug">
  .home
    el-carousel(:interval='5000')
      el-carousel-item
        img(src='../assets/img/19_05---Promo-Elixir-Ultimate.jpg')
      el-carousel-item
        img(src='../assets/img/Dibujo.jpg')
      el-carousel-item
        img(src='../assets/img/Dibujo1.jpg')
      el-carousel-item
        img(src='../assets/img/Dibujo2.jpg')
      el-carousel-item
        img(src='../assets/img/Dibujo3.jpg')
      el-carousel-item
        img(src='../assets/img/Dibujo4.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_COLOR.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_CORTE.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_KERASTASE.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_LOREAL.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_MANOS.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_REDKEN.jpg')
      el-carousel-item
        img(src='../assets/img/PROMO_CUP_RITUALES.jpg')
    #salones
    #agendate
      img(src='../assets/img/agendate-bkg.jpg', alt='')
      widget-booking-salon
    #blog
      .s-encabezado
        .s-title blog
      .s-contenido
        .s-filtro
        .s-list
          el-card.i-entry(shadow="hover",v-for="entry in this.$store.state.blog.entries",:key="entry.id")
            img.s-media(:src="entry.mediaURL")
            .s-title {{entry.title}}
            p.s-texto {{ entry.childrens | extractContent }}
            .s-tags
              el-tag(size="mini",type="info",v-for="tag in entry.tags",:key="tag") {{tag}}
            .s-action
              el-button(type="primary" round @click.primary="$router.push(`/blog/${entry.id}`)") Leer más
    #firebaseui-auth-container
</template>

<script lang="ts">
import Vue from "vue";
import WidgetBookingSalon from "../components/Widgets/BookingSalon.vue";

export default Vue.extend({
  components: {
    WidgetBookingSalon
  },
  filters: {
    extractContent(childrens: any) {
      let text = "";

      for (const children of childrens) {
        if (children.type === "p") {
          text += `${children.data} `;
        }
      }

      return text;
    }
  }
});
</script>

<style lang="scss">
@import url("https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css");
@import "../styles/home.scss";

.home {
  // height: calc(100vh - 64px);
  .el-carousel {
    height: 450px;
    max-height: 100vw;
    .el-carousel__container {
      height: 100%;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center;

      @include md {
        transform: scale(0.9, 0.9);
      }
    }
  }
}
</style>
