<template>
  <el-container id="app">
    <el-header style="height: 64px;">
      <div class="content">
        <router-link class="logo" to="/">
          <img
            style="height: 44px; margin: 8px;"
            src="./assets/logo.png"
          >
        </router-link>
        <el-menu
          class="menu"
          mode="horizontal"
          menu-trigger="click"
          :router="true"
        >
          <el-menu-item
            v-for="item in menu"
            :key="item.to"
            class="hidden-sm-and-down"
            :index="item.to"
          >
            {{ item.name }}
          </el-menu-item>
          <el-submenu class="hidden-sm-and-down" index="/store/bag">
            <template slot="title">
              <el-badge :value="0" style="line-height: 24px;">
                <img src="https://img.icons8.com/material-outlined/24/000000/shopping-bag.png">
              </el-badge>
            </template>
            <span style="padding: 16px;">
              Aún no agregas nada aquí
            </span>
          </el-submenu>
          <el-submenu class="hidden-sm-and-down" index="/user">
            <template slot="title">
              <img src="https://img.icons8.com/material-outlined/24/000000/user.png">
            </template>
            <el-menu-item>
              Iniciar sesión
            </el-menu-item>
            <el-menu-item index="/user">
              Mi usuario
            </el-menu-item>
            <el-divider></el-divider>
            <el-menu-item>
              Cerrar sesión
            </el-menu-item>
          </el-submenu>

          <el-submenu
            class="hidden-md-and-up"
            index="/"
          >
            <template slot="title">
              <el-badge :value="0" style="line-height: 24px;">
                <img src="https://img.icons8.com/material-rounded/24/000000/menu.png">
              </el-badge>
            </template>
            <el-menu-item
              v-for="item in menu"
              :key="item.to"
              :index="item.to"
            >
              {{ item.name }}
            </el-menu-item>
            <el-menu-item index="/user">
              Usuario
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
import firebase from 'firebase';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      menu: [
        {
          name: 'Agendate',
          to: '/#agendate',
        },
        {
          name: 'Blog',
          to: '/#blog',
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
  mounted() {

    const auth = firebase.auth();

    let userCreated = false;

    firebase.auth().onAuthStateChanged(async (userData) => {
      if (userData) {
        const collectionRef = firebase.firestore().collection('Auth-Users');
        const userRef = collectionRef.doc(userData.uid);
        const user = await userRef.get();

        this.$store.commit('userId', userData.uid);

        if (user.exists) {
          const data = user.data();
          console.log(userData.isAnonymous)
          this.$store.commit('user', data);
        } else {
          this.$store.state.user = {
            name: (userData.displayName ? userData.displayName.split(' ')[0] : '') || '',
            surname: (userData.displayName ? userData.displayName.split(' ')[1] : '') || '',
            email: userData.email ? userData.email : '',
            photoUrl: userData.photoURL ? userData.photoURL : 'https://img.icons8.com/material-outlined/96/000000/user-male-circle.png',
            isAnonymous: userData.isAnonymous,
          }
          await userRef.set(this.$store.state.user)
        }
      } else if (!userCreated) {
        userCreated = true;
        auth.signInAnonymously();
      }
    });
  }
});
</script>

<style lang="scss">
@import './styles/index';
@import url('https://fonts.googleapis.com/css?family=Montserrat');
body {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  // font-family: 'Dosis', sans-serif;
  font-family: 'Montserrat', sans-serif;

}
.el-header {
  position: fixed;
  width: 100%;
  z-index: 1000;
  background-color: white;

  .content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-areas: 'A';

    .logo {
      grid-area: A;
      width: fit-content;
      margin: auto;

      @include md {
        margin: 0;
      }
    }

    .menu {
      grid-area: A;
      width: fit-content;
      margin-left: auto;
    }

    @include md {
      display: flex;
      justify-content: space-between;
    }

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
