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
                <h1>Update Log </h1>
            </div>
            <div class="card-body alert-success">
                <div>
                    <div class="form-group">
                      <label for="sel1"><h4>Update Plant:</h4></label>
                        <select class="form-control" id="sel1" v-model="addRack.type">
                          <option>Basil</option>
                          <option>Thyme</option>
                          <option>Oregeno</option>
                          <option>Sage</option>
                          <option>Dill</option>
                          <option>Bay Leaves</option>
                        </select>
                    </div>
                    
                    <h3>
                    Message:
                    <input
                        type="text"
                        v-model="message"
                        placeholder="New Message"
                        class="input alert-light"
                        required>
                    <br/>
                    <button v-on:click="update" class="btn btn-lg btn-primary">Update</button>
                    <br/>
                    </h3>
                    <p><router-link to="/home">
                    <h4>Cancel</h4>
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
import { db } from '../firebaseApp'

export default {
  name: 'HelloWorld',
  components: {
    modal: modal,
    modal2
  },
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
    update () {
      this.$firebaseRefs.racks.child().update({
        id: this.addRack.type,
        message: this.addRack.message
      })
      this.addRack.type = ''
      this.addRack.message = ''
    },
  },
  firebase: {
         racks: db.ref('racks')
    }
}
</script>
