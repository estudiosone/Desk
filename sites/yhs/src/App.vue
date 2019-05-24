<template lang="pug">
  el-container#app
    desknavi
    el-scrollbar.viewer
      el-scrollbar.viewer-container
        router-view
      desk-footer
</template>


<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import EventBus from "./eventBus";
import DeskFooter from "./components/Footer.vue";

export default Vue.extend({
  name: "App",
  components: {
    DeskFooter
  },
  data() {
    return {
      menu: [
        {
          name: "Agendate",
          to: "/#agendate"
        },
        {
          name: "Blog",
          to: "/#blog"
        },
        {
          name: "Tienda",
          to: "/store"
        }
      ]
    };
  },
  async mounted() {
    this.$store.dispatch("initializeApp");
    firebase.auth().onAuthStateChanged(async userData => {
      if (this.$store.state.Utilidades.Modales.Autenticacion) {
        this.$store.commit("Utilidades/Modal_Autenticacion");
      }
      if (userData) {
        const collectionRef = firebase.firestore().collection("Auth-Users");
        const userRef = collectionRef.doc(userData.uid);
        const user = await userRef.get();

        this.$store.commit("userId", userData.uid);

        if (user.exists) {
          const data = user.data();
          this.$store.commit("user", data);
        } else {
          const data = {
            name:
              (userData.displayName
                ? userData.displayName.split(" ")[0]
                : "") || "",
            surname:
              (userData.displayName
                ? userData.displayName.split(" ")[1]
                : "") || "",
            email: userData.email ? userData.email : "",
            photoUrl: userData.photoURL
              ? userData.photoURL
              : "https://img.icons8.com/material-outlined/96/000000/user-male-circle.png",
            isAnonymous: userData.isAnonymous
          };
          this.$store.commit("user", data);
          await userRef.set(data);
        }
      } else {
        this.$store.commit("userId", undefined);
      }
      EventBus.$emit("eventAuthActualizada");
    });
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.$store.commit("Utilidades/UI_BP", window.innerWidth);
    }
  }
});
</script>

<style lang="scss">
@import "./styles/index";
@import url("https://fonts.googleapis.com/css?family=Mukta+Mahee|Montserrat");
body {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: "Mukta Mahee", sans-serif;

  overflow: hidden;
  @include sm {
  }
}
#app {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;

  @include md {
    grid-template-rows: 141px calc(100vh - 141px);
  }

  .viewer {
    height: calc(100vh - 64px);
    grid-row: 2 / span 1;

    @include md {
      height: calc(100vh - 141px);
    }

    .viewer-container {
      height: fit-content;

      @include md {
        height: calc(100vh - 141px - 170px);
      }
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
    grid-template-areas: "A";

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
// .el-menu--horizontal.el-menu {
//   font-weight: 600;
//   text-transform: uppercase;
//   border-bottom: none !important;
// }
// .el-menu--horizontal>.el-menu-item {
//   color: #000 !important;
//   border-bottom: none !important;
// }
.widget-booking-salon {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
