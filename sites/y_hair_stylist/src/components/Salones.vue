<template>
  <el-row
    :id="`salon-${data.name}`"
  >
    <h1>{{ data.name }}</h1>
    <el-col
      :span="12"
      class="map"
    >
      <iframe
        src="https://snazzymaps.com/embed/149768"
        style="border:none;"
      />
    </el-col>
    <el-col
      :span="12"
      class="info-photos"
    >
      <el-row class="photos">
        <img
          src="../assets/img/BRUNEL-1.jpeg"
        >
        <img
          src="../assets/img/BRUNEL-1.jpeg"
        >
        <img
          src="../assets/img/BRUNEL-1.jpeg"
        >
      </el-row>
      <el-row>
        <salon-info/>
      </el-row>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
}
.info-photos {
  height: 400px;
  .info {
    height: 200px;
    padding: 0 16px;
  }
  .photos {
    height: 200px;
    img {
      width: 33.33%;
      height: 200px;
      object-fit: cover;
    }
  }
}
</style>


<script>
import SalonInfo from './SalonInfo.vue';

export default {
  components: {
    SalonInfo,
  },
  props: {
    data: Object,
    id: Number,
  },
  methods: {
    isEven(value) {
      if (value % 2 == 0) return true;
      return false;
    },
  },
};
</script>
