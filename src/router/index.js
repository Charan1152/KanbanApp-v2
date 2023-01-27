import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/HomeView',
    name: 'HomeView',
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
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/logout',
    name: 'LogoutPage',
    component: () => import('../views/LogoutPage.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
