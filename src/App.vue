<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!isLoggedIn" to="/register">Registration</router-link>
      <span v-if="!isLoggedIn"> |</span>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <span v-if="!isLoggedIn"> |</span>
      <router-link v-if="isLoggedIn" to="/dashboard">Dashboard</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
    </div> -->
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import Navbar from './components/dashboard/component/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed : {
    // isLoggedIn : function() {
    //   return this.$store.getters.isLoggedIn
    // }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
  created: function () {
    const instance = this.$axios.create();
    instance.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>

<style>
html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100vh - 10%);
  /* margin-top: 60px; */
}
</style>
