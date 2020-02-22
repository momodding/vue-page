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
    user: {},
    todo: {},
    todos: []
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
    request_error(state, message) {
      state.status = 'error'
      state.respMessage = message
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.respMessage = ''
    },
    todo_list(state, status, todos) {
      state.status = status
      state.todos = todos
    },
    todo_post(state, status, todo) {
      state.status = status
      state.todo = todo
      state.todos = [...state.todos.map(item => item.id !== todo.id ? item : {...item, todo})]
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:3000/auth/login', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.access_token;
            const user = JSON.stringify(resp.data);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            axios.defaults.headers.common['Authorization'] = 'Bearer '.token;
            commit('auth_success', token, JSON.parse(user));
            resolve(resp);
          })
          .catch((err) => {
            commit('request_error', err.response.data.error);
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:3000/auth/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token;
            const user = JSON.stringify(resp.data);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            axios.defaults.headers.common['Authorization'] = 'Bearer '.token;
            commit('auth_success', token, user)
            resolve(resp);
          })
          .catch(err => {
            commit('request_error', err);
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve();
      })
    },
    getTask({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:3000/todos',
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then((resp) => {
          commit('todo_list', 'success', resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          commit('request_error', err.response.data.error);
          reject(err);
        });
      });
    },
    createTask({ commit }, todo) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:3000/todos',
          data: todo, method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then((resp) => {
          commit('todo_post', 'success', resp.data);
          resolve(resp.data);
        }).catch((err) => {
          console.log(err);
          commit('request_error', err.response.data.error);
          reject(err);
        });
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    requestStatus: state => state.status,
    responseMessage: state => state.respMessage,
    todo: state => state.todo,
    todos: state => state.todos,
  }
})
