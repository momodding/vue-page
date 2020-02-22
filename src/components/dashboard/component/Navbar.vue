<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <img class="nav-logo" src="../../../assets/logo.png"> NavBar
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item> -->

          <li class="nav-item">
            <router-link to="/" exact class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" to="/register" class="nav-link">
              Registration
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isLoggedIn" to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form> -->

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown v-if="isLoggedIn" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
   methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login');
      })
    }
  },
  computed : {
    isLoggedIn : function() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
<style scope>
.nav-logo {
  max-width: 1.5rem;
}
.nav-item > a.router-link-active {
  color: white !important;
  text-decoration: none;
}
.nav-item > a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}
</style>
