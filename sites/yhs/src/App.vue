<template>
  <el-container id="app">
    <el-header style="height: 64px;">
      <div class="content">
        <router-link to="/#">
          <img
            style="height: 44px; margin: 8px;"
            src="./assets/logo.png"
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
      </div>
    </el-header>
    <router-view style="margin-top: 64px;" />
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
  },
});
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
  position: fixed;
  width: 100%;
  z-index: 10000;
  background-color: white;

  .content {
  display: flex; 
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
    .el-submenu__icon-arrow.el-icon-arrow-down {
      display: none;
    }
  }
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
.widget-booking-salon {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
