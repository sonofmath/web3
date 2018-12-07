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
                        type="text"
                        v-model="email"
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
                    <button v-on:click="login" class="btn btn-primary">Enter</button>
                    <br/>
                    </h3>

                    <button @click="signInWithGoogle">Sign in with Google</button>
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
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('/home')
      }).catch((err) => {
        alert(err.message)
      })
    },
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.user = result.user
      }).catch(err => console.log(error))
    }
  }
}
</script>
