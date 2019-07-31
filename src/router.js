import Vue from 'vue'
import Router from 'vue-router'

const vm = new Vue();

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about')
    },
    {
      path: '/page0',
      name: 'page0',
      component: () => import('./views/page0')
    },
    {
      path: "*",
      redirect: '/page0'
    }
  ]
})

router.afterEach(() => {
  //路由切换回到顶部 （根据实际情况决定是否需要）
  if (!window.dom_body) {
    window.dom_body = document.documentElement || document.body;
  }
  vm.$util.easeout(window.dom_body, 0, 5);
})
export default router