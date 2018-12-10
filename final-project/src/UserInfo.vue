<template>
  <div class="sign-up">
    <div class="login">
      <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button"><router-link to="/logs">Home</router-link></button>
        <router-view/>
        <div>
          <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="logout">Logout</button>
        </div>
      </form>
      </nav>
      <div class="container">
        <div class="card">
            <div class="card-header">
                <h1>User Info</h1>
            </div>
            <div class="card-body alert-success">
              <div>
                <h3>Update Email:
                <input
                  name="email"
                  label="email"
                  v-model="email"
                  id="email"
                  type="email"
                  class="input alert-light"
                  placeholder=" New Email Address"
                  required>
                <br><br>
                <button id="btn" v-on:click="update" class="btn btn-primary">Update Email</button>
                <button id="reset" class="btn btn-info" v-on:click="resetpassword">Change Password</button>
                <br>
                <button id="delete" class="btn btn-sm btn-danger" v-on:click="deleteAcct">Delete Account</button>
                </h3>
                <button class="button">
                  <router-link to="/login">
                    <h4>Cancel</h4>
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
      alert: false
    }
  },
  methods: {
    update () {
      document.getElementById("btn").disabled = "disabled"
      var user = firebase.auth().currentUser;
      user.updateEmail(this.email).then(function() {
        // Update successful.
        alert("Email successfully updated!")
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }).catch(function(error) {
        // An error happened.
        alert("Email not working.")
      })
    },
    resetpassword() {
      var auth = firebase.auth()
      var emailAddress = auth.currentUser.email
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        document.getElementById('reset').disabled = "disabled"
        alert("Email has been sent to " + emailAddress)
      }).catch(function(error) {
        // An error happened.
      })
    },
    deleteAcct() {
      var user = firebase.auth().currentUser

      user.delete().then(function() {
        // User deleted.
      }).catch(function(error) {
        // An error happened.
      })
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
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
