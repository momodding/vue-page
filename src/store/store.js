/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    respMessage: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
      state.respMessage = ''
    },
    auth_error(state, message) {
      state.status = 'error'
      state.respMessage = message
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.respMessage = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/auth/login', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.access_token
            const user = JSON.stringify(resp.data)
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            axios.defaults.headers.common['Authorization'] = 'Bearer '.token
            commit('auth_success', token, JSON.parse(user))
            resolve(resp)
          })
          .catch((err) => {
            commit('auth_error', err.response.data.error)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/auth/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            const user = JSON.stringify(resp.data)
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            axios.defaults.headers.common['Authorization'] = 'Bearer '.token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    responseMessage: state => state.respMessage,
  }
})
