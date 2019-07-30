import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const vm = new Vue();

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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