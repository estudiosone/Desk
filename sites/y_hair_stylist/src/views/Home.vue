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
        :gutter="16"
        id="salon-brunel"
      >
        <h1>Yhair Stylist | Brunel</h1>
        <el-col :span="16">
          <iframe
            src="https://snazzymaps.com/embed/149768"
            style="border:none;"
          />
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="8">
              <span>
                Dirección:
              </span>
            </el-col>
            <el-col :span="16">
              <span>
                Cno. Carrasco 6955 local 101
              </span>
            </el-col>
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
