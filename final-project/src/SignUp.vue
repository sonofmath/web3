<template>
  <div class="sign-up">
    <div class="login">
      <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button"><router-link to="/">Home</router-link></button>
        <button class="btn btn-outline-secondary" type="button"><router-link to="/about">Temperature & Humidity Logs</router-link></button>
        <router-view/>
      </form>
      </nav>
      <div class="container">
        <div class="card">
            <div class="card-header">
                <h1>Create A New Account</h1>
            </div>
            <div class="card-body alert-success">
              <div>
                <h3>Email:
                <input
                  name="email"
                  label="email"
                  v-model="email"
                  id="email"
                  type="email"
                  class="input alert-light"
                  placeholder=" Email Address"
                  required>
                <br><br>
                Password:
                <input
                  v-model="password"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  class="input alert-light"
                  placeholder=" Password"
                  required>
                <br><br/>
                Confirm Password:
                <input
                  v-model="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirm Password"
                  id="passwordConfirm"
                  type="password"
                  class="input alert-light"
                  placeholder=" Password"
                  :rules="[comparePasswords]"
                  required>
                <br>
                </h3>
                <button id="signup" v-on:click="signUp" class="btn btn-primary">Sign Up!</button>
                <button it="back" class="button">
                  <router-link to="/login">
                    <h4>Back</h4>
                  </router-link>
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      alert: false
    }
  },
  computed: {
    comparePasswords () {
      return this.password === this.passwordConfirm ? true : 'Passwords don\'t match'
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    signUp () {
      if (this.comparePasswords !== true) {
        alert("Passwords do not match")
        return
      }
      alert("Account successfully created! Verification email has been sent to " + this.email)
      document.getElementById("signup").disabled = "disabled"
      this.$store.dispatch('userSignUp', { email: this.email, password: this.password })
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
