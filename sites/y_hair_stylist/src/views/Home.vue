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
      <el-row
        id="salon-brunel"
      >
        <h1>Yhair Stylist | Brunel</h1>
        <el-col :span="8">
          <iframe
            src="https://snazzymaps.com/embed/149768"
            style="border:none;"
          />
        </el-col>
        <el-col :span="8" style="margin: 0 16px;">
          <el-row type="flex" align="middle" style="margin-bottom: 32px;">
            <img src="https://img.icons8.com/material-outlined/48/000000/marker.png">
            <div style="margin: 11px 16px; font-size: 24px;">Cno. Carrasco 6955 local 101</div>
          </el-row>
          <el-row type="flex" align="middle" style="margin-bottom: 32px;">
            <img src="https://img.icons8.com/material-outlined/48/000000/phone.png">
            <div style="margin: 11px 16px; font-size: 24px;">+598 2605 9344</div>
          </el-row>
          <el-row type="flex" align="middle" style="margin-bottom: 32px;">
            <img src="https://img.icons8.com/material-outlined/48/000000/clock.png">
            <div style="margin: 11px 16px; font-size: 24px;">
            <div>L: 14:00 a 19:00</div>
            <div>M a S: 10:00 a 19:00</div></div>
          </el-row>
        </el-col>
      </el-row>
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
    height: 50vh;
  }
}
</style>

<script>
export default {
  name: 'Home',
};
</script>
