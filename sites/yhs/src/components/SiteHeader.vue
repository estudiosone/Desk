<template>
  <div class="header">
    <div class="content">
      <el-dropdown
        trigger="click"
        class="hidden-sm-and-up">
        <span class="el-dropdown-link">
          <img src="https://img.icons8.com/ios/16/000000/menu.png">
        </span>            
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
              v-for="NavMenu in this.$store.state.Site.NavMenu"
              :key="NavMenu.To"
              @click.native="$router.push(NavMenu.To)">
              {{ NavMenu.Name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>




      <!-- <el-button size="mini" style="border: none;">
        <img src="https://img.icons8.com/ios/16/000000/menu.png">
      </el-button> -->
      <div class="info">
        <div class="telefono">
          <img src="https://img.icons8.com/ios/16/000000/phone-filled.png">
          <span>+598 2601 7321</span>
        </div>
        <div class="logo" >
          <router-link to="/" tag="img" :src="this.$store.state.Site.LogoURL" />
        </div>
      </div>
      <div class="w-buscar">
        <el-button type="text" size="mini" style="border: none;">
          <img src="https://img.icons8.com/ios/16/000000/search.png">
          <span>Buscar</span>
        </el-button>
      </div>
      <div class="w-mi-cuenta">
        <el-button type="text" size="mini" style="border: none;">
          <img src="https://img.icons8.com/ios/16/000000/gender-neutral-user-filled.png">
          <span>Mi Cuenta</span>
        </el-button>
      </div>
      <div class="w-bolsa-de-compra">
        <el-button type="text" size="mini" style="border: none;">
          <img src="https://img.icons8.com/ios/16/000000/shopping-bag-filled.png">
          <span>$ 0.00</span>
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
@import '../styles/bp';

%boton {
  .el-button {
    padding: 7px 15px;
    color: black;
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
    box-sizing: border-box;
  }

  .info {
    height: 42px;
    display: flex;
    order: 1;
    flex-grow: 100;
    .telefono {
      display: none;
      align-items: center;
      font-family: 'Mukta Mahee', sans-serif;
      font-size: 16px;
      font-weight: 600;

      @include sm {
        display: flex;
      }

      img {
        margin-right: 12px;
      }
    }
    .logo {
      img {
        height: 32px;
        margin: 4px 0 4px 8px;
        cursor: pointer;
      }
      @include sm {
        display: none;
      }
    }
  }
  .w-buscar {
    order: 2;
  }
  .w-mi-cuenta {
    order: 3;
  }
  .w-bolsa-de-compra {
    order: 4;
  }
  .w-buscar,.w-mi-cuenta,.w-bolsa-de-compra {
    @extend %boton-con-icono;
    .el-button {
      span {
        span {
          display: none;

          @include sm {
            display: flex;
          }
        }
      }
    }
  }
  .principal {
    height: 70px;
    order: 5;
    display: none;
    flex-basis: 100%;
    align-items: center;
    @include sm {
          display: flex;

    }
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
        font-size: 18px;
      }
    }
  }
}
</style>

