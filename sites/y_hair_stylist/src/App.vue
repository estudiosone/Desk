<template>
  <el-container>
    <el-header style="display: flex; justify-content: space-between;">
      <router-link to="/#">
        <img
          style="height: 44px; margin: 8px;"
          src="http://yhairstylist.com/wp-content/uploads/2019/03/cropped-Asset-1.png"
        >
      </router-link>
      <el-menu
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="/#salones">
          Salones
        </el-menu-item>
        <el-menu-item index="/#agendate">
          Agendate
        </el-menu-item>
        <el-menu-item index="/#promociones">
          Promociones
        </el-menu-item>
        <el-menu-item index="/#noticias">
          Noticias
        </el-menu-item>
        <el-menu-item index="/store">
          Store
        </el-menu-item>
      </el-menu>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
export default {
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Dosis');
body {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Dosis', sans-serif;
}

.el-menu--horizontal.el-menu {
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: none !important;
}
.el-menu--horizontal>.el-menu-item {
  color: #000 !important;
  border-bottom: none !important;
}
</style>
