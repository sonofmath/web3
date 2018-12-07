<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button"><router-link to="/">Home</router-link></button>
        <button class="btn btn-outline-secondary" type="button"><router-link to="/about">Temperature & Humidity Logs</router-link></button>
        <router-view/>
        <div>
          <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="logout">Logout</button>
        </div>
      </form>
    </nav>
    <br><br>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>Add Plant To Drying Room</h2>
            </div>
            <div class="card-body alert-success">
                <form v-on:submit.prevent="addRack">
                    <div class="form-group">
                      <label for="sel1"><h4>Select Plant:</h4></label>
                        <select class="form-control" id="sel1" v-model="addRack.type">
                          <option>Basil</option>
                          <option>Thyme</option>
                          <option>Oregeno</option>
                          <option>Sage</option>
                          <option>Dill</option>
                          <option>Bay Leaves</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><h4>Message:</h4></label>
                        <input type="text" class="form-control" v-model="addRack.message"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Add Plant"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <br><br>

    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>Plants In Drying Room</h2>
            </div>
            <div class="card-body bg-danger">
              <div>
                <h3></h3>
                <table class="table table-striped alert-secondary">
                  <thead>
                    <tr>
                      <th><b>Type</b></th>
                      <th><b>Message</b></th>
                      <th colspan="1"><b>Plant</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="rack of racks" v-if="rack.drying === true" :key="rack['.key']">
                      <td>{{ rack.type }}</td>
                      <td>{{ rack.message }}</td>
                      <button class="btn btn-warning"@click="removePlant(rack)">Remove Plant</button>
                      <td>
                          <router-link>
                          </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
    <br><br>

    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>Plant Logs</h2>
            </div>
            <div class="card-body text-wite bg-info">
              <div>
                <h3></h3>
                <table class="table table-striped alert-secondary">
                  <thead>
                    <tr>
                      <th><b>Type</b></th>
                      <th><b>Message</b></th>
                      <th><b>Total Drying Time</b></th>
                      <th colspan="1"><b>Update Message/Delete Log</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rack, index) in racks" v-if="rack.drying !==true" :key="index">
                      <td>{{ rack.type }}</td>
                      <td>{{ rack.message }}</td>
                      <td>{{ rack.totalTime | formatDate }}</td>
                      <input type="button" class="btn btn-warning" value="Update Message" @click="showModal">
                      <modal v-show="isModalVisible" @close="closeModal"/>
                      <input type="button" class="btn btn-danger" value="Delete Log" @click="showModal2">
                      <modal v-show="isModal2Visible" @close="closeModal2"/>
                      <td>
                          <router-link>
                          </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../firebaseApp'
import moment from 'moment'
import modal from './modal'
import modal2 from './modalConfirm'

let postsRef = db.ref('racks')

export default {
  name: 'HelloWorld',
  components: {
      modal,
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
      },
      isModalVisible: false,
      isModal2Visible: false
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        const diff = {}

        diff.days = Math.floor(value / 86400)
        diff.hours   = Math.floor(value / 3600 % 24)
        diff.minutes = Math.floor(value / 60 % 60)
        diff.seconds = Math.floor(value % 60)

        let message = `${diff.days}d: ${diff.hours}h: ${diff.minutes}m: ${diff.seconds}s`
        message = message.replace(/(?:0. )+/, '')

        return message
      }
    }
  },
  methods: {
    addRack () {
      var ts = Date.now()
      this.$firebaseRefs.racks.push({
        id: ts,
        type: this.addRack.type,
        message: this.addRack.message,
        inTime: ts,
        drying: true
      })
      this.addRack.type = ''
      this.addRack.message = ''
    },

    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },

    removePlant (plant) {
      var ts = Date.now()
      var tot = ts - plant.inTime
      postsRef.child(plant['.key']).update({ drying: false, outTime: ts, totalTime: tot })
    },

    updateMessage (message) {
    },

    deleteLogs (rack) {
      postsRef.child(rack['.key']).remove()
      alert('Successfully Deleted')
    },

    showModal() {
      this.isModalVisible = true
    },

    closeModal() {
      this.isModalVisible = false
    },

    showModal2() {
      this.isModal2Visible = true
    },

    closeModal2() {
      this.isModal2Visible = false
    }
  },
  firebase: {
    racks: db.ref('racks')
  }
}
</script>
