import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/js'
import './assets/css/base.css'
import './assets/css/main.styl'
import { Dialog, Toast, Lazyload } from 'vant';

Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

