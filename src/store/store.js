/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    respMessage: {},
    token: localStorage.getItem('token') || '',
    user: {},
    todo: {},
    todos: [{}],
  },
  mutations: {
    auth_request: (state) => {
      state.status = 'loading'
    },
    auth_success: (state, {user, token}) => {
      state.status = 'success'
      state.user = user
      state.token = token
      state.respMessage = ''
    },
    request_error: (state, {message}) => {
      state.status = 'error'
      state.respMessage = message
    },
    logout: (state) => {
      state.status = ''
      state.token = ''
      state.respMessage = ''
    },
    todo_list: (state, todos) => {
      state.status = 'success'
      state.todos = todos
    },
    todo_post: (state, todo) => {
      state.status = 'success'
      state.todo = todo
      state.todos.push(todo)
    },
    todo_delete: (state, id) => {
      state.status = 'success'
      state.todos = [...state.todos.filter(el => el.id !== id)]
    },
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
            this._vm.$axios.defaults.headers.common['Authorization'] = 'Bearer '.token;
            commit('auth_success', {token:token, user:JSON.parse(user)});
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
        this._vm.$axios({ url: 'http://localhost:3000/auth/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token;
            const user = JSON.stringify(resp.data);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            this._vm.$axios.defaults.headers.common['Authorization'] = 'Bearer '.token;
            commit('auth_success', { token: token, user: JSON.parse(user) })
            resolve(resp);
          })
          .catch(err => {
            commit('request_error', err.response);
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
        this._vm.$axios({
          url: 'http://localhost:3000/todos',
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then((resp) => {
          commit('todo_list', JSON.parse(JSON.stringify(resp.data)));
          resolve(resp.data);
        })
        .catch((err) => {
          commit('request_error', err.response);
          reject(err);
        });
      });
    },
    createTask({ commit }, todo) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          url: 'http://localhost:3000/todos',
          data: todo, method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then((resp) => {
          const todoResp = JSON.parse(JSON.stringify(resp.data));
          commit('todo_post', todoResp);
          resolve(resp.data);
        }).catch((err) => {
          console.log(err);
          commit('request_error', err.response);
          reject(err);
        });
      })
    },
    deleteTask({ commit }, id) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          url: 'http://localhost:3000/todos/'+id,
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then((resp) => {
          commit('todo_delete', id);
          resolve(resp);
        }).catch((err) => {
          console.log(err);
          commit('request_error', err.response);
          reject(err);
        });
      });
    }
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
