<template>
  <div class="home">
    <el-carousel
      height="100%"
      :interval="5000">
      <el-carousel-item>
        <img src="../assets/img/PROMO-1-min.png">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/PROMO-2-min.png">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/PROMO-3-min.png">
      </el-carousel-item>
    </el-carousel>
    <div id="salones">

    </div>
    <div id="agendate">
      <img src="../assets/img/agendate-bkg.jpg" alt="">
      <widget-booking-salon/>
    </div>
    <div id="promociones">

    </div>
    <div id="noticias">

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WidgetBookingSalon from '../components/Widgets/BookingSalon.vue'

export default Vue.extend({
  components: {
    WidgetBookingSalon
  }
})
</script>


<style lang="scss">
.home {
  width: 100%;
  height: calc(100vh - 64px);
  max-height: 100vw;
  .el-carousel {
    height: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  #agendate {
    height: 450px;
    display: grid;
    grid-template-columns: 1fr 600px 1fr;
    grid-template-rows: 325px 75px 75px;
    img {
      height: 400px;
      width: 100%;
      object-fit: cover;
      object-position: center;
      grid-area: 1 / 1 / 2 / 4;
    }
    .widget-booking-salon {
      width: 600px;
      height: 150px;
      grid-area: 2 / 2 / 4 / 3;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      h2 {
        text-align: center;
      }
    }
  }
}
</style>
