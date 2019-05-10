<template>
  <el-container id="app">
    <desknavi></desknavi>
    <router-view style="height: fit-content;" class="viewer"/>
    <desk-footer></desk-footer>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';

import DeskFooter from './components/Footer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DeskFooter,
  },
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
  async mounted() {
    this.$store.dispatch('initializeApp');
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
          this.$store.commit('user', data);
        } else {
          this.$store.state.user = {
            name: (userData.displayName ? userData.displayName.split(' ')[0] : '') || '',
            surname: (userData.displayName ? userData.displayName.split(' ')[1] : '') || '',
            email: userData.email ? userData.email : '',
            photoUrl: userData.photoURL ? userData.photoURL : 'https://img.icons8.com/material-outlined/96/000000/user-male-circle.png',
            isAnonymous: userData.isAnonymous,
          };
          await userRef.set(this.$store.state.user);
        }
      } else if (!userCreated) {
        // userCreated = true;
        // auth.signInAnonymously();
      }
    });
  },
});
</script>

<style lang="scss">
@import './styles/index';
@import url('https://fonts.googleapis.com/css?family=Mukta+Mahee|Montserrat');
body {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  // font-family: 'Dosis', sans-serif;
  font-family: 'Montserrat', sans-serif;

}
#app {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  .viewer{
    min-height: calc(100vh - 64px - 426px);
    grid-row: 2 / span 1;

    @include md {
      min-height: calc(100vh - 64px - 142px);
    }
  }
  #footer {
    grid-row: 3 / span 1;
  }
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
