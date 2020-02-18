<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>Email</label>
     <input required v-model="email" type="email" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push('dashboard');
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    // handleSubmit(e) {
    //   e.preventDefault();
    //   if (this.password.length > 0) {
    //     this.$http
    //       .post('http://localhost:3000/auth/login', {
    //         username: this.email,
    //         password: this.password,
    //       })
    //       .then((response) => {
    //         // eslint-disable-next-line
    //         let is_admin = response.data.userRole;
    //         localStorage.setItem('user', JSON.stringify(response.data));
    //         localStorage.setItem('jwt', response.data.access_token);

    //         if (localStorage.getItem('jwt') !== null) {
    //           this.$emit('loggedIn');
    //           if (this.$route.params.nextUrl != null) {
    //             this.$router.push(this.$route.params.nextUrl);
    //           } else {
    //             // eslint-disable-next-line
    //             if (is_admin === 1) {
    //               this.$router.push('dashboard');
    //             } else {
    //               this.$router.push('dashboard');
    //             }
    //           }
    //         }
    //       })
    //       .catch((error) => {
    //         // eslint-disable-next-line
    //         console.error(error.response);
    //       });
    //   }
    // },
  },
};
</script>
