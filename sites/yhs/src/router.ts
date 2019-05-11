import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/store',
      name: 'store',
      component: () => import(/* webpackChunkName: "store" */ './views/Store.vue'),
    },
    {
      path: '/store/item/:id',
      name: 'store-item',
      component: () => import(/* webpackChunkName: "store-item" */ './views/StoreItem.vue'),
    },
    {
      path: '/mi-cuenta/:accion',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        // , offset: { x: 0, y: 10 }
      };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
