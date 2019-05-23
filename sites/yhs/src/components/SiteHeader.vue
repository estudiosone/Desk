<template lang="pug">
  .header
    .content
      .w-mobile-menu
        el-dropdown.hidden-sm-and-up(trigger='click')
          span.el-dropdown-link
            img(src='../styles/utilities/desksuite-icons/svg/icons8-menu-20.svg')
          el-dropdown-menu(slot='dropdown')
            el-dropdown-item.w-mi-cuenta(v-if='this.$store.state.userId ? false : true', @click.native='abrirModalAutentificacion')
              | Mi Cuenta
            el-dropdown-item.w-mi-cuenta(v-else='', @click.native="$router.push('/mi-cuenta/datos')")
              | {{ `Hola, ${this.$store.state.user.name}` }}
            el-dropdown-item(v-for='NavMenu in this.$store.state.Site.NavMenu', :key='NavMenu.To', @click.native='$router.push(NavMenu.To)')
              | {{ NavMenu.Name }}
      .info
        .telefono
          img(src='../styles/utilities/desksuite-icons/svg/icons8-phone-20.svg')
          span +598 2601 7321
        .logo
          router-link(to='/', tag='img', :src='this.$store.state.Site.LogoURL')
      .w-buscar
        el-button(type='text', size='mini', style='border: none;')
          img(src='../styles/utilities/desksuite-icons/svg/icons8-search-20.svg')
          span Buscar
      .w-mi-cuenta
        el-button(type='text', size='mini', style='border: none;', v-if='this.$store.state.userId ? false : true', @click.native='abrirModalAutentificacion')
          img(src='../styles/utilities/desksuite-icons/svg/icons8-user-20.svg')
          span Mi Cuenta
        el-dropdown(v-else='', trigger='click')
          span.el-dropdown-link
            img(src='../styles/utilities/desksuite-icons/svg/icons8-user-20.svg')
            span {{ `Hola, ${this.$store.state.user.name}` }}
          el-dropdown-menu(slot='dropdown')
            el-dropdown-item.w-mi-cuenta(@click.native="$router.push('/mi-cuenta/datos')")
              | mis datos
            el-dropdown-item.w-mi-cuenta(@click.native="$router.push('/mi-cuenta/direcciones')")
              | mis direcciones
            el-dropdown-item.w-mi-cuenta(@click.native="$router.push('/mi-cuenta/historial')")
              | mi historial
            el-dropdown-item.w-mi-cuenta(@click.native='salirDeLaCuenta', :divided='true')
              | salir
        el-dialog.firebaseui-auth-dialog(title='Ingresar a mi cuenta', width='560px', :visible.sync='ModalesAutenticacion', :fullscreen='this.$store.state.Utilidades.UI.BP.mdUp', @opened='setFirebaseAuthUI')
          .firebaseui-auth-container
            .logo
              img.logo(:src='this.$store.state.Site.LogoURL', alt='')
            #firebaseui-auth-container
      .w-mi-compra
        el-button(type='text', size='mini', style='border: none;', @click.native="$router.push('/mi-compra')")
          el-badge(:hidden='this.$store.state.Utilidades.UI.BP.smUp', :value='orderCountLines', style='right: 8px;')
            img(src='../styles/utilities/desksuite-icons/svg/icons8-shopping-bag-20.svg')
          span {{ `$ ${orderTotal}` }}
      .principal
        .logo
          router-link(to='/', tag='img', :src='this.$store.state.Site.LogoURL')
        nav.menu
          el-button(type='text', v-for='NavMenu in this.$store.state.Site.NavMenu', :key='NavMenu.To', @click.native='$router.push(NavMenu.To)')
            | {{ NavMenu.Name }}
</template>


<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import firebaseui from "firebaseui";

export default Vue.extend({
  name: "desknavi",
  data(): {
    dialogos: {
      ingresar: boolean;
    };
  } {
    return {
      dialogos: {
        ingresar: false
      }
    };
  },
  computed: {
    ModalesAutenticacion: {
      get(this: any): boolean {
        return this.$store.state.Utilidades.Modales.Autenticacion;
      },
      set(this: any, value: boolean) {
        this.$store.commit("Utilidades/Modal_Autenticacion", value);
      }
    },
    orderCountLines() {
      const { order } = this.$store.state;
      const result = order.detail.length;
      return result;
    },
    orderTotal() {
      const { order } = this.$store.state;
      let total: number = 0;
      order.detail.forEach((line: any) => {
        total += line.lineTotal;
      });
      return total;
    }
  },
  methods: {
    abrirModalAutentificacion() {
      this.$store.commit("Utilidades/Modal_Autenticacion");
    },
    setFirebaseAuthUI() {
      const ui = firebaseui.auth.AuthUI.getInstance();
      const signInSuccessWithAuthResult = (authResult: any) => false;
      if (ui) {
        ui.start("#firebaseui-auth-container", {
          autoUpgradeAnonymousUsers: false,
          signInFlow: "popup",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          signInSuccessUrl: "/",
          callbacks: {
            signInSuccessWithAuthResult
          }
        });
      }
    },
    async salirDeLaCuenta() {
      await firebase.auth().signOut();
    }
  }
});
</script>

<style lang="scss">
@import "../styles/bp";

%boton {
  padding: 7px 15px;
  color: black;
  font-family: "Mukta Mahee", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
}
%boton-con-icono {
  @extend %boton;
  span {
    align-items: center;
    display: flex;
    img {
      margin-right: 8px;
    }
  }
}

.el-dropdown-menu__item {
  @extend %boton-con-icono;
  padding: 0 20px;
  text-transform: capitalize;
}
.firebaseui-auth-dialog {
  .el-dialog__body {
    padding: 30px 0;

    @include sm {
      padding: 30px 20px;
    }
  }
  .firebaseui-auth-container {
    min-height: 420px;
    .logo {
      img {
        height: 62px;
        max-width: 240px;
        object-fit: contain;
      }
      width: fit-content;
      margin: 20px auto;
    }
  }
}

.header {
  border-bottom: 1px solid #ededed;
  .content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    box-sizing: border-box;

    @include sm {
      padding: 0 20px;
    }
  }

  .info {
    height: 48px;
    display: flex;
    order: 1;
    flex-grow: 100;
    margin: 8px 0;

    @include sm {
      height: 42px;
      margin: 0;
    }
    .telefono {
      display: none;
      align-items: center;
      font-family: "Mukta Mahee", sans-serif;
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
        margin: 4px 0 4px 0px;
        cursor: pointer;
      }
      @include sm {
        display: none;
      }
    }
  }
  .w-mobile-menu {
    order: 0;
  }
  .w-buscar {
    order: 2;
  }
  .w-mi-cuenta {
    order: 3;
    .el-button,
    .el-dropdown {
      display: none;
    }

    @include sm {
      .el-button,
      .el-dropdown {
        display: block;
      }
    }
  }
  .w-mi-compra {
    order: 4;
  }
  .w-mobile-menu,
  .w-buscar,
  .w-mi-cuenta,
  .w-mi-compra {
    .el-button,
    .el-dropdown {
      @extend %boton-con-icono;
      span {
        font-size: 12px !important;
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
      display: flex;
      justify-content: flex-end;
      .el-button {
        @extend %boton;
        font-size: 18px;
      }
    }
  }
}
</style>
