import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import(/* webpackChunkName: "blog" */ "./views/Blog.vue")
    },
    {
      path: "/blog/:id",
      name: "blog-entry",
      component: () =>
        import(/* webpackChunkName: "blog-entry" */ "./views/BlogEntry.vue"),
      props: true
    },
    {
      path: "/store",
      name: "store",
      component: () =>
        import(/* webpackChunkName: "store" */ "./views/Store.vue")
    },
    {
      path: "/store/item/:id",
      name: "store-item",
      component: () =>
        import(/* webpackChunkName: "store-item" */ "./views/StoreItem.vue"),
      props: true
    },
    {
      path: "/mi-cuenta/:seccion",
      name: "mi-cuenta",
      component: () =>
        import(/* webpackChunkName: "p-mi-cuenta" */ "./views/MiCuenta.vue"),
      props: true
    },
    {
      path: "/mi-cuenta/:seccion/:accion",
      name: "mi-cuenta-accion",
      component: () =>
        import(/* webpackChunkName: "p-mi-cuenta" */ "./views/MiCuenta.vue"),
      props: true
    },
    {
      path: "/mi-cuenta/:seccion/:accion/:index",
      name: "mi-cuenta-accion-index",
      component: () =>
        import(/* webpackChunkName: "p-mi-cuenta" */ "./views/MiCuenta.vue"),
      props: true
    },
    {
      path: "/mi-compra",
      name: "mi-compra",
      component: () =>
        import(/* webpackChunkName: "p-mi-compra" */ "./views/MiCompra.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
        // , offset: { x: 0, y: 10 }
      };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
