<template>
  <div class="page-user">

    <div class="my-data" v-if="this.$store.state.userId !== ''">
      <section id="photo">
        <div>
          <img :src="this.$store.state.user.photoUrl" alt="">
        </div>
      </section>
      <section id="user-name" v-if="this.$store.state.user.isAnonymous == false">
        {{ `${this.$store.state.user.name} ${this.$store.state.user.surname}` }}
      </section>
      <section id="connect" v-if="this.$store.state.user.isAnonymous">
        <button id="with-google" class="button-icon" @click="connectGoogle">
          <div class="icon">
            <img src="https://img.icons8.com/color/18/000000/google-logo.png">
          </div>
          <div class="label">
            Conectar con google
          </div>
        </button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase';

export default Vue.extend({
  data() {
    return {
      data: {
        photoUrl: '',
        identification: {
          type: '',
          number: '',
        }
      }
    }
  },
  computed: {
    photoUrl: {
      get() {
        this.$store.state.user.photoUrl
      }
    }
  },
  methods: {
    connectGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().currentUser.linkWithPopup(provider)
        .then((result) => {
          const userData = this.$store.state.user;
          userData.isAnonymous = false;
          this.$store.commit('user', userData);
          console.log('Conexión exitosa', result.user.uid)
        })
        .then((error) => {

        })
    }
  }
})
</script>
