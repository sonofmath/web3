<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button"><router-link to="/logs">Home</router-link></button>
        <button class="btn btn-outline-secondary" type="button"><router-link to="/about">Temperature & Humidity Logs</router-link></button>
        <router-view/>
        <div>
          <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="logout">Logout</button>
        </div>
      </form>
    </nav>
    <iframe 
    src="https://test-e6695.firebaseapp.com/"
    height="1000"
    width="1000"
    style="border: none">
    </iframe>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../firebaseApp'

let postsRef = db.ref('racks')

export default {
  name: 'HelloWorld',
  data () {
    return {
      rack: {
        id: '',
        type: '',
        message: '',
        inTime: '',
        outTime: '',
        totalTime: '',
        drying: ''
      }
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  firebase: {
    racks: db.ref('racks')
  }
}
</script>
