/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable consistent-return */
import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
];

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        // , offset: { x: 0, y: 10 }
      };
    }
  },
});

Vue.use(VueAnalytics, {
  id: 'UA-16913947-1',
  router,
  autoTracking: {
    screenview: true,
  },
});

export default router;
