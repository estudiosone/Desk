<template>
  <div class="home">
    <el-carousel
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
    <div id="blog">

    </div>
    <div id="firebaseui-auth-container">

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import WidgetBookingSalon from '../components/Widgets/BookingSalon.vue';

export default Vue.extend({
  components: {
    WidgetBookingSalon,
  },
  mounted() {
    // const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start('#firebaseui-auth-container', {
    //   autoUpgradeAnonymousUsers: true,
    //   signInFlow: 'popup',
    //   signInOptions: [
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   ],
    //   callbacks: {
    //     // signInFailure callback must be provided to handle merge conflicts which
    //     // occur when an existing credential is linked to an anonymous user.
    //     signInFailure(error) {
    //       // For merge conflicts, the error.code will be
    //       // 'firebaseui/anonymous-upgrade-merge-conflict'.
    //       if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
    //         return Promise.resolve();
    //       }
    //       // The credential the user tried to sign in with.
    //       const cred = error.credential;
    //       // Copy data from anonymous user to permanent user and delete anonymous
    //       // user.
    //       // ...
    //       // Finish sign-in after data is copied.
    //       firebase.auth()
    //        .currentUser.delete().then(() => firebase.auth().signInWithCredential(cred));
    //     },
    //   },
    //   // Other config options...
    // });
  },
});
</script>


<style lang="scss">
@import url("https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css");
@import '../styles/home.scss';

.home {
  width: 100%;
  // height: calc(100vh - 64px);
  .el-carousel {
    height: calc(100vh - 64px);
    max-height: 100vw;
    .el-carousel__container {
      height: 100%;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
