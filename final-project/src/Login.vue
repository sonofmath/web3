<template>
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
                <h1>Welcome To Ag-Logger</h1>
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
                        placeholder=" Email Address"
                        class="input alert-light"
                        required>
                    <br/><br/>
                    Password:
                    <input
                        type="password"
                        v-model="password"
                        placeholder=" Password"
                        class="input alert-light"
                        required>
                    <br/>
                    <button v-on:click="login" class="btn btn-lg btn-primary">Enter</button>
                    <br/>
                    </h3>

                    <!-- <h4><button class="btn btn btn-outline-primary" @click="signInWithGoogle">Sign in with Google</button></h4>
                    <br/> -->
                    <button class="btn btn-sm btn-info"><router-link to="/resetpassword">Forgot Password</router-link></button>
                    <br/>
                    <p><router-link to="/signup">
                    <h4>New Here? Create a new account</h4>
                    </router-link></p>
                </div>
            </div>
        </div>
    </div>
    <br><br>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
    },
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.user = result.user
      }).catch(err => console.log(error))
    }
  },
    computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
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
