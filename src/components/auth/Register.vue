<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-8">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          {{ alertMessage }}
        </b-alert>
        <article class="card mx-auto">
          <div class="card-header">
            <h4>Register</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <b-form-group
                id="fieldset-username"
                label="Enter your Username"
                label-for="input-username"
              >
                <b-form-input
                  id="input-username"
                  v-model="name"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="fieldset-email"
                label="Enter your Email"
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
                label="Enter your Password"
                label-for="input-password"
              >
                <b-form-input
                  id="input-password"
                  v-model="password"
                  type="password"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="fieldset-password-confirm"
                label="Enter your Password Confirmation"
                label-for="input-password-confirm"
                :invalid-feedback="invalidFeedback"
                :valid-feedback="validFeedback"
                :state="state"
              >
                <b-form-input
                  id="input-password-confirm"
                  v-model="passwordConfirmation"
                  type="password"
                  :state="state"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-button variant="outline-primary" type="submit">Register</b-button>
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
  props: ['nextUrl'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      is_admin: null,
      showDismissibleAlert: false,
      alertMessage: '',
    };
  },
  computed: {
    state() {
      return this.password.length > 0 && this.password === this.passwordConfirmation;
    },
    invalidFeedback() {
      if (this.password !== this.passwordConfirmation) {
        return 'Password not match';
      }
      return 'Please enter confirmation password';
    },
    validFeedback() {
      return this.passwordConfirm === true ? 'Thank you' : '';
    },
  },
  methods: {
    register() {
      const data = {
        username: this.name,
        email: this.email,
        password: this.password,
        role: 2,
      };
      this.$store.dispatch('register', data)
        .then(() => {
          this.$router.push('dashboard');
        })
        .catch((err) => {
          this.alertMessage = this.$store.getters.responseMessage.data.error;
          console.log(err);
        });
    },
  },
};
</script>
