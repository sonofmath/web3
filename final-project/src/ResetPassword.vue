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
                <h1>Reset Password</h1>
            </div>
            <div class="card-body alert-success">
              <div>
                <h3>Enter Email:
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
                </h3>
                <button id="btn" v-on:click="reset" class="btn btn-primary">Reset</button>
                <button class="button">
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
import firebase from 'firebase'
export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    reset () {
      var auth = firebase.auth()
      var emailAddress = this.email

      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        document.getElementById('btn').disabled = "disabled"
        alert("Email has been sent to " + emailAddress)
      }).catch(function(error) {
        // An error happened.
      })
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
