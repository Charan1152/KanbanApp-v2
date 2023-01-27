import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  getters: {
    token(state) {
      if (state.loggedIn === true) {
        return localStorage.getItem('token')
      } else {
        return null
      }
    },
  },
  mutations: {
    login(state) {
      state.loggedIn = true
    },
    logout(state) {
      state.loggedIn = false
    }
  },
  actions: {
    logoutUser({ commit }) {
      localStorage.clear();
      commit('logout')
      router.push({ name: 'login' })
    },
    async loginUser({ commit }, user) {
      const res = await fetch(`http://127.0.0.1:5000/login?include_auth_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          user 
        )
      });
      localStorage.setItem('email', user.email)
      res.json().then((d)=>{
        const authToken = d.response.user.authentication_token
        localStorage.setItem('token', authToken)
        localStorage.setItem('id', d.response.user.id)
        commit('login')
        router.push({ name: 'HomeView' })
      }).catch((e)=>{alert("Incorrect Credentials, Please try again",e)})
    }
  },
  modules: {
  }
})
