<template>
  <div>
    <div class="container">
      <h1 align="center">Temperature and Humidity Tracker</h1>
      <br>
      <div class="card text-center">
        <div class="card-header text-white bg-primary">
          <h2 id="test">Current Conditions</h2>
        </div>
        <div class="card-body ">
          <!-- <div id='showData'>
            <button type="button" class="btn btn-warning" @click="showData()">Show Data</button>
          </div> -->
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title text-white bg-info" >Temperature</h4>
                    <h1> {{ Info.temperature }} °</h1>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title text-white bg-info">Humidity</h4>
                    <h1> {{ Info.humidity }} %</h1>
                </div>
              </div>
            </div>
          </div>  
          <br>
          <div class="card">
            <h4 class="card-header">Moisture Status <span id="badge" class="badge badge-success"></span></h4>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
              </blockquote>
            </div>
            <h5 id='alarm'></h5>
            <div id='buttonAppear'>
              <button type="button" class="btn btn-warning" @click="dismissAlert()">Dismiss</button>
            </div>
            <!-- <table class="table table-striped">
                <thead>
                </thead>
                <tbody>
                    <tr v-for="items of waterSensor" :key="items['.key']">
                      <td> {{ items.time }} </td>
                      <td>
                          <router-link :to="{ name: 'Edit', params: {id: items['.key']} }" class="btn btn-warning">
                            Dismiss
                          </router-link>
                      </td>
                    </tr>
                </tbody>
              </table> -->
            <div class="card-footer text-muted">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <canvas id="temp-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { db } from '../config/db'

var ref = db.ref('templogs')
var ref2 = db.ref('currenttemp')
var ref3 = db.ref('wateralerts')

export default {
  name: 'app',
  methods: {
    createChart(chartId, ChartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ChartData.timeArray,
          datasets: [
            { // one line graph
              label: 'Humidity %',
              data: ChartData.humidityArray,
              backgroundColor: [
                'rgba(54,73,93,.5)'
              ],
              borderColor: [
                '#36495d'
              ],
              borderWidth: 3
            },
            { // another line graph
              label: 'Temperature ° Farenheit',
              data: ChartData.tempArray,
              backgroundColor: [
                'rgba(71, 183,132,.5)' // Green
              ],
              borderColor: [
                '#47b784'
              ],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 25,
              }
            }]
          }
        }
      });
      return myChart
    },
    getCurrent(Info) {
      var ref = db.ref().child('currenttemp')
      ref.on('value', function(snap) {
          Info.temperature = snap.child('temp').val()
          Info.humidity = snap.child('humid').val()
          Info.time = snap.child('timestamp').val()
      })
      return Info
    },
    getTemp(ChartData) {
      var ref = db.ref().child('templogs').orderByChild('timestamp')
      ref.on('value', function(snap) {
          snap.forEach(function(item) {
              var tempVal = item.child('temp').val()
              var humidVal = item.child('humid').val()
              var timeVal = item.child('timestamp').val()
              ChartData.tempArray.push(tempVal)
              ChartData.humidityArray.push(humidVal)
              ChartData.timeArray.push(timeVal)
          })
      })
      return ChartData
    },
    checkStatus() {
      db.ref('wateralerts').orderByChild('dismissed').equalTo(0).on('value', function(snapshot) {
        if(snapshot.exists()) {
          document.getElementById('badge').innerHTML = "Water Detected"
          document.getElementById('badge').classList.add('badge-danger')
          document.getElementById('badge').classList.remove('badge-success')
          document.getElementById('alarm').innerHTML = "Water Detected"
          document.getElementById('buttonAppear').style.display = "block"
        }
        else {
          document.getElementById("badge").innerHTML = "In The Clear"
          document.getElementById('badge').classList.add('badge-success')
          document.getElementById('badge').classList.remove('badge-danger')
          document.getElementById('alarm').innerHTML = ""
          document.getElementById('buttonAppear').style.display = "none"
        }
        this.$forceUpdate()
      });
      return 0
    },
  },

  computed: {
    dismissAlert() {
      var ref = db.ref().child('wateralerts')
      ref.orderByChild('dismissed').equalTo(0).once('value', function(snap) {
          snap.forEach(function(item) {
            var key = item.key
            ref.child(key).update({ "dismissed" : 1 })
          })
      })
      this.$forceUpdate()
      return 0
    },
    showData() {
      let Visits = {
        timestamp: ''
      }
      db.ref('viewLogs').push({
        timestamp: Date.now()
      })

      var ref = db.ref('viewLogs')
      ref.on('value', function(snap) {
        Visits.visits = snap.numChildren()
      })
      var output = "This button has been clicked " + parseInt(Visits.visits, 10)/2 + " times"
      document.getElementById('test').innerHTML = output
      document.getElementById('showData').style.display = "none"
      this.$forceUpdate()
      return 0
    }
  },
  data() {
    return {
      ChartData: {
        tempArray: [],
        humidityArray: [],
        timeArray: []
      },
      Info: {
        temperature: '',
        humidity: '',
        time: ''
      },
      Views: {
        timestamp: '',

      },

    }
  },
  beforeCreate() {
    
  },
  created() {
    this.getTemp(this.ChartData),
    this.getCurrent(this.Info)
  },
  beforeMount() {
    this.showData()
  },
  mounted() {
    this.checkStatus(),
    this.createChart('temp-chart', this.ChartData)
  },
  beforeUpdate() {
    this.getTemp(this.ChartData)
  },
  // Firebase Stuff
  firebase: {
    tempData: ref,
    currentTemp: ref2,
    waterSensor: ref3,
    views: db.ref('viewLogs')
  }
}
</script>

