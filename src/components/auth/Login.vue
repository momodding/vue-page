<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-8">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ alertMessage }}
        </b-alert>
        <article class="card mx-auto">
          <div class="card-header">
            <h1>Sign in</h1>
          </div>
          <div class="card-body">
            <form class="login" @submit.prevent="login">
              <b-form-group
                id="fieldset-email"
                label="Enter your name"
                label-for="input-email"
              >
                <b-form-input
                  id="input-email"
                  v-model="email"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="fieldset-password"
                label="Enter your password"
                label-for="input-password"
              >
                <b-form-input
                  id="input-password"
                  v-model="password"
                  type="password"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-button variant="outline-primary" type="submit">Login</b-button>
            </form>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      email: "",
      password: "",
      showDismissibleAlert: false,
      alertMessage: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("dashboard");
        })
        .catch((err) => {
          this.alertMessage = this.$store.getters.responseMessage;
          this.showDismissibleAlert = true;
        });
    }
  }
};
</script>
