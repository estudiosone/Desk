<template>
  <div class="home">
    <el-carousel
      height="100%"
      :interval="5000">
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
    <div id="salones">

    </div>
    <div id="agendate">
      <img src="../assets/img/agendate-bkg.jpg" alt="">
      <widget-booking-salon/>
    </div>
    <div id="promociones">

    </div>
    <div id="noticias">

    </div>
    <div id="firebaseui-auth-container">

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WidgetBookingSalon from '../components/Widgets/BookingSalon.vue';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default Vue.extend({
  components: {
    WidgetBookingSalon,
  },
  mounted() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      autoUpgradeAnonymousUsers: true,
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function(error) {
          // For merge conflicts, the error.code will be
          // 'firebaseui/anonymous-upgrade-merge-conflict'.
          if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve();
          }
          // The credential the user tried to sign in with.
          var cred = error.credential;
          // Copy data from anonymous user to permanent user and delete anonymous
          // user.
          // ...
          // Finish sign-in after data is copied.
          firebase.auth().currentUser.delete().then(() => {
            return firebase.auth().signInWithCredential(cred);
          })
        }
      }
      // Other config options...
    });
  },
});
</script>


<style lang="scss">
@import url("https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css");
.home {
  width: 100%;
  height: calc(100vh - 64px);
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
  #agendate {
    height: 450px;
    display: grid;
    grid-template-columns: 1fr 600px 1fr;
    grid-template-rows: 325px 75px 75px;
    img {
      height: 400px;
      width: 100%;
      object-fit: cover;
      object-position: center;
      grid-area: 1 / 1 / 2 / 4;
    }
    .widget-booking-salon {
      width: 600px;
      height: 150px;
      grid-area: 2 / 2 / 4 / 3;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      h2 {
        text-align: center;
      }
    }
  }
}
</style>
