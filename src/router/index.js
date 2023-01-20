import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/summary',
    name: 'summary',
    component: () => import('../views/SummaryView.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/PageIs404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
