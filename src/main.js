import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import MyList from './components/MyList.vue'
import NoLists from './components/NoLists.vue'
import MyCard from './components/MyCard.vue'
import { BIcon } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('MyList',MyList)
Vue.component('NoLists',NoLists)
Vue.component('MyCard',MyCard)
Vue.component('BIcon', BIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
