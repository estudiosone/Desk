<template>
  <div class="header">
    <div class="content">
      <el-button size="mini" style="border: none;">
        <img src="https://img.icons8.com/ios/16/000000/menu.png">
      </el-button>
      <div class="info">
        <div class="telefono">
          <img src="https://img.icons8.com/ios/16/000000/phone-filled.png">
          <span>+598 2601 7321</span>
        </div>
      </div>
      <div class="w-buscar">
        <el-button size="mini" style="border: none;">
          <img src="https://img.icons8.com/ios/16/000000/search.png">
          Buscar
        </el-button>
      </div>
      <div class="w-mi-cuenta">
        <el-button size="mini" style="border: none;">
          <img src="https://img.icons8.com/ios/16/000000/gender-neutral-user-filled.png">
          Mi Cuenta
        </el-button>
      </div>
      <div class="w-bolsa-de-compra">
        <el-button size="mini" style="border: none;">
          <img src="https://img.icons8.com/ios/16/000000/shopping-bag-filled.png">
          $ 0.00
        </el-button>
      </div>
      <div class="principal">
        <div class="logo" >
          <router-link to="/" tag="img" :src="this.$store.state.Site.LogoURL" />
        </div>
        <nav class="menu">
          <el-button
            type="text"
            v-for="NavMenu in this.$store.state.Site.NavMenu"
            :key="NavMenu.To"
            @click.native="$router.push(NavMenu.To)">
            {{ NavMenu.Name }}
            </el-button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'desknavi',
})
</script>

<style lang="scss">
%boton {
  .el-button {
    font-family: 'Mukta Mahee', sans-serif;
    text-transform: uppercase;
  }
}
%boton-con-icono {
  @extend %boton;
  .el-button {
    span {
      align-items: center;
      display: flex;
      img {
        margin-right: 8px;
      }
    }
  }
}

.header {
  border-bottom: 1px solid #ededed;
  .content {
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    position: relative;
  }

  .info {
    height: 42px;
    display: flex;
    order: 1;
    flex-grow: 100;
  }
  .telefono {
    display: flex;
    align-items: center;
    font-family: 'Mukta Mahee', sans-serif;
    font-size: 16px;
    font-weight: 600;
    img {
      margin-right: 12px;
    }
  }
  .w-buscar {
    @extend %boton-con-icono;
    order: 2;
  }
  .w-mi-cuenta {
    @extend %boton-con-icono;
    order: 3;
  }
  .w-bolsa-de-compra {
    @extend %boton-con-icono;
    order: 4;
  }
  .principal {
    height: 70px;
    order: 5;
    flex-basis: 100%;
    display: flex;
    align-items: center;

    .logo {
      flex-grow: 100;
      img {
        height: 54px;
        cursor: pointer;
      }
    }
    .menu {
      @extend %boton;
      display: flex;
      justify-content: flex-end;
      .el-button {
        padding: 7px 15px;
        color: black;
        font-size: 18px;
      }
    }
  }
}
</style>

