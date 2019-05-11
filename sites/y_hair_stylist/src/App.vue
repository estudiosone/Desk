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
        menu-trigger="click"
        :router="true"
      >
        <el-menu-item
          v-for="item in menu"
          :key="item.to"
          class="hidden-xs-only"
          :index="item.to"
        >
          {{ item.name }}
        </el-menu-item>
        <el-submenu
          class="hidden-sm-and-up"
          index="/"
        >
          <template slot="title">
            <img src="https://img.icons8.com/material-rounded/24/000000/menu.png">
          </template>
          <el-menu-item
            v-for="item in menu"
            :key="item.to"
            :index="item.to"
          >
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menu: [
        {
          name: 'Salones',
          to: '/#salones',
        },
        {
          name: 'Agendate',
          to: '/#agendate',
        },
        {
          name: 'Promociones',
          to: '/#promociones',
        },
        {
          name: 'Noticias',
          to: '/#noticias',
        },
        {
          name: 'Tienda',
          to: '/store',
        },
      ],
    };
  },
  methods: {
    handleCommand(e) {
      console.log(e);
    },
  },
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
.el-header {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  .el-submenu__icon-arrow.el-icon-arrow-down {
    display: none;
  }
}
// .el-menu--horizontal.el-menu {
//   font-weight: 600;
//   text-transform: uppercase;
//   border-bottom: none !important;
// }
// .el-menu--horizontal>.el-menu-item {
//   color: #000 !important;
//   border-bottom: none !important;
// }
</style>
