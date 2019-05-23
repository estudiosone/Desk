<template lang="pug">
  .home
    el-carousel(:interval='5000')
      el-carousel-item
        img(src='../assets/img/PROMO-1-min.png')
      el-carousel-item
        img(src='../assets/img/PROMO-2-min.png')
      el-carousel-item
        img(src='../assets/img/PROMO-3-min.png')
    #salones
    #agendate
      img(src='../assets/img/agendate-bkg.jpg', alt='')
      widget-booking-salon
    #blog
    #firebaseui-auth-container
</template>

<script lang="ts">
import Vue from "vue";
import WidgetBookingSalon from "../components/Widgets/BookingSalon.vue";

export default Vue.extend({
  components: {
    WidgetBookingSalon
  }
});
</script>

<style lang="scss">
@import url("https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css");
@import "../styles/home.scss";

.home {
  width: 100%;
  // height: calc(100vh - 64px);
  .el-carousel {
    height: calc(100vh - 64px);
    max-height: 100vw;
    .el-carousel__container {
      height: 100%;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
