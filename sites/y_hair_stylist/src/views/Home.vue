<template>
  <el-container>
    <section id="home">
      <el-carousel height="100%">
        <el-carousel-item>
          <img src="http://yhairstylist.com/wp-content/uploads/2019/04/PROMO-1-min.png" alt="">
        </el-carousel-item>
      </el-carousel>
    </section>
    <section id="salones">

    </section>
  </el-container>
</template>

<style lang="scss">
#home {
  width: 100%;
  height: calc(100vh - 60px);

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
</style>
