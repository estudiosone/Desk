<template>
  <div>
    <el-row id="home">
      <el-carousel
        height="100%"
        :interval="5000"
      >
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
    </el-row>
    <el-row id="salones">
      <salones
        v-for="salon in salones"
        :key="salones.indexOf(salon)"
        :data="salon"
        :id="salones.indexOf(salon)"
      />
    </el-row>
  </div>
</template>

<style lang="scss">
#home {
  width: 100%;
  height: calc(100vh - 60px);
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
}
#salones {
  h1 {
    text-align: center;
  }
  iframe {
    width: 100%;
    height: 400px;
  }
}
</style>

<script>
import Salones from '../components/Salones.vue';

export default {
  name: 'Home',
  components: {
    Salones,
  },
  data() {
    return {
      salones: [
        {
          name: 'Portones Shopping',
          address: 'Av. Italia 5775 local S44',
          phone: '+598 2601 7321',
          schedules: [
            'L a V: 8:00 a 22:00',
            'S y D: 10:00 a 22:00',
          ],
        },
        {
          name: 'Portal Brunel',
          address: 'Cno. Carrasco 6955 local 101',
          phone: '+598 2605 9344',
          schedules: [
            'L: 14:00 a 19:00',
            'M a S: 10:00 a 19:00',
          ],
        },
        {
          name: 'Portal Americas',
          address: 'Av. de las Américas 6000',
          phone: '+598 2602 3492',
          schedules: [
            'L: 14:00 a 19:00',
            'M a S: 10:00 a 19:00',
          ],
        },
      ],
    };
  },
};
</script>
