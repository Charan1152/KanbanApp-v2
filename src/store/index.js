import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  },
  actions: {
    async loginUser({ commit }, user) {
      const res = FetchFunction({
        url: 'http://127.0.0.1:8080/login?include_auth_token',
        init_obj: {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(user),
        },
      })
      console.log(user.email)
      localStorage.setItem('email', user.email)
      res
        .then((data) => {
          const authToken = data.response.user.authentication_token
          commit('login')
          commit('useremail', user.email)
          setTimeout(router.push({ name: 'Dashboard', params: { email: user.email } }),2000)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
