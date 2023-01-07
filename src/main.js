import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import MyList from './components/MyList.vue'


Vue.config.productionTip = false
Vue.component('MyList',MyList)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
