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

Vue.config.productionTip = false
Vue.component('MyList',MyList)
Vue.component('NoLists',NoLists)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
